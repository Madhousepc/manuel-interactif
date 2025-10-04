import {
  type Message,
  type InsertMessage,
  type Conversation,
  type ManualSection,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Conversation methods
  createConversation(): Promise<Conversation>;
  getConversation(id: string): Promise<Conversation | undefined>;
  addMessageToConversation(conversationId: string, message: Message): Promise<void>;
  
  // Manual section methods
  getAllManualSections(): Promise<ManualSection[]>;
  getManualSectionsByCategory(category: string): Promise<ManualSection[]>;
  searchManualSections(query: string): Promise<ManualSection[]>;
  addManualSection(section: ManualSection): Promise<void>;
}

export class MemStorage implements IStorage {
  private conversations: Map<string, Conversation>;
  private manualSections: Map<string, ManualSection>;

  constructor() {
    this.conversations = new Map();
    this.manualSections = new Map();
  }

  async createConversation(): Promise<Conversation> {
    const id = randomUUID();
    const conversation: Conversation = {
      id,
      title: "Nouvelle conversation",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async getConversation(id: string): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async addMessageToConversation(conversationId: string, message: Message): Promise<void> {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.messages.push(message);
      conversation.updatedAt = Date.now();
      
      // Update title based on first user message
      if (conversation.messages.length === 1 && message.role === "user") {
        conversation.title = message.content.substring(0, 50) + (message.content.length > 50 ? "..." : "");
      }
    }
  }

  async getAllManualSections(): Promise<ManualSection[]> {
    return Array.from(this.manualSections.values());
  }

  async getManualSectionsByCategory(category: string): Promise<ManualSection[]> {
    return Array.from(this.manualSections.values()).filter(
      (section) => section.category === category
    );
  }

  async searchManualSections(query: string): Promise<ManualSection[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.manualSections.values()).filter(
      (section) =>
        section.title.toLowerCase().includes(lowerQuery) ||
        section.content.toLowerCase().includes(lowerQuery)
    );
  }

  async addManualSection(section: ManualSection): Promise<void> {
    this.manualSections.set(section.id, section);
  }
}

export const storage = new MemStorage();
