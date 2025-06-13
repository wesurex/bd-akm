let audio;

window.addEventListener("DOMContentLoaded", () => {
  audio = new Audio("/assets/akm/musica.mp3");
  audio.loop = true; // repete se quiser
  audio.volume = 1.0; // de 0 a 1
});

const playAudioOnScroll = () => {
  if (audio && audio.play) {
    audio.play()
      .then(() => console.log("🎶 Música tocando!"))
      .catch((err) => console.warn("🚫 Erro ao tocar música:", err));
    
    window.removeEventListener("scroll", playAudioOnScroll);
  }
};

window.addEventListener("scroll", playAudioOnScroll, { once: true });