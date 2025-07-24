import inquirer from 'inquirer';
import chalk from 'chalk';
import _ from 'lodash';
import {
  crearTarea,
  obtenerTareas,
  actualizarDescripcion,
  marcarComoCompletada,
  eliminarTarea,
  obtenerTareaPorId,
} from '../models/Tarea.js';

// Agregar tarea
export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    { type: 'input', name: 'descripcion', message: 'Descripción de la tarea:' }
  ]);

  if (_.isEmpty(descripcion.trim())) {
    console.log(chalk.red('❌ No puedes agregar una tarea vacía.'));
    await inquirer.prompt([{ type: 'input', name: 'c', message: 'Presiona Enter para continuar...' }]);
    return;
  }

  const tareas = await obtenerTareas();
  const yaExiste = tareas.some(t => t.descripcion.toLowerCase() === descripcion.trim().toLowerCase());

  if (yaExiste) {
    console.log(chalk.yellow('⚠️ Ya existe una tarea con esa descripción.'));
    await inquirer.prompt([{ type: 'input', name: 'c', message: 'Presiona Enter para continuar...' }]);
    return;
  }

  await crearTarea(descripcion);
  console.log(chalk.green('✅ Tarea agregada con éxito.'));
}

// Listar tareas
export async function listarTareas() {
  const tareas = await obtenerTareas();

  if (tareas.length === 0) {
    console.log(chalk.yellow('⚠️ No hay tareas disponibles.'));
  } else {
    console.log(chalk.bold.cyan('\n📋 Lista de tareas:\n'));

    _.orderBy(tareas, ['descripcion'], ['asc']).forEach((tarea, i) => {
      const estado = tarea.completada ? chalk.green('✅ Completada') : chalk.red('❌ Pendiente');
      console.log(`${chalk.bold(`${i + 1}.`)} ${chalk.yellow(tarea.descripcion)} - ${estado}`);
    });
  }

  await inquirer.prompt([{ type: 'input', name: 'c', message: 'Presiona Enter para continuar...' }]);
}

// Editar tarea
export async function editarTarea() {
  const tareas = await obtenerTareas();

  if (tareas.length === 0) {
    console.log(chalk.yellow('⚠️ No hay tareas para editar.'));
    return;
  }

  const { id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Selecciona una tarea para editar:',
      choices: tareas.map(t => ({ name: t.descripcion, value: t._id }))
    }
  ]);

  const { nuevaDescripcion } = await inquirer.prompt([
    { type: 'input', name: 'nuevaDescripcion', message: 'Nueva descripción:' }
  ]);

  if (_.isEmpty(nuevaDescripcion.trim())) {
    console.log(chalk.red('❌ La nueva descripción no puede estar vacía.'));
    return;
  }

  await actualizarDescripcion(id, nuevaDescripcion);
  console.log(chalk.blue('✏️ Tarea actualizada.'));
}

// Eliminar tarea
export async function eliminarTareaUI() {
  const tareas = await obtenerTareas();

  if (tareas.length === 0) {
    console.log(chalk.yellow('⚠️ No hay tareas disponibles.'));
    return;
  }

  const { id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Selecciona una tarea para eliminar:',
      choices: tareas.map(t => ({ name: t.descripcion, value: t._id }))
    }
  ]);

  const { confirmar } = await inquirer.prompt([
    { type: 'confirm', name: 'confirmar', message: chalk.redBright('¿Estás seguro de eliminar esta tarea?') }
  ]);

  if (!confirmar) {
    console.log(chalk.gray('❎ Eliminación cancelada.'));
    return;
  }

  await eliminarTarea(id);
  console.log(chalk.red('🗑️ Tarea eliminada.'));
}

// Completar tarea
export async function completarTarea() {
  const tareas = await obtenerTareas();
  const pendientes = tareas.filter(t => !t.completada);

  if (pendientes.length === 0) {
    console.log(chalk.green('🎉 No hay tareas pendientes. ¡Buen trabajo!'));
    return;
  }

  const { id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Selecciona una tarea para marcar como completada:',
      choices: pendientes.map(t => ({ name: t.descripcion, value: t._id }))
    }
  ]);

  await marcarComoCompletada(id);
  console.log(chalk.green('✅ Tarea marcada como completada.'));
}
