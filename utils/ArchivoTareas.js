import { promises as fs } from 'fs'

const RUTA = './data/tareas.json'

export async function guardarTareas(tareas) {
  const datos = tareas.map(tarea => tarea.serializar())
  await fs.writeFile(RUTA, JSON.stringify(datos, null, 2))
}

export async function cargarTareas() {
  try {
    const contenido = await fs.readFile(RUTA, 'utf-8')
    return JSON.parse(contenido)
  } catch (error) {
    return [] // si el archivo no existe o está vacío
  }
}
