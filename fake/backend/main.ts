declare var Promise;

const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;

const actividadesRestaurante = {
    type: 'list',
    name: 'actividades',
    message: 'Acciones que realiza el restaurante',
    choices: [
        'Ingresar una nueva opción al menú',
        'Eliminar opciones del menú',
        'Listar los pedidos según su estado',
        'Cambiar el estado del pedido seleccionado'
    ]
};

const cuestionarioDatosNuevaOpcion = [
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

const cuestionarioEliminarOpcionMenu = [
    {
        type: 'input',
        name: 'idOpcion',
        message: 'Ingrese el identificador de la opción que desea eliminar:'
    }
];

const cuestionarioListarPorEstadoPedido = [
    {
        type: 'input',
        name: 'estadoPedido',
        message: 'Ingrese el estado que corresponda según que pedidos desea listar:'
    }
];

const cuestionarioCambioEstadoPedido = [
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
        .pipe(
            mergeMap(// preguntar opcion
                (respuestaBDD: RespuestaBDD) => {
                    return presentarActividadesRestaurante()
                        .pipe(
                            map(
                                (respuesta: ActividadesRestaurante) => {
                                    return {
                                        respuestaUsuario: respuesta,
                                        respuestaBDD
                                    }

                                }
                            )
                        )
                }
            ),
            mergeMap(
                (respuesta: RespuestaUsuario) => {
                    console.log(respuesta);
                    switch (respuesta.respuestaUsuario.actividadRestaurante) {
                        case 'Crear':
                            return rxjs
                                .from(inquirer.prompt(cuestionarioDatosNuevaOpcion))
                                .pipe(
                                    map(
                                        (opcionMenu: OpcionMenu) => {
                                            respuesta.opcionMenu = opcionMenu;
                                            return respuesta;
                                        }
                                    )
                                );
                        case 'Eliminar':
                            return rxjs
                                .from(inquirer.prompt(cuestionarioEliminarOpcionMenu))
                                .pipe(
                                    map(
                                        (opcionMenu) => {
                                            respuesta.opcionMenu = opcionMenu;
                                            return respuesta;
                                        }
                                    )
                                );
                        case 'Buscar':
                            return rxjs
                                .from(inquirer.prompt(cuestionarioListarPorEstadoPedido))
                                .pipe(
                                    map(
                                        (estadoPedido) => {
                                            respuesta.pedido.estadoPedido = estadoPedido;
                                            return respuesta;
                                        }
                                    )
                                );
                        case 'Actualizar':
                            return rxjs
                                .from(inquirer.prompt(cuestionarioCambioEstadoPedido))
                                .pipe(
                                    map(
                                        (pedidoPorActualizar: Pedido) => {
                                            respuesta.pedido = pedidoPorActualizar;
                                            return respuesta;
                                        }
                                    )
                                )
                        /*
                                                default:
                                                    respuesta.usuario = {
                                                        id: null,
                                                        nombre: null
                                                    };
                                                    rxjs.of(respuesta)
                        */

                    }
                }
            ),// Ejecutar Accion
            map(
                (respuesta: RespuestaUsuario) => {
                    console.log('respuesta en accion', respuesta);
                    switch (respuesta.respuestaUsuario.actividadRestaurante) {
                        case 'Crear':
                            const nuevaOpcionMenu = respuesta.opcionMenu;
                            respuesta.respuestaBDD.bdd.menu.opciones.push(nuevaOpcionMenu);
                            return respuesta;
                        case 'Eliminar':
                            const opcionMenuParaEliminar = respuesta.opcionMenu;
                            const indiceParaEliminar = respuesta.respuestaBDD.bdd.menu.opciones.indexOf(opcionMenuParaEliminar);
                            respuesta.respuestaBDD.bdd.menu.opciones.splice(indiceParaEliminar, 1);
                            return respuesta;
                        case 'Buscar':
                            const estadoPorBuscar = respuesta.pedido.estadoPedido;
                            const pedidosFiltrados = respuesta.respuestaBDD.bdd.pedidos.filter(
                                (pedido) => pedido.estadoPedido === estadoPorBuscar
                            );
                            console.log(pedidosFiltrados);
                            return respuesta;
                        case 'Actualizar':
                            const idPedidoPorBuscar = respuesta.pedido.idPedido;
                            const pedidoRequerido = respuesta.respuestaBDD.bdd.pedidos.filter(
                                (pedido) => pedido.idPedido === idPedidoPorBuscar
                            );
                            pedidoRequerido[0].estadoPedido = respuesta.pedido.estadoPedido;
                            const indicePedidoPorEliminar = respuesta.respuestaBDD.bdd.pedidos.indexOf(pedidoRequerido[0]);
                            respuesta.respuestaBDD.bdd.pedidos.splice(indicePedidoPorEliminar, 1, pedidoRequerido[0]);
                    }
                }
            ), // Guardar Base de Datos
            mergeMap(
                (respuesta: RespuestaUsuario) => {
                    return guardarBase(respuesta.respuestaBDD.bdd);
                }
            )
        )
        .subscribe(
            (mensaje) => {
                console.log(mensaje);
            },
            (error) => {
                console.log(error);
            },
            () => {
                console.log('Completado');
                main();
            }
        )
}


function inicializarBase() {
    const leerBDD$ = rxjs.from(leerBDD());
    return leerBDD$
        .pipe(
            mergeMap(
                (respuestaLeerBDD: RespuestaBDD) => {
                    if (respuestaLeerBDD.bdd) {
                        // truty / {}
                        return rxjs.of(respuestaLeerBDD)
                    } else {
                        // falsy / null
                        return rxjs.from(crearBDD())
                    }
                }
            )
        );
}

function presentarActividadesRestaurante() {
    return rxjs.from(inquirer.prompt(actividadesRestaurante))
}

function leerBDD(): Promise<RespuestaBDD> {
    return new Promise(
        (resolve) => {
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        resolve({
                            mensaje: 'Base de datos vacia',
                            bdd: null
                        });
                    } else {
                        resolve({
                            mensaje: 'Si existe la Base',
                            bdd: JSON.parse(contenidoLeido)
                        });
                    }
                }
            );
        }
    );
}

