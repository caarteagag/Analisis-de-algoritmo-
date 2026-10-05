
# Examen 2 · Análisis de Algoritmos: Algoritmo de Kahn y Pensum Universitario

## Información del Grupo

* **Grupo:** 2
* **Integrantes:**
  * Iván Morales
  * Carlos Arteaga
  * Emanuel Cardona
  * Mauricio Agudelo

---

## 1. Sustentación en Video

* 🎥 **Enlace al video de sustentación:** [Ver Video en Google Drive](https://drive.google.com/file/d/1Kb5nkcSbysILJzKR53d0Zfgx3sGMpNzy/view?usp=sharing)

---

## 2. Descripción del Problema

En un plan de estudios universitario, las materias presentan dependencias y prerrequisitos que condicionan el orden en el que pueden cursarse. Si una asignatura $A$ es prerrequisito de $B$, es obligatorio cursar y aprobar $A$ antes de inscribir $B$.

El problema consiste en:

1. Construir una secuencia u orden viable para cursar la totalidad del pensum respetando rigurosamente todas las dependencias.
2. Detectar oportunamente si existen dependencias circulares (ciclos), las cuales harían inviable cursar o terminar el programa académico.

---

## 3. Modelado con Grafos

El pensum se modela mediante un **Grafo Dirigido Acíclico (DAG)**:

* **Vértices ($V$):** Representan cada una de las materias del pensum.
* **Aristas dirigidas ($E$):** Si la materia $A$ es requisito de $B$, se dibuja una arista dirigida $A \to B$.
* **Grado de entrada (*In-degree*):** Cantidad de prerrequisitos pendientes que tiene una materia. Las materias con grado de entrada 0 no tienen requisitos pendientes y pueden ser cursadas de inmediato.

---

## 4. Algoritmo Seleccionado: Algoritmo de Kahn

Para obtener el orden topológico y validar la ausencia de ciclos, se implementa el **Algoritmo de Kahn**, el cual sigue 4 pasos:

1. **Calcular grados de entrada:** Contar cuántos prerrequisitos tiene cada materia.
2. **Crear la cola:** Agregar a una cola (FIFO) todas las asignaturas cuyo grado de entrada inicial sea 0.
3. **Procesar iterativamente:**
   * Extraer una materia disponible de la cola y añadirla al orden final.
   * Reducir en 1 el grado de entrada de las asignaturas que dependen de ella.
   * Si alguna materia dependiente alcanza grado 0, ingresa inmediatamente a la cola.
4. **Verificar y validar:**
   * Si al vaciarse la cola se procesaron todas las materias, se obtiene un orden topológico válido.
   * Si quedan materias sin procesar, se detecta la existencia de dependencias circulares (ciclos).

### Complejidad

* **Tiempo:** $O(V + E)$, donde $V$ es el número de materias y $E$ el número de dependencias/aristas, ya que cada vértice y arista se visita y procesa un número constante de veces.
* **Espacio:** $O(V + E)$ para almacenar el grafo en lista de adyacencia, los grados de entrada y la cola.

---

## 5. Archivos del Repositorio

* `presentacion_grafos_kahn.html`: Presentación interactiva y simulación paso a paso del algoritmo.
* `README.md`: Documentación del proyecto, explicación técnica y enlace a la sustentación.
