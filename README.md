# Prolog Tutor

Un entorno educativo interactivo diseñado para visualizar el proceso de inferencia lógica de Prolog. A diferencia de otros intérpretes, **Prolog Tutor** extrae el árbol de derivación completo, permitiendo a los estudiantes entender el **Backtracking** y la **Unificación** paso a paso de manera visual.

## Arquitectura del Sistema

El proyecto utiliza una arquitectura de integración de sistemas (Sistemas Embebidos/Orquestación) entre un servidor web moderno y un motor de inferencia de grado industrial:

* **Frontend:** React.js con visualización dinámica de árboles mediante estructuras jerárquicas.
* **Backend:** Node.js (Express) encargado de la orquestación de subprocesos y parsing de trazas.
* **Motor Lógico:** SWI-Prolog ejecutado como subproceso nativo en Ubuntu para garantizar la fidelidad del estándar ISO de Prolog.

---

## Requisitos Previos

Este proyecto requiere el motor **SWI-Prolog** instalado en el sistema operativo (optimizado para Ubuntu):

```bash
sudo apt update
sudo apt install swi-prolog
```
