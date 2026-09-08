## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

# Puente Digital — Contexto del proyecto

## Qué es
Proyecto de prácticas universitarias en responsabilidad social, orientado a cerrar la brecha digital. El equipo eligió trabajar con **adultos mayores**, brindando capacitaciones de sensibilización tecnológica.

- **Nombre del proyecto:** Puente Digital
- **Submarca / nombre del programa de capacitación:** Sabios Digitales

## Problemáticas que aborda
1. Falta de conocimiento sobre el manejo de dispositivos electrónicos.
2. Vulnerabilidad ante estafas por desconocimiento del uso seguro de dispositivos electrónicos.

## Público objetivo
Adultos mayores con poco o nulo conocimiento sobre tecnología.

## Estructura de la capacitación (4 semanas)

| Semana | Responsable | Teoría |
|---|---|---|
| 1 | Marlon | Reconocimiento de interfaces de un celular (símbolos, llamadas, funcionalidades, apps principales, introducción al manejo del celular) |
| 2 | Brando | Comunicaciones: WhatsApp, videollamadas, compartir ubicación, crear y utilizar correo electrónico, escanear documentos |
| 3 | Sebastián | Pautas de seguridad: SMS, correo electrónico, manejo de contraseñas, MFA, descarga segura de aplicaciones |
| 4 | Yeimy | Verificación de links, navegación en buscadores, cómo descargar y almacenar un documento, organización de ficheros |

## Identidad de marca

**Logo oficial** (ya generado y aprobado — es la versión definitiva, no la del primer boceto):
- `logo.png`: versión completa, con ilustración de un adulto mayor y una pareja joven conectados por un arco de puente con nodos de colores. Para encabezado del blog/página web, sección hero y materiales de difusión.
- `logo_simple.png`: versión reducida solo con el ícono (sin texto). Para favicon, avatar o espacios pequeños.

**Concepto:** un arco tipo puente que conecta dos pilares (izquierda: adultos mayores/calidez; derecha: generación joven/tecnología). Sobre el arco, nodos de color transitan de coral a un acento dorado central ("el momento de conexión") y luego a verde-azulado (teal).

**Paleta de colores oficial** — extraída directamente del logo aprobado. Esta reemplaza cualquier paleta anterior y es la que se debe usar en toda la app/página web:

| Rol | Uso sugerido | Hex |
|---|---|---|
| Primario | Teal — headers, botones principales, links, elementos "tecnología" | `#0A9685` |
| Secundario | Coral — acentos, CTAs secundarios, elementos "calidez/humano" | `#EA5F39` |
| Acento | Dorado — highlights puntuales, hover states, elementos destacados (úsalo con moderación) | `#E79410` |
| Secundario claro | Coral claro — fondos suaves, badges, estados hover | `#FA9A70` |
| Primario claro | Verde-teal claro — fondos suaves, estados secundarios | `#78BA92` |
| Texto principal | Texto de cuerpo y títulos | `#282828` |
| Texto/línea secundaria | Subtítulos, líneas divisorias, texto de apoyo | `#C7C7C7` |
| Fondo | Fondo base de la página | `#FFFFFF` |

Regla: no introducir colores fuera de esta paleta sin discutirlo antes. Cualquier color de estado (error, éxito, advertencia) debe derivarse de estos tonos o justificarse explícitamente antes de usarse.

**Tipografía / tono del logotipo:** "PUENTE DIGITAL" en mayúsculas, sans-serif, peso medio, tracking amplio; "SABIOS DIGITALES" como línea secundaria más pequeña.

## Sistema de diseño y reglas de codificación (página web)

**Fuente única de verdad:** `main.css` (Tailwind CSS v4, config CSS-first con `@theme`) es el sistema de estilos centralizado del proyecto — define colores, tipografía, espaciado, radios y sombras como tokens reutilizables.

