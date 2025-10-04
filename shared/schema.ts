import { z } from "zod";

// Message schemas for chat interface
export const messageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.number(),
  procedureSteps: z.array(z.object({
    stepNumber: z.number(),
    title: z.string(),
    description: z.string(),
    note: z.string().optional(),
  })).optional(),
  category: z.string().optional(),
});

export const insertMessageSchema = messageSchema.omit({ id: true });
export type Message = z.infer<typeof messageSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Conversation schema
export const conversationSchema = z.object({
  id: z.string(),
  title: z.string(),
  messages: z.array(messageSchema),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type Conversation = z.infer<typeof conversationSchema>;

// Manual content structure
export const manualSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  category: z.enum([
    "catalogue",
    "pret",
    "retour",
    "catalogage",
    "donnees"
  ]),
  subsection: z.string().optional(),
  parentId: z.string().optional(),
});

export type ManualSection = z.infer<typeof manualSectionSchema>;

// Chat request/response schemas
export const chatRequestSchema = z.object({
  message: z.string(),
  conversationId: z.string().optional(),
});

export const chatResponseSchema = z.object({
  message: messageSchema,
  conversationId: z.string(),
  suggestedQuestions: z.array(z.string()).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;

// Search schema
export const searchRequestSchema = z.object({
  query: z.string(),
  category: z.string().optional(),
});

export const searchResultSchema = z.object({
  section: manualSectionSchema,
  relevanceScore: z.number(),
  matchedText: z.string(),
});

export type SearchRequest = z.infer<typeof searchRequestSchema>;
export type SearchResult = z.infer<typeof searchResultSchema>;

// Category definition
export const categories = [
  { id: "catalogue", title: "Catalogue en ligne", icon: "BookOpen" },
  { id: "pret", title: "Prêt de documents", icon: "BookmarkPlus" },
  { id: "retour", title: "Retour de documents", icon: "BookmarkMinus" },
  { id: "catalogage", title: "Catalogage", icon: "FolderPlus" },
  { id: "donnees", title: "Données", icon: "Database" },
] as const;
