'use client';
import { useState, type ImgHTMLAttributes } from 'react';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { src: string };

/* Si una imagen del servidor no llega (la base estaba ocupada), se vuelve a pedir unas veces, cada vez un poco después. */
function ImagenConReintento({ src, alt = '', ...rest }: Props) {
  const [intento, setIntento] = useState(0);
  const url = intento && src.startsWith('/api/') ? `${src}&r=${intento}` : src;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...rest} src={url} alt={alt} loading="lazy" decoding="async"
      onError={() => { if (intento < 4) setTimeout(() => setIntento(i => i + 1), 700 * 2 ** intento); }} />
  );
}

/** Imagen de la biblioteca: carga al acercarse a la pantalla y reintenta si falla. */
export function Imagen(p: Props) { return <ImagenConReintento key={p.src} {...p} />; }
