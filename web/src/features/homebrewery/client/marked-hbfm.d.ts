// marked-hbfm no trae tipos: solo se usa su render.
declare module 'marked-hbfm' {
  export const hbfm: { render: (md: string, pagina?: number) => string };
}
