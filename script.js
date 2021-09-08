let rutas = [{id: 1, estado: 'Bueno'},
    {id: 2, estado: 'Bueno'},
    {id: 3, estado: 'Malo'},
    {id: 4, estado: 'Regular'},
    {id: 5, estado: 'Malo'}];

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

const limpiar = () => lista.innerHTML = '';

const listarCiudades = () => {
    const botones = document.getElementById("listaCitys");
    botones.innerHTML = '';
    ciudades.forEach(ciudad => botones.innerHTML += `<button type="button" class="list-group-item list-group-item-action">${ciudad.id} ${ciudad.nombre}</button>`);
};

let selection = 0;
const listClick = (event) => {
    console.log(rutas);
    boton = event.target;
    if (selection < 2 && !boton.className.includes('active')) {
        boton = event.target;
        boton.className = "list-group-item list-group-item-action active";
        document.querySelectorAll('.form-control.my-3')[selection].placeholder = boton.textContent;
        selection++;
        if (document.querySelectorAll('.form-control.my-3')[1].placeholder !== '') {
            const camposA = document.getElementById('cityA');
            const camposB = document.getElementById('cityB');
            const distancia = distancias.find(distancia => (distancia.punto1 === parseInt(camposA.placeholder)||distancia.punto2 === parseInt(camposA.placeholder)) && (distancia.punto1 === parseInt(camposB.placeholder)||distancia.punto2 === parseInt(camposB.placeholder)));
            const ruta = distancia ? rutas.find(ruta => ruta.id === distancia.ruta) : undefined;
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
    nombre = nombre.toUpperCase();
    //ciudad.push({id: ciudad.length+1, nombre: nombre});
    ciudades.push({id: codigo, nombre: nombre});
};

const clickAgregar = () => {
    if(document.getElementById("agregaID").value.trim() === '' || document.getElementById("agregaNombre").value.trim() === ''){
        alert('Debe completar los datos');
        document.getElementById("agregaNombre").value = '';
        document.getElementById("agregaID").value = '';
        return;
    }
    agregar(document.getElementById("agregaID").value, document.getElementById("agregaNombre").value);
    listarCiudades();
    botonesCiudades = document.querySelectorAll('.list-group-item.list-group-item-action');
    botonesCiudades.forEach(boton => boton.addEventListener('click', listClick));
    document.getElementById("agregaID").value = '';
    document.getElementById("agregaNombre").value = '';
};

const eliminar = (codigo) => {
    ciudades.splice(codigo - 1, 1);
    listarCiudades();
    botonesCiudades = document.querySelectorAll('.list-group-item.list-group-item-action');
    botonesCiudades.forEach(boton => boton.addEventListener('click', listClick));
    document.getElementById("eliminaID").value = '';
    document.getElementById("eliminaNombre").value = '';
};

const clickEliminar = () => {
    const codigo = document.getElementById("eliminaID").value;
    eliminar(codigo);
};

const agregaDistancia = () => {
    let rutaNueva = +document.getElementById("numruta").value;
    let distanciaNueva = +document.getElementById("distanciaNueva").value;
    let punto1 = parseInt(document.getElementById("cityA").placeholder);
    let punto2 = parseInt(document.getElementById("cityB").placeholder);
    let estado = document.getElementById("inputGroupSelect04").options[document.getElementById("inputGroupSelect04").selectedIndex].text;
    let rutaExiste = rutas.findIndex(ruta => ruta.id === rutaNueva);
    if (rutaExiste < 0){
        rutas.push({id: rutaNueva, estado: estado});
    }
    distancias.push({punto1: +punto1, punto2: +punto2, distancia: +distanciaNueva, ruta: +rutaNueva});
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
document.getElementById("agregarBTN").addEventListener('click', clickAgregar);
document.getElementById("eliminaBTN").addEventListener('click', clickEliminar);
document.getElementById("cambiaDistancia").addEventListener('click', agregaDistancia);