var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
var actividadesRestaurante = {
    type: 'list',
    name: 'actividades',
    message: 'Acciones que realiza el restaurante',
    choices: [
        'Ingresar una nueva opción al menú',
        'Eliminar opciones del menú',
        'Listar los pedido según su estado',
        'Cambiar el estado del pedido seleccionado'
    ]
};
var cuestionarioDatosNuevaOpcion = [
    {
        type: 'input',
        name: 'idOpcion',
        message: 'Ingrese el identificador de la opción:'
    },
    {
        type: 'input',
        name: 'nombreOpcion',
        message: 'Ingrese el nombre para la nuva opción:'
    },
    {
        type: 'input',
        name: 'urlImagenOpcion',
        message: 'Ingrese la URL de la imagen para la nueva opción:'
    },
    {
        type: 'input',
        name: 'valorOpcion',
        message: 'Ingrese el valor asignado a la nueva opción:'
    }
];
var cuestionarioEliminarOpcionMenu = [
    {
        type: 'input',
        name: 'idOpcion',
        message: 'Ingrese el identificador de la opción que desea eliminar:'
    }
];
var cuestionarioListarPorEstadoPedido = [
    {
        type: 'input',
        name: 'estadoPedido',
        message: 'Ingrese el estado que corresponda según que pedido desea listar:'
    }
];
var cuestionarioCambioEstadoPedido = [
    {
        type: 'input',
        name: 'idPedido',
        message: 'Digite el identificador del pedido cuyo estado va cambiar:'
    },
    {
        type: 'input',
        name: 'estadoPedido',
        message: 'Digite el nuevo estado:'
    }
];
function main() {
    inicializarBase()
        .pipe(mergeMap(// preguntar opcion
    function (respuestaBDD) {
        return presentarActividadesRestaurante()
            .pipe(map(function (respuesta) {
            return {
                respuestaUsuario: respuesta,
                respuestaBDD: respuestaBDD
            };
        }));
    }), mergeMap(function (respuesta) {
        console.log(respuesta);
        switch (respuesta.respuestaUsuario.actividadRestaurante) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(cuestionarioDatosNuevaOpcion))
                    .pipe(map(function (opcionMenu) {
                    respuesta.opcionMenu = opcionMenu;
                    return respuesta;
                }));
            case 'Eliminar':
                return rxjs
                    .from(inquirer.prompt(cuestionarioEliminarOpcionMenu))
                    .pipe(map(function (opcionMenu) {
                    respuesta.opcionMenu = opcionMenu;
                    return respuesta;
                }));
            case 'Buscar':
                return rxjs
                    .from(inquirer.prompt(cuestionarioListarPorEstadoPedido))
                    .pipe(map(function (estadoPedido) {
                    respuesta.pedido.estadoPedido = estadoPedido;
                    return respuesta;
                }));
            case 'Actualizar':
                return rxjs
                    .from(inquirer.prompt(cuestionarioCambioEstadoPedido))
                    .pipe(map(function (pedidoPorActualizar) {
                    respuesta.pedido = pedidoPorActualizar;
                    return respuesta;
                }));
            /*
                                    default:
                                        respuesta.usuario = {
                                            id: null,
                                            nombre: null
                                        };
                                        rxjs.of(respuesta)
            */
        }
    }), // Ejecutar Accion
    map(function (respuesta) {
        console.log('respuesta en accion', respuesta);
        switch (respuesta.respuestaUsuario.actividadRestaurante) {
            case 'Crear':
                var nuevaOpcionMenu = respuesta.opcionMenu;
                respuesta.respuestaBDD.bdd.menu.opciones.push(nuevaOpcionMenu);
                return respuesta;
            case 'Eliminar':
                var opcionMenuParaEliminar = respuesta.opcionMenu;
                var indiceParaEliminar = respuesta.respuestaBDD.bdd.menu.opciones.indexOf(opcionMenuParaEliminar);
                respuesta.respuestaBDD.bdd.menu.opciones.splice(indiceParaEliminar, 1);
                return respuesta;
            case 'Buscar':
                var estadoPorBuscar_1 = respuesta.pedido.estadoPedido;
                var pedidosFiltrados = respuesta.respuestaBDD.bdd.pedidos.filter(function (pedido) { return pedido.estadoPedido === estadoPorBuscar_1; });
                console.log(pedidosFiltrados);
                return respuesta;
            case 'Actualizar':
                var idPedidoPorBuscar_1 = respuesta.pedido.idPedido;
                var pedidoRequerido = respuesta.respuestaBDD.bdd.pedidos.filter(function (pedido) { return pedido.idPedido === idPedidoPorBuscar_1; });
                pedidoRequerido[0].estadoPedido = respuesta.pedido.estadoPedido;
                var indicePedidoPorEliminar = respuesta.respuestaBDD.bdd.pedidos.indexOf(pedidoRequerido[0]);
                respuesta.respuestaBDD.bdd.pedidos.splice(indicePedidoPorEliminar, 1, pedidoRequerido[0]);
        }
    }), // Guardar Base de Datos
    mergeMap(function (respuesta) {
        return guardarBase(respuesta.respuestaBDD.bdd);
    }))
        .subscribe(function (mensaje) {
        console.log(mensaje);
    }, function (error) {
        console.log(error);
    }, function () {
        console.log('Completado');
        main();
    });
}
function inicializarBase() {
    var leerBDD$ = rxjs.from(leerBDD());
    return leerBDD$
        .pipe(mergeMap(function (respuestaLeerBDD) {
        if (respuestaLeerBDD.bdd) {
            // truty / {}
            return rxjs.of(respuestaLeerBDD);
        }
        else {
            // falsy / null
            return rxjs.from(crearBDD());
        }
    }));
}
function presentarActividadesRestaurante() {
    return rxjs.from(inquirer.prompt(actividadesRestaurante));
}
function leerBDD() {
    return new Promise(function (resolve) {
        fs.readFile('bdd.json', 'utf-8', function (error, contenidoLeido) {
            if (error) {
                resolve({
                    mensaje: 'Base de datos vacia',
                    bdd: null
                });
            }
            else {
                resolve({
                    mensaje: 'Si existe la Base',
                    bdd: JSON.parse(contenidoLeido)
                });
            }
        });
    });
}
function crearBDD() {
    var contenidoInicialBDD = '{"usuario":[], "pedido":[], "menu":{"opciones":[]}}';
    return new Promise(function (resolve, reject) {
        fs.writeFile('bdd.json', contenidoInicialBDD, function (err) {
            if (err) {
                reject({
                    mensaje: 'Error creando Base',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD creada',
                    bdd: JSON.parse('{"usuario":[], "pedido":[], "menu":{"opciones":[]}}')
                });
            }
        });
    });
}
function guardarBase(bdd) {
    return new Promise(function (resolve, reject) {
        fs.writeFile('bdd.json', JSON.stringify(bdd), function (err) {
            if (err) {
                reject({
                    mensaje: 'Error guardando BDD',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada'
                });
            }
        });
    });
}
main();
