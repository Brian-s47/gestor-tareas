
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);
let db = null;

export async function conectarDB() {
  try {
    await client.connect();
    db = client.db('tareasDB'); 
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    process.exit(1);
  }
}

export function obtenerDB() {
  if (!db) {
    throw new Error('❌ La base de datos no está conectada. Usa conectarDB primero.');
  }
  return db;
}
