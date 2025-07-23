import { GestorTareas } from '../models/GestorTareas.js'
import { cargarTareas } from '../utils/ArchivoTareas.js'

const tareasIniciales = await cargarTareas()
export const gestor = new GestorTareas(tareasIniciales)
