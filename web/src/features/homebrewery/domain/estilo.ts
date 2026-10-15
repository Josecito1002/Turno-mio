/** Retoques de «El Precio de los Deseos» sobre el tema 5e PHB: van en la pestaña de estilo de cada guía. */
export const ESTILO_GUIA = `
/* El Precio de los Deseos: retoques sobre el tema 5e PHB */
.page .deck { font-style: italic; color: #5d4a32; font-size: 0.37cm; margin: 0 0 0.25cm; }
.page .deck p { line-height: 1.25em; }
.page .meta p { font-style: italic; color: #6a5741; font-size: 0.31cm; text-indent: 0; margin: 0.08cm 0; }
.page .lbl { display: block; font-family: 'ScalySansSmallCapsRemake'; font-size: 0.27cm;
  letter-spacing: 0.06em; color: var(--rule, #58180D); margin-bottom: 0.05cm; }
.page .lbl + h5 { margin-top: 0; }
.page .note h6, .page .descriptive h6 { font-size: 0.3cm; margin: 0.15cm 0 0.05cm; }
.page .note table, .page .descriptive table { margin: 0.1cm 0; }
/* recuadros con el color de cada tipo, como en el PDF */
/* todos los recuadros con el verde de nota del manual; el tipo se distingue por el color de la etiqueta y el título */
.page .note { background-color: var(--HB_Color_Accent); }
.page .note.talk  { --tint: #e6ddcb; --rule: #7a5a34; }
.page .note.dm    { --tint: #dbe2ea; --rule: #3f5f86; }
.page .note.tip   { --tint: #dde7d5; --rule: #4c7340; }
.page .note.clue  { --tint: #e3d9e8; --rule: #6b4380; }
.page .note.rule  { --tint: #ecdcd6; --rule: #8d3a28; }
.page .note.opt   { --tint: #e4dfd2; --rule: #6d6455; }
.page .note.warn  { --tint: #f0dcc4; --rule: #a25a17; }
.page .note.todo  { --tint: #e6e1d4; --rule: #6d6455; }
.page .note.tac   { --tint: #d9e3df; --rule: #2f6b66; }
.page .note.trama { --tint: #e8e0cf; --rule: #58180D; }
.page .note.otro  { --tint: #e8e2d2; --rule: #58180D; }
.page .note h5 { color: var(--rule); }
.page .descriptive.entregar { background-color: #f6efdc; }
.page .descriptive p + p { text-indent: 0; margin-top: 0.12cm; }
/* dibujos */
.page .fig { text-align: center; margin: 0.15cm 0 0.25cm; }
.page .fig p { text-indent: 0; margin: 0; }
.page .fig img { position: relative; z-index: 0; mix-blend-mode: multiply; }
.page .fig .cap { display: block; font-family: 'ScalySansRemake'; font-style: italic;
  font-size: 0.29cm; color: var(--HB_Color_CaptionText); margin-top: 0.08cm; line-height: 1.2em; }
.page .wide.fig img { max-height: 13cm; width: auto !important; max-width: 100%; }
.page .fig.incol img { max-height: 6.5cm; width: auto !important; max-width: 70%; }
.page tr { break-inside: avoid; }
/* recuadros de leer y de entregar como en las guías en PDF (no el blanco del tema) */
.page .descriptive { font-family: 'BookInsanityRemake'; font-size: 0.34cm; border: 0; border-image: none; box-shadow: none; }
.page .descriptive.leer { background-color: #e9dfc4; border-left: 3px solid #8a6a2f; padding: 0.2cm 0.3cm;
  box-shadow: inset 0 0 0 1px rgba(60,35,15,.22); }
.page .descriptive.leer p { font-style: italic; line-height: 1.3em; }
.page .descriptive.entregar { background-color: #f2ead6; border: 1px dashed rgba(88,24,13,.55); padding: 0.2cm 0.3cm; }
.page .descriptive.entregar p { line-height: 1.3em; }
.page .descriptive h5 { font-family: 'MrEavesRemake'; color: #58180D; font-size: 0.42cm; margin-bottom: 0.08cm; }
.page .descriptive .lbl { color: #8a6a2f; }
`;
