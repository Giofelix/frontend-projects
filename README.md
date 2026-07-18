# Festival de Música

Landing page estática para un festival de música electrónica/techno. Construida con HTML, SCSS y JavaScript vanilla, sin frameworks ni bundlers.

## Secciones

- Header con navegación fija al hacer scroll
- Video de presentación
- Sobre el festival
- Line-up de artistas
- Galería de imágenes con modal (lightbox)
- Boletos
- Footer

## Requisitos

- [Node.js](https://nodejs.org/) y npm

## Instalación

```bash
npm install
```

## Uso

```bash
# Compilar SCSS a CSS en modo watch (sass CLI puro)
npm run sass

# Compilar CSS una sola vez (vía Gulp)
npm run css

# Modo desarrollo: watch de SCSS y JS vía Gulp
npm run dev

# Pipeline completo: copiar JS, compilar CSS y watch
npm run allTools
```

El CSS compilado se genera en `build/css/app.css`. `index.html` carga ese archivo junto con `src/js/app.js`.

## Estructura del proyecto

```
├── index.html
├── src/
│   ├── scss/
│   │   ├── app.scss        # raíz SCSS
│   │   ├── base/           # variables, mixins y estilos globales
│   │   └── layout/         # una hoja de estilos por sección
│   ├── js/
│   │   └── app.js          # toda la lógica de JS (sin módulos)
│   └── img/                # imágenes del sitio y galería
├── video/                  # video de presentación (mp4/ogv/webm)
├── build/                  # salida compilada (generada, no versionada)
└── gulpfile.js
```

## Tecnologías

- HTML5
- SCSS (metodología mobile-first con mixins responsive)
- JavaScript (vanilla, sin módulos)
- Gulp + Sass

## Licencia

ISC
