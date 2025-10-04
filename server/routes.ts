import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { parseManualContent } from "./manual-parser";
import { generateChatResponse } from "./openai-service";
import { chatRequestSchema, type Message } from "@shared/schema";
import { randomUUID } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize manual sections on startup
  const manualSections = parseManualContent();
  manualSections.forEach((section) => storage.addManualSection(section));

  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationId } = chatRequestSchema.parse(req.body);

      // Get or create conversation
      let conversation = conversationId
        ? await storage.getConversation(conversationId)
        : null;

      if (!conversation) {
        conversation = await storage.createConversation();
      }

      // Create and save user message
      const userMessage: Message = {
        id: randomUUID(),
        role: "user",
        content: message,
        timestamp: Date.now(),
      };
      await storage.addMessageToConversation(conversation.id, userMessage);

      // Get all manual sections for context
      const sections = await storage.getAllManualSections();

      // Get conversation history for context
      const updatedConversation = await storage.getConversation(conversation.id);
      const conversationHistory = updatedConversation?.messages || [];

      // Generate AI response with full conversation history
      const aiResult = await generateChatResponse(message, sections, conversationHistory);

      // Create assistant message
      const assistantMessage: Message = {
        id: randomUUID(),
        role: "assistant",
        content: aiResult.response,
        timestamp: Date.now(),
        procedureSteps: aiResult.procedureSteps,
        category: aiResult.category,
      };

      // Add assistant message to conversation
      await storage.addMessageToConversation(conversation.id, assistantMessage);

      res.json({
        message: assistantMessage,
        conversationId: conversation.id,
        suggestedQuestions: aiResult.suggestedQuestions,
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ 
        error: "Une erreur s'est produite lors du traitement de votre message" 
      });
    }
  });

  // Get manual sections by category
  app.get("/api/manual/sections/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const sections = await storage.getManualSectionsByCategory(category);
      res.json(sections);
    } catch (error) {
      console.error("Manual sections error:", error);
      res.status(500).json({ error: "Erreur lors de la récupération des sections" });
    }
  });

  // Search manual sections
  app.get("/api/manual/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }
      const sections = await storage.searchManualSections(query);
      res.json(sections);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: "Erreur lors de la recherche" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
