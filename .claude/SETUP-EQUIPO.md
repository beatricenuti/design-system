# Setup — Checklist de Pre-Merge Figma
Guía de configuración para el equipo. Solo hay que hacerlo **una vez**.

---

## Paso 1 — Instalar Claude Code

Si ya lo tienes instalado, salta al Paso 2.

1. Ve a [claude.ai/download](https://claude.ai/download) o instálalo desde la terminal:
```bash
npm install -g @anthropic-ai/claude-code
```
2. Inicia sesión con tu cuenta de Anthropic/Claude.

---

## Paso 2 — Clonar el repositorio

Abre una terminal y ejecuta:

```bash
git clone https://github.com/beatricenuti/design-system.git
cd design-system
```

Si ya tienes el repositorio clonado, asegúrate de tener la última versión:

```bash
git pull origin main
```

Verifica que tienes la carpeta `.claude/commands/` con el comando del checklist:
```bash
ls .claude/commands/
# Deberías ver: figma-merge-check.md
```

---

## Paso 3 — Configurar el MCP de Figma

El comando necesita acceder a Figma. Para eso hay que conectar el MCP de Figma a Claude Code.

### 3a — Obtener tu token de Figma

1. Abre Figma en el navegador
2. Ve a tu avatar (arriba a la derecha) → **Ajustes de cuenta**
3. Baja hasta la sección **Access tokens**
4. Haz clic en **Generate new token**
5. Dale un nombre (ej: `claude-code`) y cópialo — **solo se muestra una vez**

### 3b — Añadir el MCP a Claude Code

Abre o crea el archivo `~/.claude/settings.json` en tu máquina y añade lo siguiente:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@figma/mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "pega-aquí-tu-token-de-figma"
      }
    }
  }
}
```

> Si el archivo ya existe y tiene contenido, añade solo el bloque `"figma": { ... }` dentro de `"mcpServers"`.

### 3c — Verificar que funciona

Abre Claude Code en la carpeta del proyecto:
```bash
claude
```

Escribe en el chat:
```
/mcp
```
Deberías ver `figma` en la lista de servidores conectados con estado ✅.

---

## Paso 4 — Abrir Claude Code SIEMPRE desde la carpeta del proyecto

⚠️ **Este paso es crítico.** El comando `/figma-merge-check` solo funciona si Claude Code se abre desde la carpeta raíz del repositorio.

Cada vez que quieras usar el checklist:

```bash
# 1. Navega a la carpeta del proyecto
cd design-system

# 2. Verifica que el comando existe (deberías ver figma-merge-check.md)
ls .claude/commands/

# 3. Abre Claude Code desde aquí
claude
```

Una vez dentro de Claude Code, escribe:

```
/figma-merge-check https://www.figma.com/design/TU_FILE_KEY/Nombre-del-Archivo
```

Claude ejecutará los 6 checks automáticamente y te pedirá confirmación antes de cada cambio.

---

## Referencia rápida

| Qué | Dónde |
|-----|-------|
| Comando del checklist | `.claude/commands/figma-merge-check.md` |
| Prompt manual (sin Claude Code) | `.claude/figma-merge-prompt.md` |
| Token de Figma | figma.com → Ajustes de cuenta → Access tokens |
| Config MCP | `~/.claude/settings.json` |

---

## Problemas frecuentes

**"Unknown skill: figma-merge-check"**
→ Estás abriendo Claude Code desde la carpeta incorrecta. Cierra Claude Code y vuelve a abrirlo así:
```bash
cd design-system
claude
```

**"El comando /figma-merge-check no aparece en el autocompletado"**
→ Mismo problema: abre Claude Code desde la carpeta `design-system`. Comprueba primero:
```bash
ls .claude/commands/
# Tiene que aparecer: figma-merge-check.md
```
Si no aparece el archivo, haz `git pull origin main` para descargarlo.

**"Error: Figma MCP not connected"**
→ Revisa que el token en `~/.claude/settings.json` es correcto y no tiene espacios extra

**"Permission denied al clonar"**
→ Pide acceso al repositorio a Bea (beatricenuti)
