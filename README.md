# Prolog Tutor

Un entorno educativo interactivo diseñado para visualizar el proceso de inferencia lógica de Prolog. A diferencia de otros intérpretes, **Prolog Tutor** extrae el árbol de derivación completo, permitiendo a los estudiantes entender el **Backtracking** y la **Unificación** paso a paso de manera visual.

## Arquitectura del Sistema

El proyecto utiliza una arquitectura de integración de sistemas (Sistemas Embebidos/Orquestación) entre un servidor web moderno y un motor de inferencia de grado industrial:

* **Frontend:** React.js con visualización dinámica de árboles mediante estructuras jerárquicas.
* **Backend:** Node.js (Express) encargado de la orquestación de subprocesos y parsing de trazas.
* **Motor Lógico:** SWI-Prolog ejecutado como subproceso nativo en Ubuntu para garantizar la fidelidad del estándar ISO de Prolog.

---

## 🚀 Instalación y Uso

Este proyecto consta de dos partes: una API en el backend (Node.js) que se comunica con SWI-Prolog, y un frontend interactivo (React) para visualizar el árbol.

### Requisitos Previos
1. [Node.js](https://nodejs.org/) instalado en tu sistema.
2. [SWI-Prolog](https://www.swi-prolog.org/) instalado y agregado a las variables de entorno (`PATH`) de tu sistema para que el comando `swipl` funcione en la terminal.

### 1. Levantar el Backend
Abre una terminal, navega a la carpeta del backend y ejecuta:
```bash
cd ruta/a/tu/backend
npm install   # Instala Express, CORS, etc. automáticamente
node app.js   # Inicia el servidor en el puerto 3000
```

### 2. Levantar el Frontend
Abre una **nueva** terminal, navega a la carpeta de React y ejecuta:
```bash
cd ruta/a/tu/frontend
npm install   # Instala react-d3-tree y demás dependencias automáticamente
npm start     # Inicia la aplicación web
```

¡Listo! Abre tu navegador y comienza a generar árboles deductivos.
