  const character = document.getElementById("character");
  const message = document.getElementById("message");
  const videoContainer = document.getElementById("video-container");

  const frames = [
    "assets/akm/animation-1.png",
    "assets/akm/animation-2.png",
    "assets/akm/animation-3.png",
    "assets/akm/animation-4.png",
  ];

  const shhImage = "assets/akm/shh.png";
  let frameIndex = 0;
  let speed = 2;
  let clickCount = 0;

  let posX = window.innerWidth / 2;
  let posY = window.innerHeight / 2;
  let velX = (Math.random() < 0.5 ? -1 : 1) * speed;
  let velY = (Math.random() < 0.5 ? -1 : 1) * speed;

  // Digitação do título
  window.onload = () => {
    const titleText = "Bem-vindo ao mini-game";
    const typedTitle = document.getElementById("typed-title");
    typedTitle.textContent = "";

    let titleIndex = 0;

    function typeTitleEffect() {
      if (titleIndex < titleText.length) {
        typedTitle.textContent += titleText.charAt(titleIndex);
        titleIndex++;
        setTimeout(typeTitleEffect, 75);
      } else {
        typedTitle.classList.add("blink");
      }
    }

    typeTitleEffect();
  };

  // Movimento do bonequinho
  function moveCharacter() {
    posX += velX;
    posY += velY;

    if (posX <= 0 || posX >= window.innerWidth - 100) velX *= -1;
    if (posY <= 0 || posY >= window.innerHeight - 100) velY *= -1;

    character.style.left = posX + "px";
    character.style.top = posY + "px";

    if (velX < 0) {
      character.classList.add("flipped");
    } else {
      character.classList.remove("flipped");
    }

    frameIndex = (frameIndex + 1) % frames.length;
    character.style.backgroundImage = `url(${frames[frameIndex]})`;
  }

  const interval = setInterval(moveCharacter, 100);

  // Clique no boneco
  character.addEventListener("click", () => {
  clickCount++;

  if (clickCount < 6) {
    speed += [2, 4, 6, 8, 10][clickCount - 1];
    velX = (Math.random() < 0.5 ? -1 : 1) * speed;
    velY = (Math.random() < 0.5 ? -1 : 1) * speed;
    posX = Math.random() * (window.innerWidth - 100);
    posY = Math.random() * (window.innerHeight - 100);
  } else {
    clearInterval(interval);
    character.style.left = "50%";
    character.style.top = "50%";
    character.style.transform = "translate(-50%, -50%)";
    character.style.backgroundImage = `url(${shhImage})`;

    document.getElementById("speech-bubble").style.display = "block";

    if (ytPlayer && ytPlayer.pauseVideo) {
      ytPlayer.pauseVideo();
    }

    setTimeout(() => {
      message.style.display = "block";
      videoContainer.style.display = "block";

      const finalVideo = document.getElementById("final-video");
      if (finalVideo) {
        finalVideo.play().catch(() => {
          console.log("Autoplay bloqueado, talvez precise de interação do usuário");
        });
      }
    }, 2500);
  }
});

  // YouTube player invisível
  let ytPlayer;

  function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player("yt-player", {
      height: "0",
      width: "0",
      videoId: "GAheIWne8GE", // vídeo leve para música de fundo
      playerVars: {
        autoplay: 1,
        loop: 1,
        start: 28,
        playlist: "GAheIWne8GE",
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
      },
      events: {
        onReady: (event) => {
          console.log("Player pronto");

          // Só toca após o primeiro clique do usuário
          window.addEventListener(
            "click",
            () => {
              console.log("Play após clique");
              event.target.playVideo();
            },
            { once: true }
          );
        },
      },
    });
  }
