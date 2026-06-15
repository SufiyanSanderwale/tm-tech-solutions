import { eq, desc, sql, and } from 'drizzle-orm'
import { ensureTables, getDb } from './db'
import { applications, jobs, type ApplicationStatus } from './schema'

export type JobWithCount = {
  id: string
  title: string
  slug: string
  description: string
  location: string
  jobType: string
  requirements: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  applicationCount: number
}

export type ApplicationWithJob = {
  id: string
  jobId: string
  jobTitle: string
  name: string
  email: string
  phone: string
  resumeUrl: string
  resumePublicId: string | null
  resumeFileName: string | null
  message: string | null
  status: string
  createdAt: Date
}

async function prepareDb() {
  await ensureTables()
  return getDb()
}

export async function getActiveJobsWithCounts(): Promise<JobWithCount[]> {
  const db = await prepareDb()

  const rows = await db
    .select({
      id: jobs.id,
      title: jobs.title,
      slug: jobs.slug,
      description: jobs.description,
      location: jobs.location,
      jobType: jobs.jobType,
      requirements: jobs.requirements,
      isActive: jobs.isActive,
      createdAt: jobs.createdAt,
      updatedAt: jobs.updatedAt,
      applicationCount: sql<number>`count(${applications.id})`.mapWith(Number),
    })
    .from(jobs)
    .leftJoin(applications, eq(applications.jobId, jobs.id))
    .where(eq(jobs.isActive, true))
    .groupBy(jobs.id)
    .orderBy(desc(jobs.createdAt))

  return rows
}

export async function getJobBySlug(slug: string): Promise<JobWithCount | null> {
  const db = await prepareDb()

  const rows = await db
    .select({
      id: jobs.id,
      title: jobs.title,
      slug: jobs.slug,
      description: jobs.description,
      location: jobs.location,
      jobType: jobs.jobType,
      requirements: jobs.requirements,
      isActive: jobs.isActive,
      createdAt: jobs.createdAt,
      updatedAt: jobs.updatedAt,
      applicationCount: sql<number>`count(${applications.id})`.mapWith(Number),
    })
    .from(jobs)
    .leftJoin(applications, eq(applications.jobId, jobs.id))
    .where(and(eq(jobs.slug, slug), eq(jobs.isActive, true)))
    .groupBy(jobs.id)
    .limit(1)

  return rows[0] ?? null
}

export async function getAllJobsWithCounts(): Promise<JobWithCount[]> {
  const db = await prepareDb()

  const rows = await db
    .select({
      id: jobs.id,
      title: jobs.title,
      slug: jobs.slug,
      description: jobs.description,
      location: jobs.location,
      jobType: jobs.jobType,
      requirements: jobs.requirements,
      isActive: jobs.isActive,
      createdAt: jobs.createdAt,
      updatedAt: jobs.updatedAt,
      applicationCount: sql<number>`count(${applications.id})`.mapWith(Number),
    })
    .from(jobs)
    .leftJoin(applications, eq(applications.jobId, jobs.id))
    .groupBy(jobs.id)
    .orderBy(desc(jobs.createdAt))

  return rows
}

export async function createJob(input: {
  title: string
  slug: string
  description: string
  location: string
  jobType: string
  requirements?: string
}): Promise<string> {
  const db = await prepareDb()
  const now = new Date()
  const id = crypto.randomUUID()

  await db.insert(jobs).values({
    id,
    title: input.title,
    slug: input.slug,
    description: input.description,
    location: input.location,
    jobType: input.jobType,
    requirements: input.requirements ?? null,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  })

  return id
}

export async function updateJob(
  id: string,
  input: {
    title?: string
    slug?: string
    description?: string
    location?: string
    jobType?: string
    requirements?: string | null
    isActive?: boolean
  }
): Promise<void> {
  const db = await prepareDb()

  await db
    .update(jobs)
    .set({
      ...input,
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, id))
}

export async function deleteJob(id: string): Promise<void> {
  const db = await prepareDb()
  await db.delete(jobs).where(eq(jobs.id, id))
}

export async function createApplication(input: {
  jobId: string
  name: string
  email: string
  phone: string
  resumeUrl: string
  resumePublicId?: string
  resumeFileName?: string
  message?: string
}): Promise<string> {
  const db = await prepareDb()
  const id = crypto.randomUUID()

  await db.insert(applications).values({
    id,
    jobId: input.jobId,
    name: input.name,
    email: input.email,
    phone: input.phone,
    resumeUrl: input.resumeUrl,
    resumePublicId: input.resumePublicId ?? null,
    resumeFileName: input.resumeFileName ?? null,
    message: input.message ?? null,
    status: 'applied',
    createdAt: new Date(),
  })

  return id
}

export async function getApplications(filters?: {
  jobId?: string
  status?: ApplicationStatus
}): Promise<ApplicationWithJob[]> {
  const db = await prepareDb()

  const conditions = []
  if (filters?.jobId) conditions.push(eq(applications.jobId, filters.jobId))
  if (filters?.status) conditions.push(eq(applications.status, filters.status))

  const rows = await db
    .select({
      id: applications.id,
      jobId: applications.jobId,
      jobTitle: jobs.title,
      name: applications.name,
      email: applications.email,
      phone: applications.phone,
      resumeUrl: applications.resumeUrl,
      resumePublicId: applications.resumePublicId,
      resumeFileName: applications.resumeFileName,
      message: applications.message,
      status: applications.status,
      createdAt: applications.createdAt,
    })
    .from(applications)
    .innerJoin(jobs, eq(jobs.id, applications.jobId))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(applications.createdAt))

  return rows
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus
): Promise<void> {
  const db = await prepareDb()
  await db.update(applications).set({ status }).where(eq(applications.id, id))
}

export async function getJobById(id: string) {
  const db = await prepareDb()
  const rows = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1)
  return rows[0] ?? null
}

export async function getApplicationById(id: string) {
  const db = await prepareDb()
  const rows = await db.select().from(applications).where(eq(applications.id, id)).limit(1)
  return rows[0] ?? null
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const db = await prepareDb()
  const rows = await db.select({ id: jobs.id }).from(jobs).where(eq(jobs.slug, slug))
  if (!rows.length) return false
  if (excludeId && rows.every((row) => row.id === excludeId)) return false
  return rows.some((row) => row.id !== excludeId)
}
