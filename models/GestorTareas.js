// Zona de importacion
const { Tarea } = require('./Tarea.js');


// Creacion de clase
export class GestorTareas{

    // Propiedad Privada del gestor de tareas
    #tareas = []

    // Constructor de la clase "GestorTareas"
    constructor(tareasIniciales = []){ // Recibimos un parametro opcional Tareas iniciales
        this.#tareas = tareasIniciales.map( // mapeo de todas las tareas 
            tarea => new Tarea(tarea.id, tarea.descripcion, tarea.completada) // convercion de cada tarea de "Objeto literal" a "instancia de tarea"
        )
    }

    // Metodos para gestionar:

    // Metodo para agregar tarea
    agregarTarea(tarea){
        this.#tareas.push(tarea)
    }

    // Metodo para Eliminar tarea
    eliminarTareaPorId(id){
        this.#tareas = this.#tareas.filter(tarea => tarea.getId() !== id)
    }

    // Metodo para Editar Descripcion
    editarDescripcion(id, nuevaDescripcion){
        const tarea = this.buscarPorId(id);
        if(tarea && nuevaDescripcion.trim()){
            tarea.descripcion = nuevaDescripcion;
        }
    }

    // Metodo para buscar tarea por Id
    buscarPorId(id){
        return this.#tareas.find(tarea => tarea.getId() === id)
    }

    // Metodo para listar tareas
    listarTareas(){
        return[...this.#tareas]
    }

    // Metodo para obtener como JSON
    ontenerJSON(){
        return this.#tareas.map(tarea => tarea.serializar())
    }

}