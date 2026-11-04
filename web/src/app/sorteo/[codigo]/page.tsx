import { auth } from '@/features/cuentas/server/auth';
import { SalaSorteo } from '@/features/sorteos/components/SalaSorteo';
import { normalizarCodigo } from '@/features/sorteos/domain/sorteo';
import { MarcoSorteo } from '../MarcoSorteo';

export const metadata = { title: 'Sala de sorteo · Mi turno' };

export default async function SalaSorteoPage({ params }: { params: Promise<{ codigo: string }> }) {
  const { codigo } = await params;
  const sesion = await auth();
  return (
    <MarcoSorteo>
      <SalaSorteo codigo={normalizarCodigo(codigo)} nombreCuenta={sesion?.user?.name || undefined} />
    </MarcoSorteo>
  );
}
