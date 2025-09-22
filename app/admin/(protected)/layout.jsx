import {cookies} from 'next/headers';
import {verifySession} from '../../../lib/auth';
import {redirect} from 'next/navigation';

export default async function ProtectedAdminLayout({children}) {
  const cookieStore = await cookies(); // await!
  const token = cookieStore.get('admin_session')?.value || '';
  const session = token ? verifySession(token) : null;

  if (!session) redirect('/admin/login');
  return <>{children}</>;
}