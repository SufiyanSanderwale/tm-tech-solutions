import Link from 'next/link'
import { redirect } from 'next/navigation'
import { verifyAdminSession } from '@/lib/auth'

export default async function AdminHomePage() {
  const isLoggedIn = await verifyAdminSession()
  if (!isLoggedIn) {
    redirect('/admin/login')
  }
  redirect('/admin/jobs')
}
