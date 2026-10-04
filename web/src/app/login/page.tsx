import { redirect } from 'next/navigation';
import { auth } from '@/features/cuentas/server/auth';
import { FormularioCuenta } from '@/features/cuentas/components/FormularioCuenta';
import { volverSeguro } from '@/features/cuentas/volver';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ volver?: string }> }) {
  const volver = volverSeguro((await searchParams).volver);
  if ((await auth())?.user) redirect(volver);
  return <FormularioCuenta modo="login" volver={volver} />;
}
