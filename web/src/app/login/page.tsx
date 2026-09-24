import { redirect } from 'next/navigation';
import { auth } from '@/features/cuentas/server/auth';
import { FormularioCuenta } from '@/features/cuentas/components/FormularioCuenta';

export default async function LoginPage() {
  if ((await auth())?.user) redirect('/');
  return <FormularioCuenta modo="login" />;
}
