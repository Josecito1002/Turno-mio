import { redirect } from 'next/navigation';
import { auth } from '@/features/cuentas/server/auth';
import { FormularioCuenta } from '@/features/cuentas/components/FormularioCuenta';

export default async function RegistroPage() {
  if ((await auth())?.user) redirect('/');
  return <FormularioCuenta modo="registro" />;
}
