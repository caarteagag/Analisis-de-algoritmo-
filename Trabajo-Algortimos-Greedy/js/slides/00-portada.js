/* ============================================================
   00-portada.js  —  CAPA DEL EQUIPO
   Diapositivas: portada + agenda
   Archivos de esta capa:  js/slides/00-portada.js  +  css/portada.css
   ============================================================ */

Presentacion.registrarCapa({
  id: "e0",
  orden: 0,
  estudiante: "Equipo",
  corto: "Equipo",
  iniciales: "EQ",
  seccion: "Introducción",
  color: "var(--c0)",
  colorSuave: "rgba(96,165,250,.15)",

  slides: [

    /* ---------------- 1. PORTADA ---------------- */
    {
      titulo: "Portada",
      clase: "portada",
      html: `
        <div class="anim">
          <span class="portada-kicker">Análisis de Algoritmos · Parcial 1</span>
        </div>

        <h1 class="portada-titulo anim">
          Algoritmos Voraces
          <small>Categoría <b>Greedy</b> · Caso de estudio: <b>Codificación de Huffman</b></small>
        </h1>

        <div class="portada-linea anim"></div>

        <div class="integrantes anim">
          <div class="integrante" data-c="1">
            <span class="integrante-avatar">CA</span>
            <span class="integrante-nombre">Carlos Andrés<br>Arteaga García</span>
            <span class="integrante-rol">Greedy</span>
          </div>
          <div class="integrante" data-c="2">
            <span class="integrante-avatar">IM</span>
            <span class="integrante-nombre">Iván Andrés<br>Morales Salgado</span>
            <span class="integrante-rol">Huffman</span>
          </div>
          <div class="integrante" data-c="3">
            <span class="integrante-avatar">EC</span>
            <span class="integrante-nombre">Emanuel<br>Cardona García</span>
            <span class="integrante-rol">Ejemplo</span>
          </div>
          <div class="integrante" data-c="4">
            <span class="integrante-avatar">MA</span>
            <span class="integrante-nombre">Mauricio<br>Agudelo</span>
            <span class="integrante-rol">Análisis</span>
          </div>
        </div>

        <div class="portada-pie anim">
          <span>Navega con <kbd>←</kbd> <kbd>→</kbd></span>
          <span><kbd>F</kbd> pantalla completa</span>
        </div>
      `
    },

    /* ---------------- 2. AGENDA ---------------- */
    {
      titulo: "Agenda",
      html: Presentacion.cabecera(
        "Recorrido",
        "¿Qué vamos a <em>ver</em>?",
        "Cuatro bloques, un expositor por bloque. De la idea general al ejemplo concreto y al análisis."
      ) + `
        <div class="agenda anim">
          <div class="agenda-col" data-c="1">
            <span class="agenda-num">01</span>
            <div>
              <div class="agenda-tema">Algoritmos Greedy</div>
              <div class="agenda-quien">Carlos Arteaga</div>
            </div>
            <ul class="agenda-puntos">
              <li>Qué es un algoritmo voraz</li>
              <li>Características</li>
              <li>Ventajas y desventajas</li>
              <li>Por qué Huffman es greedy</li>
            </ul>
          </div>

          <div class="agenda-col" data-c="2">
            <span class="agenda-num">02</span>
            <div>
              <div class="agenda-tema">Algoritmo de Huffman</div>
              <div class="agenda-quien">Iván Morales</div>
            </div>
            <ul class="agenda-puntos">
              <li>Qué es</li>
              <li>Para qué sirve</li>
              <li>Cómo funciona (4 pasos)</li>
              <li>Códigos prefijo</li>
            </ul>
          </div>

          <div class="agenda-col" data-c="3">
            <span class="agenda-num">03</span>
            <div>
              <div class="agenda-tema">Ejemplo paso a paso</div>
              <div class="agenda-quien">Emanuel Cardona</div>
            </div>
            <ul class="agenda-puntos">
              <li>Frecuencias de caracteres</li>
              <li>Construcción del árbol</li>
              <li>Códigos 0 y 1</li>
              <li>Codificar una palabra</li>
            </ul>
          </div>

          <div class="agenda-col" data-c="4">
            <span class="agenda-num">04</span>
            <div>
              <div class="agenda-tema">Análisis y conclusión</div>
              <div class="agenda-quien">Mauricio Agudelo</div>
            </div>
            <ul class="agenda-puntos">
              <li>Complejidad O(n log n)</li>
              <li>Ventajas y aplicaciones</li>
              <li>Conclusiones</li>
              <li>3 preguntas al público</li>
            </ul>
          </div>
        </div>
      `
    }

  ]
});
