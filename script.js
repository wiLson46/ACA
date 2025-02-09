console.log("version 1.7.4");
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
        if (ruta.estado === 'Malo') {
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
    boton = event.target;
    if (selection < 2 && !boton.className.includes('active')) {
        boton = event.target;
        boton.className = "list-group-item list-group-item-action active";
        document.querySelectorAll('.form-control.my-3')[selection].placeholder = boton.textContent;
        selection++;
        if (document.querySelectorAll('.form-control.my-3')[1].placeholder !== '') {
            const camposA = document.getElementById('cityA');
            const camposB = document.getElementById('cityB');
            const distancia = findByPoint(camposA,camposB);
            const ruta = distancia ? rutas.find(ruta => ruta.id === distancia.ruta) : undefined;
            const dato1 = distancia ? `${distancia.distancia} km` : 'información no disponible';
            const dato2 = ruta ? `Ruta ${distancia.ruta}, Estado: ${ruta.estado} ` : 'información no disponible';
            document.getElementById('info1').textContent = dato1;
            document.getElementById('info2').textContent = dato2;
            document.getElementById('numruta').value = distancia ? distancia.ruta : 'no disponible';
            document.getElementById('distanciaNueva').value = distancia ? distancia.distancia : 'no disponible';
            const opciones = document.getElementsByTagName("option");
            if (ruta) {
                for (var i = 0; i < opciones.length; i++) {
                    if (ruta.estado === opciones[i].text) {
                        document.getElementById("inputGroupSelect04").value = i;
                    }
                }
            } else {
                document.getElementById("inputGroupSelect04").value = 0;
            }
        }
    }
};

const nuevaConsulta = () => {
    let botonesCiudades = document.querySelectorAll('.list-group-item.list-group-item-action');
    botonesCiudades.forEach(boton => boton.className = "list-group-item list-group-item-action");
    document.querySelectorAll('.form-control.my-3').forEach(campo => campo.placeholder = '');
    document.querySelectorAll('.bigText').forEach(campo => campo.innerHTML = 'Seleccionar ciudades');
    document.getElementById('numruta').value = '';
    document.getElementById('distanciaNueva').value = '';
    document.getElementById("inputGroupSelect04").value = 0;
    selection = 0;
};

const agregar = (codigo, nombre) => {
    let existe = ciudades.findIndex(ciudad => ciudad.id === codigo);
    if (existe >= 0 || isNaN(codigo)) {
        document.getElementById("alerta1").classList.remove("d-none");
        return;
    }
    nombre = nombre.toUpperCase();
    ciudades.push({id: codigo, nombre: nombre});
    document.getElementById("agregaNombre").value = '';
    document.getElementById("agregaID").value = '';
    document.getElementById("alerta1").classList.add("d-none");
    document.getElementById("alerta5").classList.remove("d-none");
    setTimeout(() => {
        document.getElementById("alerta5").classList.add("d-none");
    }, 3000);
};

const clickAgregar = () => {
    if (document.getElementById("agregaID").value.trim() === '' || document.getElementById("agregaNombre").value.trim() === '') {
        document.getElementById("alerta1").classList.remove("d-none");
        return;
    }
    agregar(parseInt(document.getElementById("agregaID").value), document.getElementById("agregaNombre").value);
    listarCiudades();
    botonesCiudades = document.querySelectorAll('.list-group-item.list-group-item-action');
    botonesCiudades.forEach(boton => boton.addEventListener('click', listClick));
};

const eliminar = (codigo) => {
    let existe = ciudades.findIndex(ciudad => ciudad.id === +codigo);
    if (existe < 0) {
        document.getElementById("alerta2").classList.remove("d-none");
        return;
    }
    ciudades.splice(existe, 1);
    listarCiudades();
    botonesCiudades = document.querySelectorAll('.list-group-item.list-group-item-action');
    botonesCiudades.forEach(boton => boton.addEventListener('click', listClick));
    document.getElementById("eliminaID").value = '';
    document.getElementById("alerta2").classList.add("d-none");
    document.getElementById("alerta6").classList.remove("d-none");
    setTimeout(() => {
        document.getElementById("alerta6").classList.add("d-none");
    }, 3000);
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
    if (isNaN(rutaNueva) || isNaN(distanciaNueva) || punto1 === '' || punto2 === '' || estado === 'Nuevo estado de ruta') {
        document.getElementById("alerta3").classList.remove("d-none");
        return;
    }
    let rutaExiste = rutas.findIndex(ruta => ruta.id === rutaNueva);
    if (rutaExiste < 0) {
        rutas.push({id: rutaNueva, estado: estado});
    } else {
        rutas[rutaExiste].estado = estado;
    }
    const camposA = document.getElementById('cityA');
    const camposB = document.getElementById('cityB');
    const distancia = distancias.findIndex(distancia => (distancia.punto1 === parseInt(camposA.placeholder) || distancia.punto2 === parseInt(camposA.placeholder)) && (distancia.punto1 === parseInt(camposB.placeholder) || distancia.punto2 === parseInt(camposB.placeholder)));
    if (distancia >= 0) {
        distancias[distancia] = {punto1: +punto1, punto2: +punto2, distancia: +distanciaNueva, ruta: +rutaNueva};
    } else {
        distancias.push({punto1: +punto1, punto2: +punto2, distancia: +distanciaNueva, ruta: +rutaNueva});
    }
    document.getElementById("alerta3").classList.add("d-none");
    document.getElementById("alerta4").classList.remove("d-none");
    setTimeout(() => {
        document.getElementById("alerta4").classList.add("d-none");
    }, 3000);
};

const findByPoint = (camposA, camposB) => {
    const distancia = distancias.find(distancia => (distancia.punto1 === parseInt(camposA.placeholder) || distancia.punto2 === parseInt(camposA.placeholder)) && (distancia.punto1 === parseInt(camposB.placeholder) || distancia.punto2 === parseInt(camposB.placeholder)));
    return distancia;
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