**REGLA — no negociable:** si en el desarrollo se necesita un color, tamaño de fuente, espaciado o radio que no exista en `main.css`, se define PRIMERO ahí (dentro de `@theme`) y luego se usa donde corresponda. Nunca se escribe un valor hex, un px suelto o una fuente directamente en un componente o pantalla.

**Accesibilidad — no negociable, dado el público adulto mayor:**
- Tamaño de fuente mínimo 18–20px en cuerpo de texto; nunca por debajo de 16px.
- Alto contraste siempre: `#282828` sobre fondos claros, o los tonos oscuros de la paleta (`#0A9685`, `#EA5F39`) sobre blanco. Evitar combinaciones de bajo contraste (ej. coral claro o dorado como texto sobre blanco).
- Áreas clickeables grandes: mínimo 44x44px en botones y links.
- No depender solo del color para transmitir información; reforzar con íconos o texto.

**Navegación tipo "escritorio":**

El patrón de navegación del sitio es un **menú lateral fijo (sidebar) sobre el borde izquierdo**, siempre visible, con el logo en la parte superior. Reemplaza a la barra horizontal superior que se contemplaba en la versión inicial de este documento — **no coexisten las dos**: el sitio tiene un único menú de navegación principal y es el sidebar.

Lo que se mantiene intacto de la idea original es el *espíritu* de "escritorio": todo a la vista, nada escondido detrás de un ícono.

- **Menú lateral fijo a la izquierda**, de alto completo y ancho constante, desde `lg` (1024px). El menú está presente y COMPLETO en todas las pantallas y en todos los tamaños; nunca se transforma en menú hamburguesa, ni en móvil (ver "Responsive del menú" más abajo).
- **Todos los links de texto a la vista**, siempre. Nada de menús colapsados por defecto.
- **Menús desplegables activados por clic, no por hover.** Implementados con `<details>/<summary>` nativo — sin JavaScript, accesible por teclado y anunciado por lectores de pantalla.
- **Los desplegables arrancan CERRADOS**, con una sola excepción: si la pantalla actual es una de sus sub-rutas, el grupo se renderiza abierto (`open={...}`), porque de lo contrario el menú ocultaría justo la página en la que está el usuario. Antes arrancaban siempre abiertos y, como cada navegación recarga la página entera, se reabrían solos en cada clic: resultaba molesto.
- **Texto claro en cada link** (ej. "Inicio", "Sesión 1", "Entrada2"). Los íconos acompañan y refuerzan el texto; **nunca lo reemplazan**.
- **El estado activo no se comunica solo con color**: se refuerza con `aria-current="page"`.
- **Link "Saltar al contenido"** como primer elemento enfocable del `<body>`, para que el teclado no tenga que recorrer todo el menú en cada pantalla.
- **El ancho del sidebar vive en `main.css`** como el token `--spacing-sidebar`. El menú usa `lg:w-sidebar` y el contenido `lg:ml-sidebar`, de modo que ambos no puedan desincronizarse. Nunca escribir ese ancho a mano.
- **Responsive del menú — no es hamburguesa, es reflow.** Desde `lg` (1024px) el menú es la barra lateral fija descrita arriba. Por debajo de `lg` deja de ser fijo y se reordena como **bloque superior de ancho completo**, con TODOS los links a la vista en una grilla de 2 columnas: no se oculta, no se colapsa y no aparece ningún ícono que haya que tocar para verlo. Sigue siendo el mismo y único menú, sólo cambia de disposición.
- **El desplazamiento del contenido va con prefijo: `lg:ml-sidebar`, nunca `ml-sidebar` a secas.** Sin el prefijo, en móvil el contenido queda empujado 320px fuera de la pantalla. Lo mismo aplica al `<aside>`: `lg:fixed lg:w-sidebar`, no `fixed w-sidebar`.
- **Fuente única de rutas: `src/Routes/navigation.ts`.** Ahí se define la estructura completa del menú (links, grupos desplegables, íconos, enlaces externos) y el helper `isActiveRoute()`. El sidebar **consume** esa estructura, no declara links propios. Ahí vive además `ROUTES`, el mapa de rutas nombradas: **cualquier enlace interno dentro de una pantalla** (un botón del hero, un "ver más") toma su dirección de `ROUTES`, nunca escrita a mano. Al agregar o modificar una pantalla, la ruta se refleja PRIMERO ahí y el menú se actualiza solo — nunca al revés, ni con links sueltos en una página.

