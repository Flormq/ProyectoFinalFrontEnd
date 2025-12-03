import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito, guardarCarrito } from './storage.js';
import { actualizarContador, mostrarMensaje } from './ui.js';

const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedor = document.getElementById('contenedor-carrito');
    const resumenCarrito = document.getElementById('resumen-carrito');

    contenedor.innerHTML = "";
    resumenCarrito.innerHTML = "";

    if (!carrito.length) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "Tu carrito está vacío";

        contenedor.appendChild(mensaje);
        
        // Mostrar resumen vacío
        const divResumen = document.createElement("div");
        divResumen.classList.add("resumen-total");

        const h2 = document.createElement("h2");
        h2.textContent = "Resumen de Compra";

        const divSubtotal = document.createElement("div");
        divSubtotal.classList.add("total-items");
        divSubtotal.innerHTML = `<span>Subtotal:</span><span>$0.00</span>`;

        const divTotal = document.createElement("div");
        divTotal.classList.add("total-final");
        divTotal.innerHTML = `<span>Total a Pagar:</span><span>$0.00</span>`;

        divResumen.appendChild(h2);
        divResumen.appendChild(divSubtotal);
        divResumen.appendChild(divTotal);

        resumenCarrito.appendChild(divResumen);
        return;
    }

    carrito.forEach((producto, indice) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");

        const img = document.createElement("img");
        img.src = `../${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.classList.add("precio");
        precio.textContent = `$${producto.precio}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn");
        btnEliminar.classList.add("btn-eliminar-carrito");
        btnEliminar.textContent = "Eliminar producto";

        btnEliminar.addEventListener("click", () => {
            carrito.splice(indice, 1);
            guardarCarrito(carrito);
            mostrarMensaje("Producto eliminado");
            renderizarCarrito();
        });

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(btnEliminar);

        contenedor.appendChild(tarjeta);
    });

    // Calcular y mostrar totales
    const subtotal = carrito.reduce((total, producto) => total + producto.precio, 0);
    const total = subtotal;

    const divResumen = document.createElement("div");
    divResumen.classList.add("resumen-total");

    const h2 = document.createElement("h2");
    h2.textContent = "Resumen de Compra";

    const divSubtotal = document.createElement("div");
    divSubtotal.classList.add("total-items");
    divSubtotal.innerHTML = `<span>Subtotal:</span><span>$${subtotal.toLocaleString('es-AR')}</span>`;

    const divTotal = document.createElement("div");
    divTotal.classList.add("total-final");
    divTotal.innerHTML = `<span>Total a Pagar:</span><span>$${total.toLocaleString('es-AR')}</span>`;

    const btnComprar = document.createElement("button");
    btnComprar.classList.add("btn-comprar");
    btnComprar.textContent = "Proceder al Pago";

    divResumen.appendChild(h2);
    divResumen.appendChild(divSubtotal);
    divResumen.appendChild(divTotal);
    divResumen.appendChild(btnComprar);

    resumenCarrito.appendChild(divResumen);
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});
