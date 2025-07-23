// Zona de importacion
const fs = require('fs/promises');

// Creacion de variables generales
const ruta = './data/tareas.json';

// Creacion de clase
class Tarea{
    // Constructor de la Super clase "Tarea"
    constructor(id, descripcion, completada){
        // Atributos genericos para todas las tareas
        this.id = id;
        this.descripcion = descripcion.trim();
        this.completada = completada;
    }

    // Zona de Metodos:

    // Metodos para obtener atributos:
    // Atributo: "id"
    getId(){
        return this.id;
    }
    // Atributo: "descripcion"
    getDescripcion(){
        return this.descripcion;
    }
    // Atributo: "completada"
    getCompletada(){
        return this.completada;
    }

    // Metodo para modificar estado
    setCompletada(){
        this.completada = true;
    }

    // Metodo para serializar
    serializar(){
        return{
            id: this.id,
            descripcion: this.descripcion,
            completada: this.completada

        }
    }
}