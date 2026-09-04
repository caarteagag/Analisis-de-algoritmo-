/* ============================================================
   04-mauricio-analisis.js  —  CAPA DE MAURICIO AGUDELO
   Tema: complejidad, ventajas/aplicaciones, conclusiones y preguntas
   Archivos de esta capa: js/slides/04-mauricio-analisis.js
                          css/estudiante4-mauricio.css
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Gráfica de crecimiento: n, n log n, n² ---------- */
  function curva(f) {
    var puntos = [];
    for (var i = 1; i <= 100; i++) {
      var x = 34 + (i / 100) * 400;
      var y = 214 - f(i) * 180;
      puntos.push(x.toFixed(1) + "," + y.toFixed(1));
    }
    return puntos.join(" ");
  }

  var maxNLogN = 100 * (Math.log(100) / Math.log(2));
  var grafica = `
    <div class="e4-grafica">
      <svg class="e4-svg" viewBox="0 0 470 250" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <line class="e4-guia" x1="34" y1="34"  x2="434" y2="34"></line>
        <line class="e4-guia" x1="34" y1="94"  x2="434" y2="94"></line>
        <line class="e4-guia" x1="34" y1="154" x2="434" y2="154"></line>
        <line class="e4-eje"  x1="34" y1="214" x2="434" y2="214"></line>
        <line class="e4-eje"  x1="34" y1="24"  x2="34"  y2="214"></line>

        <polyline class="e4-curva e4-curva--n2"    points="${curva(function (n) { return (n * n) / 10000; })}"></polyline>
        <polyline class="e4-curva e4-curva--nlogn" points="${curva(function (n) { return (n * (Math.log(n) / Math.log(2))) / maxNLogN; })}"></polyline>
        <polyline class="e4-curva e4-curva--n"     points="${curva(function (n) { return n / 100; })}"></polyline>

        <text class="e4-curva-nombre" x="120" y="48"  fill="#f87171">O(n²)  fuerza bruta</text>
        <text class="e4-curva-nombre" x="352" y="60"  fill="#fbbf24" text-anchor="end">O(n log n)  Huffman</text>
        <text class="e4-curva-nombre" x="438" y="176" fill="#34d399" text-anchor="end">O(n)</text>

        <text class="e4-texto-eje" x="234" y="240">tamaño de la entrada (n símbolos distintos)</text>
      </svg>
    </div>
  `;

  Presentacion.registrarCapa({
    id: "e4",
    orden: 4,
    estudiante: "Mauricio Agudelo",
    corto: "Mauricio Agudelo",
    iniciales: "MA",
    seccion: "4 · Análisis",
    color: "var(--c4)",
    colorSuave: "rgba(251,191,36,.15)",

    slides: [

      /* ---------------- 12. Complejidad ---------------- */
      {
        titulo: "Complejidad del algoritmo",
        html: Presentacion.cabecera(
          "Estudiante 4 · Mauricio Agudelo",
          "Complejidad: <em>O(n log n)</em>",
          "Con <b>n</b> = cantidad de símbolos distintos y <b>m</b> = longitud del texto. Contar es O(m); construir el árbol es O(n log n)."
        ) + `
          <div class="grid g-1-2 anim">
            ${grafica}

            <div class="grid" style="gap:12px">
              <div class="e4-desglose">
                <div class="e4-op">
                  <span class="e4-op-txt"><b>Contar frecuencias</b>Una pasada por el texto completo</span>
                  <span class="e4-op-costo">O(m)</span>
                </div>
                <div class="e4-op">
                  <span class="e4-op-txt"><b>Construir el min-heap</b>Insertar los n símbolos iniciales</span>
                  <span class="e4-op-costo">O(n)</span>
                </div>
                <div class="e4-op">
                  <span class="e4-op-txt"><b>n − 1 fusiones</b>Cada una: 2 extraerMin + 1 insertar, a O(log n)</span>
                  <span class="e4-op-costo">O(n log n)</span>
                </div>
                <div class="e4-op">
                  <span class="e4-op-txt"><b>Recorrer el árbol</b>Asignar los códigos a las hojas</span>
                  <span class="e4-op-costo">O(n)</span>
                </div>
              </div>

              <div class="e4-total">
                <span>Total del algoritmo</span>
                <b>O(m + n log n)</b>
              </div>

              <div class="grid g2">
                <div class="metrica">
                  <div class="metrica-valor">O(n)</div>
                  <div class="metrica-etiqueta">Espacio</div>
                  <div class="metrica-pie">2n − 1 nodos en el árbol.</div>
                </div>
                <div class="metrica">
                  <div class="metrica-valor">O(n)</div>
                  <div class="metrica-etiqueta">Si ya viene ordenado</div>
                  <div class="metrica-pie">Con dos colas en vez de un heap se evita el log n.</div>
                </div>
              </div>
            </div>
          </div>
        `
      },

      /* ---------------- 13. Ventajas y aplicaciones ---------------- */
      {
        titulo: "Ventajas y aplicaciones",
        html: Presentacion.cabecera(
          "Estudiante 4 · Mauricio Agudelo",
          "Ventajas, límites y <em>aplicaciones</em>",
          "Por qué un algoritmo de 1952 sigue vivo dentro de casi todo lo que usamos."
        ) + `
          <div class="compara anim" style="margin-bottom:16px">
            <div class="compara-caja compara--si">
              <h4>✓ Ventajas</h4>
              <ul class="lista lista--ok">
                <li><b>Óptimo demostrable</b> entre los códigos de longitud variable símbolo a símbolo.</li>
                <li><b>Sin pérdida:</b> se recupera el original bit por bit.</li>
                <li><b>Rápido:</b> O(n log n) para construir, O(1) por símbolo al codificar.</li>
                <li><b>Decodificación simple:</b> basta con bajar por el árbol.</li>
                <li><b>Universal:</b> sirve para texto, imagen, audio o cualquier flujo de símbolos.</li>
              </ul>
            </div>
            <div class="compara-caja compara--no">
              <h4>✕ Limitaciones</h4>
              <ul class="lista lista--no">
                <li><b>Dos pasadas:</b> hay que contar antes de codificar (salvo la variante adaptativa).</li>
                <li><b>Hay que guardar la tabla</b> o el árbol junto al archivo comprimido.</li>
                <li><b>Mínimo 1 bit por símbolo:</b> la codificación aritmética puede bajar de ahí.</li>
                <li><b>No comprime</b> si todas las frecuencias son parecidas.</li>
                <li>No aprovecha <b>patrones o repeticiones</b> largas (por eso se combina con LZ77).</li>
              </ul>
            </div>
          </div>

          <div class="grid g3 anim">
            <div class="card">
              <div class="card-icono">🗜️</div>
              <div class="card-titulo">Archivos</div>
              <div class="card-texto">ZIP, GZIP, PNG y 7z: dentro de DEFLATE, Huffman codifica la salida de LZ77.</div>
            </div>
            <div class="card">
              <div class="card-icono">🎬</div>
              <div class="card-titulo">Multimedia</div>
              <div class="card-texto">JPEG, MP3, AAC, MPEG y H.264 lo usan como etapa final de codificación entrópica.</div>
            </div>
            <div class="card">
              <div class="card-icono">🌐</div>
              <div class="card-titulo">Redes</div>
              <div class="card-texto">HPACK en HTTP/2 comprime cabeceras con una tabla de Huffman estática.</div>
            </div>
          </div>
        `
      },

      /* ---------------- 14. Conclusiones y preguntas ---------------- */
      {
        titulo: "Conclusiones y preguntas",
        html: Presentacion.cabecera(
          "Estudiante 4 · Mauricio Agudelo",
          "Conclusiones y <em>3 preguntas</em>",
          "Lo que nos llevamos, y lo que le dejamos al público."
        ) + `
          <div class="grid g2 anim">
            <div class="e4-conclusiones">
              <div class="e4-conclusion">
                <span class="e4-conclusion-ico">🥇</span>
                <span class="e4-conclusion-txt">
                  <b>Greedy no siempre acierta, pero cuando acierta es imbatible.</b>
                  Huffman cumple la propiedad de elección voraz y la subestructura óptima: por eso su resultado es el óptimo, no una aproximación.
                </span>
              </div>
              <div class="e4-conclusion">
                <span class="e4-conclusion-ico">📉</span>
                <span class="e4-conclusion-txt">
                  <b>La idea clave cabe en una frase:</b>
                  dar códigos cortos a lo que más se repite. En nuestro ejemplo, de 88 a 23 bits.
                </span>
              </div>
              <div class="e4-conclusion">
                <span class="e4-conclusion-ico">⚙️</span>
                <span class="e4-conclusion-txt">
                  <b>Simple y barato:</b> O(n log n) para construir el árbol, O(n) de memoria,
                  y decodificar es solo bajar por el árbol.
                </span>
              </div>
              <div class="e4-conclusion">
                <span class="e4-conclusion-ico">🌍</span>
                <span class="e4-conclusion-txt">
                  <b>Sigue vigente 70 años después:</b> ZIP, PNG, JPEG, MP3 y HTTP/2 lo llevan dentro.
                </span>
              </div>
            </div>

            <div class="grid" style="gap:12px">
              <div class="pregunta">
                <span class="pregunta-num">01</span>
                <span class="pregunta-txt">
                  Si en un texto <b>todos</b> los caracteres aparecen el mismo número de veces, ¿qué pasa con la compresión de Huffman?
                  <span class="pregunta-pista">Respuesta: el árbol queda balanceado, todos los códigos miden lo mismo y prácticamente no hay ahorro.</span>
                </span>
              </div>
              <div class="pregunta">
                <span class="pregunta-num">02</span>
                <span class="pregunta-txt">
                  ¿Por qué <b>ningún</b> código de Huffman puede ser el comienzo de otro, y por qué eso importa?
                  <span class="pregunta-pista">Respuesta: los símbolos solo están en las hojas (propiedad de prefijo); gracias a eso se decodifica sin separadores ni ambigüedad.</span>
                </span>
              </div>
              <div class="pregunta">
                <span class="pregunta-num">03</span>
                <span class="pregunta-txt">
                  Además del mensaje comprimido, ¿qué <b>más</b> hay que guardar o enviar para poder descomprimirlo?
                  <span class="pregunta-pista">Respuesta: la tabla de códigos o el árbol; en archivos muy pequeños ese costo puede comerse el ahorro.</span>
                </span>
              </div>

              <div class="e4-cierre">
                <h3>¡Gracias!</h3>
                <p>Emanuel Cardona · Iván Morales · Carlos Arteaga · Mauricio Agudelo — Análisis de Algoritmos</p>
              </div>
            </div>
          </div>
        `
      }

    ]
  });
})();
