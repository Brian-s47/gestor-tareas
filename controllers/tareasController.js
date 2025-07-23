// Zona de importacion
import inquirer from 'inquirer'; // Para la generacion de menus y interaccion con usuario
import { v4 as uuidv4 } from 'uuid'; // Para generar ID unico
import { gestor } from './gestorGlobal.js' //  Clase gestor de tareas que administra la gestion de las mismas
import { Tarea } from '../models/Tarea.js' // Clase principal Tarea 


export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    { type: 'input', 
      name: 'descripcion', 
      message: 'Descripción de la tarea:' }
  ]);

  const nueva = new Tarea(uuidv4(), descripcion.trim(), false)
  gestor.agregarTarea(nueva)
  console.log('✅ Tarea agregada.')

}

export function listarTareas() {
  const tareas = gestor.listarTareas();
  tareas.forEach((tarea, i) => {
    const estado = tarea.completada ? '✅' : '❌';
    console.log(`${i + 1}. Id:${tarea.id} \n Descripcion: ${tarea.descripcion} \n Estado: ${estado}`);
  });
}

export async function editarTarea() {
  const tareas = gestor.listarTareas();
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para editar.');
  const { id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Selecciona una tarea para editar:',
      choices: tareas.map((tarea, i) => ({
        name: tarea.descripcion,
        value: tarea.getId()
      }))
    }
  ]);

  const { nuevaDescripcion } = await inquirer.prompt([
    { type: 'input', name: 'nuevaDescripcion', message: 'Nueva descripción:' }
  ]);

  gestor.editarDescripcion(id, nuevaDescripcion);
  console.log('✏️ Tarea actualizada.');
}

export async function eliminarTarea() {
  const tareas = gestor.listarTareas();
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para editar.');

  const { id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Selecciona una tarea para editar:',
      choices: tareas.map((tarea, i) => ({
        name: tarea.descripcion,
        value: tarea.getId()
      }))
    }
  ]);

  gestor.eliminarTareaPorId(id);
  console.log('🗑️ Tarea eliminada.');
}
