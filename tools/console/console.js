// Development Console

var Console_log = {
  log: function () {
    var line = Array.prototype.slice.call(arguments).map(function (argument) {
      return typeof argument === 'string' ? argument : JSON.stringify(argument);
    }).join(' ');
    document.querySelector('#logStr').textContent += line + '\n';
  },

  clearLog: function () {
    document.querySelector('#logStr').textContent = "logs:\n";
  },
}

logs = Console_log;
log = logs.log;

// Ищем элемент с id "log" на странице.
console_log = document.getElementById('log');
console_log.classList = "log";

button_clear = document.createElement("button");
button_clear.classList = "logButton";
button_clear.textContent = "🧹";
// button_clear.addEventListener('click', Console_log.clearLog);
button_clear.addEventListener('click', logs.clearLog);
console_log.append(button_clear);

output = document.createElement("pre");
output.id = "logStr"
output.classList = "logOutput";
output.textContent = "logs:\n";
console_log.append(output);

// document.body.append(console_log);


// Перетаскивание мышкой, ctrl+D вызов консоли (debug)

// document.querySelectorAll('#log').forEach(el => el.addEventListener('click', () => { alert("debug") }));


// var ball = document.getElementById('log');

// ball.onmousedown = function (e) {

//   var coords = getCoords(ball);
//   var shiftX = e.pageX - coords.left;
//   var shiftY = e.pageY - coords.top;

//   ball.style.position = 'absolute';
//   document.body.appendChild(ball);
//   moveAt(e);

//   ball.style.zIndex = 1000; // над другими элементами

//   function moveAt(e) {
//     ball.style.left = e.pageX - shiftX + 'px';
//     ball.style.top = e.pageY - shiftY + 'px';
//   }

//   document.onmousemove = function (e) {
//     moveAt(e);
//   };

//   ball.onmouseup = function () {
//     document.onmousemove = null;
//     ball.onmouseup = null;
//   };

// }

// ball.ondragstart = function () {
//   return false;
// };

// ball.onselectstart = function () {
//   return false;
// }

// function getCoords(elem) {   // кроме IE8-
//   var box = elem.getBoundingClientRect();
//   return {
//     top: box.top + pageYOffset,
//     left: box.left + pageXOffset
//   };
// }