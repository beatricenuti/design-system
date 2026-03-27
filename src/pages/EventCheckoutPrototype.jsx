import React, { useState } from "react";
import { Button } from "../components/Button.jsx";
import "./EventCheckoutPrototype.css";

const SECTION_TITLE_CLASS = "event-checkout__section-title";

function TopBar() {
  return (
    <header className="event-checkout__topbar">
      <div className="event-checkout__topbar-inner">
        <span className="event-checkout__topbar-logo">B2B</span>
        <nav className="event-checkout__topbar-nav">
          <span className="event-checkout__topbar-nav-item">Eventos</span>
          <span className="event-checkout__topbar-nav-item event-checkout__topbar-nav-item--active">
            Flujo de compra
          </span>
        </nav>
      </div>
    </header>
  );
}

function NavBar() {
  return (
    <aside className="event-checkout__navbar">
      <div className="event-checkout__navbar-icon" aria-hidden />
      <div className="event-checkout__navbar-icon" aria-hidden />
      <div className="event-checkout__navbar-icon" aria-hidden />
    </aside>
  );
}

function BuyerDataSection({ onAddNotesClick, showAddNotesCheckbox, addNotesChecked, onAddNotesCheckboxChange }) {
  return (
    <section className="event-checkout__seccion">
      <h2 className={SECTION_TITLE_CLASS}>Datos del comprador</h2>
      <p className="event-checkout__description">
        Completa los datos para realizar la compra. Los campos marcados con * son obligatorios.
      </p>
      <div className="event-checkout__form event-checkout__form--grid-2">
        <div className="event-checkout__form-row">
          <input type="text" className="event-checkout__input" placeholder="Nombre *" aria-label="Nombre" />
          <input type="text" className="event-checkout__input" placeholder="Apellidos *" aria-label="Apellidos" />
        </div>
        <div className="event-checkout__form-row">
          <input type="email" className="event-checkout__input" placeholder="Email *" aria-label="Email" />
          <input type="tel" className="event-checkout__input" placeholder="Teléfono *" aria-label="Teléfono" />
        </div>
      </div>
      <div className="event-checkout__add-notes-row">
        <button type="button" className="event-checkout__link-btn" onClick={onAddNotesClick}>
          Añadir notas a la compra
        </button>
        {showAddNotesCheckbox && (
          <label className="event-checkout__checkbox-wrap">
            <input
              type="checkbox"
              className="event-checkout__checkbox"
              checked={addNotesChecked}
              onChange={(e) => onAddNotesCheckboxChange(e.target.checked)}
              aria-label="Añadir notas"
            />
            <span className="event-checkout__checkbox-label">Añadir notas</span>
          </label>
        )}
      </div>
    </section>
  );
}

function EventSection() {
  return (
    <section className="event-checkout__seccion">
      <h2 className={SECTION_TITLE_CLASS}>Datos nominales</h2>
      <div className="event-checkout__event-name">
        <div className="event-checkout__event-info">
          <span className="event-checkout__event-title">Concierto Ejemplo 2025</span>
          <span className="event-checkout__event-date">Viernes 15 de marzo de 2025 · 20:00</span>
        </div>
      </div>
      <div className="event-checkout__nominals-card">
        <div className="event-checkout__nominals-header">
          <span>Nombre del asistente</span>
          <span>Cantidad</span>
        </div>
        <div className="event-checkout__nominals-row">
          <input type="text" className="event-checkout__input" placeholder="Nombre y apellidos" />
          <input type="number" className="event-checkout__input event-checkout__input--qty" min={1} defaultValue={1} />
        </div>
        <button type="button" className="event-checkout__link-btn event-checkout__link-btn--small">
          + Añadir otro asistente
        </button>
      </div>
    </section>
  );
}

