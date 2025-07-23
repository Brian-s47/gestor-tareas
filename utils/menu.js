// Zona de importaciones
import inquirer from 'inquirer'; //  Para interaccion con el usuario
import chalk from 'chalk' // Para dar colores a los mensajes y opciones
import boxen from 'boxen' // Para encerrar los menus en cajas 

export default async function mostrarMenu() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('📋 Bienvenido al Gestor de Tareas CLI') 
  const linea = chalk.gray('────────────────────────────────────────────')
  console.log(boxen(titulo, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    align: 'center'
  }))
  console.log(linea)
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: chalk.green('1. Agregar tarea'), value: '1' },
        { name: chalk.blue('2. Listar tareas'), value: '2' },
        { name: chalk.yellow('3. Editar tarea'), value: '3' },
        { name: chalk.red('4. Eliminar tarea'), value: '4' },
        { name: chalk.gray('5. Salir'), value: '5' }
      ]
    }
  ]);
  return opcion;
}