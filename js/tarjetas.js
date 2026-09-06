const CANTIDAD_POR_FILA = 6;
const LARGO_DESCRIPCION = 85;

const productoBase = {
    nombre: "Product_Name",
    descripcion: "Lorem ipsum dolor sit amet consectetur adipiscing elit enim urna parturient porttitor faucibus nulla",
    precio: 0,
    usuario: "user"
};

const categorias = [
    { id: "nuevos", titulo: "Nuevos" },
    { id: "libros", titulo: "Popular en libros" },
    { id: "computadores", titulo: "Popular en computadores" },
    { id: "accesorios", titulo: "Popular en accesorios" },
    { id: "instrumentos", titulo: "Popular en instrumentos" },
    { id: "deportes", titulo: "Popular en artículos deportivos" },
    { id: "otros", titulo: "Otros productos" }
];

console.log("Categorias cargadas: " + categorias.length);

function acortarTexto(texto, largo) {
    if (texto.length > largo) {
        return texto.substring(0, largo) + "...";
    }
    return texto;
}

function formatearPrecio(precio) {
    if (precio > 0) {
        return precio + " CLP";
    }
    return "0 CLP";
}

function formatearUsuario(usuario) {
    if (usuario === "") {
        return "Por usuario";
    }
    return "Por " + usuario;
}

function crearTarjeta(producto) {
    let html = "";

    html += '<article class="tarjeta">';
    html += '<div class="tarjeta-imagen"></div>';
    html += '<div class="tarjeta-cuerpo">';
    html += '<h4 class="tarjeta-nombre">' + producto.nombre + '</h4>';
    html += '<p class="tarjeta-texto">' + acortarTexto(producto.descripcion, LARGO_DESCRIPCION) + '</p>';
    html += '<div class="tarjeta-pie">';
    html += '<span class="tarjeta-precio">' + formatearPrecio(producto.precio) + '</span>';
    html += '<span class="tarjeta-usuario">' + formatearUsuario(producto.usuario) + '</span>';
    html += '</div>';
    html += '</div>';
    html += '</article>';

    return html;
}

function crearTarjetas(cantidad) {
    let html = "";

    for (let i = 0; i < cantidad; i++) {
        html += crearTarjeta(productoBase);
    }

    return html;
}

function crearFila(categoria) {
    let html = "";

    html += '<section class="fila-categoria">';
    html += '<div class="fila-titulo">';
    html += '<h3>' + categoria.titulo + '</h3>';
    html += '<a class="enlace-mercado" href="mercado.html">Ver en el Mercado</a>';
    html += '</div>';
    html += '<div class="carrusel">' + crearTarjetas(CANTIDAD_POR_FILA) + '</div>';
    html += '</section>';

    return html;
}