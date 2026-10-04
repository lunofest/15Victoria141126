let musica = null;
let reproduciendo = false;

function ingresar() {
    document.getElementById("intro").classList.add("intro--oculto");

    if (!musica) {
        musica = new Audio("assets/musica.mp3");
        musica.loop = true;
    }

    musica.play().then(() => {
        reproduciendo = true;
        document.getElementById("floatingBtn").style.display = "flex";
    }).catch(() => {
        document.getElementById("floatingBtn").style.display = "flex";
    });
}

function toggleMusica() {
    if (!musica) return;

    if (reproduciendo) {
        musica.pause();
        reproduciendo = false;
        document.getElementById("floatingBtn").innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>`;
    } else {
        musica.play();
        reproduciendo = true;
        document.getElementById("floatingBtn").innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
    }
}

function toggleCuenta() {
    const cuenta = document.getElementById("cuenta");
    cuenta.classList.toggle("regalos__cuenta--abierto");
}

function copiarAlias(btn) {
    const alias = "maría.066.dulces.mp";
    navigator.clipboard.writeText(alias).then(() => {
        btn.textContent = "¡COPIADO!";
        setTimeout(() => {
            btn.textContent = "Copiar";
        }, 1500);
    });
}

function copiarCBU(btn) {
    const cbu = "0000003100001301301319688";
    navigator.clipboard.writeText(cbu).then(() => {
        btn.textContent = "¡COPIADO!";
        setTimeout(() => {
            btn.textContent = "Copiar";
        }, 1500);
    });
}



// --------------- confirmacion --------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  // Definir los números de teléfono (se mantiene el número actual de este js)
  const recipientNumber1 = '543813898000'; // Número para el primer botón
  const recipientNumber2 = '543813898000'; // Número para el segundo botón

  // Función para enviar mensaje por WhatsApp
  function sendMessage(phoneNumber) {
      const userName = document.getElementById('userFullName').value.trim();
      const userMessage = document.getElementById('customMessage').value.trim();
      const attendanceStatus = document.querySelector('input[name="attendanceOption"]:checked');

      if (!attendanceStatus) {
          alert('Por favor, selecciona si asistirás o no.');
          return;
      }

      if (userName === '') {
          alert('Por favor, completa todos los campos antes de enviar.');
          return;
      }

      const alimenticioSeleccionado = document.querySelector('input[name="alimenticioOption"]:checked');
      let restriccionAlimenticia = 'N/A';
      if (alimenticioSeleccionado) {
          const selectedId = alimenticioSeleccionado.id;
          switch (selectedId) {
              case 'celiaca':
                  restriccionAlimenticia = 'Celíac@';
                  break;
              case 'vegetariana':
                  restriccionAlimenticia = 'Vegetarian@';
                  break;
              case 'hipertesion':
                  restriccionAlimenticia = 'Hipertensión';
                  break;
              case 'diabetica':
                  restriccionAlimenticia = 'Diabétic@';
                  break;
              case 'ninguna':
                  restriccionAlimenticia = 'Ninguna';
                  break;
          }
      }

      const finalMessage = `*Presencia:* ${attendanceStatus.value}\n*Nombre y Apellido:* ${userName}\n*Restricción alimenticia:* ${restriccionAlimenticia}\n*Mensaje:* ${userMessage ? userMessage : 'N/A'}`;
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;

      // Abre la URL de WhatsApp en una nueva pestaña
      window.open(whatsappLink, '_blank');

      // Mostrar mensaje de confirmación
      alert('Mensaje enviado');

      // Limpiar los campos de entrada
      document.getElementById('userFullName').value = '';
      document.getElementById('customMessage').value = '';
      document.querySelectorAll('input[name="attendanceOption"]').forEach(radio => radio.checked = false);
      document.querySelectorAll('input[name="alimenticioOption"]').forEach(radio => radio.checked = false);

      document.querySelector(".confirmacion").scrollIntoView({ behavior: "smooth" });
  }

  // Asignar eventos a los botones
  const btn1 = document.getElementById('btnConfirmacion1');
  if (btn1) {
      btn1.addEventListener('click', function() {
          sendMessage(recipientNumber1);
      });
  }

  const btn2 = document.getElementById('btnConfirmacion2');
  if (btn2) {
      btn2.addEventListener('click', function() {
          sendMessage(recipientNumber2);
      });
  }
});

const targetDate = new Date("November 14, 2026 21:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById("dias").textContent = "00";
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
        document.getElementById("segundos").textContent = "00";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = String(days).padStart(2, "0");
    document.getElementById("horas").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutos").textContent = String(minutes).padStart(2, "0");
    document.getElementById("segundos").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// Fade up al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-up--visible");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll("main section").forEach(s => {
    s.classList.add("fade-up");
    observer.observe(s);
});
// -----------------PLAYLIST----------------------

document.addEventListener('DOMContentLoaded', function () {
  const botonEnviar = document.getElementById('playlistbtn');
  const nombreInput = document.getElementById('nombre');
  const cancionInput = document.getElementById('cancion');
  const linkInput = document.getElementById('link');
  const errorMensaje = document.getElementById('error-mensaje');
  const numeroWhatsapp = '543462328273';

  botonEnviar.addEventListener('click', function () {
    const nombre = nombreInput.value.trim();
    const cancion = cancionInput.value.trim();
    const link = linkInput.value.trim();

    if (!nombre || !cancion) {
      errorMensaje.textContent = "Por favor, completa tu nombre y el nombre de la canción.";
      return;
    } else {
      errorMensaje.textContent = "";
    }

    let mensaje = `Hola!, mi nombre es *${nombre}* quiero recomendar el siguiente tema:\n*${cancion}*`;

    if (link) {
      mensaje += `\nlink: ${link}`;
    }


    const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, '_blank');

    // Opcional: Limpiar los campos después de enviar
    nombreInput.value = '';
    cancionInput.value = '';
    linkInput.value = '';
  });
});