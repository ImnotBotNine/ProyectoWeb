const PRECIO_MAXIMO = 10000000;
const LARGO_MINIMO_DESCRIPCION = 20;

const NOMBRES_CATEGORIAS = {
    libros: "Libros",
    computadores: "Computadores",
    accesorios: "Accesorios",
    instrumentos: "Instrumentos",
    deportes: "Artículos deportivos",
    otros: "Otros productos"
};

const formPublicar = document.getElementById("formPublicar");
const campoNombre = document.getElementById("nombre");
const campoCategoria = document.getElementById("categoria");
const campoPrecio = document.getElementById("precio");
const campoDescripcion = document.getElementById("descripcion");
const campoVendedor = document.getElementById("vendedor");
const campoCarrera = document.getElementById("carrera");
const campoContacto = document.getElementById("contacto");
const campoImagen = document.getElementById("imagen");

const mensajeExito = document.getElementById("mensajeExito");
const mensajeError = document.getElementById("mensajeError");
const contadorDescripcion = document.getElementById("contadorDescripcion");
const botonLimpiar = document.getElementById("limpiarFormulario");
const seccionPublicados = document.getElementById("seccionPublicados");
const listaPublicados = document.getElementById("listaPublicados");
const vistaPrevia = document.getElementById("vistaPrevia");
const imagenPrevia = document.getElementById("imagenPrevia");
const botonQuitarImagen = document.getElementById("quitarImagen");

const CAMPOS = [
    { campo: campoNombre, error: "errorNombre", nombre: "el nombre del producto", minimo: 5, maximo: 80 },
    { campo: campoCategoria, error: "errorCategoria", nombre: "una categoría", tipo: "seleccion" },
    { campo: campoPrecio, error: "errorPrecio", nombre: "un precio", tipo: "precio" },
    { campo: campoDescripcion, error: "errorDescripcion", nombre: "la descripción", minimo: 20, maximo: 300 },
    { campo: campoVendedor, error: "errorVendedor", nombre: "tu nombre", minimo: 3, maximo: 60 },
    { campo: campoCarrera, error: "errorCarrera", nombre: "tu carrera", minimo: 3, maximo: 60 },
    { campo: campoContacto, error: "errorContacto", nombre: "el lugar de entrega", minimo: 3, maximo: 60 },
    { campo: campoImagen, error: "errorImagen", nombre: "la imagen", tipo: "imagen" }
];

const publicados = [];

let imagenElegida = "";

function mostrarError(datos, mensaje) {
    datos.campo.classList.add("is-invalid");
    document.getElementById(datos.error).textContent = mensaje;
    return false;
}

function borrarError(datos) {
    datos.campo.classList.remove("is-invalid");
    document.getElementById(datos.error).textContent = "";
    return true;
}

function validarTexto(datos) {
    const valor = datos.campo.value.trim();

    if (valor === "") {
        return mostrarError(datos, "Debes completar " + datos.nombre + ".");
    }

    if (valor.length < datos.minimo) {
        return mostrarError(datos, "Escribe al menos " + datos.minimo + " caracteres.");
    }

    if (valor.length > datos.maximo) {
        return mostrarError(datos, "No puede superar los " + datos.maximo + " caracteres.");
    }

    return borrarError(datos);
}

function validarSeleccion(datos) {
    if (datos.campo.value === "") {
        return mostrarError(datos, "Elige " + datos.nombre + ".");
    }

    return borrarError(datos);
}

function validarPrecio(datos) {
    const valor = datos.campo.value.trim();

    if (valor === "") {
        return mostrarError(datos, "Debes indicar " + datos.nombre + ".");
    }

    const numero = Number(valor);

    if (numero <= 0) {
        return mostrarError(datos, "El precio debe ser un número mayor que 0.");
    }

    if (numero > PRECIO_MAXIMO) {
        return mostrarError(datos, "El precio no puede superar los 10.000.000.");
    }

    return borrarError(datos);
}

function validarCampo(datos) {
    if (datos.tipo === "seleccion") {
        return validarSeleccion(datos);
    }

    if (datos.tipo === "precio") {
        return validarPrecio(datos);
    }

    if (datos.tipo === "imagen") {
        return true;
    }

    return validarTexto(datos);
}

function validarFormulario() {
    let todoBien = true;

    for (let i = 0; i < CAMPOS.length; i++) {
        if (validarCampo(CAMPOS[i]) === false) {
            todoBien = false;
        }
    }

    return todoBien;
}

formPublicar.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (validarFormulario() === false) {
        mensajeError.hidden = false;
    } else {
        mensajeError.hidden = true;
    }
});