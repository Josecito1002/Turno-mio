/** Texto de las guías a HTML: lo comparten los imprimibles y las fichas de objeto. */

export const html = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Negrita y cursiva de Markdown a HTML, quitando los escapes de Homebrewery. */
export function enLinea(s: string): string {
  let t = html(s.replace(/\\([\\{}^*_[\]#>|~:.+-])/g, (_, c: string) => `\u0000${c.charCodeAt(0)}\u0000`));
  t = t.replace(/\*\*\*(.+?)\*\*\*/g, '<b><i>$1</i></b>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
  return t.replace(/\u0000(\d+)\u0000/g, (_, n: string) => html(String.fromCharCode(Number(n))));
}
