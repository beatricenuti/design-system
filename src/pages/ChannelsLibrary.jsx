import React, { useState } from "react";
import { ChannelsButton } from "../components/ChannelsButton.jsx";
import "./ChannelsLibrary.css";

/**
 * Channels Library — implements design from Figma
 * "Channels library - Prueba IA" (node-id=353-798).
 * For pixel-perfect specs: open that file in Figma desktop, select the frame,
 * then ask to "implement this design from Figma" again to get get_design_context.
 */

function TopBar() {
  return (
    <header className="channels-library__topbar">
      <div className="channels-library__topbar-inner">
        <span className="channels-library__logo">Channels</span>
      </div>
    </header>
  );
}

const PLACEHOLDER_ITEMS = [
  { id: "1", title: "Canal principal", desc: "Configuración y contenido del canal por defecto.", letter: "A" },
  { id: "2", title: "Soporte", desc: "Respuestas y recursos de ayuda.", letter: "B" },
  { id: "3", title: "Marketing", desc: "Campañas y comunicaciones.", letter: "C" },
  { id: "4", title: "Interno", desc: "Uso interno del equipo.", letter: "D" },
];

export function ChannelsLibrary() {
  const [search, setSearch] = useState("");

  return (
    <div className="channels-library">
      <TopBar />
      <main className="channels-library__main">
        <div className="channels-library__header">
          <h1 className="channels-library__title">Channels library</h1>
          <p className="channels-library__subtitle">
            Gestiona y explora los canales disponibles. Selecciona un canal para ver su configuración y contenido.
          </p>
        </div>

        <div className="channels-library__toolbar">
          <input
            type="search"
            className="channels-library__search"
            placeholder="Buscar canales..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar canales"
          />
          <ChannelsButton variant="Flat" size="L" text="Nuevo canal" type="Text" />
        </div>

        <div className="channels-library__grid" role="list">
          {PLACEHOLDER_ITEMS.filter(
            (item) =>
              !search.trim() ||
              item.title.toLowerCase().includes(search.toLowerCase()) ||
              item.desc.toLowerCase().includes(search.toLowerCase())
          ).map((item) => (
            <article
              key={item.id}
              className="channels-library__card"
              role="listitem"
              onClick={() => {}}
              tabIndex={0}
            >
              <div className="channels-library__card-icon" aria-hidden>
                {item.letter}
              </div>
              <h3 className="channels-library__card-title">{item.title}</h3>
              <p className="channels-library__card-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
