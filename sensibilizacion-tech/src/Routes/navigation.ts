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

export type NavItem = NavLink;

/* ------------------------------------------------------------
   ÍCONOS
   Trazos simples (estilo lucide) definidos como markup interno
   del <svg>. Se centralizan aquí para que ningún componente
   pegue paths sueltos.
   ------------------------------------------------------------ */
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" /><path d="M9.5 21v-6h5v6" />',
  stage: '<path d="M5 21V4" /><path d="M5 5h13l-2.5 3.5L18 12H5" />',
  video: '<path d="m22 7-6 5 6 5V7Z" /><rect width="14" height="14" x="2" y="5" rx="2" />',
  cloud: '<path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97 6 6 0 0 0-11.66-1.4A4 4 0 0 0 6.5 19Z" />',
} as const;

/* ------------------------------------------------------------
   ENLACES EXTERNOS
   ------------------------------------------------------------ */
export const VIDEO_REFLEXION_URL =
  "https://uniminuto0-my.sharepoint.com/:v:/g/personal/yeimy_calle_uniminuto_edu_co/IQCpWoB4sUGcRI3fkDvplb19Aagpwdg7OIR0tf5ct3oS92k?e=IYsWMP";

export const ONEDRIVE_URL =
  "https://uniminuto0-my.sharepoint.com/:f:/g/personal/yeimy_calle_uniminuto_edu_co/IgAWvmauNsMuTp2YRI57MKY4AUrEF5FobMXAkVictHmos84?e=Lw8OYn";

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
  entrada1: "/etapas/etapa1",
  entrada2: "/etapas/etapa2",
  entrada3: "/etapas/etapa3",
  entrada4: "/etapas/etapa4",
  videoReflexion: VIDEO_REFLEXION_URL,
  onedrive: ONEDRIVE_URL,
} as const;

/* ------------------------------------------------------------
   MENÚ PRINCIPAL
   ------------------------------------------------------------ */
export const NAVIGATION: readonly NavItem[] = [
  { kind: "link", label: "Inicio", href: ROUTES.inicio, icon: ICONS.home },
  { kind: "link", label: "Entrada 1", href: ROUTES.entrada1, icon: ICONS.stage },
  { kind: "link", label: "Entrada 2", href: ROUTES.entrada2, icon: ICONS.stage },
  { kind: "link", label: "Entrada 3", href: ROUTES.entrada3, icon: ICONS.stage },
  { kind: "link", label: "Entrada 4", href: ROUTES.entrada4, icon: ICONS.stage },
  {
    kind: "link",
    label: "Video reflexión",
    href: ROUTES.videoReflexion,
    icon: ICONS.video,
    external: true,
  },
  { kind: "link", label: "OneDrive", href: ROUTES.onedrive, icon: ICONS.cloud, external: true },
];

/**
 * Indica si una ruta del menú corresponde a la pantalla actual.
 * Considera activas también las sub-rutas (ej. /etapas/etapa1).
 */
export function isActiveRoute(href: string, currentPath: string): boolean {
  const normalize = (value: string) =>
    value.length > 1 && value.endsWith("/") ? value.slice(0, -1) : value;

  const target = normalize(href);
  const current = normalize(currentPath);

  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}
