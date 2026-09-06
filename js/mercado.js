/* =========================================
   MERCADO - JAVASCRIPT
   ========================================= */

/* =========================================
   VARIABLES
   ========================================= */

let productosMostrados = [...productos];

let favoritos = [];

let carrito = [];


/* =========================================
   CATEGORÍAS
   ========================================= */

const nombresCategorias = {

    libros: "Libros",

    computadores: "Computadores",

    accesorios: "Accesorios",

    instrumentos: "Instrumentos",

    deportes: "Artículos deportivos",

    otros: "Otros productos"

};


/* =========================================
   ELEMENTOS DEL DOM
   ========================================= */

const catalogoProductos =
    document.getElementById("catalogoProductos");

const buscadorProducto =
    document.getElementById("buscadorProducto");

const filtroCategoria =
    document.getElementById("filtroCategoria");

const precioMinimo =
    document.getElementById("precioMinimo");

const precioMaximo =
    document.getElementById("precioMaximo");

const ordenProductos =
    document.getElementById("ordenProductos");

const contadorProductos =
    document.getElementById("contadorProductos");

const mensajeSinProductos =
    document.getElementById("mensajeSinProductos");

const limpiarFiltros =
    document.getElementById("limpiarFiltros");

const detalleProducto =
    document.getElementById("detalleProducto");

const contenidoCarrito =
    document.getElementById("contenidoCarrito");


/* =========================================
   FORMATEAR PRECIO
   ========================================= */

function formatearPrecio(precio) {

    return precio.toLocaleString("es-CL") + " CLP";

}


/* =========================================
   OBTENER CATEGORÍA
   ========================================= */

function obtenerNombreCategoria(categoria) {

    return nombresCategorias[categoria] || "Otros";

}


/* =========================================
   CREAR TARJETA
   ========================================= */

function crearTarjetaProducto(producto) {

    const favoritoActivo =
        favoritos.includes(producto.id);


    return `

        <article class="col-12 col-sm-6 col-xl-4">

            <div class="producto-card">


                <!-- Imagen del producto -->

                <div class="producto-imagen">

                    <img
                        src="${producto.imagen}"
                        alt="Imagen de ${producto.nombre}"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">

                    <span
                        class="imagen-no-disponible"
                        style="display: none;">

                        Imagen no disponible

                    </span>

                </div>


                <!-- Información -->

                <div class="producto-contenido">


                    <span class="producto-categoria">

                        ${obtenerNombreCategoria(producto.categoria)}

                    </span>


                    <h3 class="producto-nombre">

                        ${producto.nombre}

                    </h3>


                    <p class="producto-descripcion">

                        ${producto.descripcion}

                    </p>


                    <div class="producto-pie">

                        <span class="producto-precio">

                            ${formatearPrecio(producto.precio)}

                        </span>


                        <span class="producto-usuario">

                            Por ${producto.vendedor}

                        </span>

                    </div>


                    <!-- Acciones -->

                    <div class="producto-acciones">


                        <button
                            type="button"
                            class="btn-ver-producto"
                            onclick="verProducto(${producto.id})">

                            Ver producto

                        </button>


                        <button
                            type="button"
                            class="btn-favorito ${favoritoActivo ? "activo" : ""}"
                            onclick="alternarFavorito(${producto.id})"
                            aria-label="Agregar a favoritos">

                            ${favoritoActivo ? "♥" : "♡"}

                        </button>


                    </div>

                </div>

            </div>

        </article>

    `;

}


/* =========================================
   MOSTRAR PRODUCTOS
   ========================================= */

function mostrarProductos(lista) {

    productosMostrados = lista;

    catalogoProductos.innerHTML = "";


    if (lista.length === 0) {

        mensajeSinProductos.hidden = false;

        contadorProductos.textContent =
            "No se encontraron productos";

        return;

    }


    mensajeSinProductos.hidden = true;


    contadorProductos.textContent =
        `Mostrando ${lista.length} producto${lista.length !== 1 ? "s" : ""}`;


    lista.forEach(function(producto) {

        catalogoProductos.innerHTML +=
            crearTarjetaProducto(producto);

    });

}


/* =========================================
   FILTROS
   ========================================= */

function aplicarFiltros() {

    let resultado = [...productos];


    const texto =
        buscadorProducto.value.trim().toLowerCase();


    const categoria =
        filtroCategoria.value;


    const minimo =
        Number(precioMinimo.value) || 0;


    const maximo =
        Number(precioMaximo.value) || Infinity;


    /* Buscar */

    if (texto !== "") {

        resultado = resultado.filter(function(producto) {

            return (

                producto.nombre
                    .toLowerCase()
                    .includes(texto)

                ||

                producto.descripcion
                    .toLowerCase()
                    .includes(texto)

                ||

                obtenerNombreCategoria(producto.categoria)
                    .toLowerCase()
                    .includes(texto)

            );

        });

    }


    /* Categoría */

    if (categoria !== "todas") {

        resultado = resultado.filter(function(producto) {

            return producto.categoria === categoria;

        });

    }


    /* Precio */

    resultado = resultado.filter(function(producto) {

        return producto.precio >= minimo &&
               producto.precio <= maximo;

    });


    /* Orden */

    switch (ordenProductos.value) {


        case "menor":

            resultado.sort(function(a, b) {

                return a.precio - b.precio;

            });

            break;


        case "mayor":

            resultado.sort(function(a, b) {

                return b.precio - a.precio;

            });

            break;


        case "nombre":

            resultado.sort(function(a, b) {

                return a.nombre.localeCompare(b.nombre);

            });

            break;

    }


    mostrarProductos(resultado);

}


/* =========================================
   FAVORITOS
   ========================================= */

