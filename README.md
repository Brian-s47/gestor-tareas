# 🛠️ Gestor de Tareas CLI — Refactor Profesional

Este proyecto es una evolución de un gestor de tareas por consola. Se ha refactorizado para aplicar principios de **Programación Orientada a Objetos (POO)**, los **5 Principios SOLID** y **Patrones de Diseño**, además de implementar persistencia y mejoras UX con herramientas modernas.

---

## ✅ Fase 1: Modelo de Tarea con Orientación a Objetos

### 📌 ¿Por qué se ejecutó esta fase?
Para reemplazar la representación de tareas como objetos literales en memoria por una **clase `Tarea`**, con el fin de encapsular sus atributos y centralizar su lógica. Esto permite que las tareas tengan métodos propios, lo cual mejora la reutilización, el mantenimiento y el orden del código.

### 🧠 ¿Qué principios SOLID se aplican?
- **S (Single Responsibility)**: La clase `Tarea` se enfoca únicamente en representar y manipular los datos de una tarea.
- **O (Open/Closed)**: Podemos extender la clase (`TareaConFecha`, `TareaUrgente`, etc.) sin modificarla directamente.

### 🧱 ¿Qué conceptos de POO se implementaron?
- **Encapsulamiento**: Se ocultaron atributos (`id`, `descripcion`, `completada`) con prefijos privados (`#`) y se controló su acceso mediante getters/setters.
- **Relación entre clases**: Será utilizada en la siguiente fase con `GestorTareas`, que contendrá instancias de `Tarea`.

### 🧩 ¿Se aplicó algún patrón de diseño?
- Se prepara el terreno para aplicar el **Factory Method** o **Composite** en futuras extensiones.

---

## ✅ Fase 2: Clase GestorTareas y separación de responsabilidades

### 📌 ¿Por qué se ejecutó esta fase?
Para aislar la lógica de gestión de tareas (crear, eliminar, editar, listar) en una clase dedicada, lo que permite seguir el principio de responsabilidad única y facilita testeo y mantenimiento.

### 🧠 ¿Qué principios SOLID se aplican?
- **S (Single Responsibility)**: `GestorTareas` gestiona una lista de tareas. No se encarga de su persistencia ni de su visualización.
- **L (Liskov Substitution)**: Si se extiende esta clase, puede sustituirse sin romper el programa.

### 🧱 ¿Qué conceptos de POO se implementaron?
- **Relación entre clases**: `GestorTareas` mantiene una colección de objetos `Tarea`.
- **Encapsulamiento**: La lista de tareas es privada. Se accede mediante métodos públicos.

### 🧩 ¿Se aplicó algún patrón de diseño?
- Se planea aplicar el patrón **Singleton** en esta clase para asegurar que haya un solo gestor de tareas durante la ejecución.

---

## ✅ Fase 3: Persistencia con sistema de archivos

### 📌 ¿Por qué se ejecutó esta fase?
Para permitir que las tareas persistan entre ejecuciones. Se movió toda la lógica de lectura/escritura de JSON a un módulo separado (`ArchivoTareas.js`), siguiendo buenas prácticas.

### 🧠 ¿Qué principios SOLID se aplican?
- **S (Single Responsibility)**: La clase `Tarea` no se encarga de guardar sus datos. La persistencia es responsabilidad de otro módulo.
- **D (Dependency Inversion)**: Se prepara el diseño para que el gestor de tareas dependa de una abstracción de almacenamiento (archivos o base de datos).

### 🧩 ¿Se aplicó algún patrón de diseño?
- **Repository Pattern (implícito)**: El módulo de archivo actúa como una "capa de acceso a datos" para el resto de la aplicación.

---

## ✅ Fase 4: Integración de Lodash y mejoras UX

...

---

## ✅ Fase 5: Patrones de diseño

...

---

## 📁 Estructura del proyecto

```
/controllers
  tareasController.js
/models
  Tarea.js
  GestorTareas.js
/utils
  menu.js
  ArchivoTareas.js
/data
  tareas.json
index.js
```

---

## 🚀 Instrucciones de uso

```bash
npm install
node index.js
```
