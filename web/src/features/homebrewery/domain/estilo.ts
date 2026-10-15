/** Retoques de «El Precio de los Deseos» sobre el tema 5e PHB: van en la pestaña de estilo de cada guía. */
export const ESTILO_GUIA = `
/* El Precio de los Deseos: retoques sobre el tema 5e PHB para que se parezca a una aventura oficial
   (colores y cajas sacados de «Misterios de Candlekeep») */
.page { --HB_Color_Accent: #dbe5e0; } /* filas alternas de las tablas: gris verdoso, como en el libro */
.page .deck { font-style: italic; color: #5d4a32; font-size: 0.37cm; margin: 0 0 0.25cm; }
.page .deck p { line-height: 1.25em; }
.page .meta p { font-style: italic; color: #6a5741; font-size: 0.31cm; text-indent: 0; margin: 0.08cm 0; }
/* recuadros laterales: fondo crema tostado con las barras negras del tema; título en versalitas negras */
.page .note { background-color: #ead6bb; }
.page .lbl { display: block; font-family: 'ScalySansRemake'; font-size: 0.24cm; letter-spacing: 0.08em;
  text-transform: uppercase; color: #6b5a45; margin-bottom: 0.02cm; }
.page .lbl + h5 { margin-top: 0; }
.page .note h5 { font-family: 'ScalySansSmallCapsRemake'; font-size: 0.36cm; color: #000; letter-spacing: 0.02em; }
.page .note h6, .page .descriptive h6 { font-size: 0.3cm; margin: 0.15cm 0 0.05cm; }
.page .note table, .page .descriptive table { margin: 0.1cm 0; }
/* texto para leer en voz alta: caja malva con dos líneas finas a los lados, letra de palo y sin cursiva */
.page .descriptive { border: 0; border-image: none; box-shadow: none; font-family: 'ScalySansRemake'; }
.page .descriptive.leer { background-color: #ddcbd0; padding: 0.18cm 0.3cm; margin-left: 0.08cm; margin-right: 0.08cm;
  border-left: 1px solid #3b2b2e; border-right: 1px solid #3b2b2e; }
.page .descriptive.leer p { font-style: normal; line-height: 1.35em; }
.page .descriptive.leer em { font-style: normal; } /* el extractor marca todo el recuadro en cursiva; en el libro va recto */
.page .descriptive h5 { font-family: 'ScalySansSmallCapsRemake'; font-size: 0.34cm; color: #3b2b2e; margin-bottom: 0.06cm; }
/* documentos para entregar: papel con línea de corte */
.page .descriptive.entregar { background-color: #f2ead6; border: 1px dashed rgba(88,24,13,.55); padding: 0.2cm 0.3cm;
  font-family: 'BookInsanityRemake'; }
.page .descriptive.entregar p { line-height: 1.3em; }
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
`;
