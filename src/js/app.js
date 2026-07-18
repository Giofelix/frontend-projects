// ============================================================
// app.js — Lógica interactiva del Festival de Música
// ============================================================
// Este archivo maneja el comportamiento dinámico de la página:
//   1. Header que se fija en la parte superior al hacer scroll
//   2. Resaltado del link de navegación según la sección visible
//   3. Generación dinámica de la galería de fotos
//   4. Modal lightbox para ver imágenes en pantalla completa
//   5. Scroll suave al hacer clic en los links de navegación
// ============================================================

// DOMContentLoaded: evento que se dispara cuando el navegador termina
// de leer y parsear todo el HTML (pero antes de que carguen imágenes/CSS).
// Envolvemos el código aquí para garantizar que todos los elementos
// del HTML existan cuando el script intente encontrarlos con querySelector.
// Sin esto, si el script se ejecutara antes que el HTML, querySelector
// devolvería null y todo fallaría.
document.addEventListener("DOMContentLoaded", function () {
    navegacionFija();  // Activa el header sticky al hacer scroll
    resaltarEnlace();  // Resalta el link del nav según la sección visible
    crearGaleria();    // Genera las 16 imágenes de la galería dinámicamente
    scrollNav();       // Activa el scroll suave en los links de navegación
});

// ─────────────────────────────────────────────────────────────
// FUNCIÓN: navegacionFija
// Agrega/quita la clase ".fixed" al header según la posición de scroll.
// Cuando el usuario baja lo suficiente para que la sección "sobre-festival"
// salga completamente de la pantalla, el header se hace fijo (sticky).
// Al volver a subir, el header vuelve a su posición normal.
// ─────────────────────────────────────────────────────────────
function navegacionFija() {
    const header = document.querySelector('.header');
    // document.querySelector(selector): encuentra el PRIMER elemento HTML
    // que coincide con el selector CSS dado.
    // Devuelve el elemento como un objeto JavaScript, o null si no existe.

    const sobreFestival = document.querySelector('.sobre-festival');

    // El evento 'scroll' se dispara continuamente mientras el usuario hace scroll
    window.addEventListener('scroll', function () {

        // getBoundingClientRect(): devuelve un objeto con las coordenadas del elemento
        // relativas al viewport (la parte visible de la pantalla en ese momento).
        // Las propiedades disponibles son: top, bottom, left, right, width, height.
        //
        // .bottom = distancia desde el borde superior del viewport hasta el borde
        // INFERIOR del elemento. Cuando el elemento "sale por arriba", .bottom es < 0.
        // Usamos < 1 en vez de < 0 para mayor precisión con decimales.
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');    // La clase .fixed en _header.scss pone position: fixed
        } else {
            header.classList.remove('fixed'); // Quita .fixed → header vuelve al flujo normal
        }
    });
}

// ─────────────────────────────────────────────────────────────
// FUNCIÓN: resaltarEnlace
// Detecta qué sección de la página está visible mientras el usuario
// hace scroll y agrega la clase ".active" al link correspondiente del nav.
// La clase .active en _header.scss cambia el color del link a amarillo.
// ─────────────────────────────────────────────────────────────
function resaltarEnlace() {

    window.addEventListener('scroll', function () {

        // querySelectorAll: como querySelector pero devuelve TODOS los elementos
        // que coinciden (una NodeList, que funciona similar a un array)
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('a');
        let actual = ''; // Variable que guarda el id de la sección actualmente visible

        // Recorre todas las secciones para ver cuál está en pantalla
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // offsetTop: distancia desde el tope del documento hasta el inicio de la sección.
            // Es un valor fijo que no cambia con el scroll.

            const sectionHeight = section.clientHeight;
            // clientHeight: la altura visible del elemento en píxeles.

            // La condición activa el link cuando el scroll supera el inicio
            // de la sección menos 1/3 de su altura.
            // El "/3" hace que el link se active un poco ANTES de llegar al tope
            // de la sección, dando una transición más natural.
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id;
                // section.id: el valor del atributo "id" de la sección.
                // Ej: <section id="lineup"> → section.id es "lineup"
            }
        });

        // Actualiza el estado "activo" de los links del nav
        navLinks.forEach(Link => {
            Link.classList.remove('active'); // Primero quita .active de TODOS los links

            // getAttribute('href'): obtiene el valor del atributo href del link (ej: "#lineup")
            // Lo compara con "#" + el id de la sección actual (ej: "#" + "lineup" = "#lineup")
            if (Link.getAttribute('href') === '#' + actual) {
                Link.classList.add('active'); // Solo agrega .active al link que corresponde
            }
        });
    });
}

