import { auth } from '@/features/cuentas/server/auth';
import { suscribirMesaSse } from '@/features/mesa/server/realtime';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const campanaId = url.searchParams.get('campanaId');
  if (!campanaId) return new Response('Falta campanaId', { status: 400 });

  const s = await auth();
  if (!s?.user?.id) return new Response('No autorizado', { status: 401 });

  let cancelar: (() => void) | null = null;
  let cerrado = false;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ tipo: 'conectado', campanaId })}\n\n`));

      cancelar = suscribirMesaSse(campanaId, evento => {
        if (cerrado) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(evento)}\n\n`));
        } catch {
          cerrado = true;
          cancelar?.();
        }
      });
    },
    cancel() {
      cerrado = true;
      cancelar?.();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
