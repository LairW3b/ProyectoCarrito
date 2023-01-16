const btnCarrito = document.querySelector('#carrito-btn')
const vaciar = document.querySelector('#vaciar-carrito')
const carrito = document.querySelector('#carrito')
const listaProductos = document.querySelector('#lista-productos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
let articulosCarrito = [];

cargarAddEventListerns()
function cargarAddEventListerns() {
  btnCarrito.addEventListener('click', showCarrito)

  listaProductos.addEventListener('click', agregarProducto)

  carrito.addEventListener('click', eliminarProducto)

  vaciar.addEventListener('click', vaciarCarrito)
}

function eliminarProducto(e) {
  if(e.target.classList.contains('closeProduct')) {
    const productoId = e.target.getAttribute('id')
    articulosCarrito.forEach(producto => {
      if(producto.id === productoId) {
        if(producto.cantidad > 1) {
          producto.cantidad-=1
          carritoHTML()
        }else {
          articulosCarrito = articulosCarrito.filter( producto => producto.id !== productoId)
          carritoHTML()
        }
      }
    })
  }
}

function vaciarCarrito() {
  articulosCarrito=[]
  limpiarHTML()
}

function showCarrito() {
  carrito.classList.contains('showCarrito') ?
  carrito.classList.remove('showCarrito') :
  carrito.classList.add('showCarrito')
}

// Funciones
function agregarProducto(e) {
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    const productoSeleccionado = e.target.parentElement.parentElement
    leerDatosCurso(productoSeleccionado)
  }
}

function leerDatosCurso(producto) {

  const infoProductos = {
    imagen: producto.querySelector('img').src,
    nombre: producto.querySelector('.card-title').textContent,
    precio: producto.querySelector('#precio').textContent,
    id: producto.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  const existe = articulosCarrito.some( producto => 
    producto.id === infoProductos.id
  );

  if(existe) {
    const productos = articulosCarrito.map(producto => {
      if(producto.id === infoProductos.id){
        producto.cantidad++
        return producto
      } else {
        return producto;
      }
    })
    articulosCarrito = [...productos]
  } else {
    articulosCarrito = [...articulosCarrito, infoProductos]
  }

  carritoHTML()
  
}

function carritoHTML() {

  limpiarHTML()

  articulosCarrito.forEach( producto => {
    const {imagen, nombre, precio, cantidad, id} = producto
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>
        <img src='${imagen}' width='80'/>
      </td>
      <td>
        ${nombre}
      </td>
      <td>
        ${precio}
      </td>
      <td class='text-center'>
        ${cantidad}
      </td>
      <td class="closeProduct" id='${id}'>
        X
      </td>
    `;

    contenedorCarrito.appendChild(row)

  })
}

function limpiarHTML() {
  while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}



