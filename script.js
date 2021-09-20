let rutas = [{id: 1, estado: 'bueno'},
    {id: 2, estado: 'bueno'},
    {id: 3, estado: 'malo'},
    {id: 4, estado: 'regular'},
    {id: 5, estado: 'malo'}];

let ciudades = [{id: 1, nombre: 'ROSARIO'},
    {id: 2, nombre: 'BUENOS AIRES'},
    {id: 3, nombre: 'CORDOBA'},
    {id: 4, nombre: 'MENDOZA'},
    {id: 5, nombre: 'PARANA'},
    {id: 6, nombre: 'VENADO TUERTO'}];

let distancias = [
    {punto1: 1, punto2: 2, distancia: 2000, ruta: 1},
    {punto1: 1, punto2: 3, distancia: 3000, ruta: 3},
    {punto1: 1, punto2: 4, distancia: 8000, ruta: 4},
    {punto1: 1, punto2: 5, distancia: 2000, ruta: 2}
];
const lista = document.getElementById("listaMalEstado");

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
    const botones = document.getElementById("listaCitys");
    botones.innerHTML = '';
    ciudades.forEach(ciudad => {
        botones.innerHTML += `<button type="button" class="list-group-item list-group-item-action">${ciudad.id} ${ciudad.nombre}</button>`;
    });
};

let selection = 0;
const listClick = (event) => {
    boton = event.target;
    if (selection < 2 && !boton.className.includes('active')) {
        boton = event.target;
        boton.className = "list-group-item list-group-item-action active";
        document.querySelectorAll('.form-control.my-3')[selection].placeholder = boton.textContent;
        selection++;
        if (document.querySelectorAll('.form-control.my-3')[1].placeholder !== '') {
            const camposA = document.getElementById('cityA');
            const camposB = document.getElementById('cityB');
            const distancia = distancias.find(distancia => (distancia.punto1 === parseInt(camposA.placeholder)|| distancia.punto2 === parseInt(camposA.placeholder)) && (distancia.punto2 === parseInt(camposA.placeholder) || distancia.punto2 === parseInt(camposB.placeholder)));
            const ruta = distancia ? rutas.find(ruta => ruta.id = distancia.ruta) : undefined;
            const dato1 = distancia ? `${distancia.distancia} km` : 'información no disponible';
            const dato2 = ruta ? `Ruta ${distancia.ruta}, Estado: ${ruta.estado} ` : 'información no disponible';
            document.getElementById('info1').textContent = dato1;
            document.getElementById('info2').textContent = dato2;
        }
    }
};

const nuevaConsulta = () => {
    let botonesCiudades = document.querySelectorAll('.list-group-item.list-group-item-action');
    botonesCiudades.forEach(boton => boton.className = "list-group-item list-group-item-action");
    document.querySelectorAll('.form-control.my-3').forEach(campo => campo.placeholder = '');
    document.querySelectorAll('.bigText').forEach(campo => campo.innerHTML = 'Seleccionar ciudades');
    selection = 0;
};

const agregar = (codigo, nombre) => {
    ciudades.push({id: codigo, nombre: nombre});
};

let botonesCiudades = document.querySelectorAll('.list-group-item.list-group-item-action');
const botonListar = document.querySelector('.btn.btn-primary.btn-lg');
const botonNuevaConsulta = document.querySelector('.btn.btn-warning.btn-lg');
botonListar.addEventListener('click', listarRutasMalas);
const botonLimpiar = document.querySelector('.btn.btn-danger.btn-lg');
botonLimpiar.addEventListener('click', limpiar);
listarCiudades();
botonesCiudades = document.querySelectorAll('.list-group-item.list-group-item-action');
botonesCiudades.forEach(boton => boton.addEventListener('click', listClick));
botonNuevaConsulta.addEventListener('click', nuevaConsulta);