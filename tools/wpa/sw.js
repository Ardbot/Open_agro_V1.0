
const CACHE_NAME = "V1";
const STATIC_CACHE_URLS = ["index.html", "main.js"];
// const STATIC_CACHE_URLS = ["*"];


self.addEventListener("install", event => {
  console.log("Service Worker установлен.");
  event.waitUntil(
    // Создаем копию сайта в локальное хранилище
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CACHE_URLS))
  );
});

self.addEventListener("activate", event => {
  console.log("Service Worker активирован.");
});

function cache(request, response) {
  if (response.type === "error" || response.type === "opaque") {
    return Promise.resolve(); // do not put in cache network errors
  }

  return caches
    .open(CACHE_NAME)
    .then(cache => cache.put(request, response.clone()));
}

// self.addEventListener("fetch", event => {
//   // Cache-First Strategy
//   event.respondWith(
//     caches
//       .match(event.request) // проверить, есть ли информация в кеше
//       .then(cached => cached || fetch(event.request)) // Если нет, то запрашиваем по сети

//       // Если ответ от сети есть, то пишем его в кеш
//       .then(
//         response =>
//           cache(event.request, response) // поместить ответ в кеш
//             .then(() => response) //  промис с ответом сети?
//       )
//   );
// });

// Обновляем данные в кеше
function update(request) {
  return fetch(request.url).then(
    response =>
      cache(request, response) // we can put response in cache
        .then(() => response) // resolve promise with the Response object
  );
}

function refresh(response) {
  return response
    .json() // read and parse JSON response
    .then(jsonResponse => {
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          // report and send new data to client
          // console.log(clients);
          client.postMessage(
            JSON.stringify({
              type: response.url,
              data: jsonResponse.data
            })
          );
        });
      });
      return jsonResponse.data; // resolve promise with new data
    });
}



self.addEventListener("fetch", event => {
  if (event.request.url.includes("/api/")) {
    // Сначала выводим кеш, обновляем и актулизируем
    event.respondWith(caches.match(event.request));
    event.waitUntil(update(event.request).then(refresh));
  }
  else {
    event.respondWith(caches.match(event.request));
    event.waitUntil(update(event.request).then(refresh));

  }
});


// self.addEventListener("fetch", event => {
//   event.waitUntil(update(event.request).then(refresh));
//   event.respondWith(caches.match(event.request));
// });

