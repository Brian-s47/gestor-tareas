import mostrarMenu from './utils/menu.js';
import { listarTareas, agregarTarea, editarTarea, eliminarTarea, completarTarea  } from './controllers/tareasController.js';

async function main() {
  let salir = false;

  while (!salir) {
    const opcion = await mostrarMenu();

    switch (opcion) {
      case '1':
        await agregarTarea();
        break;
      case '2':
        await listarTareas();
        break;
      case '3':
        await editarTarea();
        break;
      case '4':
        await eliminarTarea();
        break;
      case '5':
        await completarTarea();
        break;
      case '6':
        salir = true;
        console.log('👋 Gracias por usar nuestro sistema de gestion de tareas mejorado!');
        break;
    }
  }
}

main();