export const conjuros = [
  {
    nombre: "Carga Atronadora (Thunderous Charge)",
    nivel: 2,
    escuela: "Evocación",
    tiempo: "1 acción",
    alcance: "Personal",
    componentes: "V, S",
    duracion: "Instantánea",
    clases: ["Explorador", "Hechicero", "Warden"],
    desc: `Un crujido de energía chisporrotea alrededor de tus pies mientras das un paso adelante, transformándote en un rayo de relámpago. Te lanzas en línea recta hasta 20 pies en la dirección que elijas. Si tu trayectoria te hace entrar en un espacio ocupado por una criatura u objeto sólido, rebotas en él en lugar de atravesar su espacio, y puedes elegir otra dirección para usar el movimiento restante otorgado por este conjuro. La primera vez que rebotas en una criatura durante este movimiento, esta debe hacer una tirada de salvación de Fuerza; si falla, recibe 2d6 de daño de trueno y queda derribada.

Al final de tu movimiento, un estampido repentino de energía hace que una onda sónica se propague en un cono de 15 pies en la dirección en la que viajabas por última vez, originándose frente a ti. Cada criatura dentro de esta área debe tener éxito en una tirada de salvación de Constitución o quedar ensordecida y ser empujada 10 pies lejos de ti.

**A niveles superiores:** Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, la distancia que puedes viajar aumenta en 10 pies por cada nivel de espacio por encima de 2º.`
  },
  {
    nombre: "Pozo de Toxinas (Toxin Well)",
    nivel: 4,
    escuela: "Transmutación",
    tiempo: "1 acción",
    alcance: "Toque",
    componentes: "V, S, M (un vial de veneno)",
    duracion: "1 hora",
    clases: ["Bardo", "Hechicero", "Warden", "Mago"],
    desc: `Tocas un cuerpo de agua de no más de 120 galones, haciendo que se vuelva tóxico y adquiera una neblina turbia y aceitosa a medida que lo infundes con veneno mágico durante la duración. Esta agua se puede usar por sí sola, o se puede mezclar con otros fluidos (como pociones) a partes iguales; el otro fluido conserva sus propiedades originales, y adicionalmente se vuelve venenoso de acuerdo con los efectos de este conjuro. El fluido envenenado afecta a los objetivos de las siguientes maneras:

* **Contacto:** Cuando una criatura comienza su turno con cualquier parte de su cuerpo en contacto con el agua, debe tener éxito en una tirada de salvación de Constitución o quedar envenenada durante 1 minuto.
* **Sumergir:** Si sumerges un objeto, como un arma o un trozo de tela, en este líquido, se infunde con la toxina mágica. Cualquier criatura tocada con la superficie infundida de toxina dentro de la siguiente ronda debe tener éxito en una tirada de salvación de Constitución o quedar envenenada hasta el final de su siguiente turno.
* **Beber:** Cuando una criatura bebe esta agua, inmediatamente queda envenenada y debe hacer una tirada de salvación de Constitución, recibiendo 5d6 de daño de veneno si falla, o la mitad del daño si tiene éxito.
* **Vapor:** Si se vaporizan al menos 10 galones de esta agua, como al llevarla a ebullición, el vapor perdura como una nube venenosa durante la duración. El tamaño de la nube es un cilindro de 5 pies de alto y 5 pies de radio, centrado sobre la fuente original. Cuando una criatura comienza su turno en contacto con esta nube, debe hacer una tirada de salvación de Constitución. Si falla, la criatura gasta su acción de ese turno vomitando y tambaleándose. Las criaturas que no necesitan respirar o que son inmunes al veneno tienen éxito automáticamente en esta tirada de salvación. Un viento moderado (al menos 10 millas por hora) dispersa la nube después de 4 rondas. Un viento fuerte (al menos 20 millas por hora) la dispersa después de 1 ronda.`
  }
];