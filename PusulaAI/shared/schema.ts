import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analysisSessions = pgTable("analysis_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  youtubeUrl: text("youtube_url").notNull(),
  videoTitle: text("video_title"),
  transcript: text("transcript"),
  status: varchar("status", { length: 50 }).notNull().default("started"),
  currentStep: integer("current_step").default(0),
  geminiAnalysis: jsonb("gemini_analysis"),
  careerMatches: jsonb("career_matches"),
  btkRecommendations: jsonb("btk_recommendations"),
  studentReport: jsonb("student_report"),
  parentReport: jsonb("parent_report"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const progressUpdates = pgTable("progress_updates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").references(() => analysisSessions.id).notNull(),
  step: integer("step").notNull(),
  message: text("message").notNull(),
  details: jsonb("details"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const careerDatabase = pgTable("career_database", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  keywords: text("keywords").array(),
  sector: text("sector"),
  demandLevel: varchar("demand_level", { length: 20 }),
  salaryRange: text("salary_range"),
  educationRequirements: text("education_requirements").array(),
  skills: text("skills").array(),
  companies: text("companies").array(),
});

export const btkCourses = pgTable("btk_courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category"),
  keywords: text("keywords").array(),
  duration: text("duration"),
  level: varchar("level", { length: 20 }),
  url: text("url"),
  isActive: boolean("is_active").default(true),
});

// Relations
export const analysisSessionsRelations = relations(analysisSessions, ({ many }) => ({
  progressUpdates: many(progressUpdates),
}));

export const progressUpdatesRelations = relations(progressUpdates, ({ one }) => ({
  session: one(analysisSessions, {
    fields: [progressUpdates.sessionId],
    references: [analysisSessions.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAnalysisSessionSchema = createInsertSchema(analysisSessions).pick({
  youtubeUrl: true,
});

export const insertProgressUpdateSchema = createInsertSchema(progressUpdates).pick({
  sessionId: true,
  step: true,
  message: true,
  details: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type AnalysisSession = typeof analysisSessions.$inferSelect;
export type InsertAnalysisSession = z.infer<typeof insertAnalysisSessionSchema>;
export type ProgressUpdate = typeof progressUpdates.$inferSelect;
export type InsertProgressUpdate = z.infer<typeof insertProgressUpdateSchema>;
export type Career = typeof careerDatabase.$inferSelect;
export type BTKCourse = typeof btkCourses.$inferSelect;

// Analysis result types
export type GeminiAnalysis = {
  mainTopics: string[];
  relatedSectors: string[];
  competencyRequirements: string[];
  turkeyJobMarketFit: "Yüksek" | "Orta" | "Düşük";
  detailedAnalysis: string;
};

export type CareerMatch = {
  career: string;
  matchScore: number;
  reasoning: string;
  requiredSkills: string[];
  careerPath: string[];
  companies: string[];
};

export type StudentReport = {
  videoTopic: string;
  mainTopics: string[];
  careerAreas: CareerMatch[];
  recommendedCourses: BTKCourse[];
  careerRoadmap: {
    title: string;
    steps: string[];
    timeline: string;
  };
  skillDevelopment: {
    technical: string[];
    soft: string[];
  };
  nextActions: string[];
};

export type ParentReport = {
  childInterests: string[];
  careerPotential: string;
  supportSuggestions: string[];
  universityRecommendations: string[];
  homeActivities: string[];
  developmentAreas: string[];
  industryInsights: string;
};
