// const worker = new Worker("worker.js");

// function sendMessageToWorker() {
//   worker.postMessage("hello");
// }

// function askWorkerRecurringTask() {
//   worker.postMessage("recurring");
// }

// This event is fired when the worker posts a message
// The value of the message is in messageEvent.data
// worker.addEventListener("message", function(messageEvent) {
//   // Log the received message in the output element
//   const log = document.createElement("p");
//   log.textContent = messageEvent.data;
//   document.querySelector("output").prepend(log);
// });


// Если serviceWorker поддерживается, то 
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(serviceWorker => {
      console.log("Service Worker зарегистрирован: ", "serviceWorker");
    })
    .catch(error => {
      console.error("Ошибка регистрации Service Worker: ", error);
    });
}

navigator.serviceWorker.onmessage = event => {
  const message = JSON.parse(event.data);
  console.log("cache:", message);
};



async function getId() {
  response = await fetch("/api/users/id");
  rr = await response.json();
  // console.log("f()", rr);
  return rr
}
