import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'

export const jobs = sqliteTable('jobs', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  jobType: text('job_type').notNull(),
  requirements: text('requirements'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
})

export const applications = sqliteTable('applications', {
  id: text('id').primaryKey(),
  jobId: text('job_id')
    .notNull()
    .references(() => jobs.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  resumeUrl: text('resume_url').notNull(),
  resumePublicId: text('resume_public_id'),
  resumeFileName: text('resume_file_name'),
  message: text('message'),
  status: text('status').notNull().default('applied'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
})

export const jobsRelations = relations(jobs, ({ many }) => ({
  applications: many(applications),
}))

export const applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, { fields: [applications.jobId], references: [jobs.id] }),
}))

export type Job = typeof jobs.$inferSelect
export type Application = typeof applications.$inferSelect
export type ApplicationStatus =
  | 'applied'
  | 'shortlisted'
  | 'interview_done'
  | 'selected'
  | 'rejected'

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  'applied',
  'shortlisted',
  'interview_done',
  'selected',
  'rejected',
]
