'use client';
/* Lo que se ve girar en el centro de la sala: la ruleta, la moneda y los dados. Cada uno recibe la tirada y si debe
   animarse (la tirada acaba de llegar) o mostrarse quieta (ya estaba al entrar). */
import { useEffect, useState } from 'react';
import { Dado } from '@/features/dados/components/Bandeja';
import { cx } from '@/shared/ui/kit';
import type { Tirada } from '../domain/sorteo';

export const DURACION = { dados: 900, moneda: 1700, ruleta: 4200 } as const;
const COLORES = ['var(--adi)', 'var(--rea)', 'var(--acc)', 'var(--pas)', 'var(--gol)', 'var(--warn)'];
const mod360 = (x: number) => ((x % 360) + 360) % 360;
/** Desde el giro actual, el siguiente que termina en `destino` (grados) tras dar varias vueltas completas. */
const siguienteGiro = (actual: number, destino: number, vueltas: number) => actual - mod360(actual) + 360 * vueltas + mod360(destino);

const punto = (ang: number, r: number) => [100 + r * Math.sin((ang * Math.PI) / 180), 100 - r * Math.cos((ang * Math.PI) / 180)];

export function Ruleta({ opciones, ganador, id, animar }: { opciones: string[]; ganador: number | null; id: string; animar: boolean }) {
  const n = Math.max(opciones.length, 1), a = 360 / n;
  const destino = ganador == null ? 0 : -(ganador * a + a / 2);
  const [giro, setGiro] = useState(destino);
  const [suave, setSuave] = useState(false);
  useEffect(() => {
    // Se ajusta al cambiar la tirada: con giro largo si acaba de llegar, de golpe si ya estaba
    /* eslint-disable react-hooks/set-state-in-effect */
    setSuave(animar);
    setGiro(g => (animar ? siguienteGiro(g, destino, 6) : destino));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  const letra = n > 24 ? 6 : n > 14 ? 8 : n > 8 ? 10 : 12;
  const largo = n > 14 ? 14 : 18;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
      <svg viewBox="0 0 200 200" className="size-full" aria-hidden="true">
        <g style={{ transform: `rotate(${giro}deg)`, transformOrigin: '100px 100px',
          transition: suave ? `transform ${DURACION.ruleta}ms cubic-bezier(.12,.6,.1,1)` : 'none' }}>
          {opciones.map((op, i) => {
            const [x0, y0] = punto(i * a, 96), [x1, y1] = punto((i + 1) * a, 96);
            const sale = !animar && ganador === i;
            return (
              <g key={i}>
                <path d={`M100 100 L${x0} ${y0} A96 96 0 ${a > 180 ? 1 : 0} 1 ${x1} ${y1} Z`}
                  fill={COLORES[i % COLORES.length]} fillOpacity={ganador != null && !animar && !sale ? 0.45 : 1}
                  stroke="var(--bg)" strokeWidth="1.5" />
                <g transform={`rotate(${i * a + a / 2 - 90} 100 100)`}>
                  <text x="114" y="100" dominantBaseline="middle" fill="var(--bg)" fontWeight="800" fontSize={letra}>
                    {op.length > largo ? op.slice(0, largo - 1) + '…' : op}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
        <circle cx="100" cy="100" r="11" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2" />
        {/* La flecha de arriba marca lo que sale */}
        <path d="M92 0 L108 0 L100 16 Z" fill="var(--ink)" stroke="var(--bg)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function Moneda({ cara, id, animar }: { cara: boolean; id: string; animar: boolean }) {
  const destino = cara ? 0 : 180;
  const [giro, setGiro] = useState(destino);
  const [suave, setSuave] = useState(false);
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setSuave(animar);
    setGiro(g => (animar ? siguienteGiro(g, destino, 6) : destino));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  const cara3d = 'absolute inset-0 grid place-items-center rounded-full border-4 border-ink font-serif text-3xl font-extrabold text-bg [backface-visibility:hidden]';
  return (
    <div className="mx-auto size-44 [perspective:800px]" aria-hidden="true">
      <div className={cx('relative size-full [transform-style:preserve-3d]', animar && 'motion-safe:animate-[moneda-salta_1.7s_ease-out]')}
        style={{ transform: `rotateY(${giro}deg)`, transition: suave ? `transform ${DURACION.moneda}ms cubic-bezier(.2,.7,.2,1)` : 'none' }}>
        <div className={cx(cara3d, 'bg-adi')}><span className="flex flex-col items-center"><span className="material-symbols-outlined text-5xl">sunny</span>Cara</span></div>
        <div className={cx(cara3d, 'bg-rea [transform:rotateY(180deg)]')}><span className="flex flex-col items-center"><span className="material-symbols-outlined text-5xl">close</span>Cruz</span></div>
      </div>
    </div>
  );
}

export function Dados({ t, animar }: { t: Tirada; animar: boolean }) {
  const muchos = (t.grupos || []).reduce((s, g) => s + g.vals.length, 0) > 8;
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {(t.grupos || []).flatMap((g, gi) => g.vals.map((v, i) => (
        <span key={`${t.id}-${gi}-${i}`} className={cx('inline-flex', g.s < 0 && 'opacity-70')}>
          <Dado sides={g.d} valor={v} cls={cx(g.d === 20 ? 'd20' : 'neu', muchos && 'sm', animar && 'rolling')} />
        </span>
      )))}
      {!!t.fijo && <span className="font-serif text-3xl font-extrabold text-muted">{t.fijo > 0 ? '+' : '−'}{Math.abs(t.fijo)}</span>}
    </div>
  );
}
