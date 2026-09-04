# Examen 1 · Análisis de Algoritmos: Algoritmo Voraz (Greedy) y Codificación de Huffman

## Link al Video de Sustentación

- **Enlace:** [https://drive.google.com/file/d/1HtkilcuvuhYXfdgW4RNGmVt2WRobdF2E/view?usp=sharing]

---

## Integrantes

* Carlos Andrés Arteaga García
* Iván Andrés Morales Salgado
* Emanuel Cardona García
* Mauricio Agudelo

---

## 1. Descripción del Problema

En la informática y las telecomunicaciones, los datos textuales suelen almacenarse y transmitirse utilizando sistemas de codificación de longitud fija, como ASCII o UTF-8 sin comprimir, donde cada símbolo ocupa un tamaño estándar de 8 bits (1 byte). 

Esta asignación fija genera una ineficiencia notable cuando existe una disparidad en la frecuencia de los caracteres: un símbolo que se repite frecuentemente dentro de un mensaje consume la misma cantidad de memoria y ancho de banda que un símbolo de aparición aislada. Esto plantea la necesidad de implementar técnicas de compresión sin pérdida (*lossless*), que optimicen el espacio total requerido para la información sin degradar ni alterar los datos originales durante su posterior reconstrucción.

---

## 2. Descripción de la Solución

Para resolver la ineficiencia de las representaciones de longitud fija, se plantea la aplicación de la **Codificación de Huffman**, un método de compresión estadística de longitud variable. 

La solución implementada como soporte de la sustentación evalúa la cadena a codificar, contabiliza las apariciones de cada carácter, gestiona los nodos mediante una cola de prioridad y construye un árbol binario óptimo de prefijo. Esto permite transformar el texto original en una secuencia binaria comprimida y calcular las métricas de reducción frente a la representación estándar de 8 bits.

---

## 3. Algoritmo Seleccionado y su Funcionamiento

El algoritmo seleccionado es la **Codificación de Huffman**, el cual pertenece al paradigma de los **Algoritmos Voraces (Greedy)**. 

### Fundamento Voraz (Greedy)
El diseño voraz se caracteriza por tomar decisiones óptimas locales en etapas sucesivas para resolver un problema de optimización global, sin reevaluar decisiones pasadas. En Huffman, la regla voraz se manifiesta en cada paso de la construcción del árbol: **se seleccionan y extraen de la cola siempre los dos nodos con las menores frecuencias acumuladas**.

### Mecánica del Algoritmo
1. **Cálculo de frecuencias:** Se cuantifica la recurrencia de cada símbolo en el texto. Cada carácter se define como un nodo hoja y se almacena en una cola de prioridad ordenada de menor a mayor peso.
2. **Construcción voraz del árbol:** De forma iterativa, se extraen los dos nodos de menor valor, se suman sus frecuencias para formar un nuevo nodo intermedio (padre) y este se reinserta en la cola. El proceso se repite hasta que únicamente queda un nodo, el cual conforma la raíz del árbol.
3. **Asignación de códigos y regla de prefijo:** Se asignan bits de dirección (`0` para la rama izquierda y `1` para la rama derecha). El código resultante para cada símbolo es el trayecto desde la raíz hasta su respectiva hoja. Como todos los símbolos quedan en las hojas del árbol, se cumple la propiedad de código libre de prefijo (*prefix-free*), impidiendo cualquier ambigüedad durante la decodificación secuencial.

---

## 4. Implementación y Aplicación a la Solución

El algoritmo se implementó dentro de una presentación interactiva para demostrar de manera visual y paso a paso cada fase de la compresión:

* **Análisis de frecuencias:** Despliega el conteo inicial de caracteres ordenados por menor ocurrencia.
* **Simulación paso a paso:** Permite visualizar de forma gráfica cómo se extraen los pares mínimos y cómo se van uniendo sucesivamente las ramas del árbol binario hasta llegar a la raíz.
* **Generación de códigos binarios:** Muestra la asignación de bits resultantes en cada hoja del árbol.
* **Evaluación de métricas:** Realiza el cálculo automático de los bits consumidos por el mensaje original frente al mensaje codificado con Huffman.

---

## 5. Resultados Obtenidos

Para la demostración se evaluó la palabra de prueba **`ABRACADABRA`** (11 caracteres):

| Símbolo | Frecuencia | Código asignado | Longitud (Bits) | Total de bits |
|:---:|:---:|:---:|:---:|:---:|
| **A** | 5 | `0` | 1 | 5 bits |
| **B** | 2 | `110` | 3 | 6 bits |
| **R** | 2 | `111` | 3 | 6 bits |
| **C** | 1 | `100` | 3 | 3 bits |
| **D** | 1 | `101` | 3 | 3 bits |

* **Cadena final codificada:** `01101110100010101101110`
* **Comparativa de peso:**
  * Tamaño original en ASCII (longitud fija de 8 bits por carácter): $11 \times 8 = 88$ bits.
  * Tamaño comprimido con Huffman: **23 bits**.
  * **Porcentaje de compresión / ahorro:** **73.86%** de reducción en el tamaño total de la información transmitida.

---

## 6. Tecnologías Utilizadas

La solución está construida en formato de presentación interactiva empleando tecnologías web estándares: **HTML5, CSS3 y JavaScript nativo**, sin librerías ni frameworks externos. Para visualizarla basta con abrir el archivo `index.html` en cualquier navegador web.