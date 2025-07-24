
import { obtenerDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

// Agregar tarea
export async function crearTarea(descripcion) {
  const db = obtenerDB();
  const nueva = {
    descripcion: descripcion.trim(),
    completada: false,
    creadaEn: new Date(),
  };
  const resultado = await db.collection('tareas').insertOne(nueva);
  return { ...nueva, _id: resultado.insertedId };
}

// Listar tareas
export async function obtenerTareas() {
  const db = obtenerDB();
  return await db.collection('tareas').find().toArray();
}

// Buscar por ID
export async function obtenerTareaPorId(id) {
  const db = obtenerDB();
  return await db.collection('tareas').findOne({ _id: new ObjectId(id) });
}

// Editar descripción
export async function actualizarDescripcion(id, nuevaDescripcion) {
  const db = obtenerDB();
  await db.collection('tareas').updateOne(
    { _id: new ObjectId(id) },
    { $set: { descripcion: nuevaDescripcion.trim() } }
  );
}

// Marcar como completada
export async function marcarComoCompletada(id) {
  const db = obtenerDB();
  await db.collection('tareas').updateOne(
    { _id: new ObjectId(id) },
    { $set: { completada: true } }
  );
}

// Eliminar tarea
export async function eliminarTarea(id) {
  const db = obtenerDB();
  await db.collection('tareas').deleteOne({ _id: new ObjectId(id) });
}
