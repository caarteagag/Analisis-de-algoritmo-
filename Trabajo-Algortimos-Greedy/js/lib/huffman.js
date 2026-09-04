/* ============================================================
   huffman.js - LIBRERIA COMUN
   Implementacion del algoritmo de Huffman + dibujo del arbol
   en SVG. La usa sobre todo la capa de Emanuel (ejemplo), pero
   cualquier capa puede llamarla.
   ============================================================ */

var Huffman = (function () {
  "use strict";

  /* ------------------------------------------------------------------
     1) FRECUENCIAS
     ------------------------------------------------------------------ */
  function contar(texto) {
    var f = {};
    for (var i = 0; i < texto.length; i++) {
      f[texto[i]] = (f[texto[i]] || 0) + 1;
    }
    return f;
  }

  /* ------------------------------------------------------------------
     2) CONSTRUCCION DEL ARBOL (nucleo greedy)
     En cada paso se eligen los DOS nodos de menor frecuencia.
     Desempate determinista: primero las hojas, luego orden alfabetico,
     asi el arbol siempre sale igual y coincide con el del tablero.
     ------------------------------------------------------------------ */
  function ordenar(pool) {
    pool.sort(function (a, b) {
      if (a.freq !== b.freq) return a.freq - b.freq;
      var ha = esHoja(a) ? 0 : 1, hb = esHoja(b) ? 0 : 1;
      if (ha !== hb) return ha - hb;
      if (esHoja(a) && esHoja(b)) return a.simbolo < b.simbolo ? -1 : 1;
      return a.seq - b.seq;
    });
  }

  function esHoja(n) { return !n.izq && !n.der; }

  function construir(frecuencias) {
    var seq = 0;
    var pool = Object.keys(frecuencias).map(function (c) {
      return { id: "n" + (seq), seq: seq++, simbolo: c, freq: frecuencias[c], izq: null, der: null };
    });

    ordenar(pool);

    var pasos = [{
      bosque: pool.slice(),
      nuevo: null,
      fusionados: [],
      titulo: "Estado inicial",
      descripcion: "Cada carácter es un árbol de un solo nodo. Los ordenamos de menor a mayor frecuencia."
    }];

    while (pool.length > 1) {
      ordenar(pool);
      var a = pool.shift();
      var b = pool.shift();
      var padre = {
        id: "n" + seq, seq: seq++, simbolo: null,
        freq: a.freq + b.freq, izq: a, der: b
      };
      pool.push(padre);
      ordenar(pool);

      pasos.push({
        bosque: pool.slice(),
        nuevo: padre.id,
        fusionados: [a.id, b.id],
        titulo: "Unión " + pasos.length,
        descripcion: "Los dos menores son " + etiqueta(a) + " y " + etiqueta(b) +
                     ". Se unen bajo un nodo de frecuencia " + padre.freq + "."
      });
    }

    var raiz = pool[0];
    pasos[pasos.length - 1].titulo = "Árbol final";
    pasos[pasos.length - 1].descripcion += " Ya solo queda un árbol: terminamos.";

    return { raiz: raiz, pasos: pasos, codigos: codigos(raiz) };
  }

  function etiqueta(n) {
    return esHoja(n)
      ? "la hoja '" + n.simbolo + "' (" + n.freq + ")"
      : "el subárbol de " + n.freq;
  }

  /* ------------------------------------------------------------------
     3) CODIGOS: izquierda = 0, derecha = 1
     ------------------------------------------------------------------ */
  function codigos(raiz) {
    var mapa = {};
    if (!raiz) return mapa;
    if (esHoja(raiz)) { mapa[raiz.simbolo] = "0"; return mapa; }
    (function rec(n, camino) {
      if (esHoja(n)) { mapa[n.simbolo] = camino; return; }
      rec(n.izq, camino + "0");
      rec(n.der, camino + "1");
    })(raiz, "");
    return mapa;
  }

  function codificar(texto, mapa) {
    var out = "";
    for (var i = 0; i < texto.length; i++) out += mapa[texto[i]];
    return out;
  }

  function estadisticas(texto, mapa) {
    var bitsHuffman = codificar(texto, mapa).length;
    var bitsAscii = texto.length * 8;
    return {
      caracteres: texto.length,
      bitsAscii: bitsAscii,
      bitsHuffman: bitsHuffman,
      ahorro: Math.round((1 - bitsHuffman / bitsAscii) * 1000) / 10,
      promedio: Math.round((bitsHuffman / texto.length) * 100) / 100
    };
  }

  /* ------------------------------------------------------------------
     4) GEOMETRIA DEL ARBOL
     ------------------------------------------------------------------ */
  function profundidad(n) {
    if (esHoja(n)) return 0;
    return 1 + Math.max(profundidad(n.izq), profundidad(n.der));
  }

  function hojas(n) { return esHoja(n) ? 1 : hojas(n.izq) + hojas(n.der); }

  function medir(raiz, gapX, gapY) {
    var pos = {};
    var cursor = 0;
    (function rec(n, prof) {
      var x;
      if (esHoja(n)) { x = cursor * gapX; cursor++; }
      else {
        var xi = rec(n.izq, prof + 1);
        var xd = rec(n.der, prof + 1);
        x = (xi + xd) / 2;
      }
      pos[n.id] = { x: x, y: prof * gapY, nodo: n };
      return x;
    })(raiz, 0);

    return { pos: pos, ancho: Math.max(cursor - 1, 0) * gapX, alto: profundidad(raiz) * gapY };
  }

  /* ------------------------------------------------------------------
     5) DIBUJO SVG
     opciones: { gapX, gapY, radio, bits, resaltados:{id:"nuevo"|"fusion"} }
     ------------------------------------------------------------------ */
  function nodoSVG(p, r, resalte) {
    var n = p.nodo;
    var hoja = esHoja(n);
    var clases = "hf-nodo " + (hoja ? "hf-hoja" : "hf-interno");
    if (resalte === "nuevo") clases += " hf-nodo--nuevo";
    if (resalte === "fusion") clases += " hf-nodo--fusion";

    var s = '<g class="' + clases + '" transform="translate(' + p.x + "," + p.y + ')">';
    s += '<circle r="' + r + '"></circle>';
    if (hoja) {
      s += '<text class="hf-simbolo" dy="-5">' + escapar(n.simbolo) + "</text>";
      s += '<text class="hf-freq" dy="12">' + n.freq + "</text>";
    } else {
      s += '<text class="hf-simbolo" dy="0">' + n.freq + "</text>";
    }
    s += "</g>";
    return s;
  }

  function aristasSVG(raiz, pos, opciones, nuevoId) {
    var s = "";
    (function rec(n) {
      if (esHoja(n)) return;
      [[n.izq, "0"], [n.der, "1"]].forEach(function (par) {
        var h = par[0], bit = par[1];
        var a = pos[n.id], b = pos[h.id];
        var clase = "hf-arista" + (nuevoId && n.id === nuevoId ? " hf-arista--nueva" : "");
        s += '<path class="' + clase + '" d="M ' + a.x + " " + a.y +
             " L " + b.x + " " + b.y + '"></path>';
        if (opciones.bits !== false) {
          var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          s += '<rect class="hf-bit-fondo" x="' + (mx - 9) + '" y="' + (my - 9) +
               '" width="18" height="18" rx="5"></rect>';
          s += '<text class="hf-bit hf-bit--' + bit + '" x="' + mx + '" y="' + (my + 1) + '">' + bit + "</text>";
        }
      });
      rec(n.izq); rec(n.der);
    })(raiz);
    return s;
  }

  /* Dibuja un bosque (uno o varios arboles lado a lado) */
  function svgBosque(bosque, opciones) {
    opciones = opciones || {};
    var gapX = opciones.gapX || 78;
    var gapY = opciones.gapY || 84;
    var r = opciones.radio || 26;
    var sep = opciones.separacion || 58;
    var resaltados = opciones.resaltados || {};

    var piezas = [], offset = 0, altoMax = 0;

    bosque.forEach(function (raiz) {
      var m = medir(raiz, gapX, gapY);
      var cuerpo = "";
      cuerpo += aristasSVG(raiz, m.pos, opciones, opciones.nuevo);
      Object.keys(m.pos).forEach(function (id) {
        cuerpo += nodoSVG(m.pos[id], r, resaltados[id]);
      });
      piezas.push('<g transform="translate(' + offset + ',0)">' + cuerpo + "</g>");
      offset += m.ancho + gapX + sep;
      altoMax = Math.max(altoMax, m.alto);
    });

    var pad = r + 14;
    var ancho = Math.max(offset - gapX - sep, 1) + pad * 2;
    var alto = altoMax + pad * 2;

    return '<svg class="arbol-svg" viewBox="' + (-pad) + " " + (-pad) + " " + ancho + " " + alto +
           '" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">' +
           piezas.join("") + "</svg>";
  }

  function svgArbol(raiz, opciones) { return svgBosque([raiz], opciones); }

  function escapar(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return {
    contar: contar,
    construir: construir,
    codigos: codigos,
    codificar: codificar,
    estadisticas: estadisticas,
    svgArbol: svgArbol,
    svgBosque: svgBosque,
    esHoja: esHoja
  };
})();
