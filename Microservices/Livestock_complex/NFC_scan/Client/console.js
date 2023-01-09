// Консоль для разработки

var Console_log = {
    log: function () {
      var line = Array.prototype.slice.call(arguments).map(function (argument) {
        return typeof argument === 'string' ? argument : JSON.stringify(argument);
      }).join(' ');
      document.querySelector('#log').textContent += line + '\n';
    },

    clearLog: function () {
        document.querySelector('#log').textContent = "logs:\n";
      },
}
logs = Console_log;
log = logs.log;

console_log = document.createElement('div')
console_log.style.background = "#414141";
console_log.style.margin = "0.3em 0em";

button_clear = document.createElement("button");
button_clear.style.float = "right";
button_clear.style.margin = '0.5em';
button_clear.textContent = "Очистить"
// button_clear.addEventListener('click', Console_log.clearLog);
button_clear.addEventListener('click', logs.clearLog);
console_log.append(button_clear)

output = document.createElement("pre")
output.textContent = "logs:\n"
output.id = "log";
console_log.append(output)

output.style.background = "#f0f0f0";
output.style.margin = '0.5em';
output.style.padding = '0.2em';

document.body.append(console_log);