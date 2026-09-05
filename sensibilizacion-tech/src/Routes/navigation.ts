/* ============================================================
   PUENTE DIGITAL — DEFINICIÓN DE RUTAS DE NAVEGACIÓN
   ============================================================
   Fuente única de verdad de la navegación del sitio.
   Regla del proyecto: al agregar o modificar una pantalla, la
   ruta se refleja PRIMERO aquí y el menú se actualiza solo.
   Ningún componente debe declarar links de navegación sueltos.
   ============================================================ */

/** Ítem simple: navega directo a una ruta. */
export interface NavLink {
  readonly kind: "link";
  readonly label: string;
  readonly href: string;
  /** Contenido interno del <svg> (24x24, stroke). Refuerza el texto, nunca lo reemplaza. */
  readonly icon: string;
  /** true si apunta fuera del sitio: se abre en pestaña nueva y se anuncia al lector de pantalla. */
  readonly external?: boolean;
}

/** Grupo desplegable: agrupa sub-rutas bajo una etiqueta. */
export interface NavGroup {
  readonly kind: "group";
  readonly label: string;
  readonly icon: string;
  readonly children: readonly NavLink[];
}

export type NavItem = NavLink | NavGroup;

/* ------------------------------------------------------------
   ÍCONOS
   Trazos simples (estilo lucide) definidos como markup interno
   del <svg>. Se centralizan aquí para que ningún componente
   pegue paths sueltos.
   ------------------------------------------------------------ */
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" /><path d="M9.5 21v-6h5v6" />',
  sessions:
    '<path d="M12 7v14" /><path d="M3 18V5a1 1 0 0 1 1-1h5a3 3 0 0 1 3 3 3 3 0 0 1 3-3h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a2 2 0 0 0-2 2 2 2 0 0 0-2-2H4a1 1 0 0 1-1-1Z" />',
  session: '<path d="M8 6h10" /><path d="M8 12h10" /><path d="M8 18h10" /><path d="M4 6h.01" /><path d="M4 12h.01" /><path d="M4 18h.01" />',
  stage: '<path d="M5 21V4" /><path d="M5 5h13l-2.5 3.5L18 12H5" />',
  cloud: '<path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97 6 6 0 0 0-11.66-1.4A4 4 0 0 0 6.5 19Z" />',
} as const;

/* ------------------------------------------------------------
   ENLACE EXTERNO
   Carpeta compartida del equipo en OneDrive (SharePoint UNIMINUTO).
   ------------------------------------------------------------ */
export const ONEDRIVE_URL =
  "https://uniminuto0-my.sharepoint.com/:f:/g/personal/yeimy_calle_uniminuto_edu_co/IgAWvmauNsMuTp2YRI57MKY4AYcQO9BpxW5xACVUIsWFPW4?e=9OksPz";

/* ------------------------------------------------------------
   RUTAS NOMBRADAS
   Fuente única de las direcciones del sitio. El menú de abajo se
   arma con ellas, y cualquier enlace interno que aparezca DENTRO
   de una pantalla (un botón del hero, un "ver más") también debe
   tomarlas de aquí. Regla del proyecto: ninguna pantalla escribe
   una ruta a mano — si cambia una dirección, se cambia aquí y el
   sitio entero queda consistente.
   ------------------------------------------------------------ */
export const ROUTES = {
  inicio: "/",
  sesion1: "/sesiones/sesion1",
  sesion2: "/sesiones/sesion2",
  sesion3: "/sesiones/sesion3",
  sesion4: "/sesiones/sesion4",
  entrada1: "/etapas/etapa1",
  entrada2: "/etapas/etapa2",
  entrada3: "/etapas/etapa3",
  entrada4: "/etapas/etapa4",
  onedrive: ONEDRIVE_URL,
} as const;

/* ------------------------------------------------------------
   MENÚ PRINCIPAL
   ------------------------------------------------------------ */
export const NAVIGATION: readonly NavItem[] = [
  { kind: "link", label: "Inicio", href: ROUTES.inicio, icon: ICONS.home },
  {
    kind: "group",
    label: "Sesiones",
    icon: ICONS.sessions,
    children: [
      { kind: "link", label: "Sesión 1", href: ROUTES.sesion1, icon: ICONS.session },
      { kind: "link", label: "Sesión 2", href: ROUTES.sesion2, icon: ICONS.session },
      { kind: "link", label: "Sesión 3", href: ROUTES.sesion3, icon: ICONS.session },
      { kind: "link", label: "Sesión 4", href: ROUTES.sesion4, icon: ICONS.session },
    ],
  },
  { kind: "link", label: "Entrada 1", href: ROUTES.entrada1, icon: ICONS.stage },
  { kind: "link", label: "Entrada 2", href: ROUTES.entrada2, icon: ICONS.stage },
  { kind: "link", label: "Entrada 3", href: ROUTES.entrada3, icon: ICONS.stage },
  { kind: "link", label: "Entrada 4", href: ROUTES.entrada4, icon: ICONS.stage },
  { kind: "link", label: "OneDrive", href: ROUTES.onedrive, icon: ICONS.cloud, external: true },
];

/**
 * Indica si una ruta del menú corresponde a la pantalla actual.
 * Considera activas también las sub-rutas (ej. /sesiones/sesion1/recursos).
 */
export function isActiveRoute(href: string, currentPath: string): boolean {
  const normalize = (value: string) =>
    value.length > 1 && value.endsWith("/") ? value.slice(0, -1) : value;

  const target = normalize(href);
  const current = normalize(currentPath);

  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}
