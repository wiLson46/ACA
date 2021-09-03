let rutas = [{id: 1, estado: 'bueno'},
    {id: 2, esatdo: 'bueno'},
    {id: 3, estado: 'malo'},
    {id: 4, estado: 'regular'},
    {id: 5, estado: 'malo'}];

let ciudades = [{id: 1, nombre: 'Rosario'},
    {id: 2, nombre: 'Buenos Aires'},
    {id: 3, nombre: 'Cordoba'}];

const lista = document.querySelector('#rutasmalas');

const distancia = (origen, destino) => {
    if (origen < destino)
        return destino - origen;
    else
        return origen - destino;
};

const listarRutasMalas = () => {
    lista.innerHTML = '';
    rutas.forEach(ruta => {
        if (ruta.estado === 'malo') {
            lista.innerHTML += `<li class="list-group-item list-group-item-danger">
            La ruta ${ruta.id} tiene un estado ${ruta.estado}</li>`;
        }
    });
};

const limpiar = () => {
    lista.innerHTML = '';
};

const listarCiudades = () => {
    const botones = document.querySelector('.list-group');
    botones.innerHTML = '';
    ciudades.forEach(ciudad => {
        botones.innerHTML += `<button type="button" class="list-group-item list-group-item-action">${ciudad.nombre}</button>`;
    });
};

let selection = 0;
const listClick = (event) => {
    if (selection < 2){
        selection++;
        boton = event.target;
        boton.attributes.className = "list-group-item list-group-item-action active";
    }
    console.log(event.target.attributes.className);
};

let botonesCiudades = document.querySelectorAll('.list-group-item.list-group-item-action');
const botonListar = document.querySelector('.btn.btn-primary.btn-lg');
botonListar.addEventListener('click', listarRutasMalas);
const botonLimpiar = document.querySelector('.btn.btn-danger.btn-lg');
botonLimpiar.addEventListener('click', limpiar);
listarCiudades();
botonesCiudades = document.querySelectorAll('.list-group-item.list-group-item-action');
botonesCiudades.forEach(boton => boton.addEventListener('click', listClick));