function OptionCard({ title, subtitle, selected, onSelect, children }) {
  return (
    <button
      type="button"
      className={`event-checkout__option-card ${selected ? "event-checkout__option-card--selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <div className="event-checkout__option-card-content">
        <span className="event-checkout__option-card-title">{title}</span>
        {subtitle && <span className="event-checkout__option-card-subtitle">{subtitle}</span>}
        {children}
      </div>
      {selected && <span className="event-checkout__option-card-check" aria-hidden>✓</span>}
    </button>
  );
}

function DeliverySection({ selectedId, onSelect }) {
  const options = [
    { id: "recogida", title: "Recogida en taquilla", subtitle: "Gratis" },
    { id: "envio", title: "Envío a domicilio", subtitle: "4,99 €" },
  ];
  return (
    <section className="event-checkout__seccion">
      <h2 className={SECTION_TITLE_CLASS}>Métodos de entrega</h2>
      <div className="event-checkout__cards">
        {options.map((opt) => (
          <OptionCard
            key={opt.id}
            title={opt.title}
            subtitle={opt.subtitle}
            selected={selectedId === opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </section>
  );
}

function PaymentSection({ selectedId, onSelect }) {
  const options = [
    { id: "card", title: "Tarjeta de crédito/débito" },
    { id: "bizum", title: "Bizum", subtitle: "Pago instantáneo" },
  ];
  return (
    <section className="event-checkout__seccion">
      <h2 className={SECTION_TITLE_CLASS}>Métodos de pago</h2>
      <div className="event-checkout__cards">
        {options.map((opt) => (
          <OptionCard
            key={opt.id}
            title={opt.title}
            subtitle={opt.subtitle}
            selected={selectedId === opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
        <div className="event-checkout__promo-card">
          <input type="text" className="event-checkout__input" placeholder="Código promocional" />
          <Button variant="secondary" size="small">Aplicar</Button>
        </div>
      </div>
    </section>
  );
}

function SummarySidebar() {
  return (
    <aside className="event-checkout__summary">
      <h3 className="event-checkout__summary-title">Resumen</h3>
      <div className="event-checkout__summary-line">
        <span>Concierto Ejemplo 2025</span>
        <span>2 × 45,00 €</span>
      </div>
      <div className="event-checkout__summary-line">
        <span>Envío</span>
        <span>4,99 €</span>
      </div>
      <div className="event-checkout__summary-divider" />
      <div className="event-checkout__summary-total">
        <span>Total</span>
        <span>94,99 €</span>
      </div>
    </aside>
  );
}

function AddNotesDialog({ open, onClose, onConfirm, initialValues }) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [referencia, setReferencia] = useState(initialValues?.referencia ?? "");

  if (!open) return null;

  const handleConfirm = () => {
    onConfirm({ title, description, referencia });
    setTitle("");
    setDescription("");
    setReferencia("");
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className="event-checkout__overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      onClick={handleCancel}
    >
      <div className="event-checkout__dialog" onClick={(e) => e.stopPropagation()}>
        <div className="event-checkout__dialog-header">
          <h2 id="dialog-title" className="event-checkout__dialog-header-title">Añadir notas</h2>
          <button type="button" className="event-checkout__dialog-close" onClick={handleCancel} aria-label="Cerrar">
            ×
          </button>
        </div>
        <div className="event-checkout__dialog-body">
          <div className="event-checkout__dialog-field">
            <label htmlFor="note-title" className="event-checkout__dialog-label">Título</label>
            <input
              id="note-title"
              type="text"
              className="event-checkout__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Instrucciones especiales"
            />
          </div>
          <div className="event-checkout__dialog-field">
            <label htmlFor="note-desc" className="event-checkout__dialog-label">Descripción</label>
            <textarea
              id="note-desc"
              className="event-checkout__textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Añade aquí las notas para tu compra..."
            />
          </div>
          <hr className="event-checkout__dialog-hr" />
          <div className="event-checkout__dialog-field">
            <label htmlFor="note-ref" className="event-checkout__dialog-label">Referencia interna</label>
            <textarea
              id="note-ref"
              className="event-checkout__textarea event-checkout__textarea--short"
              rows={3}
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              placeholder="Solo visible para ti (ej. número de pedido interno)"
            />
          </div>
        </div>
        <div className="event-checkout__dialog-actions">
          <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
          <Button variant="primary" onClick={handleConfirm}>Guardar notas</Button>
        </div>
      </div>
    </div>
  );
}

export function EventCheckoutPrototype() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addNotesChecked, setAddNotesChecked] = useState(false);
  const [deliveryId, setDeliveryId] = useState("recogida");
  const [paymentId, setPaymentId] = useState(null);
  const [savedNotes, setSavedNotes] = useState(null);

  const handleOpenNotes = () => setDialogOpen(true);
  const handleCloseNotes = () => setDialogOpen(false);
  const handleConfirmNotes = (values) => setSavedNotes(values);
  const showAddNotesCheckbox = true;

  return (
    <div className="event-checkout">
      <TopBar />
      <div className="event-checkout__main-wrap">
        <NavBar />
        <div className="event-checkout__main">
          <div className="event-checkout__content">
            <div className="event-checkout__left">
              <BuyerDataSection
                onAddNotesClick={handleOpenNotes}
                showAddNotesCheckbox={showAddNotesCheckbox}
                addNotesChecked={addNotesChecked}
                onAddNotesCheckboxChange={setAddNotesChecked}
              />
              <EventSection />
              <DeliverySection selectedId={deliveryId} onSelect={setDeliveryId} />
              <PaymentSection selectedId={paymentId} onSelect={setPaymentId} />
              <Button variant="primary" size="large" className="event-checkout__cta">
                Continuar al pago
              </Button>
            </div>
            <SummarySidebar />
          </div>
        </div>
      </div>

      <AddNotesDialog
        open={dialogOpen}
        onClose={handleCloseNotes}
        onConfirm={handleConfirmNotes}
        initialValues={savedNotes ?? undefined}
      />
    </div>
  );
}
