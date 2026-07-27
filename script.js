
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
