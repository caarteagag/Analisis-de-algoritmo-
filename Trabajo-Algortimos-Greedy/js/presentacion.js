/* ============================================================
   presentacion.js - MOTOR DE LA PRESENTACION (capa comun)
   ------------------------------------------------------------
   Cada estudiante NO toca este archivo. Solo registra su capa:

   Presentacion.registrarCapa({
     id: "e1",
     orden: 1,
     estudiante: "Carlos Andres Arteaga Garcia",
     corto: "Carlos",
     iniciales: "CA",
     seccion: "Greedy",
     color: "var(--c1)",
     colorSuave: "rgba(34,211,238,.15)",
     slides: [
       { titulo:"...", html:"...", alMostrar: function(el){} }
     ]
   });
   ============================================================ */

var Presentacion = (function () {
  "use strict";

  var capas = [];      // capas registradas por cada estudiante
  var slides = [];     // lista plana de diapositivas ya ordenada
  var indice = 0;
  var dom = {};

  /* ---------- API publica para las capas ---------- */
  function registrarCapa(capa) {
    if (!capa || !capa.slides || !capa.slides.length) {
      console.warn("[Presentacion] Capa invalida o sin diapositivas:", capa);
      return;
    }
    capas.push(capa);
  }

  /* ---------- Construccion del DOM ---------- */
  function construir() {
    capas.sort(function (a, b) { return (a.orden || 0) - (b.orden || 0); });

    slides = [];
    capas.forEach(function (capa) {
      capa.slides.forEach(function (s) {
        slides.push({ capa: capa, def: s, el: null });
      });
    });

    dom.escenario.innerHTML = "";
    dom.puntos.innerHTML = "";

    slides.forEach(function (s, i) {
      var el = document.createElement("section");
      el.className = "slide slide--" + s.capa.id + (s.def.clase ? " " + s.def.clase : "");
      el.setAttribute("data-indice", String(i));
      // el envoltorio permite centrar verticalmente SIN recortar el borde
      // superior cuando el contenido es mas alto que la pantalla
      el.innerHTML = '<div class="slide-inner">' + s.def.html + "</div>";
      dom.escenario.appendChild(el);
      s.el = el;

      var p = document.createElement("button");
      p.className = "punto";
      p.type = "button";
      p.setAttribute("data-duenio", s.capa.id);
      p.title = (i + 1) + ". " + (s.def.titulo || s.capa.seccion) + "  -  " + s.capa.corto;
      p.addEventListener("click", function () { ir(i); });
      dom.puntos.appendChild(p);
    });

    dom.contadorTotal.textContent = String(slides.length);
  }

  /* ---------- Navegacion ---------- */
  function ir(nuevo) {
    if (nuevo < 0 || nuevo >= slides.length) return;

    var anterior = slides[indice];
    if (anterior && anterior.el) anterior.el.classList.remove("activa");

    indice = nuevo;
    var actual = slides[indice];

    // color de acento de la seccion
    document.documentElement.style.setProperty("--acento", actual.capa.color);
    document.documentElement.style.setProperty("--acento-suave", actual.capa.colorSuave);

    // el navegador necesita un frame para reiniciar las animaciones
    requestAnimationFrame(function () {
      actual.el.classList.add("activa");
      actual.el.scrollTop = 0;
      if (typeof actual.def.alMostrar === "function") {
        try { actual.def.alMostrar(actual.el); }
        catch (e) { console.error("[Presentacion] alMostrar fallo en la diapositiva " + (indice + 1), e); }
      }
    });

    actualizarCromo();
  }

  function siguiente() { ir(indice + 1); }
  function anterior() { ir(indice - 1); }

  function actualizarCromo() {
    var actual = slides[indice];
    var capa = actual.capa;

    dom.progresoFill.style.width = ((indice + 1) / slides.length * 100) + "%";
    dom.contadorActual.textContent = String(indice + 1);

    dom.chipAvatar.textContent = capa.iniciales;
    dom.chipNombre.textContent = capa.corto;
    dom.chipSeccion.textContent = capa.seccion;

    dom.btnAnterior.disabled = (indice === 0);
    dom.btnSiguiente.disabled = (indice === slides.length - 1);

    Array.prototype.forEach.call(dom.puntos.children, function (p, i) {
      p.classList.toggle("activo", i === indice);
    });
  }

  /* ---------- Eventos ---------- */
  function conectar() {
    dom.btnAnterior.addEventListener("click", anterior);
    dom.btnSiguiente.addEventListener("click", siguiente);

    document.addEventListener("keydown", function (e) {
      var t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;

      switch (e.key) {
        case "ArrowRight": case "PageDown": case " ": e.preventDefault(); siguiente(); break;
        case "ArrowLeft":  case "PageUp":          e.preventDefault(); anterior(); break;
        case "Home": e.preventDefault(); ir(0); break;
        case "End":  e.preventDefault(); ir(slides.length - 1); break;
        case "f": case "F":
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen();
          break;
      }
    });

    // deslizar en pantallas tactiles
    var x0 = null;
    dom.escenario.addEventListener("touchstart", function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
    dom.escenario.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var d = e.changedTouches[0].clientX - x0;
      if (Math.abs(d) > 60) { d < 0 ? siguiente() : anterior(); }
      x0 = null;
    }, { passive: true });
  }

  /* ---------- Arranque ---------- */
  function iniciar() {
    dom = {
      escenario:     document.getElementById("escenario"),
      puntos:        document.getElementById("puntos"),
      progresoFill:  document.getElementById("progresoFill"),
      contadorActual:document.getElementById("contadorActual"),
      contadorTotal: document.getElementById("contadorTotal"),
      chipAvatar:    document.getElementById("chipAvatar"),
      chipNombre:    document.getElementById("chipNombre"),
      chipSeccion:   document.getElementById("chipSeccion"),
      btnAnterior:   document.getElementById("btnAnterior"),
      btnSiguiente:  document.getElementById("btnSiguiente")
    };

    construir();
    conectar();
    ir(0);

    console.log("%c Presentacion lista ", "background:#60a5fa;color:#08101f;font-weight:bold",
      slides.length + " diapositivas / " + capas.length + " capas");
  }

  /* ---------- Ayudas para las capas ---------- */

  // Cabecera estandar de diapositiva
  function cabecera(etiqueta, titulo, subtitulo) {
    return '' +
      '<header class="slide-cab anim">' +
        '<span class="slide-etiqueta">' + etiqueta + "</span>" +
        '<h2 class="slide-titulo">' + titulo + "</h2>" +
        (subtitulo ? '<p class="slide-subtitulo">' + subtitulo + "</p>" : "") +
      "</header>";
  }

  return {
    registrarCapa: registrarCapa,
    iniciar: iniciar,
    ir: ir,
    siguiente: siguiente,
    anterior: anterior,
    cabecera: cabecera
  };
})();
