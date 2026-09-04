/* ============================================================
   01-carlos-greedy.js  —  CAPA DE CARLOS ANDRÉS ARTEAGA GARCÍA
   Tema: la categoría de algoritmos Greedy (voraces)
   Archivos de esta capa: js/slides/01-carlos-greedy.js
                          css/estudiante1-carlos.css
   ============================================================ */

(function () {
  "use strict";

  /* SVG del árbol de decisiones: greedy vs. óptimo */
  var diagramaDecisiones = `
    <div class="e1-diagrama">
      <svg class="e1-svg" viewBox="0 0 560 268" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <path class="e1-arista e1-arista--greedy" d="M 280 34 L 150 128"></path>
        <path class="e1-arista e1-arista--optimo" d="M 280 34 L 410 128"></path>
        <path class="e1-arista e1-arista--greedy" d="M 150 128 L 78 222"></path>
        <path class="e1-arista" d="M 150 128 L 222 222"></path>
        <path class="e1-arista e1-arista--optimo" d="M 410 128 L 338 222"></path>
        <path class="e1-arista" d="M 410 128 L 482 222"></path>

        <g class="e1-nodo" transform="translate(280,34)"><circle r="24"></circle><text>0</text></g>
        <g class="e1-nodo e1-nodo--greedy" transform="translate(150,128)"><circle r="24"></circle><text>12</text></g>
        <g class="e1-nodo e1-nodo--optimo" transform="translate(410,128)"><circle r="24"></circle><text>7</text></g>
        <g class="e1-nodo e1-nodo--greedy" transform="translate(78,222)"><circle r="24"></circle><text>3</text></g>
        <g class="e1-nodo" transform="translate(222,222)"><circle r="24"></circle><text>1</text></g>
        <g class="e1-nodo e1-nodo--optimo" transform="translate(338,222)"><circle r="24"></circle><text>20</text></g>
        <g class="e1-nodo" transform="translate(482,222)"><circle r="24"></circle><text>2</text></g>

        <text class="e1-etiqueta" x="78"  y="262">total 15</text>
        <text class="e1-etiqueta" x="338" y="262">total 27</text>
      </svg>
      <div class="e1-leyenda">
        <span><i class="i-greedy"></i> Camino voraz: siempre el mayor de al lado &rarr; <b>15</b></span>
        <span><i class="i-optimo"></i> Camino óptimo real &rarr; <b>27</b></span>
      </div>
    </div>
  `;

  Presentacion.registrarCapa({
    id: "e1",
    orden: 1,
    estudiante: "Carlos Andrés Arteaga García",
    corto: "Carlos Arteaga",
    iniciales: "CA",
    seccion: "1 · Greedy",
    color: "var(--c1)",
    colorSuave: "rgba(34,211,238,.15)",

    slides: [

      /* ---------------- 3. ¿Qué es un algoritmo Greedy? ---------------- */
      {
        titulo: "¿Qué es un algoritmo Greedy?",
        html: Presentacion.cabecera(
          "Estudiante 1 · Carlos Arteaga",
          "¿Qué es un algoritmo <em>Greedy</em>?",
          "Una estrategia que en cada paso toma la opción que <b>ahora</b> se ve mejor, y nunca vuelve atrás."
        ) + `
          <div class="grid g-1-2 anim">
            <div class="grid" style="gap:14px">
              <div class="card card--acento">
                <div class="card-icono">🍰</div>
                <div class="card-titulo">La idea en una frase</div>
                <div class="card-texto">
                  Elegir siempre el <b>mejor bocado disponible</b> en este momento,
                  confiando en que la suma de buenas decisiones locales dé una buena solución global.
                </div>
              </div>

              <div class="codigo"><span class="cm">// Esquema general de un algoritmo voraz</span>
solución <span class="kw">←</span> ∅
<span class="kw">mientras</span> queden candidatos <span class="kw">y</span> no esté completa:
    c <span class="kw">←</span> <span class="kw">seleccionar</span> el mejor candidato local
    <span class="kw">si</span> agregar c es factible:
        solución <span class="kw">←</span> solución ∪ {c}
<span class="kw">devolver</span> solución</div>
            </div>

            ${diagramaDecisiones}
          </div>
        `
      },

      /* ---------------- 4. Características, ventajas y desventajas ------- */
      {
        titulo: "Características, ventajas y desventajas",
        html: Presentacion.cabecera(
          "Estudiante 1 · Carlos Arteaga",
          "Características, <em>ventajas</em> y <em>desventajas</em>",
          "Tres rasgos que definen a todo algoritmo voraz, y el precio que se paga por su velocidad."
        ) + `
          <div class="grid g3 anim" style="margin-bottom:18px">
            <div class="card">
              <div class="card-icono">🎯</div>
              <div class="card-titulo">Decisión local</div>
              <div class="card-texto">Usa un criterio simple (el menor, el mayor, el más corto) sin mirar el problema completo.</div>
            </div>
            <div class="card">
              <div class="card-icono">🚫</div>
              <div class="card-titulo">Sin retroceso</div>
              <div class="card-texto">Lo que elige queda fijo: no hay <i>backtracking</i> ni se reconsideran pasos anteriores.</div>
            </div>
            <div class="card">
              <div class="card-icono">⚡</div>
              <div class="card-titulo">Una sola pasada</div>
              <div class="card-texto">Normalmente basta ordenar y recorrer una vez: por eso suele quedar en O(n log n).</div>
            </div>
          </div>

          <div class="compara anim">
            <div class="compara-caja compara--si">
              <h4>✓ Ventajas</h4>
              <ul class="lista lista--ok">
                <li><b>Muy rápidos:</b> mucho más que fuerza bruta o programación dinámica.</li>
                <li><b>Fáciles de implementar</b> y de explicar.</li>
                <li><b>Poca memoria:</b> no guardan tablas de subproblemas.</li>
                <li><b>Óptimos demostrables</b> en problemas con la estructura adecuada.</li>
              </ul>
            </div>
            <div class="compara-caja compara--no">
              <h4>✕ Desventajas</h4>
              <ul class="lista lista--no">
                <li><b>No siempre dan el óptimo global</b> (mochila 0/1, cambio con monedas raras).</li>
                <li><b>Hay que demostrar</b> que la elección voraz es correcta.</li>
                <li><b>No corrigen errores:</b> una mala decisión temprana se arrastra.</li>
                <li><b>Dependen del criterio</b> elegido; cambiarlo cambia el resultado.</li>
              </ul>
            </div>
          </div>

          <div class="grid g2 anim" style="margin-top:16px">
            <div class="e1-requisito">
              <span class="e1-requisito-ico">🧩</span>
              <div>
                <b>Subestructura óptima</b>
                <p>La solución óptima del problema contiene soluciones óptimas de sus subproblemas.</p>
              </div>
            </div>
            <div class="e1-requisito">
              <span class="e1-requisito-ico">✅</span>
              <div>
                <b>Propiedad de elección voraz</b>
                <p>Existe una solución óptima que empieza con la elección local que hace el algoritmo.</p>
              </div>
            </div>
          </div>
        `
      },

      /* ---------------- 5. ¿Por qué Huffman es Greedy? ---------------- */
      {
        titulo: "¿Por qué Huffman es Greedy?",
        html: Presentacion.cabecera(
          "Estudiante 1 · Carlos Arteaga",
          "¿Por qué <em>Huffman</em> pertenece a esta categoría?",
          "Porque en cada paso hace una elección local irreversible… y aun así se demuestra que es óptima."
        ) + `
          <div class="grid g-2-1 anim">
            <div class="grid" style="gap:12px">
              <div class="e1-check">
                <span class="e1-check-ico">1</span>
                <div>
                  <b>Elección local: los dos de menor frecuencia</b>
                  <p>En cada iteración toma los dos nodos menos frecuentes que existan <i>en ese momento</i>. No evalúa combinaciones ni mira el árbol completo.</p>
                </div>
              </div>
              <div class="e1-check">
                <span class="e1-check-ico">2</span>
                <div>
                  <b>Nunca deshace una unión</b>
                  <p>Una vez que dos nodos se fusionan, quedan unidos para siempre. Cero retroceso: el árbol solo crece.</p>
                </div>
              </div>
              <div class="e1-check">
                <span class="e1-check-ico">3</span>
                <div>
                  <b>Cumple las dos condiciones</b>
                  <p>Los dos símbolos menos frecuentes pueden ser hermanos en el nivel más profundo de <i>algún</i> árbol óptimo (elección voraz), y al fusionarlos el subproblema restante sigue siendo un Huffman (subestructura óptima).</p>
                </div>
              </div>
            </div>

            <div class="grid" style="gap:12px">
              <div class="metrica">
                <div class="metrica-valor">100%</div>
                <div class="metrica-etiqueta">Óptimo garantizado</div>
                <div class="metrica-pie">Huffman no es un voraz “aproximado”: produce el código de longitud variable <b>mínimo posible</b>.</div>
              </div>
              <div class="destacado">
                No todos los voraces son óptimos, pero <b>Huffman sí</b>: es el ejemplo clásico de que una estrategia
                voraz bien elegida puede demostrarse correcta.
              </div>
              <div class="card">
                <div class="card-titulo">Otros voraces conocidos</div>
                <div class="card-texto">
                  Kruskal y Prim (árbol de expansión mínima), Dijkstra (camino más corto),
                  selección de actividades… y <b>Huffman</b>.
                </div>
              </div>
            </div>
          </div>
        `
      }

    ]
  });
})();
