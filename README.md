# Design System (React + Vite)

Documentación y componentes del design system en React, con Vite como entorno de desarrollo.

## Requisitos

- **Node.js** 18 o superior (recomendado LTS)

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre en el navegador la URL que muestre la terminal (por ejemplo `http://localhost:5173`).

Otros comandos:

```bash
npm run build    # genera la carpeta dist/ para producción
npm run preview  # sirve el build localmente
```

## Estructura del proyecto

| Ruta | Descripción |
|------|-------------|
| `src/App.jsx` | Shell: navegación lateral + vista de documentación |
| `src/components/` | Componentes del DS (`Button`, `ChannelsButton`, `ActionBar`, `ContextualAlert`, etc.) |
| `src/design-tokens/` | Definiciones de tokens (p. ej. `buttonTokens.js`) |
| `src/styles.css` | Estilos globales y variables CSS |
| `Base brand colors/*.tokens.json` | Tokens exportados desde Figma (referencia) |

## Trabajar con Figma

- Los tokens y componentes pueden alinearse con Figma (variables, nodos de componentes).
- Para sincronizar valores, actualiza `buttonTokens.js`, `styles.css` o los `.tokens.json` según tu flujo.

---

## Compartir el proyecto con otras personas (misma organización)

1. **Subir el código a un repositorio Git** (ver sección siguiente sobre GitHub).
2. Cada persona **clona** el repo en su ordenador y ejecuta `npm install` y `npm run dev`.
3. **Abrir la carpeta del proyecto en Cursor** (o VS Code): *File → Open Folder*.

No hace falta una configuración especial de Cursor: es un proyecto web estándar.

---

## Publicar y compartir en GitHub

### 1. Crear el repositorio en GitHub

1. Entra en [github.com](https://github.com) e inicia sesión (cuenta personal o de la **organización**).
2. **New repository** (botón verde o *+* → *New repository*).
3. Elige un nombre (p. ej. `design-system-react`), visibilidad **Private** si solo debe verlo tu org, y **no** marques “Add a README” si ya tienes uno local.
4. Crea el repositorio y copia la URL (HTTPS o SSH), por ejemplo:
   - `https://github.com/TU-ORG/design-system-react.git`
   - `git@github.com:TU-ORG/design-system-react.git`

### 2. Subir tu carpeta local por primera vez

En la terminal, **dentro de la carpeta del proyecto** (donde está `package.json`):

```bash
git init
git add .
git commit -m "Initial commit: design system docs"
git branch -M main
git remote add origin https://github.com/TU-ORG/TU-REPO.git
git push -u origin main
```

(Sustituye la URL por la de tu repo. Si usas SSH, usa la URL `git@github.com:...`.)

> **Nota:** Este proyecto incluye `.gitignore` para no subir `node_modules/` ni `dist/`. Cada persona ejecutará `npm install` al clonar.

### 3. Dar acceso a compañeros

- **Repo en una organización:** *Settings* del repo → *Collaborators* o gestión de equipos en la organización.
- Invita por usuario de GitHub o asigna el equipo que deba **read** o **write**.

### 4. Cómo lo bajan ellos

```bash
git clone https://github.com/TU-ORG/TU-REPO.git
cd TU-REPO
npm install
npm run dev
```

Luego abren esa carpeta en Cursor.

### Actualizar el repo después de cambios

```bash
git add .
git commit -m "Describe el cambio"
git push
```

---

## Documentación de componentes incluidos

- **Button** — variantes, tamaños y estados con tokens semánticos.
- **Channels Button** — botón de marca Channels (Flat / Stroked / Ghost, tipos con icono, estados Figma).
- **Action Bar** y **Contextual Alert** — documentación en la misma app.

Navegación lateral en la app: *Components* → elige el componente.
