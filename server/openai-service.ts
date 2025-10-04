import OpenAI from "openai";
import { type ManualSection } from "@shared/schema";

// Using GPT-4o which is the latest available model
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface ProcedureStep {
  stepNumber: number;
  title: string;
  description: string;
  note?: string;
}

interface ChatResult {
  response: string;
  procedureSteps?: ProcedureStep[];
  category?: string;
  suggestedQuestions?: string[];
}

export async function generateChatResponse(
  userMessage: string,
  manualSections: ManualSection[],
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<ChatResult> {
  // Find relevant sections based on the user's question
  const relevantSections = findRelevantSections(userMessage, manualSections);
  
  // Build context from relevant sections
  const context = relevantSections
    .map((section) => `[${section.category.toUpperCase()}] ${section.title}\n${section.content}`)
    .join("\n\n");

  const systemPrompt = `Tu es un assistant expert pour le manuel d'utilisation d'un système de catalogue de bibliothèque. 
Ton rôle est d'aider les utilisateurs à comprendre comment utiliser le système en leur fournissant des procédures claires et détaillées.

Voici le contenu pertinent du manuel :
${context}

Instructions :
1. Réponds en français de manière claire et professionnelle
2. Si la question concerne une procédure, fournis des étapes numérotées détaillées
3. Inclus des notes importantes avec "Note:" quand nécessaire
4. Identifie la catégorie principale concernée (catalogue, pret, retour, catalogage, donnees)
5. Suggère 3-5 questions connexes que l'utilisateur pourrait se poser
6. Utilise l'historique de la conversation pour fournir des réponses contextuelles et des suivis appropriés

Format de réponse en JSON :
{
  "response": "ta réponse textuelle",
  "procedureSteps": [
    {
      "stepNumber": 1,
      "title": "Titre de l'étape",
      "description": "Description détaillée",
      "note": "Note importante (optionnel)"
    }
  ],
  "category": "catalogue|pret|retour|catalogage|donnees",
  "suggestedQuestions": ["question 1", "question 2", "question 3"]
}

Si la question n'est pas une procédure, omets "procedureSteps" et fournis juste "response" et "suggestedQuestions".`;

  // Build messages array with conversation history (last 6 messages for context)
  const recentHistory = conversationHistory.slice(-6).map(msg => ({
    role: msg.role as "user" | "assistant",
    content: msg.content,
  }));

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...recentHistory,
    ],
    response_format: { type: "json_object" },
    max_completion_tokens: 2048,
  });

  const result = JSON.parse(completion.choices[0].message.content || "{}");
  
  return {
    response: result.response || "Je n'ai pas pu générer une réponse appropriée.",
    procedureSteps: result.procedureSteps,
    category: result.category,
    suggestedQuestions: result.suggestedQuestions || [],
  };
}

function findRelevantSections(query: string, sections: ManualSection[]): ManualSection[] {
  const lowerQuery = query.toLowerCase();
  
  // Score each section based on relevance
  const scoredSections = sections.map((section) => {
    let score = 0;
    
    // Check title match
    if (section.title.toLowerCase().includes(lowerQuery)) {
      score += 10;
    }
    
    // Check content match
    const contentMatches = section.content.toLowerCase().split(lowerQuery).length - 1;
    score += contentMatches * 5;
    
    // Category-specific keywords
    const categoryKeywords: Record<string, string[]> = {
      catalogue: ["recherche", "rechercher", "document", "livre", "favori", "emprunt", "réservation"],
      pret: ["prêt", "emprunter", "emprunteur", "scanner"],
      retour: ["retour", "retourner", "amende"],
      catalogage: ["notice", "créer", "nouveau", "index", "dewey", "autorité", "éditeur", "inventaire", "code-barre"],
      donnees: ["notice", "exemplaire", "cote", "imprimer", "modifier", "supprimer"],
    };
    
    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      if (section.category === category) {
        keywords.forEach((keyword) => {
          if (lowerQuery.includes(keyword)) {
            score += 3;
          }
        });
      }
    });
    
    return { section, score };
  });
  
  // Sort by score and return top 5 sections
  return scoredSections
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ section }) => section);
}