function alternarFavorito(id) {

    const posicion =
        favoritos.indexOf(id);


    if (posicion === -1) {

        favoritos.push(id);

    } else {

        favoritos.splice(posicion, 1);

    }


    aplicarFiltros();

}


/* =========================================
   VER PRODUCTO
   ========================================= */

function verProducto(id) {

    const producto =
        productos.find(function(item) {

            return item.id === id;

        });


    if (!producto) {

        return;

    }


    detalleProducto.innerHTML = `

        <div class="row g-4">


            <!-- Imagen -->

            <div class="col-12 col-md-6">

                <div class="detalle-imagen">

                    <img
                        src="${producto.imagen}"
                        alt="Imagen de ${producto.nombre}"
                        onerror="this.style.display='none';">

                </div>

            </div>


            <!-- Información -->

            <div class="col-12 col-md-6">


                <span class="detalle-categoria">

                    ${obtenerNombreCategoria(producto.categoria)}

                </span>


                <h3 class="detalle-nombre">

                    ${producto.nombre}

                </h3>


                <div class="detalle-precio">

                    ${formatearPrecio(producto.precio)}

                </div>


                <p class="detalle-descripcion">

                    ${producto.descripcion}

                </p>


                <!-- Vendedor -->

                <div class="detalle-vendedor">

                    <h3>

                        Información del vendedor

                    </h3>


                    <p>

                        <strong>Nombre:</strong>
                        ${producto.vendedor}

                    </p>


                    <p>

                        <strong>Carrera:</strong>
                        ${producto.carrera}

                    </p>


                    <p>

                        <strong>Ubicación:</strong>
                        ${producto.contacto}

                    </p>

                </div>


                <!-- Carrito -->

                <button
                    type="button"
                    class="btn-ver-producto mt-3 w-100"
                    onclick="agregarCarrito(${producto.id})">

                    Agregar al carrito

                </button>

            </div>

        </div>

    `;


    const modal =
        new bootstrap.Modal(
            document.getElementById("modalProducto")
        );


    modal.show();

}


/* =========================================
   AGREGAR AL CARRITO
   ========================================= */

function agregarCarrito(id) {

    const producto =
        productos.find(function(item) {

            return item.id === id;

        });


    if (!producto) {

        return;

    }


    const yaExiste =
        carrito.some(function(item) {

            return item.id === id;

        });


    if (!yaExiste) {

        carrito.push(producto);

    }


    mostrarCarrito();

}


/* =========================================
   MOSTRAR CARRITO
   ========================================= */

function mostrarCarrito() {

    if (carrito.length === 0) {

        contenidoCarrito.innerHTML = `

            <p class="text-center text-muted">

                El carrito está vacío.

            </p>

        `;

        return;

    }


    let html = "";

    let total = 0;


    carrito.forEach(function(producto) {

        total += producto.precio;


        html += `

            <div class="carrito-producto">


                <div>

                    <div class="carrito-nombre">

                        ${producto.nombre}

                    </div>


                    <small>

                        ${producto.vendedor}

                    </small>

                </div>


                <span class="carrito-precio">

                    ${formatearPrecio(producto.precio)}

                </span>


            </div>

        `;

    });


    html += `

        <div class="carrito-total">

            <span>

                Total

            </span>


            <span>

                ${formatearPrecio(total)}

            </span>

        </div>


        <button
            type="button"
            class="btn-ver-producto w-100 mt-3"
            onclick="vaciarCarrito()">

            Vaciar carrito

        </button>

    `;


    contenidoCarrito.innerHTML = html;

}


/* =========================================
   VACIAR CARRITO
   ========================================= */

function vaciarCarrito() {

    carrito = [];

    mostrarCarrito();

}


/* =========================================
   ELIMINAR PUBLICACIÓN
   ========================================= */

function eliminarProducto(id) {

    const confirmar =
        confirm("¿Deseas eliminar esta publicación?");


    if (!confirmar) {

        return;

    }


    productos =
        productos.filter(function(producto) {

            return producto.id !== id;

        });


    favoritos =
        favoritos.filter(function(favoritoId) {

            return favoritoId !== id;

        });


    carrito =
        carrito.filter(function(producto) {

            return producto.id !== id;

        });


    aplicarFiltros();

    mostrarCarrito();

}


/* =========================================
   LIMPIAR FILTROS
   ========================================= */

function limpiarTodosLosFiltros() {

    buscadorProducto.value = "";

    filtroCategoria.value = "todas";

    precioMinimo.value = "";

    precioMaximo.value = "";

    ordenProductos.value = "relevancia";

    aplicarFiltros();

}


/* =========================================
   EVENTOS
   ========================================= */

buscadorProducto.addEventListener(
    "input",
    aplicarFiltros
);


filtroCategoria.addEventListener(
    "change",
    aplicarFiltros
);


precioMinimo.addEventListener(
    "input",
    aplicarFiltros
);


precioMaximo.addEventListener(
    "input",
    aplicarFiltros
);


ordenProductos.addEventListener(
    "change",
    aplicarFiltros
);


limpiarFiltros.addEventListener(
    "click",
    limpiarTodosLosFiltros
);

function aplicarCategoriaDeLaUrl() {
 
    const parametros =
        new URLSearchParams(window.location.search);
 
    const categoria =
        parametros.get("categoria");
 
    if (categoria && nombresCategorias[categoria]) {
 
        filtroCategoria.value = categoria;
 
        aplicarFiltros();
 
        return true;
 
    }
 
    return false;
 
}

/* =========================================
   INICIO
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (!aplicarCategoriaDeLaUrl()) {

            mostrarProductos(productos);

        }

        mostrarCarrito();

    }
);
