const PRECIO_MAXIMO = 10000000;
const LARGO_MINIMO_DESCRIPCION = 20;
const PESO_MAXIMO_IMAGEN = 5000000;
const ANCHO_MAXIMO_IMAGEN = 800;
 
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
const botonBorrar = document.getElementById("borrarPublicaciones");
 
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
 
function quitarImagen() {
    imagenElegida = "";
    campoImagen.value = "";
    vistaPrevia.hidden = true;
}
 
function elegirImagen() {
    const datos = CAMPOS[7];
 
    if (campoImagen.files.length === 0) {
        quitarImagen();
        return borrarError(datos);
    }
 
    const archivo = campoImagen.files[0];
 
    if (archivo.type.substring(0, 6) !== "image/") {
        quitarImagen();
        return mostrarError(datos, "El archivo debe ser una imagen.");
    }
 
    if (archivo.size > PESO_MAXIMO_IMAGEN) {
        quitarImagen();
        return mostrarError(datos, "La imagen no puede pesar más de 5 MB.");
    }
 
    const lector = new FileReader();
 
    lector.onload = function () {
        achicarImagen(lector.result);
    };
 
    lector.readAsDataURL(archivo);
 
    return borrarError(datos);
}
 
function achicarImagen(imagenOriginal) {
    const imagen = new Image();
 
    imagen.onload = function () {
        let ancho = imagen.width;
        let alto = imagen.height;
 
        if (ancho > ANCHO_MAXIMO_IMAGEN) {
            alto = Math.round(alto * ANCHO_MAXIMO_IMAGEN / ancho);
            ancho = ANCHO_MAXIMO_IMAGEN;
        }
 
        const lienzo = document.createElement("canvas");
        lienzo.width = ancho;
        lienzo.height = alto;
 
        const pincel = lienzo.getContext("2d");
        pincel.drawImage(imagen, 0, 0, ancho, alto);
 
        imagenElegida = lienzo.toDataURL("image/jpeg", 0.7);
        imagenPrevia.src = imagenElegida;
        vistaPrevia.hidden = false;
    };
 
    imagen.src = imagenOriginal;
}
 
function siguienteId() {
    let mayor = 0;
 
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id > mayor) {
            mayor = productos[i].id;
        }
    }
 
    return mayor + 1;
}
 
function crearProducto() {
    return {
        id: siguienteId(),
        nombre: campoNombre.value.trim(),
        categoria: campoCategoria.value,
        precio: Number(campoPrecio.value),
        descripcion: campoDescripcion.value.trim(),
        vendedor: campoVendedor.value.trim(),
        carrera: campoCarrera.value.trim(),
        contacto: campoContacto.value.trim(),
        imagen: imagenElegida
    };
}
 
function crearResumen(producto) {
    let html = "";
 
    html += '<article class="publicado">';
    html += '<span class="publicado-categoria">' + NOMBRES_CATEGORIAS[producto.categoria] + '</span>';
    html += '<h3 class="publicado-nombre">' + producto.nombre + '</h3>';
    html += '<p class="publicado-texto">' + producto.descripcion + '</p>';
    html += '<div class="publicado-pie">';
    html += '<span class="publicado-precio">' + producto.precio + ' CLP</span>';
    html += '<span class="publicado-usuario">Por ' + producto.vendedor + '</span>';
    html += '</div>';
    html += '</article>';
 
    return html;
}
 
function mostrarPublicados() {
    const publicadas = leerPublicaciones();
    let html = "";
 
    for (let i = 0; i < publicadas.length; i++) {
        html += crearResumen(publicadas[i]);
    }
 
    listaPublicados.innerHTML = html;
 
    if (publicadas.length > 0) {
        seccionPublicados.hidden = false;
    } else {
        seccionPublicados.hidden = true;
    }
}
 
function vaciarCampos() {
    for (let i = 0; i < CAMPOS.length; i++) {
        CAMPOS[i].campo.value = "";
        borrarError(CAMPOS[i]);
    }
 
    quitarImagen();
    contadorDescripcion.textContent = "0 caracteres";
}
 
function limpiarTodo() {
    vaciarCampos();
 
    mensajeError.hidden = true;
    mensajeExito.hidden = true;
}
 
function publicarProducto(evento) {
    evento.preventDefault();
 
    if (validarFormulario() === false) {
        mensajeExito.hidden = true;
        mensajeError.hidden = false;
        return;
    }
 
    const producto = crearProducto();
 
    if (guardarPublicacion(producto) === false) {
        mensajeExito.hidden = true;
        mensajeError.hidden = false;
        mostrarError(CAMPOS[7], "No queda espacio en el navegador. Usa Borrar todas.");
        return;
    }
 
    productos.push(producto);
 
    mostrarPublicados();
 
    mensajeError.hidden = true;
    mensajeExito.hidden = false;
 
    vaciarCampos();
}
 
formPublicar.addEventListener("submit", publicarProducto);
 
botonLimpiar.addEventListener("click", limpiarTodo);
 
campoImagen.addEventListener("change", elegirImagen);
 
botonQuitarImagen.addEventListener("click", quitarImagen);
 
botonBorrar.addEventListener("click", function () {
    borrarPublicaciones();
    mostrarPublicados();
});
 
campoDescripcion.addEventListener("input", function () {
    const largo = campoDescripcion.value.trim().length;
 
    if (largo > 0 && largo < LARGO_MINIMO_DESCRIPCION) {
        contadorDescripcion.textContent = largo + " caracteres (mínimo " + LARGO_MINIMO_DESCRIPCION + ")";
    } else {
        contadorDescripcion.textContent = largo + " caracteres";
    }
});
 
for (let i = 0; i < CAMPOS.length; i++) {
    CAMPOS[i].campo.addEventListener("blur", function () {
        validarCampo(CAMPOS[i]);
    });
}
 
mostrarPublicados();