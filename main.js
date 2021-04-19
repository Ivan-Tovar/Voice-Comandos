const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
const info = document.querySelector(".info");

// The speech recognition interface lives on the browserâ€™s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if (SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "es-MX";

  searchForm.insertAdjacentHTML("beforeend", '<button type="button" class="btn btn-dark" ><i class="fas fa-microphone"></i></button>');
  searchFormInput.style.paddingRight = "50px";

  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    if (micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    }
    else {
      recognition.stop();
    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {

    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    if (transcript.toLowerCase().trim() === "ayuda del sitio") {
      window.open('ayuda.html');
    }
    else if (!searchFormInput.value) {
      searchFormInput.value = transcript;
    }
    else {
      if (transcript.toLowerCase().trim() === "busca múltiple") {
        window.open("https://www.dogpile.com/serp?q=" + searchFormInput.value);
        window.open("https://www.info.com/serp?q=" + searchFormInput.value);
        window.open("https://metaglossary.com/define/" + searchFormInput.value);
        window.open("https://www.mojeek.com/search?q=" + searchFormInput.value);
        window.open("https://www.base-search.net/Search/Results?type=all&lookfor=" + searchFormInput.value);

      }
      else if (transcript.toLowerCase().trim() === "dogpile") {

        open("https://www.dogpile.com/serp?q=" + searchFormInput.value);
      }
      else if (transcript.toLowerCase().trim() === "info") {

        open("https://www.info.com/serp?q=" + searchFormInput.value);
      }
      else if (transcript.toLowerCase().trim() === "Meta") {

        open("https://metaglossary.com/define/" + searchFormInput.value);
      }
      else if (transcript.toLowerCase().trim() === "Mojeek") {

        open("https://www.mojeek.com/search?q=" + searchFormInput.value);
      }
      else if (transcript.toLowerCase().trim() === "base") {

        open("https://www.base-search.net/Search/Results?type=all&lookfor=" + searchFormInput.value);
      }

      if(transcript.toLowerCase().trim()==="salir del sitio") {
        //window.close();
        
         var mensaje;
         var opcion = confirm("Para salir dar clic en aceptar");
        
         if (opcion == true) {
            mensaje = "Has clickado OK";
            
            window.close();     //window.close();
            recognition.stop();
       } else {
           mensaje = "Has clickado Cancelar";
       }
       document.getElementById("ejemplo").innerHTML = mensaje;
     }
      

      else if (transcript.toLowerCase().trim() === "borrar") {
        searchFormInput.value = "";
      }
      else {
        searchFormInput.value = transcript;
      }
    }
    // searchFormInput.value = transcript;
    // searchFormInput.focus();
    // setTimeout(() => {
    //   searchForm.submit();
    // }, 500);
  }

  //info.textContent = 'Comandos de voz:';

}
else {
  console.log("Your Browser does not support speech Recognition");
  info.textContent = "Your Browser does not support Speech Recognition";
}
