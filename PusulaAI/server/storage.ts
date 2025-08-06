import { 
  users, analysisSessions, progressUpdates, careerDatabase, btkCourses,
  type User, type InsertUser, type AnalysisSession, type InsertAnalysisSession,
  type ProgressUpdate, type InsertProgressUpdate, type Career, type BTKCourse
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, like, inArray } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Analysis sessions
  createAnalysisSession(session: InsertAnalysisSession): Promise<AnalysisSession>;
  getAnalysisSession(id: string): Promise<AnalysisSession | undefined>;
  updateAnalysisSession(id: string, updates: Partial<AnalysisSession>): Promise<AnalysisSession | undefined>;
  
  // Progress tracking
  addProgressUpdate(sessionId: string, update: Omit<InsertProgressUpdate, 'sessionId'>): Promise<ProgressUpdate>;
  getProgressUpdates(sessionId: string): Promise<ProgressUpdate[]>;
  
  // Career database
  searchCareers(keywords: string[]): Promise<Career[]>;
  getAllCareers(): Promise<Career[]>;
  
  // BTK courses
  searchBTKCourses(keywords: string[]): Promise<BTKCourse[]>;
  getBTKCoursesByCategory(category: string): Promise<BTKCourse[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createAnalysisSession(session: InsertAnalysisSession): Promise<AnalysisSession> {
    const [newSession] = await db
      .insert(analysisSessions)
      .values(session)
      .returning();
    return newSession;
  }

  async getAnalysisSession(id: string): Promise<AnalysisSession | undefined> {
    const [session] = await db
      .select()
      .from(analysisSessions)
      .where(eq(analysisSessions.id, id));
    return session || undefined;
  }

  async updateAnalysisSession(id: string, updates: Partial<AnalysisSession>): Promise<AnalysisSession | undefined> {
    const [updated] = await db
      .update(analysisSessions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(analysisSessions.id, id))
      .returning();
    return updated || undefined;
  }

  async addProgressUpdate(sessionId: string, update: Omit<InsertProgressUpdate, 'sessionId'>): Promise<ProgressUpdate> {
    const [progressUpdate] = await db
      .insert(progressUpdates)
      .values({ ...update, sessionId })
      .returning();
    return progressUpdate;
  }

  async getProgressUpdates(sessionId: string): Promise<ProgressUpdate[]> {
    return await db
      .select()
      .from(progressUpdates)
      .where(eq(progressUpdates.sessionId, sessionId))
      .orderBy(desc(progressUpdates.timestamp));
  }

  async searchCareers(keywords: string[]): Promise<Career[]> {
    if (keywords.length === 0) return this.getAllCareers();
    
    return await db
      .select()
      .from(careerDatabase)
      .where(
        // Search in title, description, keywords, and skills
        eq(careerDatabase.keywords, keywords) // This would need a more sophisticated search in production
      );
  }

  async getAllCareers(): Promise<Career[]> {
    return await db.select().from(careerDatabase);
  }

  async searchBTKCourses(keywords: string[]): Promise<BTKCourse[]> {
    if (keywords.length === 0) return [];
    
    return await db
      .select()
      .from(btkCourses)
      .where(eq(btkCourses.isActive, true));
  }

  async getBTKCoursesByCategory(category: string): Promise<BTKCourse[]> {
    return await db
      .select()
      .from(btkCourses)
      .where(eq(btkCourses.category, category));
  }
}

export const storage = new DatabaseStorage();
