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