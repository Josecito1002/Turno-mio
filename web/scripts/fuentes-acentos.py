"""Añade a una fuente CFF sin acentos (Nodesto) las letras del español, montadas con sus propias piezas."""
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

def caja(gs, g):
    bp = BoundsPen(gs); gs[g].draw(bp); return bp.bounds

def hacer(ruta):
    t = TTFont(ruta)
    cmap = t.getBestCmap(); gs = t.getGlyphSet()
    cff = t['CFF '].cff; top = cff.topDictIndex[0]; cs = top.CharStrings
    hmtx = t['hmtx']
    cap = t['OS/2'].sCapHeight or caja(gs, cmap[ord('H')])[3]
    xh = caja(gs, cmap[ord('x')])[3] if ord('x') in cmap else cap * 0.72
    grave = cmap[0x60]; tilde = cmap.get(0x2DC) or cmap[0x7E]; punto = cmap[0x2E]
    nuevos = {}

    def glifo(nombre, ancho, piezas):
        pen = T2CharStringPen(ancho, gs)
        for g, m in piezas:
            gs[g].draw(TransformPen(pen, m))
        nuevos[nombre] = (pen.getCharString(private=top.Private, globalSubrs=cff.GlobalSubrs), ancho)

    def acento(base, tipo, nombre):
        b = cmap[ord(base)]; w = hmtx[b][0]; x0, _, x1, y1 = caja(gs, b)
        alto = cap if base.isupper() else xh
        cx = (x0 + x1) / 2; sube = alto + 70
        piezas = [(b, (1, 0, 0, 1, 0, 0))]
        if tipo in ('acute', 'grave'):
            ax0, ay0, ax1, ay1 = caja(gs, grave); s = 0.9
            aw = (ax1 - ax0) * s
            if tipo == 'acute':  # el agudo es el grave en espejo
                piezas.append((grave, (-s, 0, 0, s, cx + aw / 2 + ax0 * s, sube - ay0 * s)))
            else:
                piezas.append((grave, (s, 0, 0, s, cx - aw / 2 - ax0 * s, sube - ay0 * s)))
        elif tipo == 'tilde':
            ax0, ay0, ax1, ay1 = caja(gs, tilde)
            s = min(0.75, (x1 - x0) * 0.8 / (ax1 - ax0)); aw = (ax1 - ax0) * s
            piezas.append((tilde, (s, 0, 0, s, cx - aw / 2 - ax0 * s, sube - ay0 * s)))
        elif tipo == 'dieresis':
            px0, py0, px1, py1 = caja(gs, punto); s = 0.85; pw = (px1 - px0) * s; sep = max(pw * 1.1, (x1 - x0) * 0.18)
            for dx in (-sep - pw / 2, sep - pw / 2):
                piezas.append((punto, (s, 0, 0, s, cx + dx - px0 * s, sube - py0 * s)))
        glifo(nombre, w, piezas)
        return nombre

    def invertido(ch, nombre):
        b = cmap[ord(ch)]; w = hmtx[b][0]; x0, y0, x1, y1 = caja(gs, b)
        # girar 180° y bajar para que cuelgue por debajo de la línea, como en la imprenta
        glifo(nombre, w, [(b, (-1, 0, 0, -1, x0 + x1, y1 - (y1 - y0) * 0.25))])

    letras = {}
    for base, tipo, cps in [('A', 'acute', 0xC1), ('E', 'acute', 0xC9), ('I', 'acute', 0xCD), ('O', 'acute', 0xD3),
                            ('U', 'acute', 0xDA), ('N', 'tilde', 0xD1), ('U', 'dieresis', 0xDC),
                            ('a', 'acute', 0xE1), ('e', 'acute', 0xE9), ('i', 'acute', 0xED), ('o', 'acute', 0xF3),
                            ('u', 'acute', 0xFA), ('n', 'tilde', 0xF1), ('u', 'dieresis', 0xFC)]:
        if cps in cmap or ord(base) not in cmap: continue
        letras[cps] = acento(base, tipo, f'es_{cps:04X}')
    for ch, cps in [('!', 0xA1), ('?', 0xBF)]:
        if cps not in cmap and ord(ch) in cmap:
            invertido(ch, f'es_{cps:04X}'); letras[cps] = f'es_{cps:04X}'

    orden = t.getGlyphOrder()
    for nombre, (cstr, w) in nuevos.items():
        cs.charStringsIndex.append(cstr); cs.charStrings[nombre] = len(cs.charStringsIndex) - 1
        top.charset.append(nombre); orden.append(nombre); hmtx[nombre] = (w, 0)
    t.setGlyphOrder(orden)
    t['maxp'].numGlyphs = len(orden)
    for tabla in t['cmap'].tables:
        if tabla.isUnicode():
            tabla.cmap.update(letras)
    t.save(ruta)
    print(ruta, len(letras), 'letras nuevas')

for r in sys.argv[1:]:
    hacer(r)
