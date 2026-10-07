# Examen 3 · Análisis de Algoritmos: Programación Dinámica y Optimización de Envases (ResinFlow)

## Información del Grupo

* **Grupo:** 2
* **Integrantes:**
  * Emanuel Cardona García
  * Iván Andrés Morales Salgado
  * Carlos Andrés Arteaga García
  * Mauricio Agudelo

---

## 1. Sustentación en Video

* 🎥 **Enlace al video de sustentación:** [Ver Video de Sustentación](https://drive.google.com/file/d/1ljJMrxtZShVXtmepBudTGpogJIIDoiGm/view?usp=sharing)

---

## 2. Descripción del Problema

Un laboratorio de impresión 3D requiere despachar un pedido con un volumen exacto de resina ($600\text{ ml}$) utilizando envases reutilizables de capacidades fijas ($200\text{ ml}$, $300\text{ ml}$ y $500\text{ ml}$) con disponibilidad ilimitada.

El objetivo consiste en:

1. Alcanzar de manera exacta la cantidad solicitada minimizando la cantidad total de envases utilizados.
2. Identificar oportunamente si el volumen solicitado es imposible de despachar con las capacidades disponibles.

> **¿Por qué falla el enfoque voraz (Greedy)?**
> Si se intenta tomar siempre el envase de mayor capacidad ($500\text{ ml}$), queda un residuo de $100\text{ ml}$ que no se puede completar con ningún envase, bloqueando la solución. Sin embargo, sí existe una combinación óptima: $300\text{ ml} + 300\text{ ml} = 600\text{ ml}$ usando solo 2 envases.

---

## 3. Modelado con Programación Dinámica

El problema se modela bajo el enfoque de **Programación Dinámica Bottom-Up** (variante del problema de cambio de monedas o *Coin Change* no acotado):

* **Definición del Estado:**$dp[x]$ representa el mínimo número de envases necesarios para completar exactamente $x\text{ ml}$.
* **Relación de Recurrencia:**Para cada volumen $x$ y cada tamaño de envase $v \in \{200, 300, 500\}$ tal que $v \le x$:

  $$
  dp[x] = \min(dp[x],\; dp[x - v] + 1)
  $$
* **Casos Base e Inicialización:**

  * $dp[0] = 0$: Para completar $0\text{ ml}$ se requieren $0$ envases.
  * $dp[x] = \infty$ para todo $x > 0$: Inicialmente todos los volúmenes se consideran inalcanzables hasta encontrar una combinación válida.

---

## 4. Construcción y Resultados

La tabla se construye de menor a mayor (*bottom-up*):

| Volumen ($x$) |  $dp[x]$  |  Combinación óptima  | Explicación                       |
| :--------------: | :---------: | :--------------------: | :--------------------------------- |
|  **0 ml**  |      0      |           —           | Caso base inicial                  |
| **100 ml** | $\infty$ |       Imposible       | Ningún envase permite completarlo |
| **200 ml** |      1      |         200 ml         | $dp[0] + 1$                      |
| **300 ml** |      1      |         300 ml         | $dp[0] + 1$                      |
| **400 ml** |      2      |      200 + 200 ml      | $dp[200] + 1$                    |
| **500 ml** |      1      |         500 ml         | $dp[0] + 1$                      |
| **600 ml** | **2** | **300 + 300 ml** | $\min(dp[400]+1, dp[300]+1) = 2$ |

* **Resultado para 600 ml:** $dp[600] = 2$ envases ($300\text{ ml} + 300\text{ ml}$).
* **Detección de imposibles:** Si al finalizar el algoritmo $dp[\text{objetivo}] = \infty$, el sistema retorna que no existe solución válida.

### Complejidad

* **Tiempo:** $O(A \cdot k)$, donde $A$ es el volumen objetivo ($600$) y $k$ es la cantidad de tamaños de envases ($3$). Cada subproblema se resuelve una única vez en tiempo constante.
* **Espacio:** $O(A)$ para almacenar la tabla lineal $dp$ y el arreglo de decisiones para la reconstrucción de la solución.

---

## 5. Archivos del Repositorio

* `presentacion_programacion_dinamica_resinflow_ultra_completa.html`: Presentación interactiva y simulación paso a paso del llenado de la tabla DP.
* `README.md`: Documentación formal del proyecto, formulación matemática y enlace a la sustentación en video.
