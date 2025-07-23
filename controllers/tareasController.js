// Zona de importacion
import inquirer from 'inquirer'; // Para la generacion de menus y interaccion con usuario
import chalk from 'chalk';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid'; // Para generar ID unico
import { gestor } from './gestorGlobal.js' //  Clase gestor de tareas que administra la gestion de las mismas
import { Tarea } from '../models/Tarea.js' // Clase principal Tarea 
import { guardarTareas } from '../utils/ArchivoTareas.js' // Gestor de Archivos para guardar en JSON local


export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    { type: 'input', 
      name: 'descripcion', 
      message: 'Descripción de la tarea:' }
  ]);
  if (_.isEmpty(descripcion.trim())) {
    console.log(chalk.red('❌ No puedes agregar una tarea vacía.'))

    await inquirer.prompt([
      { type: 'input', name: 'continuar', message: chalk.gray('Presiona Enter para volver al menú...') }
    ])
    return
  }
  const nueva = new Tarea(uuidv4(), descripcion.trim(), false);
  gestor.agregarTarea(nueva);
  await guardarTareas(gestor.listarTareas());
  console.log(chalk.green('✅ Tarea agregada.'));

}

export async function listarTareas() {
  const tareas = gestor.listarTareas()

  if (tareas.length === 0) {
    console.log(chalk.yellow('⚠️ No hay tareas disponibles.'))
  } else {
    console.log(chalk.bold.cyan('\n📋 Lista de tareas:\n'))

    tareas.forEach((tarea, i) => {
      const estado = tarea.getCompletada() ? chalk.green('✅ Completada') : chalk.red('❌ Pendiente')
      console.log(`${chalk.bold(`${i + 1}.`)} ${chalk.yellow(tarea.getDescripcion())} - ${estado}`)
    })
  }

  await inquirer.prompt([
    { type: 'input', name: 'continuar', message: chalk.gray('\nPresiona Enter para continuar...') }
  ])
}

export async function editarTarea() {
  const tareas = gestor.listarTareas();
  if (tareas.length === 0) return console.log(chalk.yellow('⚠️ No hay tareas para editar.'));
  const { id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Selecciona una tarea para editar:',
      choices: tareas.map((tarea) => ({
        name: tarea.descripcion,
        value: tarea.getId()
      }))
    }
  ]);

  const { nuevaDescripcion } = await inquirer.prompt([
    { type: 'input', 
      name: 'nuevaDescripcion', 
      message: 'Nueva descripción:' }
  ]);

  if (_.isEmpty(nuevaDescripcion.trim())) {
    console.log(chalk.red('❌ La nueva descripción no puede estar vacía.'))

    await inquirer.prompt([
      { type: 'input', name: 'continuar', message: chalk.gray('Presiona Enter para volver al menú...') }
    ])
    return
  }
  gestor.editarDescripcion(id, nuevaDescripcion);
  await guardarTareas(gestor.listarTareas())
  console.log(chalk.blue('✏️ Tarea actualizada.'));
}

export async function eliminarTarea() {
  const tareas = gestor.listarTareas();
  if (tareas.length === 0) {
    console.log(chalk.yellow('⚠️ No hay tareas disponibles.'))
  } else {
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

    const { confirmar } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmar',
        message: chalk.redBright('¿Estás seguro de eliminar esta tarea?')
      }
    ])

    if (!confirmar) {
      console.log(chalk.gray('❎ Eliminación cancelada.'))
      return
    }
    gestor.eliminarTareaPorId(id);
    await guardarTareas(gestor.listarTareas());
    console.log(chalk.red('🗑️ Tarea eliminada.'));
  }
  await inquirer.prompt([
    { type: 'input', name: 'continuar', message: chalk.gray('\nPresiona Enter para continuar...') }
  ])
}
