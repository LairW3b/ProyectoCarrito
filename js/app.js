const btnCarrito = document.querySelector('#carrito-btn')
const carrito = document.querySelector('#carrito')

cargarAddEventListerns()
function cargarAddEventListerns() {
  btnCarrito.addEventListener('click', showCarrito)
}

function showCarrito() {
  carrito.classList.contains('showCarrito') ?
    carrito.classList.remove('showCarrito') :
    carrito.classList.add('showCarrito')
}




