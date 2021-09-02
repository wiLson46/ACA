let rutas = [{ id: 1, estado: 'bueno' },
{ id: 2, estado: 'bueno' },
{ id: 3, estado: 'malo' },
{ id: 4, estado: 'regular' },
{ id: 5, estado: 'malo' }];

let ciudades = [{ id: 1, nombre: 'ROSARIO' },
{ id: 2, nombre: 'BUENOS AIRES' },
{ id: 3, nombre: 'CORDOBA' },
{ id: 4, nombre: 'MENDOZA' },
{ id: 5, nombre: 'PARANA' }];

let conexiones = [{
    origen: 'ROSARIO',
    BUENOSAIRES: { ruta: 1, distancia: 4000 },
    CORDOBA: { ruta: 3, distancia: 2000 },
    MENDOZA: { ruta: 2, distancia: 8000 },
    PARANA: { ruta: 4, distancia: 3000 }
},
{
    origen: 'BUENOS AIRES',
    ROSARIO: { ruta: 1, distancia: 4000 },
    CORDOBA: { ruta: 3, distancia: 5000 },
    MENDOZA: { ruta: 2, distancia: 3000 },
    PARANA: { ruta: 1, distancia: 6000 }
},
{
    origen: 'CORDOBA',
    ROSARIO: { ruta: 3, distancia: 2000 },
    BUENOSAIRES: { ruta: 3, distancia: 5000 },
    MENDOZA: { ruta: 5, distancia: 7000 },
    PARANA: { ruta: 4, distancia: 6000 }
},
{
    origen: 'MENDOZA',
    ROSARIO: { ruta: 2, distancia: 8000 },
    BUENOSAIRES: { ruta: 2, distancia: 3000 },
    CORDOBA: { ruta: 5, distancia: 7000 },
    PARANA: { ruta: 3, distancia: 12000 }
},
{
    origen: 'PARANA',
    ROSARIO: { ruta: 4, distancia: 3000 },
    BUENOSAIRES: { ruta: 1, distancia: 6000 },
    CORDOBA: { ruta: 4, distancia: 6000 },
    MENDOZA: { ruta: 3, distancia: 12000 }
}];

const lista = document.querySelector('#listaMalEstado');

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
    boton = event.target;
    if (selection < 2 && !boton.className.includes('active')) {
        boton = event.target;
        boton.className = "list-group-item list-group-item-action active";
        document.querySelectorAll('.form-control.my-3')[selection].placeholder = boton.textContent;
        selection++;
        if (document.querySelectorAll('.form-control.my-3')[1].placeholder !== '') {
            const info = document.querySelectorAll('.bigText');
            const origen = conexiones.find(conexion => conexion.origen === document.querySelectorAll('.form-control.my-3')[0].placeholder);
            const dest = (document.querySelectorAll('.form-control.my-3')[1]);
            info[0].innerHTML = origen[dest.placeholder.replaceAll(' ', '')].distancia;
            const rutaCon = origen[dest.placeholder.replaceAll(' ', '')].ruta;
            const estadoRuta = rutas.find(ruta => ruta.id === origen[dest.placeholder.replaceAll(' ', '')].ruta);
            info[1].innerHTML = `Ruta: ${rutaCon}, Estado: ${estadoRuta.estado}`;
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
