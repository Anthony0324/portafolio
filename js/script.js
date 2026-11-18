// Menú hamburguesa en celulares
const botonMenu = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

botonMenu.addEventListener('click', function () {
    menu.classList.toggle('abierto');
});

// Al elegir una opción, el menú se cierra
menu.querySelectorAll('a').forEach(function (enlace) {
    enlace.addEventListener('click', function () {
        menu.classList.remove('abierto');
    });
});

// El encabezado cambia de color al bajar
const header = document.getElementById('header');
window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 50);
});