// ─────────────────────────────────────────────────────────────
// FUNCIÓN: crearGaleria
// Crea 16 elementos <img> mediante JavaScript y los inserta en el
// div .galeria-imagenes del HTML (que está vacío en el HTML estático).
// Cada imagen tiene un event handler que abre el modal al hacer clic.
//
// Esto se llama "manipulación del DOM" (Document Object Model):
// JavaScript puede crear, modificar y eliminar elementos HTML en tiempo real.
// ─────────────────────────────────────────────────────────────
function crearGaleria() {
    const CANTIDAD_IMAGENES = 16;
    // Convención: las constantes que no cambian se escriben en MAYÚSCULAS_CON_GUION.
    // Así cualquiera que lea el código sabe que este valor nunca debería cambiar.

    const galeria = document.querySelector('.galeria-imagenes');
    // Selecciona el div vacío donde insertaremos las imágenes

    // Bucle for: se ejecuta 16 veces (i va del 1 al 16 inclusive)
    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {

        const imagen = document.createElement('IMG');
        // createElement: crea un nuevo elemento HTML en memoria.
        // Todavía no aparece en la página, solo existe en JavaScript.

        imagen.src = `src/img/gallery/full/${i}.jpg`;
        // Template literal (backticks ` `): permite insertar variables dentro de un string
        // con la sintaxis ${variable}. En la primera iteración genera:
        // "src/img/gallery/full/1.jpg", luego "...2.jpg", etc.

        imagen.alt = `galeria${i}`;
        // alt: texto alternativo de la imagen (para accesibilidad y cuando la imagen no carga)

        // Event Handler con propiedad onclick:
        // Cuando el usuario haga clic en esta imagen, se ejecuta esta función.
        // La función "captura" el valor de "i" en ese momento gracias al closure
        // (i es diferente para cada imagen del bucle).
        imagen.onclick = function () {
            mostrarImagen(i); // Llama a mostrarImagen con el número de esta imagen
        }

        galeria.appendChild(imagen);
        // appendChild: agrega el elemento <img> como ÚLTIMO hijo del div .galeria-imagenes.
        // Ahora la imagen aparece en la página. Cada iteración agrega una imagen más.
    }
}

// ─────────────────────────────────────────────────────────────
// FUNCIÓN: mostrarImagen(i)
// Crea el modal lightbox con la imagen seleccionada y lo agrega al DOM.
// El modal consiste en: un overlay oscuro + la imagen grande + botón de cierre.
// ─────────────────────────────────────────────────────────────
function mostrarImagen(i) {

    // Crea la imagen grande que se mostrará en el modal
    const imagen = document.createElement('IMG')
    imagen.src = `src/img/gallery/full/${i}.jpg`
    imagen.alt = `galeria${i}`

    // Crea el contenedor principal del modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    // classList.add: agrega la clase CSS 'modal' al div recién creado.
    // La clase .modal (en _galeria.scss) lo pone en position: fixed cubriendo toda la pantalla.

    modal.onclick = cerrarModal;
    // Hacer clic en cualquier parte del overlay (fondo del modal) también lo cierra.
    // Nota: el clic en la imagen también propagará al modal y lo cerrará.

    // Crea el botón de cierre
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'Cerrar';
    // textContent: el texto visible dentro del elemento.
    // Es más seguro que innerHTML para texto plano (innerHTML puede ejecutar HTML malicioso).

    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;

    // Ensambla el modal: agrega la imagen y el botón dentro del div modal
    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    // Agrega el modal a la página e impide el scroll
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    // La clase .overflow-hidden (en _globales.scss) pone overflow: hidden al body,
    // lo que bloquea el scroll de la página mientras el modal está abierto.

    body.appendChild(modal);
    // Inserta el modal como último hijo del body → ahora es visible en pantalla.
    // La animación CSS "fadeIn" de _galeria.scss se dispara automáticamente al crearlo.
}

