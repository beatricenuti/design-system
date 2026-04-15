# Checklist de Pre-Merge — Ramas de Diseño Figma

> Usar **antes de mergear cualquier rama de diseño en Figma** al archivo principal.
> Asegura consistencia de nomenclatura, integridad de componentes y limpieza del archivo.

---

## Cómo ejecutarlo

### Opción A — Comando automático (Claude Code) ⭐ Recomendado

1. Abre Claude Code en la carpeta del proyecto (`cd design-system && claude`)
2. Escribe en el chat:

```
/figma-merge-check https://www.figma.com/design/TU_FILE_KEY/Nombre-del-Archivo
```

Claude ejecutará los 7 checks de forma automática e interactiva, preguntando antes de cada cambio.

---

### Opción B — Prompt manual (cualquier sesión de Claude con Figma MCP)

Copia y pega el prompt de la sección siguiente en Claude.

---

## Prompt para el equipo

> Copia todo el bloque de abajo y pégalo en Claude (requiere acceso al MCP de Figma).
> Sustituye la URL por la de tu rama.

---

```
Eres un asistente experto en sistemas de diseño Figma. Voy a hacer merge de una rama de diseño al archivo principal.

URL del archivo (rama): [PEGA AQUÍ TU URL DE FIGMA]

Por favor ejecuta estos 7 checks en orden usando las herramientas de Figma MCP.
Pídeme confirmación antes de hacer cualquier cambio en el archivo.
Al final genera un informe con todos los cambios aplicados.

NOTA: Los checks se aplican solo a frames de nivel canvas (hijos directos de la página).
El Plugin API de Figma no permite acceder a capas internas — esas hay que revisarlas manualmente.

---

CHECK 1 — 🔍 Nomenclatura de frames
Obtén el árbol de frames a nivel canvas con get_metadata.
Lista todos los frames con nombres genéricos: Frame, Rectangle, Group, Ellipse, Vector, Section
(con o sin número al final, ej: Frame 34, Group 2).
Para cada uno muestra un screenshot con get_screenshot y pregúntame cómo se llama.

CHECK 2 — ✏️ Asignar nombres y numeración
Con el nombre base que te dé, aplica el patrón NombreBase_1, NombreBase_2... a todos los frames del mismo tipo.
Si hay frames con el mismo nombre repetido, aplica también la numeración.
Muestra tabla completa y pídeme confirmación antes de renombrar con use_figma.

CHECK 3 — 📱 Prefijo MBL_ en pantallas mobile
Identifica frames con ancho exactamente 390px — estas son las pantallas mobile.
Deben tener el prefijo MBL_ antes del nombre asignado en el Check 2: MBL_NombreBase_N.
Muestra tabla y pídeme confirmación antes de renombrar con use_figma.

CHECK 4 — 👁️ Capas ocultas
Busca capas con visible === false directamente dentro de frames de canvas.
IMPORTANTE: Ignora cualquier capa cuyo node ID tenga formato I0:123;4:567 — son overrides
de componentes de librería y no deben tocarse. Solo actúa sobre IDs estándar (1234:5678).
Pídeme confirmación antes de eliminar.

CHECK 5 — 🎨 Colores fuera de librería (solo informativo)
Busca con use_figma nodos a nivel canvas con fills SOLID donde boundVariables esté vacío.
Muestra tabla: frame | capa | color hex. No hagas cambios.

CHECK 6 — 📝 Textos fuera de librería (solo informativo)
Busca con use_figma nodos TEXT a nivel canvas donde textStyleId esté vacío.
Muestra tabla: frame | texto (primeros 30 chars) | fuente local. No hagas cambios.

CHECK 7 — 📐 Frames sin auto-layout (solo informativo)
Busca con use_figma frames a nivel canvas donde layoutMode === "NONE". Excluye frames < 100px.
Muestra tabla: nombre | dimensiones. No hagas cambios.

---

Al finalizar los 7 checks, genera este informe:

INFORME FINAL — Checklist Pre-Merge Figma
Archivo: [nombre] | Fecha: [fecha]

CAMBIOS APLICADOS:
[Lista de todos los renombrados y eliminaciones realizados]

RESUMEN:
| # | Check                     | Estado        |
|---|---------------------------|---------------|
| 1 | 🔍 Nomenclatura frames    | ✅/⚠️/🔧     |
| 2 | ✏️ Nombres y numeración   | ✅/⚠️/🔧     |
| 3 | 📱 Prefijo MBL_           | ✅/⚠️/🔧     |
| 4 | 👁️ Capas ocultas         | ✅/⚠️/🔧     |
| 5 | 🎨 Colores fuera librería | ✅/⚠️ (info) |
| 6 | 📝 Textos fuera librería  | ✅/⚠️ (info) |
| 7 | 📐 Frames sin auto-layout | ✅/⚠️ (info) |

PENDIENTE REVISIÓN MANUAL EN FIGMA:
[Items de checks 5, 6 y 7 + capas internas sin nombrar]
```

---

## El checklist completo (versión manual)

Para revisión sin Claude, o como referencia del proceso:

### 1. 🔍 Nomenclatura de frames
- [ ] No hay frames con nombres genéricos a nivel canvas (`Frame 1`, `Group 2`…)
- [ ] Cada frame tiene un nombre descriptivo del contenido que muestra

### 2. ✏️ Nombres y numeración
- [ ] Los frames del mismo tipo siguen el patrón `NombreBase_1`, `NombreBase_2`…
- [ ] No hay frames con el mismo nombre sin diferenciador

### 3. 📱 Prefijo MBL_ en mobile
- [ ] Todos los frames de **390px de ancho** tienen el prefijo `MBL_`
- [ ] Formato correcto: `MBL_NombreBase_1`, `MBL_NombreBase_2`…

### 4. 👁️ Capas ocultas
- [ ] No hay capas ocultas directamente en frames (ignorar las de componentes de librería)
- [ ] Las capas ocultas identificadas han sido eliminadas o justificadas

### 5. 🎨 Colores fuera de librería
- [ ] Todos los colores usan variables o estilos de la librería (no hex directos)

### 6. 📝 Textos fuera de librería
- [ ] Todos los textos usan estilos tipográficos de la librería

### 7. 📐 Frames sin auto-layout
- [ ] Todos los frames de pantalla tienen auto-layout activado

---

## Convenciones de naming del equipo

| Tipo de pantalla | Prefijo obligatorio | Ancho    | Ejemplo                    |
|-----------------|---------------------|----------|----------------------------|
| Mobile          | `MBL_`              | 390px    | `MBL_Reserva_Ver_Detalle_1`|
| Desktop         | `DSK_`              | > 390px  | `DSK_Reservas_Listado_1`   |
| Tablet          | `TBL_`              | variable | `TBL_Home_1`               |

**Separador:** guion bajo `_`
**Numeración:** siempre al final con `_N` (ej: `_1`, `_2`, `_3`)

---

## Historial de versiones

| Versión | Fecha      | Cambios                                              |
|---------|------------|------------------------------------------------------|
| 2.0     | 2026-04-15 | 7 checks, nuevas reglas de naming, informe final     |
| 1.0     | 2026-04-15 | Versión inicial con 6 checks                         |
