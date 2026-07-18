document.addEventListener("DOMContentLoaded", function () {//Para este caso el sistema espera que cargue el documento html y cuando finalice cargara la galeria llamando la funcion crearGaleria
    navegacionFija();
    resaltarEnlace();
    crearGaleria();
    scrollNav();

});

function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    window.addEventListener('scroll', function () {

        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    });
}

function resaltarEnlace() {

    window.addEventListener('scroll', function () {

        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('a');
        let actual = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id
            }
        })
        navLinks.forEach(Link => {
            Link.classList.remove('active');
            if (Link.getAttribute('href') === '#' + actual) {
                Link.classList.add('active')
            }
        });
    });
}

function crearGaleria() {
    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG')
        imagen.src = `src/img/gallery/full/${i}.jpg`
        imagen.alt = `galeria${i}`

        /*
        Event Handler
        Todos los eventos handler empiezan en on
        */

        imagen.onclick = function () {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);




    }
}

function mostrarImagen(i) {

    const imagen = document.createElement('IMG')
    imagen.src = `src/img/gallery/full/${i}.jpg`
    imagen.alt = `galeria${i}`

    //generar modal

    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    //Boton cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'Cerrar'
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;


    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    //Agregar al html

    const body = document.querySelector('body');
    body.classList.add('overflow-hidden')
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')

    const body = document.querySelector('body');
    body.classList.remove('overflow-hidden')

    setTimeout(() => {
        modal?.remove();//Elimina modal si existe, se agrega '?' a esta liena para que valide si existe o no existe
    }, 500);

}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach(Link => {
        Link.addEventListener('click', e => {
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({ behavior: 'smooth' })
        })
    })
}
