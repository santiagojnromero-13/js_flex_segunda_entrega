

const lista_productos = [
  {
    id: 1,
    nombre: "Mate Camionero Algarrobo",
    precio: 23999,
    imagen: "./img/mate_camionero.jpg"
  },
  {
    id: 2,
    nombre: "Mate Imperial Negro",
    precio: 29999,
    imagen: "./img/mate_imperial.jpg"
  },
  {
    id: 3,
    nombre: "Mate Torpedo Premium",
    precio: 26999,
    imagen: "./img/mate_torpedo.jpg"
  },
  {
    id: 4,
    nombre: "Bombilla Acero Inoxidable",
    precio: 6999,
    imagen: "./img/bombilla.jpg"
  }
];


let carrito = JSON.parse(localStorage.getItem("carrito_titan_dis")) || [];

const productos_container = document.getElementById("productos_container");
const carrito_lista = document.getElementById("carrito_lista");
const carrito_total = document.getElementById("carrito_total");
const carrito_vacio = document.getElementById("carrito_vacio");
const btn_vaciar_carrito = document.getElementById("btn_vaciar_carrito");


function mostrar_productos(lista) {
  productos_container.innerHTML = "";

  for (const producto of lista) {
    const card = document.createElement("article");
    card.classList.add("card_producto");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$ ${producto.precio}</p>
      <button id="btn_agregar_${producto.id}">Agregar al carrito</button>
    `;

    productos_container.appendChild(card);

    const btn_agregar = document.getElementById(`btn_agregar_${producto.id}`);

    btn_agregar.addEventListener("click", function () {
      agregar_al_carrito(producto.id);
    });
  }
}


function agregar_al_carrito(id_producto) {
  const producto_encontrado = lista_productos.find((p) => p.id === id_producto);

  if (!producto_encontrado) return;

  const item_existente = carrito.find((item) => item.id === id_producto);

  if (item_existente) {
    item_existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto_encontrado.id,
      nombre: producto_encontrado.nombre,
      precio: producto_encontrado.precio,
      cantidad: 1
    });
  }

  actualizar_carrito();
}


function eliminar_del_carrito(id_producto) {
  const index = carrito.findIndex((item) => item.id === id_producto);

  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
    } else {
      carrito.splice(index, 1);
    }
  }

  actualizar_carrito();
}


function vaciar_carrito() {
  carrito = [];
  actualizar_carrito();
}


function actualizar_carrito() {
  carrito_lista.innerHTML = "";

  if (carrito.length === 0) {
    carrito_vacio.style.display = "block";
  } else {
    carrito_vacio.style.display = "none";
  }

  for (const item of carrito) {
    const li = document.createElement("li");
    li.classList.add("item_carrito");

    li.innerHTML = `
      <span>${item.nombre} x ${item.cantidad}</span>
      <span>$ ${item.precio * item.cantidad}</span>
      <button id="btn_eliminar_${item.id}">-</button>
    `;

    carrito_lista.appendChild(li);

    const btn_eliminar = document.getElementById(`btn_eliminar_${item.id}`);

    btn_eliminar.addEventListener("click", function () {
      eliminar_del_carrito(item.id);
    });
  }


  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  carrito_total.textContent = total;

 
  localStorage.setItem("carrito_titan_dis", JSON.stringify(carrito));
}



btn_vaciar_carrito.addEventListener("click", vaciar_carrito);



mostrar_productos(lista_productos);
actualizar_carrito();
