/* ============================================================
   03-emanuel-ejemplo.js  —  CAPA DE EMANUEL CARDONA GARCÍA
   Tema: ejemplo completo paso a paso con la palabra ABRACADABRA
   Archivos de esta capa: js/slides/03-emanuel-ejemplo.js
                          css/estudiante3-emanuel.css
   Usa la librería común js/lib/huffman.js
   ============================================================ */

(function () {
  "use strict";

  var PALABRA = "ABRACADABRA";
  var FRECUENCIAS = Huffman.contar(PALABRA);          // A:5 B:2 R:2 C:1 D:1
  var ARBOL = Huffman.construir(FRECUENCIAS);
  var CODIGOS = ARBOL.codigos;
  var STATS = Huffman.estadisticas(PALABRA, CODIGOS);

  var ordenados = Object.keys(FRECUENCIAS).sort(function (a, b) {
    return FRECUENCIAS[b] - FRECUENCIAS[a] || (a < b ? -1 : 1);
  });
  var maxFreq = FRECUENCIAS[ordenados[0]];

  /* ---------- Diapositiva 9: helpers ---------- */
  function filasFrecuencia() {
    return ordenados.map(function (c) {
      var pct = Math.round(FRECUENCIAS[c] / maxFreq * 100);
      return '<div class="barra-fila">' +
               '<span class="barra-simbolo">' + c + "</span>" +
               '<span class="barra-pista"><span class="barra-valor" data-ancho="' + pct + '%"></span></span>' +
               '<span class="barra-num">' + FRECUENCIAS[c] + "</span>" +
             "</div>";
    }).join("");
  }

  function filasTabla() {
    return ordenados.map(function (c) {
      var f = FRECUENCIAS[c];
      var pct = (f / PALABRA.length * 100).toFixed(1);
      return "<tr>" +
               '<td class="col-simbolo">' + c + "</td>" +
               '<td class="col-mono">' + f + "</td>" +
               '<td class="col-mono">' + pct + " %</td>" +
               '<td class="col-mono">' + (f * 8) + " bits</td>" +
             "</tr>";
    }).join("");
  }

  function letrasPalabra() {
    return PALABRA.split("").map(function (c) {
      return '<span class="e3-letra" data-c="' + c + '">' + c + "</span>";
    }).join("");
  }

  /* ---------- Diapositiva 11: helpers ---------- */
  function filasCodigos() {
    return ordenados.map(function (c) {
      var f = FRECUENCIAS[c], cod = CODIGOS[c];
      return "<tr>" +
               '<td class="col-simbolo">' + c + "</td>" +
               '<td class="col-mono">' + f + "</td>" +
               '<td><span class="e3-codigo-bin">' + cod + "</span></td>" +
               '<td class="col-mono">' + cod.length + "</td>" +
               '<td class="col-mono">' + (f * cod.length) + "</td>" +
             "</tr>";
    }).join("") +
    '<tr style="border-top:1px solid var(--borde-fuerte)">' +
      '<td colspan="4" style="text-align:right; color:var(--texto)"><b>Total</b></td>' +
      '<td class="col-mono"><b class="acento">' + STATS.bitsHuffman + " bits</b></td>" +
    "</tr>";
  }

  function cintaBits() {
    return PALABRA.split("").map(function (c) {
      return '<span class="bits-grupo">' +
               '<span class="bits-letra">' + c + "</span>" +
               '<span class="bits-codigo">' + CODIGOS[c] + "</span>" +
             "</span>";
    }).join("");
  }

  /* ---------- Diapositiva 10: reproductor del árbol ---------- */
  var paso = 0;
  var temporizador = null;

  function pintarPaso(el) {
    var p = ARBOL.pasos[paso];
    var resaltados = {};
    if (p.nuevo) resaltados[p.nuevo] = "nuevo";
    (p.fusionados || []).forEach(function (id) { resaltados[id] = "fusion"; });

    el.querySelector("[data-arbol]").innerHTML = Huffman.svgBosque(p.bosque, {
      resaltados: resaltados,
      nuevo: p.nuevo,
      gapX: 74,
      gapY: 80,
      radio: 25,
      separacion: 54
    });

    el.querySelector("[data-info]").innerHTML = "<b>" + p.titulo + ".</b> " + p.descripcion;
    el.querySelector("[data-contador]").textContent =
      "Paso " + paso + " de " + (ARBOL.pasos.length - 1);

    el.querySelector("[data-paso-prev]").disabled = (paso === 0);
    el.querySelector("[data-paso-next]").disabled = (paso === ARBOL.pasos.length - 1);
  }

  function detener(el) {
    if (temporizador) { clearInterval(temporizador); temporizador = null; }
    var b = el.querySelector("[data-paso-auto]");
    if (b) b.innerHTML = "▶ Automático";
  }

  function alMostrarArbol(el) {
    detener(el);

    if (!el.getAttribute("data-conectado")) {
      el.setAttribute("data-conectado", "1");

      el.querySelector("[data-paso-prev]").addEventListener("click", function () {
        detener(el); if (paso > 0) { paso--; pintarPaso(el); }
      });
      el.querySelector("[data-paso-next]").addEventListener("click", function () {
        detener(el); if (paso < ARBOL.pasos.length - 1) { paso++; pintarPaso(el); }
      });
      el.querySelector("[data-paso-reset]").addEventListener("click", function () {
        detener(el); paso = 0; pintarPaso(el);
      });
      el.querySelector("[data-paso-auto]").addEventListener("click", function () {
        if (temporizador) { detener(el); return; }
        if (paso === ARBOL.pasos.length - 1) paso = 0;
        this.innerHTML = "⏸ Pausar";
        pintarPaso(el);
        temporizador = setInterval(function () {
          if (paso >= ARBOL.pasos.length - 1) { detener(el); return; }
          paso++; pintarPaso(el);
        }, 1600);
      });
    }

    pintarPaso(el);
  }

  /* ---------- Animación de barras (diapositiva 9) ---------- */
  function animarBarras(el) {
    var barras = el.querySelectorAll("[data-ancho]");
    Array.prototype.forEach.call(barras, function (b, i) {
      b.style.width = "0";
      setTimeout(function () { b.style.width = b.getAttribute("data-ancho"); }, 200 + i * 90);
    });
  }

  /* ================================================================= */
  Presentacion.registrarCapa({
    id: "e3",
    orden: 3,
    estudiante: "Emanuel Cardona García",
    corto: "Emanuel Cardona",
    iniciales: "EC",
    seccion: "3 · Ejemplo",
    color: "var(--c3)",
    colorSuave: "rgba(52,211,153,.15)",

    slides: [

      /* ---------------- 9. Frecuencias ---------------- */
      {
        titulo: "Frecuencias de los caracteres",
        html: Presentacion.cabecera(
          "Estudiante 3 · Emanuel Cardona",
          "Paso 1: contar <em>frecuencias</em>",
          'Vamos a comprimir la palabra <b class="mono">ABRACADABRA</b>: 11 caracteres, 5 símbolos distintos.'
        ) + `
          <div class="e3-palabra anim" style="margin-bottom:20px">${letrasPalabra()}</div>

          <div class="grid g2 anim">
            <div class="card">
              <div class="card-titulo" style="margin-bottom:14px">Frecuencia de cada símbolo</div>
              <div class="barras">${filasFrecuencia()}</div>
              <p class="card-texto" style="margin-top:14px">
                <b>A</b> aparece 5 veces y <b>C</b> y <b>D</b> solo una.
                Esa desigualdad es <b class="acento">exactamente</b> lo que Huffman aprovecha.
              </p>
            </div>

            <div class="card">
              <div class="card-titulo" style="margin-bottom:6px">Costo actual (longitud fija)</div>
              <table class="tabla">
                <thead><tr><th>Símbolo</th><th>Frec.</th><th>% del texto</th><th>Bits en ASCII</th></tr></thead>
                <tbody>${filasTabla()}</tbody>
              </table>
              <div class="destacado" style="margin-top:14px">
                11 caracteres × 8 bits = <b>88 bits</b>. Aquí una <b>A</b> pesa lo mismo que una <b>D</b>,
                aunque aparezca 5 veces más.
              </div>
            </div>
          </div>
        `,
        alMostrar: animarBarras
      },

      /* ---------------- 10. Construcción del árbol ---------------- */
      {
        titulo: "Construcción del árbol de Huffman",
        clase: "e3-slide-arbol",
        html: Presentacion.cabecera(
          "Estudiante 3 · Emanuel Cardona",
          "Paso 2: construir el <em>árbol</em>",
          "En cada paso se unen los <b>dos nodos de menor frecuencia</b>. Avanza con los botones."
        ) + `
          <div class="e3-arbol-zona anim">
            <div class="reproductor">
              <button class="btn" data-paso-prev>← Paso</button>
              <button class="btn btn-primario" data-paso-next>Paso →</button>
              <button class="btn btn-ghost" data-paso-auto>▶ Automático</button>
              <button class="btn btn-ghost" data-paso-reset>↺ Reiniciar</button>
              <span class="reproductor-info" data-info></span>
              <span class="reproductor-contador" data-contador></span>
            </div>

            <div class="arbol-caja" data-arbol></div>
          </div>
        `,
        alMostrar: alMostrarArbol
      },

      /* ---------------- 11. Códigos y codificación ---------------- */
      {
        titulo: "Códigos 0/1 y palabra codificada",
        html: Presentacion.cabecera(
          "Estudiante 3 · Emanuel Cardona",
          "Paso 3: leer los <em>códigos</em> y codificar",
          "Bajando desde la raíz: izquierda = <b>0</b>, derecha = <b>1</b>. El camino hasta cada hoja es su código."
        ) + `
          <div class="grid g-1-2 anim" style="margin-bottom:16px">
            <div class="arbol-caja" style="height:clamp(210px, 32vh, 340px)">${Huffman.svgArbol(ARBOL.raiz, { gapX: 72, gapY: 76, radio: 24 })}</div>

            <div class="card">
              <table class="tabla">
                <thead><tr><th>Símbolo</th><th>Frec.</th><th>Código</th><th>Bits</th><th>Frec × Bits</th></tr></thead>
                <tbody>${filasCodigos()}</tbody>
              </table>
              <p class="card-texto" style="margin-top:12px">
                La <b>A</b> (la más frecuente) quedó con <b class="acento">1 solo bit</b>;
                <b>C</b> y <b>D</b> (las más raras) pagan 3 bits. Ningún código es prefijo de otro.
              </p>
            </div>
          </div>

          <div class="e3-cinta anim">
            <div class="e3-cinta-titulo">Palabra codificada · ABRACADABRA</div>
            <div class="bits">${cintaBits()}</div>
            <div class="e3-bits-total">
              Resultado: <b>${Huffman.codificar(PALABRA, CODIGOS)}</b>
            </div>
          </div>

          <div class="grid g4 anim" style="margin-top:16px">
            <div class="metrica"><div class="metrica-valor">${STATS.bitsAscii}</div><div class="metrica-etiqueta">Bits en ASCII</div></div>
            <div class="metrica"><div class="metrica-valor">${STATS.bitsHuffman}</div><div class="metrica-etiqueta">Bits con Huffman</div></div>
            <div class="metrica"><div class="metrica-valor">${STATS.promedio}</div><div class="metrica-etiqueta">Bits por carácter</div></div>
            <div class="metrica"><div class="metrica-valor">${STATS.ahorro} %</div><div class="metrica-etiqueta">Ahorro</div></div>
          </div>
        `
      }

    ]
  });
})();
