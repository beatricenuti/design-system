// Design System Component Registry
// Status: stable | beta | wip | deprecated

export const STATUSES = {
  stable:     { label: 'Stable',     color: '#517c00', bg: '#f2fbce', dot: '#9ec84f' },
  beta:       { label: 'Beta',       color: '#007796', bg: '#cafcf8', dot: '#36aac8' },
  wip:        { label: 'WIP',        color: '#b15000', bg: '#ffefd1', dot: '#ffa55a' },
  deprecated: { label: 'Deprecated', color: '#ce001b', bg: '#ffe4dc', dot: '#ff5b71' },
  new:        { label: 'New',        color: '#5b21b6', bg: '#f3f0ff', dot: '#a78bfa' },
};

export const CATEGORIES = [
  {
    id: 'foundation',
    label: 'Fundación',
    icon: '◈',
    items: [
      { id: 'spacing',    name: 'Spacing & Base Unit', status: 'stable', figmaPage: '⚙️ Base Unit / Spacing', tokens: true,  description: 'Sistema de espaciado en base 4px.' },
      { id: 'grid',       name: 'Grid & Layouts',      status: 'stable', figmaPage: '📐 Grid / Layouts',       tokens: false, description: 'Columnas, márgenes y breakpoints.' },
      { id: 'typography', name: 'Typography',           status: 'stable', figmaPage: 'ℳ Typography',            tokens: true,  description: 'Escala tipográfica y estilos de texto.' },
      { id: 'ui-basics',  name: 'UI Basics',            status: 'stable', figmaPage: '🍄 UI Basics',            tokens: true,  description: 'Colores, radio, sombras y opacidad.' },
      { id: 'iconography',name: 'Iconografía',          status: 'stable', figmaPage: '❇️ Iconografía',          tokens: false, description: 'Set de iconos y guidelines de uso.' },
      { id: 'a11y',       name: 'Accesibilidad',        status: 'beta',   figmaPage: '♿️ Accesibilidad',       tokens: false, description: 'Criterios WCAG y patrones inclusivos.' },
    ],
  },
  {
    id: 'actions',
    label: 'Acciones',
    icon: '◉',
    items: [
      { id: 'button',        name: 'Button',           status: 'stable', figmaPage: 'Buttons',  variants: 288, description: 'Botón principal con todos sus estados y variantes.' },
      { id: 'icon-oval',     name: 'Icon Oval Button', status: 'stable', figmaPage: 'Buttons',  variants: 36,  description: 'Botón de icono con forma ovalada.' },
      { id: 'icon-ghost',    name: 'Icon Ghost Button',status: 'stable', figmaPage: 'Buttons',  variants: 24,  description: 'Botón de icono sin fondo.' },
      { id: 'link-button',   name: 'Link Button',      status: 'stable', figmaPage: 'Buttons',  variants: 9,   description: 'Botón de texto con comportamiento de enlace.' },
      { id: 'toggle-button', name: 'Toggle Button',    status: 'stable', figmaPage: 'Buttons',  variants: 24,  description: 'Botón con estado activo/inactivo.' },
      { id: 'round-button',  name: 'Round Button',     status: 'beta',   figmaPage: 'Buttons',  variants: 6,   description: 'Botón circular para acciones flotantes.' },
      { id: 'wallet-button', name: 'Wallet Button',    status: 'beta',   figmaPage: 'Buttons',  variants: 4,   description: 'Botón específico para wallet/pago.' },
      { id: 'social-login',  name: 'Social Login',     status: 'beta',   figmaPage: 'Buttons',  variants: 3,   description: 'Botones de login social (Google, Apple…).' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navegación',
    icon: '⊞',
    items: [
      { id: 'navigation', name: 'Navigation',  status: 'stable', figmaPage: 'Navigation',  description: 'Barra de navegación principal.' },
      { id: 'action-bar', name: 'Action Bar',  status: 'stable', figmaPage: 'Action Bar',  description: 'Barra de acciones secundarias con breadcrumb.' },
      { id: 'tabs',       name: 'Tabs',        status: 'stable', figmaPage: 'Tabs',         description: 'Pestañas de navegación horizontal.' },
      { id: 'paginator',  name: 'Paginator',   status: 'stable', figmaPage: 'Paginator',    description: 'Paginación de listas y tablas.' },
      { id: 'stepper',    name: 'Stepper',     status: 'beta',   figmaPage: 'Stepper',      description: 'Indicador de pasos en flujos largos.' },
    ],
  },
  {
    id: 'forms',
    label: 'Formularios',
    icon: '▦',
    items: [
      { id: 'forms',    name: 'Forms',    status: 'stable', figmaPage: 'Forms',    description: 'Inputs, labels, helpers y validaciones.' },
      { id: 'dropdown', name: 'Dropdown', status: 'stable', figmaPage: 'Dropdown', description: 'Selector desplegable.' },
      { id: 'filter',   name: 'Filter',   status: 'beta',   figmaPage: 'Filter',   description: 'Chips de filtro para listas y catálogos.' },
      { id: 'search',   name: 'Search',   status: 'beta',   figmaPage: 'Search',   description: 'Campo de búsqueda con sugerencias.' },
      { id: 'switch',   name: 'Switch',   status: 'stable', figmaPage: 'Switch',   description: 'Interruptor on/off.' },
      { id: 'toggles',  name: 'Toggles',  status: 'stable', figmaPage: 'Toogles',  description: 'Toggle de selección múltiple.' },
      { id: 'select-sessions', name: 'Select Sessions', status: 'wip', figmaPage: 'Select Sessions', description: 'Selector de sesiones de evento.' },
      { id: 'seat',     name: 'Seat',     status: 'wip',    figmaPage: 'Seat',     description: 'Selector de asiento en plano de sala.' },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: '◎',
    items: [
      { id: 'alerts',        name: 'Alerts',        status: 'stable', figmaPage: 'Alerts',        description: 'Alertas contextuales info, warning, error, success.' },
      { id: 'tooltip',       name: 'Tooltip',       status: 'stable', figmaPage: 'Tooltip',        description: 'Texto de ayuda flotante sobre un elemento.' },
      { id: 'banner',        name: 'Banner',        status: 'beta',   figmaPage: 'Banner',         description: 'Banners de comunicación global.' },
      { id: 'popover',       name: 'Pop Over',      status: 'beta',   figmaPage: 'Pop over',       description: 'Contenido flotante anclado a un elemento.' },
      { id: 'rating',        name: 'Rating Module', status: 'beta',   figmaPage: 'Rating module',  description: 'Módulo de valoración por estrellas.' },
      { id: 'empty-state',   name: 'Empty State',   status: 'beta',   figmaPage: 'Empty state',    description: 'Estado vacío para listas y secciones.' },
    ],
  },
  {
    id: 'overlay',
    label: 'Overlays',
    icon: '◰',
    items: [
      { id: 'dialogs',    name: 'Dialogs',    status: 'stable', figmaPage: 'Dialogs',    description: 'Modal de confirmación y contenido.' },
      { id: 'side-panel', name: 'Side Panel', status: 'beta',   figmaPage: 'Side panel', description: 'Panel lateral deslizable.' },
      { id: 'expansion',  name: 'Expansion',  status: 'beta',   figmaPage: 'Expansion',  description: 'Acordeón expandible.' },
    ],
  },
  {
    id: 'display',
    label: 'Visualización',
    icon: '▣',
    items: [
      { id: 'tags',       name: 'Tags',        status: 'stable', figmaPage: 'Tags',       description: 'Etiquetas y chips de categoría.' },
      { id: 'bars',       name: 'Bars',        status: 'beta',   figmaPage: 'Bars',       description: 'Barras de progreso y carga.' },
      { id: 'table',      name: 'Table',       status: 'beta',   figmaPage: 'Table',      description: 'Tabla de datos con ordenación.' },
      { id: 'view-list',  name: 'View List',   status: 'beta',   figmaPage: 'View List',  description: 'Listado de ítems con layout flexible.' },
      { id: 'titles',     name: 'Titles',      status: 'stable', figmaPage: 'Titles',     description: 'Cabeceras de sección con jerarquía.' },
      { id: 'summary',    name: 'Summary',     status: 'wip',    figmaPage: 'Summary',    description: 'Resumen de pedido/compra.' },
      { id: 'gift-card',  name: 'Gift Card',   status: 'wip',    figmaPage: 'Gift card',  description: 'Visualización de tarjeta regalo.' },
      { id: 'login',      name: 'Login',       status: 'wip',    figmaPage: 'Login',      description: 'Pantalla de autenticación.' },
    ],
  },
  {
    id: 'cards',
    label: 'Cards',
    icon: '▭',
    items: [
      { id: 'card-event',        name: 'Card Event',              status: 'stable', figmaPage: 'Card - Event',                                              description: 'Tarjeta de evento con imagen y metadatos.' },
      { id: 'card-ticket',       name: 'Card Ticket',             status: 'stable', figmaPage: 'Card - Ticket / Product Ticket / Location & Session',        description: 'Ticket de entrada con QR y detalles.' },
      { id: 'card-select-seat',  name: 'Card Select Seat',        status: 'beta',   figmaPage: 'Card - Select Seat',                                        description: 'Selección de asiento en el proceso de compra.' },
      { id: 'card-session',      name: 'Card Session',            status: 'beta',   figmaPage: 'Card - Session / Abono / Pack info',                        description: 'Tarjeta de sesión, abono o pack de entradas.' },
      { id: 'card-product',      name: 'Card Product',            status: 'beta',   figmaPage: 'Card - Product',                                            description: 'Tarjeta de producto en catálogo.' },
      { id: 'card-promotions',   name: 'Card Promotions',         status: 'beta',   figmaPage: 'Card - Promotions',                                         description: 'Tarjeta de promoción o descuento.' },
      { id: 'card-nominals',     name: 'Card Nominals',           status: 'wip',    figmaPage: 'Card - Nominals',                                           description: 'Tarjeta de nominales de entrada.' },
      { id: 'card-select-option',name: 'Card Select Option',      status: 'wip',    figmaPage: 'Card - Select option',                                      description: 'Tarjeta de selección de opción.' },
      { id: 'card-ticket-secure',name: 'Card Ticket Secure',      status: 'wip',    figmaPage: 'Card - Ticket Secure',                                      description: 'Ticket seguro con protección anti-fraude.' },
      { id: 'card-transaction',  name: 'Card Transaction',        status: 'wip',    figmaPage: 'Card - Transaction',                                        description: 'Tarjeta de transacción/historial.' },
      { id: 'card-user',         name: 'Card User',               status: 'wip',    figmaPage: 'Card - User',                                               description: 'Tarjeta de perfil de usuario.' },
      { id: 'card-price-zone',   name: 'Card Price Zone',         status: 'wip',    figmaPage: 'Card - Price Zone',                                         description: 'Tarjeta de zona de precio.' },
      { id: 'card-price-rate',   name: 'Card Price Zone + Rate',  status: 'wip',    figmaPage: 'Card - Price Zone + Rate',                                  description: 'Tarjeta de zona de precio con tarifa.' },
      { id: 'card-loyalty',      name: 'Card Loyalty Points',     status: 'new',    figmaPage: 'Card - Loyalty points',                                     description: 'Tarjeta de puntos de fidelización.' },
    ],
  },
];

export const ALL_COMPONENTS = CATEGORIES.flatMap(c => c.items.map(i => ({ ...i, category: c.id, categoryLabel: c.label })));

export const STATUS_COUNTS = ALL_COMPONENTS.reduce((acc, c) => {
  acc[c.status] = (acc[c.status] || 0) + 1;
  return acc;
}, {});
