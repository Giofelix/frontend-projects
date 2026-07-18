// ============================================================
// gulpfile.js — Configuración de automatización con Gulp 5
// ============================================================
// Gulp es un "task runner" (automatizador de tareas de desarrollo).
// Permite automatizar acciones repetitivas:
//   - Compilar SCSS → CSS
//   - Copiar archivos JS a la carpeta de distribución
//   - Vigilar cambios y recompilar automáticamente
//
// Flujo de trabajo de Gulp:
//   src(archivos) → .pipe(transformación) → .pipe(transformación) → dest(carpeta)
//   "Toma estos archivos, aplícales estas transformaciones, y guárdalos aquí"
//
// Este archivo usa ES Modules (import/export) porque package.json
// tiene "type": "module". Esta es la sintaxis moderna de JavaScript.
// ============================================================

// Importamos solo las 4 funciones que necesitamos de Gulp (en vez de todo el paquete).
import { src, dest, watch, series } from 'gulp';
// - src(patrón):    selecciona los archivos de entrada (fuentes)
// - dest(ruta):     define la carpeta donde guardar los archivos de salida
// - watch(p, tarea): vigila archivos; cuando cambian, ejecuta la tarea indicada
// - series(...):    ejecuta múltiples tareas en secuencia (una después de la otra)

// Importamos Dart Sass: el motor de compilación oficial y más moderno de Sass.
// "import * as dartSass": importa TODOS los exports del módulo bajo el nombre "dartSass"
import * as dartSass from 'sass'

// Plugin que integra Sass dentro del sistema de "streams" (flujos) de Gulp.
// Sin este plugin, Gulp no sabría cómo procesar archivos .scss.
import gulpSass from 'gulp-sass'

// Inicializa el compilador: le dice a gulp-sass que use dartSass como motor
const sass = gulpSass(dartSass);

// ─────────────────────────────────────────────────────────────
// TAREA: js
// Copia el JavaScript fuente al directorio de distribución (build/).
// En este proyecto el JS no se transforma (sin minificación ni Babel),
// solo se copia para que quede disponible en la carpeta final.
// ─────────────────────────────────────────────────────────────
export function js(done) {
    src('src/js/app.js')    // Indica el archivo fuente a tomar
        .pipe(dest('build/js')) // Copia el archivo a la carpeta build/js/

    done();
    // "done" es una función de callback que Gulp pasa automáticamente.
    // Hay que llamarla cuando la tarea termina, especialmente cuando la función
    // no devuelve un stream ni una promesa (como en este caso).
}

// ─────────────────────────────────────────────────────────────
// TAREA: css
// Compila src/scss/app.scss → build/css/app.css
//
// app.scss usa @forward para incluir todos los archivos SCSS del proyecto,
// así que compilar ese único archivo genera el CSS completo del sitio.
//
// ¿Qué son los sourcemaps?
// Son archivos adicionales que "mapean" el CSS compilado de vuelta a los
// archivos .scss originales. En DevTools del navegador verás exactamente
// en qué archivo .scss y en qué línea está cada estilo, no en app.css.
// Muy útil para depurar estilos durante el desarrollo.
// ─────────────────────────────────────────────────────────────
export function css(done) {
    src('src/scss/app.scss', { sourcemaps: true })
    // { sourcemaps: true }: activa la generación del sourcemap desde el inicio

        .pipe(sass().on('error', sass.logError))
        // Compila los archivos SCSS a CSS.
        // ".on('error', sass.logError)": si hay un error de sintaxis en el SCSS,
        // lo muestra en la consola con detalles pero NO detiene Gulp
        // (sin esto, un error rompería el proceso watch).

        .pipe(dest('build/css', { sourcemaps: true }))
        // Guarda el CSS compilado en build/css/ y también el archivo sourcemap

    done();
}

// ─────────────────────────────────────────────────────────────
// TAREA: dev (modo desarrollo con escucha de cambios)
// Esta función no tiene done() porque nunca termina por sí sola.
// Queda activa escuchando cambios indefinidamente hasta que
// cierras la terminal o presionas Ctrl+C.
// ─────────────────────────────────────────────────────────────
export function dev() {
    watch('src/scss/**/*.scss', css)
    // 'src/scss/**/*.scss': patrón glob que significa:
    //   src/scss/   → dentro de esta carpeta
    //   **/         → en cualquier subcarpeta (base/, layout/, etc.)
    //   *.scss      → cualquier archivo con extensión .scss
    // Cada vez que guardas un .scss, Gulp recompila automáticamente el CSS.

    watch('src/js/**/*.js', js)
    // Similar: cualquier .js dentro de src/js/ y sus subcarpetas.
    // Cada cambio dispara la tarea "js" que copia el archivo a build/.
}

// ─────────────────────────────────────────────────────────────
// TAREA POR DEFECTO
// Se ejecuta con:  npm run allTools  (definido en package.json)
// O directamente:  npx gulp
//
// series() ejecuta las tareas EN ORDEN, una después de la otra:
//   1. js  → copia los JS al build (rápido, termina)
//   2. css → compila los SCSS a CSS (rápido, termina)
//   3. dev → activa el modo watch (NO termina; queda escuchando)
// ─────────────────────────────────────────────────────────────
export default series(js, css, dev)