function crearBDD() {
    const contenidoInicialBDD = '{"usuarios":[], "pedidos":[], "menu":{"opciones":[]}}';
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                contenidoInicialBDD,
                (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error creando Base',
                            error: 500
                        });
                    } else {
                        resolve({
                            mensaje: 'BDD creada',
                            bdd: JSON.parse('{"usuarios":[], "pedidos":[], "menu":{"opciones":[]}}')
                        });
                    }

                }
            )

        }
    )
}

function guardarBase(bdd: BaseDeDatos) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                JSON.stringify(bdd),
                (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error guardando BDD',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada'
                        })
                    }
                }
            )
        }
    );
}

main();

interface RespuestaBDD {
    mensaje: string,
    bdd: BaseDeDatos
}

interface BaseDeDatos {
    usuarios: Usuario[],
    pedidos: Pedido[],
    opciones: OpcionMenu[],
    menu: Menu
}

interface Usuario {
    idUsuario: number,
    nombreUsuario: number,
    contrasenia: string
}

interface Pedido {
    idPedido: number,
    valorPedido: number,
    numeroPeido: number,
    estadoPedido: string,
    idUsuario: number,
    idOpcion: number
}

interface OpcionMenu {
    idOpcion: number,
    nombreOpcion: string,
    urlImagenOpcion: string,
    valorOpcion: number
}

interface Menu {
    opciones: OpcionMenu[]
}

interface ActividadesRestaurante {
    actividadRestaurante: 'Crear' | 'Eliminar' | 'Buscar' | 'Actualizar'
}

interface RespuestaUsuario {
    respuestaUsuario: ActividadesRestaurante,
    respuestaBDD: RespuestaBDD,
    opcionMenu?: OpcionMenu, //opcional ?
    pedido?: Pedido //opcional ?
}