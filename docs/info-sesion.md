# Info sesión: archivo para preparar una sesión en la Mesa del DM

El creador de campañas genera, al preparar cada sesión, un archivo **Info sesión N** (`.json` o `.csv`). En la app:
Mesa del DM → la campaña → pestaña Grupo → **Preparar sesión → Importar info de sesión**. Al importarlo:

- cada combate queda en su propia pestaña (Combate 1, Emboscada en el puente…) con sus enemigos;
- "Preparar este combate" pone esos enemigos en la pestaña Combate, con CA, PG e iniciativa;
- los enemigos que no están en el bestiario de la app (Manual de Monstruos 2025) se guardan en el bestiario de esa
  campaña con los datos que traiga el archivo;
- si se vuelve a importar un combate con el mismo nombre, se reemplaza.

Al final de la sesión, **Exportar → Descargar datos completos** da el estado de la campaña y de las hojas para seguir
con la siguiente.

## Cómo se busca cada enemigo

Por la clave del bestiario (`goblin-warrior`), por su nombre en inglés (`Goblin Warrior`) o por su nombre en español en
la app, sin importar mayúsculas ni acentos. Si no aparece, se crea uno propio de la campaña.

## JSON (recomendado: aguanta bloques completos)

```json
{
  "tipo": "miturno-sesion",
  "sesion": "Sesión 4: El puerto de Ilmar",
  "notas": "Resumen para el DM, ganchos, PNJ importantes…",
  "combates": [
    {
      "nombre": "Combate 1: Emboscada en el muelle",
      "notas": "Atacan desde los barriles; el capitán huye a la mitad de sus PG.",
      "enemigos": [
        { "monstruo": "Goblin Warrior", "cantidad": 4 },
        { "monstruo": "Capitán Rhaz", "cantidad": 1 }
      ]
    },
    {
      "nombre": "Combate 2: La bruja del faro",
      "enemigos": [
        { "monstruo": "Bruja del faro", "ca": 15, "pg": 82, "iniciativa": 3, "cr": "5" }
      ]
    }
  ],
  "monstruos": {
    "Capitán Rhaz": {
      "n": "Capitán Rhaz", "tam": "Mediano", "tipo": "Humanoide", "ca": 16, "pg": 45, "pgF": "7d8 + 14", "vel": "30 pies",
      "ab": { "fue": 14, "des": 16, "con": 14, "int": 11, "sab": 12, "car": 15 }, "ini": 3, "cr": "3", "xp": 700, "pb": 2,
      "sentidos": "Percepción pasiva 11", "idiomas": "Común",
      "texto": "Descripción del enemigo para el bestiario de la campaña.",
      "rasgos": [{ "n": "Mando", "t": "Sus aliados a 30 pies tienen ventaja en el primer ataque de cada combate." }],
      "acciones": [
        { "n": "Ataque múltiple", "t": "Hace dos ataques de Cimitarra." },
        { "n": "Cimitarra", "atk": 5, "alcance": "5 pies", "dano": [{ "d": "1d6+3", "tipo": "cortante" }] },
        { "n": "Pistola", "atk": 5, "alcance": "30/90 pies", "dano": [{ "d": "1d10+3", "tipo": "perforante" }] }
      ],
      "reacciones": [{ "n": "Parar", "t": "+2 a la CA contra un ataque cuerpo a cuerpo que vea." }]
    }
  }
}
```

Campos de un enemigo en `combates[].enemigos`: `monstruo` (nombre o clave, obligatorio), `cantidad` (1 si falta),
`alias` (nombre a mostrar, p. ej. "Guardia del faro"), y para uno que no está en ningún bestiario sin bloque en
`monstruos`: `ca`, `pg`, `iniciativa`, `cr`.

Campos de un bloque en `monstruos` (todos opcionales salvo `n`): `n`, `tam`, `tipo`, `ca`, `pg`, `pgF` (fórmula), `vel`,
`ab` (fue, des, con, int, sab, car), `ini`, `cr`, `xp`, `pb`, `salv` ({"des": 5}), `habs` ({"Sigilo": 6}), `sentidos`,
`idiomas`, `inmune`, `resist`, `vuln`, `condInmune`, `texto` (descripción), y listas `rasgos`, `acciones`,
`adicionales`, `reacciones`, `legendarias` con `{ n, t, atk, alcance, dano: [{ d, tipo }], cd, salv }`
(`salv` = fue/des/con/int/sab/car). Lo que tenga `atk` o `dano` se puede tirar en la app.

## CSV (para listas sencillas)

Una fila por enemigo; separado por coma o punto y coma. Columnas: `combate`, `enemigo`, `cantidad`, `ca`, `pg`,
`iniciativa`, `cr`, `notas`. Las filas con el mismo `combate` van juntas. `ca`, `pg` e `iniciativa` solo hacen falta
para enemigos que no están en el bestiario de la app. El nombre del archivo es el nombre de la sesión.

```csv
combate;enemigo;cantidad;ca;pg;iniciativa;cr;notas
Combate 1: Emboscada en el muelle;Goblin Warrior;4;;;;;
Combate 1: Emboscada en el muelle;Capitán Rhaz;1;16;45;3;3;Huye a la mitad de sus PG
Combate 2: La bruja del faro;Bruja del faro;1;15;82;3;5;
```