// ─────────────────────────────────────────────────────────────
// FUNCIÓN: cerrarModal
// Anima la desaparición del modal y luego lo elimina del DOM.
// Usa setTimeout para esperar que la animación CSS termine antes
// de eliminar el elemento (si lo eliminara de inmediato, no se vería la animación).
// ─────────────────────────────────────────────────────────────
function cerrarModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')
    // Agrega la clase .fade-out que activa la animación @keyframes fadeOut en _galeria.scss:
    // la opacidad va de 1 a 0 en 0.5 segundos.

    const body = document.querySelector('body');
    body.classList.remove('overflow-hidden')
    // Restaura el scroll de la página inmediatamente (no hay que esperar la animación)

    // setTimeout: ejecuta la función del primer parámetro después de un retardo.
    // Aquí esperamos 500ms (= 0.5s, que es la duración de la animación fadeOut)
    // para asegurarnos de que la animación termine ANTES de eliminar el modal del DOM.
    setTimeout(() => {
        modal?.remove();
        // El operador "?." (optional chaining o encadenamiento opcional):
        // Solo llama a .remove() si "modal" existe (no es null ni undefined).
        // Previene un error si cerrarModal se llama dos veces seguidas
        // (ej: el usuario hace clic en el botón Y en el overlay al mismo tiempo).
    }, 500);
}

// ─────────────────────────────────────────────────────────────
// FUNCIÓN: scrollNav
// Intercepta los clicks en los links de navegación y reemplaza el
// salto instantáneo a la sección (#id) por un scroll suave animado.
// ─────────────────────────────────────────────────────────────
function scrollNav() {
    // Selecciona SOLO los links dentro de .navegacion-principal
    // (no todos los <a> de la página, para evitar afectar otros links)
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach(Link => {
        // addEventListener: forma moderna de asignar eventos.
        // Es mejor que onclick porque permite agregar múltiples listeners al mismo elemento.
        Link.addEventListener('click', e => {
            // "e" es el objeto del evento (MouseEvent).
            // Contiene información sobre el clic: qué elemento se clickeó,
            // coordenadas del clic, teclas presionadas, etc.

            e.preventDefault();
            // Cancela el comportamiento por defecto del link.
            // Sin esto, el navegador seguiría el href="#lineup" y haría el salto
            // instantáneo al ancla, sin nuestra animación de scroll suave.

            const sectionScroll = e.target.getAttribute('href')
            // e.target: el elemento específico que recibió el clic (el <a>)
            // getAttribute('href'): obtiene el valor del href, ej: "#lineup"

            const section = document.querySelector(sectionScroll)
            // Usa el href como selector CSS para encontrar el elemento destino.
            // document.querySelector("#lineup") encuentra <section id="lineup">

            section.scrollIntoView({ behavior: 'smooth' })
            // scrollIntoView: hace scroll hasta que el elemento sea visible.
            // { behavior: 'smooth' }: activa la animación nativa de scroll suave del navegador.
            // Sin 'smooth' sería un salto instantáneo (igual que sin preventDefault, pero
            // al menos con el control sobre cuál elemento mostrar).
        })
    })
}
