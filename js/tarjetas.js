const CANTIDAD_POR_FILA = 6;
const LARGO_DESCRIPCION = 85;
const LARGO_NOMBRE = 50;

const categorias = [
    { id: "nuevos", titulo: "Nuevos" },
    { id: "libros", titulo: "Popular en libros" },
    { id: "computadores", titulo: "Popular en computadores" },
    { id: "accesorios", titulo: "Popular en accesorios" },
    { id: "instrumentos", titulo: "Popular en instrumentos" },
    { id: "deportes", titulo: "Popular en artículos deportivos" },
    { id: "otros", titulo: "Otros productos" }
];

function productosNuevos() {
    const lista = [];

    for (let i = productos.length - 1; i >= 0; i--) {
        lista.push(productos[i]);
    }

    return lista;
}

function productosDeCategoria(idCategoria) {
    if (idCategoria === "nuevos") {
        return productosNuevos();
    }

    const lista = [];

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].categoria === idCategoria) {
            lista.push(productos[i]);
        }
    }

    return lista;
}

function dibujarDestacados() {
    const contenedor = document.getElementById("listaDestacados");
    let html = "";

    for (let i = 0; i < categorias.length; i++) {
        html += crearFila(categorias[i]);
    }

    contenedor.innerHTML = html;
}


document.addEventListener("DOMContentLoaded", dibujarDestacados);

function acortarTexto(texto, largo) {
    if (texto.length > largo) {
        return texto.substring(0, largo) + "...";
    }
    return texto;
}

function formatearPrecio(precio) {
    if (precio > 0) {
        return precio.toLocaleString("es-CL") + " CLP";
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
    html += '<div class="tarjeta-imagen">';
    html += '<img src="' + producto.imagen + '" alt="' + producto.nombre + '">';
    html += '</div>';
    html += '<div class="tarjeta-cuerpo">';
    html += '<h4 class="tarjeta-nombre">' + acortarTexto(producto.nombre, LARGO_NOMBRE) + '</h4>';
    html += '<p class="tarjeta-texto">' + acortarTexto(producto.descripcion, LARGO_DESCRIPCION) + '</p>';
    html += '<div class="tarjeta-pie">';
    html += '<span class="tarjeta-precio">' + formatearPrecio(producto.precio) + '</span>';
    html += '<span class="tarjeta-usuario">' + formatearUsuario(producto.vendedor) + '</span>';
    html += '</div>';
    html += '</div>';
    html += '</article>';

    return html;
}

function crearTarjetas(lista) {
    let html = "";

    for (let i = 0; i < lista.length && i < CANTIDAD_POR_FILA; i++) {
        html += crearTarjeta(lista[i]);
    }

    return html;
}

function crearFila(categoria) {
    const lista = productosDeCategoria(categoria.id);

    if (lista.length === 0) {
        return "";
    }

    let html = "";

    html += '<section class="fila-categoria">';
    html += '<div class="fila-titulo">';
    html += '<h3>' + categoria.titulo + '</h3>';
    html += '<a class="enlace-mercado" href="mercado.html">Ver en el Mercado</a>';
    html += '</div>';
    html += '<div class="carrusel">' + crearTarjetas(lista) + '</div>';
    html += '</section>';

    return html;
}