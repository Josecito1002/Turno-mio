import Link from 'next/link';
import type { ReactNode } from 'react';

/* Página de inicio pública: la ve quien entra sin sesión. Con sesión, `/` abre directamente sus personajes. */

const Icono = ({ n, className = '' }: { n: string; className?: string }) => (
  <span aria-hidden="true" className={`material-symbols-outlined align-middle ${className}`}>{n}</span>
);

const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rea';
const BotonPrincipal = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className={`inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-body-lg font-bold text-on-primary transition-colors hover:bg-primary-fixed-dim ${foco}`}>{children}</Link>
);
const BotonSecundario = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className={`inline-flex min-h-13 items-center justify-center gap-2 rounded-xl px-5 text-body-lg font-semibold text-on-surface ring-1 ring-outline-variant transition-colors hover:bg-surface-container-high ${foco}`}>{children}</Link>
);

const Logo = ({ chico }: { chico?: boolean }) => (
  <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-full bg-linear-to-b from-primary-container to-on-primary-container shadow-[0_0_12px_rgba(212,175,55,0.35)] ring-1 ring-primary/40 ${chico ? 'size-6' : 'size-9'}`}>
    <Icono n="auto_stories" className={`text-surface-container-lowest ${chico ? 'text-[14px]' : 'text-[20px]'}`} />
  </span>
);

const FUNCIONES: [string, string, string][] = [
  ['person_add', 'Crea tu personaje paso a paso', 'Nueve pasos con preguntas claras: especie, clase, trasfondo… La app te dice qué falta y qué conviene a tu clase.'],
  ['casino', 'Tira desde la hoja', 'Toca un ataque, una salvación o una habilidad y los dados se tiran solos con tu bono ya sumado.'],
  ['bolt', 'Sabes qué hacer en tu turno', 'Tus opciones ordenadas por acción, acción adicional y reacción, con lo que te queda de cada recurso.'],
  ['swords', 'Mesa del DM', 'Iniciativa, daño, condiciones y salvaciones para todo el grupo. Tus jugadores se unen con un código.'],
  ['auto_stories', 'Reglas 2024 en español', 'Clases, especies, dotes, conjuros y un bestiario de más de 500 monstruos, escritos en español.'],
  ['print', 'En el teléfono o en papel', 'La misma hoja funciona en la mesa, en la PC y en papel. Se guarda sola en tu cuenta.'],
];
const PASOS: [string, string][] = [
  ['Crea tu cuenta', 'O prueba sin cuenta: tus personajes se guardan en tu navegador.'],
  ['Arma tu personaje', 'El creador te lleva paso a paso, con las reglas de 2024.'],
  ['Juega', 'Abre la hoja en la mesa, únete a la campaña de tu DM con su código y tira.'],
];
const ETIQUETA = 'm-0 text-label-caps uppercase tracking-[0.12em] text-secondary';

/** Vista de una hoja de ejemplo (decorativa) */
function HojaEjemplo() {
  const ab: [string, number, string][] = [['FUE', 17, '+3'], ['DES', 10, '+0'], ['CON', 14, '+2'], ['INT', 8, '−1'], ['SAB', 12, '+1'], ['CAR', 16, '+3']];
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[460px]">
      <div className="flex flex-col gap-3 rounded-2xl bg-surface-container p-4 shadow-[0_30px_80px_rgba(0,0,0,0.5)] ring-1 ring-surface-container-highest sm:p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-14 place-items-center rounded-lg bg-surface-container-high font-serif text-2xl font-bold text-primary ring-2 ring-primary">A</span>
          <div>
            <p className="m-0 text-label-caps uppercase tracking-wider text-secondary">Elfo</p>
            <b className="block font-serif text-headline-md text-primary">Aldric Vane</b>
            <span className="font-serif italic">Paladín 5 · Soldado</span>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-2">
          <div className="rounded-lg bg-surface-container-lowest p-2 text-center">
            <p className="m-0 text-label-caps uppercase text-outline"><Icono n="shield" className="text-body-md text-primary" /> CA</p>
            <b className="text-stat-display">18</b>
          </div>
          <div className="rounded-lg bg-surface-container-lowest px-3 py-2">
            <p className="m-0 text-label-caps uppercase text-outline"><Icono n="favorite" className="text-body-md text-error" /> Puntos de golpe</p>
            <b className="text-stat-display text-primary">38</b> <span className="text-outline">/ 44</span>
            <div className="mt-1 h-1.5 rounded-full bg-surface-container-highest"><div className="h-full w-[86%] rounded-full bg-primary" /></div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {ab.map(([a, v, m]) => (
            <div key={a} className="rounded-md bg-surface-container-lowest py-1.5 text-center">
              <p className="m-0 text-[0.6rem] font-bold text-outline">{a}</p><b className="block text-body-lg">{v}</b><b className="text-body-sm text-secondary">{m}</b>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2.5 rounded-lg bg-surface-container-lowest px-3 py-2.5">
          <span className="size-3 shrink-0 rounded-full bg-error" />
          <span className="flex-1 leading-tight"><b>Espada larga</b><br /><span className="text-body-sm text-on-surface-variant">1,5 m · Debilitar</span></span>
          <span className="rounded-md bg-surface-container-highest px-2.5 py-1.5 text-body-sm font-bold"><Icono n="casino" className="text-body-md text-primary" /> +6</span>
          <span className="rounded-md bg-surface-container-highest px-2.5 py-1.5 text-body-sm font-bold">1d8+3</span>
        </div>
      </div>
      <div className="absolute -right-2 bottom-8 hidden items-center gap-2.5 rounded-xl bg-surface-container-high px-3.5 py-2.5 shadow-2xl ring-1 ring-primary sm:flex">
        <Icono n="casino" className="text-headline-md text-primary" />
        <span className="leading-tight"><span className="text-body-sm text-on-surface-variant">Ataque con espada larga</span><br /><b className="text-headline-md">19</b> <span className="text-body-sm text-outline">(13 + 6)</span></span>
      </div>
    </div>
  );
}

export function Portada() {
  return (
    <div className="min-h-dvh bg-bg text-on-surface">
      <header className="sticky top-0 z-10 border-b border-surface-container-high bg-surface-container-lowest/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-4 px-4 sm:h-18 sm:px-8">
          <Link href="/" className={`flex items-center gap-2.5 rounded ${foco}`}><Logo /><span className="font-serif text-headline-md text-primary">Mi turno</span></Link>
          <nav aria-label="Secciones" className="hidden flex-1 gap-1 md:flex">
            {[['#que-hace', 'Qué hace'], ['#como-empezar', 'Cómo empezar'], ['#para-dms', 'Para DMs']].map(([h, t]) => (
              <a key={h} href={h} className={`rounded-lg px-3 py-2 text-on-surface-variant hover:text-on-surface ${foco}`}>{t}</a>
            ))}
          </nav>
          <span className="flex-1 md:hidden" />
          <Link href="/login" className={`inline-flex min-h-11 items-center rounded-lg px-4 font-semibold ring-1 ring-outline-variant hover:bg-surface-container-high ${foco}`}>Entrar</Link>
          <Link href="/registro" className={`hidden min-h-11 items-center rounded-lg bg-primary px-4 font-bold text-on-primary hover:bg-primary-fixed-dim sm:inline-flex ${foco}`}>Crear cuenta</Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pb-20 lg:pt-18">
          <div className="flex flex-col gap-5">
            <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-surface-container px-3 py-1 text-body-sm ring-1 ring-surface-container-highest">
              <Icono n="verified" className="text-body-lg text-pas" />Reglas de D&amp;D 2024 · en español · gratis
            </span>
            <h1 className="m-0 font-serif text-[clamp(2.75rem,8vw,4.25rem)] font-bold leading-[1.02]">Tu personaje,<br /><span className="text-primary">turno por turno.</span></h1>
            <p className="m-0 max-w-[34em] text-[1.15rem] text-on-surface-variant lg:text-xl">
              Crea tu personaje de D&amp;D paso a paso, tira los dados desde la hoja y mira en cada turno lo que puedes hacer. Tu DM lleva el combate de todo el grupo desde su mesa.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <BotonPrincipal href="/registro">Crear mi personaje <Icono n="arrow_forward" /></BotonPrincipal>
              <BotonSecundario href="/invitado"><Icono n="visibility" />Probar sin cuenta</BotonSecundario>
            </div>
            <p className="m-0 text-body-md text-outline">¿Ya tienes cuenta? <Link href="/login" className="text-secondary underline">Entrar</Link></p>
          </div>
          <HojaEjemplo />
        </section>

        <section id="que-hace" aria-labelledby="t-que" className="scroll-mt-20 border-y border-surface-container-high bg-surface-container-lowest">
          <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-8 lg:py-18">
            <p className={ETIQUETA}>Qué hace</p>
            <h2 id="t-que" className="mb-7 mt-1.5 font-serif text-[clamp(1.9rem,5vw,2.75rem)] leading-tight">Todo lo de tu hoja, sin hacer cuentas</h2>
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {FUNCIONES.map(([i, t, d]) => (
                <li key={t} className="flex flex-col gap-2 rounded-2xl bg-surface-container p-5 ring-1 ring-surface-container-highest lg:p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-surface-container-high"><Icono n={i} className="text-headline-md text-primary" /></span>
                  <h3 className="m-0 font-serif text-headline-md leading-tight">{t}</h3>
                  <p className="m-0 text-on-surface-variant">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="t-turno" className="mx-auto grid max-w-[1200px] items-center gap-8 px-4 py-14 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:py-18">
          <div>
            <p className={ETIQUETA}>En tu turno</p>
            <h2 id="t-turno" className="mb-3 mt-1.5 font-serif text-[clamp(1.9rem,5vw,2.5rem)] leading-tight">Se acabó el «¿y qué puedo hacer?»</h2>
            <p className="m-0 text-[1.05rem] text-on-surface-variant">Cada cosa que tu personaje sabe hacer sale con su forma: círculo para la acción, triángulo para la acción adicional, rombo para la reacción. Gastas una y la app la marca.</p>
          </div>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {([['size-4 rounded-full bg-error', 'Acción', 'Una por turno: atacar, lanzar un conjuro, correr.'],
              ['h-4 w-[17px] bg-primary [clip-path:polygon(50%_0,100%_100%,0_100%)]', 'Acción adicional', 'Una por turno, solo si algo la usa.'],
              ['mx-0.5 size-3.5 rotate-45 bg-secondary', 'Reacción', 'Una por ronda, incluso en el turno de otro.']] as [string, string, string][]).map(([forma, t, d]) => (
              <li key={t} className="flex items-center gap-4 rounded-2xl bg-surface-container px-5 py-4">
                <span aria-hidden="true" className={`shrink-0 ${forma}`} />
                <span><b className="text-body-lg">{t}</b><br /><span className="text-on-surface-variant">{d}</span></span>
              </li>
            ))}
          </ul>
        </section>

        <section id="para-dms" aria-labelledby="t-dm" className="mx-auto mb-14 max-w-[1200px] scroll-mt-20 px-4 sm:px-8 lg:mb-18">
          <div className="grid items-center gap-8 rounded-3xl bg-surface-container p-6 ring-1 ring-surface-container-highest sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className={ETIQUETA}>Para DMs</p>
              <h2 id="t-dm" className="mb-3 mt-1.5 font-serif text-[clamp(1.9rem,5vw,2.5rem)] leading-tight">Tu mesa, en una pantalla</h2>
              <p className="m-0 mb-5 text-[1.05rem] text-on-surface-variant">Crea una campaña, comparte el código y ves las hojas de tus jugadores al día. Llevas la iniciativa, aplicas daño y condiciones, pides salvaciones y das objetos sin parar la partida.</p>
              <BotonSecundario href="/registro"><Icono n="swords" className="text-primary" />Empezar como DM</BotonSecundario>
            </div>
            <div aria-hidden="true" className="flex flex-col gap-1.5 rounded-2xl bg-surface-container-lowest p-3.5">
              <div className="flex justify-between text-body-sm text-on-surface-variant"><b className="text-primary">Ronda 3</b><span>Código <b className="tracking-[0.15em] text-primary">K7Q2</b></span></div>
              {([[19, 'Sera Nocheluz', false, '17/17', false], [17, 'Goblin jefe', true, '14/21', true], [15, 'Aldric Vane', false, '38/44', false], [12, 'Goblin A', true, '7/7', false]] as [number, string, boolean, string, boolean][]).map(([ini, n, en, pg, turno]) => (
                <div key={n} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ${turno ? 'bg-surface-container-high ring-[1.5px] ring-primary' : 'bg-surface-container ring-1 ring-surface-container-highest'}`}>
                  <b className={`w-6 ${turno ? 'text-primary' : 'text-on-surface-variant'}`}>{ini}</b>
                  <span className="flex-1 text-body-md">{n}</span>
                  <span className={`text-[0.65rem] font-bold ${en ? 'text-error' : 'text-secondary'}`}>{en ? 'ENEMIGO' : 'JUGADOR'}</span>
                  <b className="text-body-md">{pg}</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="como-empezar" aria-labelledby="t-como" className="scroll-mt-20 border-t border-surface-container-high bg-surface-container-lowest">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-7 px-4 py-14 sm:px-8 lg:py-18">
            <div><p className={ETIQUETA}>Cómo empezar</p><h2 id="t-como" className="m-0 mt-1.5 font-serif text-[clamp(1.9rem,5vw,2.5rem)]">Listo en minutos</h2></div>
            <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
              {PASOS.map(([t, d], i) => (
                <li key={t} className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-serif text-xl font-bold text-on-primary">{i + 1}</span>
                  <span><b className="text-body-lg">{t}</b><br /><span className="text-on-surface-variant">{d}</span></span>
                </li>
              ))}
            </ol>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <BotonPrincipal href="/registro">Crear mi personaje <Icono n="arrow_forward" /></BotonPrincipal>
              <BotonSecundario href="/invitado">Probar sin cuenta</BotonSecundario>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-surface-container-high">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-4 px-4 py-6 text-body-md text-outline sm:px-8">
          <span className="flex items-center gap-2"><Logo chico /><b className="text-on-surface">Mi turno</b></span>
          <span className="flex-1">Compañero de D&amp;D 2024. Textos propios en español; no reemplaza los libros oficiales.</span>
          <Link href="/login" className="text-secondary">Entrar</Link>
          <Link href="/registro" className="text-secondary">Crear cuenta</Link>
        </div>
      </footer>
    </div>
  );
}
