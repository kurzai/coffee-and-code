
import { relations } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid"

export const createId = () => nanoid(21)

export const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const

export const calendars = sqliteTable("calendars", {
  id: text("id").primaryKey().$defaultFn(() => createId()),

  promptSubject: text("promptSubject").notNull(),
  promptScenery: text("promptScenery").notNull(),
  promptStyle: text("promptStyle").notNull(),
  promptComments: text("promptComments").notNull(),
});

export const calendarMonth = sqliteTable("calendarMonths", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  calendarId: text("calendarId").references(() => calendars.id),
  
  month: text("month", { enum: MONTHS }).notNull(),

  conceptSubject: text("conceptSubject").notNull(),
  conceptScenery: text("conceptScenery").notNull(),
  conceptStyle: text("conceptStyle").notNull(),
  conceptComments: text("conceptComments").notNull(),

  prompt: text("prompt").notNull(),

  jobId: text("jobId").notNull(),
})

export const calendarRelations = relations(calendars, ({ many }) => ({
  months: many(calendarMonth),
}));
export const calendarMonthRelations = relations(calendarMonth, ({ one }) => ({
  calendar: one(calendars, {
    fields: [calendarMonth.calendarId],
    references: [calendars.id]
  })
}));