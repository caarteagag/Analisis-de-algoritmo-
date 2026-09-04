/* ============================================================
   02-ivan-huffman.js  —  CAPA DE IVÁN ANDRÉS MORALES SALGADO
   Tema: qué es Huffman, para qué sirve y cómo funciona
   Archivos de esta capa: js/slides/02-ivan-huffman.js
                          css/estudiante2-ivan.css
   ============================================================ */

(function () {
  "use strict";

  /* Anima las barras de comparación al mostrar la diapositiva */
  function animarBarras(el) {
    var barras = el.querySelectorAll("[data-ancho]");
    Array.prototype.forEach.call(barras, function (b) {
      b.style.width = "0";
      setTimeout(function () { b.style.width = b.getAttribute("data-ancho"); }, 220);
    });
  }

  Presentacion.registrarCapa({
    id: "e2",
    orden: 2,
    estudiante: "Iván Andrés Morales Salgado",
    corto: "Iván Morales",
    iniciales: "IM",
    seccion: "2 · Huffman",
    color: "var(--c2)",
    colorSuave: "rgba(167,139,250,.15)",

    slides: [

      /* ---------------- 6. ¿Qué es el algoritmo de Huffman? ------------- */
      {
        titulo: "¿Qué es el algoritmo de Huffman?",
        html: Presentacion.cabecera(
          "Estudiante 2 · Iván Morales",
          "¿Qué es el algoritmo de <em>Huffman</em>?",
          "Un método de <b>compresión sin pérdida</b> que da códigos <b>cortos a lo frecuente</b> y largos a lo raro. David A. Huffman, MIT, 1952."
        ) + `
          <div class="grid g-1-2 anim">
            <div class="e2-chips">
              <div class="e2-chip" data-tam="corto">
                <span class="e2-chip-letra">E</span>
                <span class="e2-chip-txt">Aparece muchísimo &rarr; merece el código <b>más corto</b></span>
                <span class="e2-chip-cod">01</span>
              </div>
              <div class="e2-chip" data-tam="medio">
                <span class="e2-chip-letra">A</span>
                <span class="e2-chip-txt">Frecuencia media &rarr; código intermedio</span>
                <span class="e2-chip-cod">101</span>
              </div>
              <div class="e2-chip" data-tam="largo">
                <span class="e2-chip-letra">Z</span>
                <span class="e2-chip-txt">Casi no aparece &rarr; puede pagar un código <b>largo</b></span>
                <span class="e2-chip-cod">111011</span>
              </div>
              <div class="destacado" style="margin-top:4px">
                En ASCII <b>todos</b> los caracteres pesan 8 bits. Huffman rompe esa regla:
                la longitud del código depende de la <b>frecuencia</b>.
              </div>
            </div>

            <div class="card" style="display:flex; flex-direction:column; justify-content:center">
              <div class="e2-comparacion">
                <div class="e2-fila">
                  <div class="e2-fila-cab"><b>Longitud fija (ASCII)</b><span>88 bits</span></div>
                  <div class="e2-pista"><div class="e2-relleno e2-relleno--fijo" data-ancho="100%">11 × 8 bits</div></div>
                </div>
                <div class="e2-fila">
                  <div class="e2-fila-cab"><b>Longitud variable (Huffman)</b><span>23 bits</span></div>
                  <div class="e2-pista"><div class="e2-relleno e2-relleno--huff" data-ancho="26%">23 bits</div></div>
                </div>
              </div>
              <p class="card-texto" style="margin-top:16px">
                Mismo mensaje (<span class="mono">ABRACADABRA</span>), misma información,
                <b class="acento">73,9 % menos bits</b>. Y es <b>sin pérdida</b>:
                se reconstruye el original carácter por carácter.
              </p>
            </div>
          </div>
        `,
        alMostrar: animarBarras
      },

      /* ---------------- 7. ¿Para qué sirve? ---------------- */
      {
        titulo: "¿Para qué sirve?",
        html: Presentacion.cabecera(
          "Estudiante 2 · Iván Morales",
          "¿Para qué <em>sirve</em>?",
          "Para que un archivo ocupe menos espacio y viaje más rápido, sin perder ni un solo bit de información."
        ) + `
          <div class="grid g3 anim" style="margin-bottom:18px">
            <div class="metrica">
              <div class="metrica-valor">↓ 20-90%</div>
              <div class="metrica-etiqueta">Reducción típica</div>
              <div class="metrica-pie">Depende de qué tan desiguales sean las frecuencias.</div>
            </div>
            <div class="metrica">
              <div class="metrica-valor">= 0</div>
              <div class="metrica-etiqueta">Información perdida</div>
              <div class="metrica-pie">Compresión sin pérdida: el original se reconstruye exacto.</div>
            </div>
            <div class="metrica">
              <div class="metrica-valor">1952</div>
              <div class="metrica-etiqueta">Sigue vigente</div>
              <div class="metrica-pie">Vive dentro de formatos que usas todos los días.</div>
            </div>
          </div>

          <div class="e2-apps anim">
            <div class="e2-app">
              <span class="e2-app-ico">🗜️</span>
              <span class="e2-app-nombre">ZIP · GZIP · PNG</span>
              <span class="e2-app-txt">El algoritmo DEFLATE combina LZ77 + Huffman. Está en casi todo archivo comprimido.</span>
            </div>
            <div class="e2-app">
              <span class="e2-app-ico">🖼️</span>
              <span class="e2-app-nombre">JPEG</span>
              <span class="e2-app-txt">Después de descartar detalle, Huffman comprime los coeficientes resultantes.</span>
            </div>
            <div class="e2-app">
              <span class="e2-app-ico">🎵</span>
              <span class="e2-app-nombre">MP3 · AAC</span>
              <span class="e2-app-txt">Etapa final de codificación entrópica del audio.</span>
            </div>
            <div class="e2-app">
              <span class="e2-app-ico">🌐</span>
              <span class="e2-app-nombre">HTTP/2 (HPACK)</span>
              <span class="e2-app-txt">Comprime las cabeceras de cada petición web con una tabla de Huffman.</span>
            </div>
            <div class="e2-app">
              <span class="e2-app-ico">📼</span>
              <span class="e2-app-nombre">Video: MPEG · H.264</span>
              <span class="e2-app-txt">Variantes de codificación entrópica derivadas de la misma idea.</span>
            </div>
            <div class="e2-app">
              <span class="e2-app-ico">📡</span>
              <span class="e2-app-nombre">Fax, IoT y telemetría</span>
              <span class="e2-app-txt">Menos bits transmitidos = menos ancho de banda, menos batería, menos costo.</span>
            </div>
          </div>
        `
      },

      /* ---------------- 8. ¿Cómo funciona? ---------------- */
      {
        titulo: "¿Cómo funciona?",
        html: Presentacion.cabecera(
          "Estudiante 2 · Iván Morales",
          "¿Cómo <em>funciona</em>? Cuatro pasos",
          "Contar, ordenar, fusionar de a dos y leer el camino. Nada más."
        ) + `
          <div class="pasos-fila anim" style="margin-bottom:18px">
            <div class="paso">
              <span class="paso-num">1</span>
              <span class="paso-txt"><b>Contar</b>Recorrer el texto y contar cuántas veces aparece cada carácter.</span>
            </div>
            <div class="paso">
              <span class="paso-num">2</span>
              <span class="paso-txt"><b>Ordenar</b>Meter cada carácter como un nodo-hoja en una cola de prioridad por frecuencia.</span>
            </div>
            <div class="paso">
              <span class="paso-num">3</span>
              <span class="paso-txt"><b>Fusionar</b>Sacar los <b>dos menores</b>, unirlos bajo un padre cuya frecuencia es la suma, y devolverlo a la cola. Repetir hasta que quede uno.</span>
            </div>
            <div class="paso">
              <span class="paso-num">4</span>
              <span class="paso-txt"><b>Leer</b>Bajar por el árbol: izquierda = <b>0</b>, derecha = <b>1</b>. El camino hasta cada hoja es su código.</span>
            </div>
          </div>

          <div class="grid g2 anim">
            <div class="codigo"><span class="cm">// El corazón del algoritmo (paso 3)</span>
cola <span class="kw">←</span> min-heap con todas las hojas

<span class="kw">mientras</span> cola.tamaño &gt; 1:
    a <span class="kw">←</span> cola.extraerMin()   <span class="cm">// menor</span>
    b <span class="kw">←</span> cola.extraerMin()   <span class="cm">// segundo menor</span>
    p <span class="kw">←</span> nuevoNodo(a.freq + b.freq)
    p.izq <span class="kw">←</span> a ;  p.der <span class="kw">←</span> b
    cola.insertar(p)

raíz <span class="kw">←</span> cola.extraerMin()</div>

            <div class="e2-prefijo">
              <div class="e2-caso e2-caso--mal">
                <h5>✕ Sin propiedad de prefijo</h5>
                <code>A = 0<br>B = 01<br>C = 1</code>
                <p>¿<b>“01”</b> es <b>B</b>, o es <b>A</b> seguido de <b>C</b>? Ambiguo: no se puede decodificar.</p>
              </div>
              <div class="e2-caso e2-caso--bien">
                <h5>✓ Códigos de Huffman</h5>
                <code>A = 0<br>B = 110<br>C = 100</code>
                <p>Ningún código es prefijo de otro, porque los símbolos solo viven en las <b>hojas</b>. La lectura es única, sin separadores.</p>
              </div>
            </div>
          </div>
        `
      }

    ]
  });
})();