**Estructura de una pantalla — no negociable:**

```
src/components/          piezas compartidas por VARIAS pantallas
                         (SeccionBase, EncabezadoPagina, TextoPendiente, MapaUbicacion)
src/layouts/             BaseLayout: <head>, menú y contenedor principal
src/pages/<pantalla>/
  index.astro            la ruta. SÓLO compone: layout + encabezado + secciones
  _sections/             el contenido de ESA pantalla, una sección por archivo
```

- Todo `.astro` dentro de `src/pages/` genera una ruta. Por eso las carpetas de contenido llevan prefijo `_` (`_sections`): Astro las ignora como rutas y sirven como componentes. Sin ese prefijo se crean pantallas fantasma duplicadas.
- Un `index.astro` **no contiene marcado de contenido**: importa y compone. Si hay que escribir HTML de contenido, va en `_sections/`.
- Una pieza sube a `src/components/` cuando la usa más de una pantalla. Mientras la use una sola, se queda en el `_sections/` de esa pantalla. Nunca se importa desde el `_sections/` de otra pantalla.

**Jerarquía de encabezados — accesibilidad, no estética:**
- **Un `<h1>` por pantalla, y sólo uno.** El inicio lo pone en su hero; las demás pantallas, con `EncabezadoPagina`. Sin `<h1>` el documento no tiene tema y quien navega por encabezados queda perdido.
- Debajo van `<h2>` (los títulos de `SeccionBase`) y dentro de ellos `<h3>`. **Nunca se salta un nivel.**
- **El nivel lo da la jerarquía del contenido; el tamaño lo dan los tokens.** Si un `<h2>` debe verse pequeño, se le pone `text-lg` — jamás se baja a `<h3>` para que se vea más chico.

**Consistencia de estilos:**
- Usar variables/tokens de color (CSS custom properties o el sistema equivalente del framework usado) en vez de hardcodear hex en cada componente, para poder ajustar toda la paleta desde un solo lugar.
- Todo componente nuevo (botones, tarjetas, formularios) debe reutilizar la paleta y tipografía ya definidas — no crear estilos ad hoc por sección.

**Responsive — mobile-first, no negociable:**
- Las clases SIN prefijo son las de pantalla angosta; los prefijos (`sm:`, `md:`, `lg:`, `xl:`) sólo agregan lo que cambia al ensanchar. Nunca al revés.
- Breakpoint estructural del sitio: `lg` (1024px). Es donde el menú pasa de bloque superior a barra lateral fija.
- El ritmo vertical y el padding lateral de las secciones los define UNA sola pieza, `src/pages/inicio/_components/SeccionBase.astro`: `py-lg lg:py-xl` y `px-md lg:px-xl`. Ninguna sección declara su propio padding.
- Toda pantalla nueva debe revisarse a 375px de ancho antes de darse por terminada.

## Cómo debe ayudar Claude en este proyecto
- Este es un proyecto académico de prácticas: dar estructura, ideas y retroalimentación, pero el contenido final (informes, justificaciones, entregables escritos) lo redacta Sebastián en su propia voz.
- Mantener el tono cálido y accesible definido en la identidad de marca al proponer copys, textos o materiales para el público adulto mayor (evitar lenguaje condescendiente o infantilizante).
- Cualquier pieza visual o de código (logo, materiales, página web) debe respetar estrictamente la paleta de colores, la tipografía y las reglas de navegación definidas arriba, salvo que se pida explícitamente explorar otra dirección.