# Checklist de Pre-Merge — Ramas de Diseño Figma

> Usar **antes de mergear cualquier rama de diseño en Figma** al archivo principal.
> Asegura consistencia de nomenclatura, integridad de componentes y limpieza del archivo.

---

## Cómo ejecutarlo

### Opción A — Comando automático (Claude Code) ⭐ Recomendado

1. Abre Claude Code en la carpeta del proyecto
2. Escribe en el chat:

```
/figma-merge-check https://www.figma.com/design/TU_FILE_KEY/Nombre-del-Archivo
```

Claude ejecutará los 6 checks de forma automática e interactiva, preguntando antes de cada cambio.

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

Por favor ejecuta estos 6 checks en orden usando las herramientas de Figma MCP. Para cada check muestra ✅ PASA o ⚠️ SE ENCONTRARON PROBLEMAS, y pídeme confirmación antes de hacer cualquier cambio en el archivo.

---

CHECK 1 — 🔄 Actualizar librería principal
Usa get_metadata y get_variable_defs para verificar si hay actualizaciones de librería pendientes.
Compara los componentId del árbol con los componentes de la librería publicada.
Si hay discrepancias, indícame los pasos manuales para actualizar (la API no lo permite automáticamente).

CHECK 2 — 📱 Nomenclatura mobile (MBL_)
Usa get_design_context para obtener el árbol de capas.
Identifica todos los frames con ancho ≤ 430px que NO tengan el prefijo MBL_.
Muestra tabla: nombre actual | dimensiones | nombre correcto.
Pídeme permiso antes de renombrar.

CHECK 3 — 🏷️ Capas sin nombrar
Recorre el árbol completo buscando capas con nombres genéricos de Figma:
Frame, Rectangle, Group, Ellipse, Vector, Line, Polygon, Star, Text, Image, Component, Instance
(incluyendo variantes con número: Frame 1, Rectangle 3, etc.)
Para cada una propón un nombre descriptivo en snake_case según su contexto.
Muestra tabla y ofrece opciones: renombrar todas / una por una / omitir.

CHECK 4 — 👁️ Capas ocultas
Lista TODAS las capas donde visible === false en cualquier nivel de profundidad.
Muestra tabla: nombre | tipo | frame padre.
Pídeme cómo proceder: eliminar todas / preguntar una por una / conservar todas.

CHECK 5 — 🖼️ Nombres de frames descriptivos
Revisa los frames principales y detecta:
- Nombres genéricos o temporales: "Pantalla 1", "Screen", "WIP", "Draft", "Test", "Copy of", "Sin título"
- Inconsistencias entre nombre y contenido (ej: frame "checkout" con texto "Gracias por tu compra")
Usa get_screenshot si necesitas confirmar visualmente algún frame.
Muestra tabla: nombre actual | problema detectado | nombre sugerido.
Pídeme permiso antes de renombrar.

CHECK 6 — 🔗 Componentes con detach (solo informativo)
Usa search_design_system para identificar instancias de componentes.
Detecta los que tienen mainComponent === null o referencian un nodo local en lugar de la librería.
Muestra tabla: nombre en archivo | frame padre | componente original estimado.
No realices cambios en este check, es solo para mi conocimiento.

---

Al finalizar los 6 checks, muestra una tabla resumen con el estado de cada uno:
✅ PASA | ⚠️ ISSUES SIN RESOLVER | 🔧 CORREGIDO
```

---

## El checklist completo (versión manual)

Para revisión sin Claude, o como referencia del proceso:

### 1. 🔄 Actualizar librería principal
- [ ] No hay actualizaciones de librería pendientes
- [ ] Si las hay: aplicadas desde Figma → Menú → Bibliotecas → Actualizar todo

### 2. 📱 Nomenclatura mobile (MBL_)
- [ ] Todas las pantallas mobile (ancho ≤ 430px) tienen el prefijo `MBL_`
- [ ] Ejemplos correctos: `MBL_Login`, `MBL_Home`, `MBL_Checkout_Paso1`

### 3. 🏷️ Capas sin nombrar
- [ ] No hay capas con nombres genéricos de Figma (`Frame`, `Rectangle`, `Group`…)
- [ ] Cada capa tiene un nombre descriptivo en snake_case

### 4. 👁️ Capas ocultas
- [ ] Revisadas todas las capas ocultas del archivo
- [ ] Capas ocultas innecesarias: eliminadas
- [ ] Capas ocultas a conservar: justificadas o documentadas

### 5. 🖼️ Nombres de frames descriptivos
- [ ] Ningún frame con nombre genérico o temporal (`WIP`, `Draft`, `Pantalla 1`…)
- [ ] El nombre de cada frame refleja fielmente su contenido real

### 6. 🔗 Componentes con detach
- [ ] Listados todos los componentes desvinculados de la librería
- [ ] Cada detach tiene justificación o ha sido re-vinculado al componente original

---

## Convenciones de naming del equipo

| Tipo de pantalla | Prefijo obligatorio | Ejemplo               |
|-----------------|---------------------|-----------------------|
| Mobile          | `MBL_`              | `MBL_Login`           |
| Desktop         | `DSK_`              | `DSK_Dashboard`       |
| Tablet          | `TBL_`              | `TBL_Home`            |
| Prototipo       | `PROTO_`            | `PROTO_Flujo_Pago`    |
| Componente      | (nombre del DS)     | `Button/Primary`      |

**Separador de palabras:** guion bajo `_`
**Capitalización:** PascalCase para pantallas (`MBL_LoginScreen`), snake_case para capas internas (`bg_header_login`)

---

## Historial de versiones

| Versión | Fecha      | Cambios                        |
|---------|------------|--------------------------------|
| 1.0     | 2026-04-15 | Versión inicial con 6 checks   |
