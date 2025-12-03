import { agregarAlCarrito } from './funcionesCarrito.js';
import { obtenerCarrito } from './storage.js';
import { actualizarContador } from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById('contenedor-tarjetas');
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    fetch("./data/productos.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error HTTP status: ${res.status}`);
            }

            return res.json();
        })
        .then((data) => {
            data.forEach((producto) => {
                const tarjeta = document.createElement("article");
                tarjeta.classList.add("card");
                tarjeta.setAttribute("data-id", producto.id);

                // Contenedor de imagen
                const imgContainer = document.createElement("div");
                imgContainer.classList.add("img-container");

                const img = document.createElement("img");
                img.alt = producto.nombre;
                img.src = `./${producto.img}`;

                // Etiqueta
                const etiqueta = document.createElement("span");
                etiqueta.classList.add("etiqueta");
                etiqueta.textContent = "Nuevo";

                imgContainer.appendChild(img);
                imgContainer.appendChild(etiqueta);

                // Título
                const titulo = document.createElement("h3");
                titulo.textContent = producto.nombre;

                // Precio
                const precio = document.createElement("p");
                precio.classList.add("precio");
                precio.textContent = `$${producto.precio}`;

                // Botón
                const boton = document.createElement("button");
                boton.classList.add("btn");
                boton.setAttribute("data-precio", producto.precio);
                boton.textContent = "Agregar al Carrito";

                boton.addEventListener("click", () => {
                    agregarAlCarrito(producto)
                });

                tarjeta.appendChild(imgContainer);
                tarjeta.appendChild(titulo);
                tarjeta.appendChild(precio);
                tarjeta.appendChild(boton);

                contenedor.appendChild(tarjeta);
            });
        })
        .catch((err) => console.log(err));
});
