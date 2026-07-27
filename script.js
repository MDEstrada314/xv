
  // --- LÓGICA REPRODUCTOR DE MÚSICA ---
  const audio = document.getElementById("cancion-xv");
  const btnPlay = document.getElementById("btn-play-pause");
  const iconPlay = document.getElementById("icon-play");
  const progressFill = document.querySelector(".progress-fill");
  const timeCurrent = document.querySelectorAll(".time")[0];
  const timeDuration = document.querySelectorAll(".time")[1];

  function togglePlay() {
    if (audio.paused) {
      audio.play();
      iconPlay.className = "fa-solid fa-pause"; // Cambia el ícono a Pausa
    } else {
      audio.pause();
      iconPlay.className = "fa-solid fa-play";  // Cambia el ícono a Play
    }
  }

  // Actualiza la barra de progreso y el tiempo en texto mientras suena
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = `${percentage}%`;

      // Formatear minutos y segundos actuales
      const currentMin = Math.floor(audio.currentTime / 60);
      const currentSec = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
      timeCurrent.textContent = `${currentMin}:${currentSec}`;
    }
  });

  // Muestra la duración total cuando el audio carga
  audio.addEventListener("loadedmetadata", () => {
    const totalMin = Math.floor(audio.duration / 60);
    const totalSec = Math.floor(audio.duration % 60).toString().padStart(2, '0');
    timeDuration.textContent = `${totalMin}:${totalSec}`;
  });

  // --- LÓGICA DE ANIMACIONES FADE-IN ---
  document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach(el => observer.observe(el));
  });


  // --- LÓGICA DEL CONTADOR REGRESIVO ---
function iniciarCuentaRegresiva() {
  // Configura la fecha objetivo: Año, Mes (0 = Ene, 7 = Ago), Día, Hora, Minutos
  const fechaEvento = new Date(2026, 7, 22, 19, 0, 0).getTime();

  const timer = setInterval(function () {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    // Cálculo de Días, Horas, Minutos y Segundos
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Renderizar en el HTML (con .padStart para asegurar 2 dígitos: "03", "09", etc.)
    if (diferencia > 0) {
      document.getElementById("days").textContent = String(dias).padStart(2, '0');
      document.getElementById("hours").textContent = String(horas).padStart(2, '0');
      document.getElementById("minutes").textContent = String(minutos).padStart(2, '0');
      document.getElementById("seconds").textContent = String(segundos).padStart(2, '0');
    } else {
      // Si la fecha ya pasó
      clearInterval(timer);
      document.querySelector(".countdown-title").textContent = "¡LLEGÓ EL DÍA!";
      document.querySelector(".countdown-container").innerHTML = "<p style='font-family: Playfair Display; font-size: 1.5rem; color: #e5989b;'>¡HOY CELEBRAMOS!</p>";
    }
  }, 1000);
}

// Iniciar cuando el documento cargue
document.addEventListener("DOMContentLoaded", function () {
  iniciarCuentaRegresiva();
});
