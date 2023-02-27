
const version = "v2";
const STATIC_CACHE_URLS = ["index.html", "index.css", "index.js"]; // Первоначально. Дополнительно подгрузит скрипты из index.html


self.addEventListener("install", event => {
  console.log("Service Worker установлен.");
  event.waitUntil(
    // Создаем копию сайта в локальное хранилище
    caches.open(version)
      .then(cache => cache.addAll(STATIC_CACHE_URLS))
  );
});

self.addEventListener("activate", event => {
  console.log("Service Worker активирован.");
});

function cache(request, response) {
  if (response.type === "error" || response.type === "opaque") {
    console.error("Cache:", request.url, "Type err:", response.type)
    return Promise.resolve();
  }
  return caches
    .open(version)
    .then(cache => cache.put(request, response.clone()));
  // console.log("Added to cache:", request.url);
}

// Обновляем данные в кеше
function update(request) {
  return fetch(request.url)
    .then(response =>
      cache(request, response) // Отравляем данные на запись
        .then(() => response)); // Возвращаем успешный ответ  .json()

}

function refresh(response) {
  // console.log("refresh:", response);
  return response
    .json() // читаем и анализируем ответ JSON
    .then(jsonResponse => {
      self.clients.matchAll()
      .then(clients => {
        clients.forEach(client => {
          // Отправляем клиенту данные
          client.postMessage(JSON.stringify({
            type: response.url,
            data: jsonResponse.data
          })
          );
        });
      });
      return jsonResponse.data; // новые данные для клиента
    });
}



self.addEventListener("fetch", event => {
  // Сортируем запросы и обрабатываем соответственно
  if (event.request.url.includes("/api/")) {  // Если запрос к api, то 
    event.respondWith(caches.match(event.request)); // Сначала выводим кеш
    event.waitUntil(update(event.request) // Запрашиваем у сервера 
      .then(refresh));  // и отправляем уведомление (событие), что данные обновились
    // .then(response => console.log(response)));  // и отправляем уведомление (событие), что данные обновились
    return
  }

  // По умолчанию выполняем запрос в локальное хранилище, если нет ответа, то в сеть
  event.respondWith(
    (async function () {
      const response = await caches.match(event.request);

      return response ||
        fetch(event.request) // Если кеш пуст, то запрос  к сети
          .then(response => // Если ответ от сети есть, то пишем его в кеш
            cache(event.request, response)) // .then(() => response)
    })(),
  );

});

