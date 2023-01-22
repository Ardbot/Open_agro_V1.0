// Создание заготовки таблицы
function createTable(name) {
    table = document.createElement('table');
    table.id = name + "-table"
    // console.log(table.id)

    thead = document.createElement('thead');
    thead.id = name + "-thead";
    // console.log(thead.id);

    tbody = document.createElement('tbody');
    tbody.id = name + "-tbody";
    // console.log(tbody.id);

    table.appendChild(thead);
    table.appendChild(tbody);

    // Название таблицы и div должны быть равны {name}
    document.getElementById(name).appendChild(table);
}

// header = ["one", "two", "three", "data"]
// data = [1, 2,]


// Заполнение заголовка/строки (th/td)
function writeStr(arr, elem = 'td') {
    let row = document.createElement('tr');
    for (val in arr) {
        let data = document.createElement(elem);
        data.innerHTML = arr[val]
        row.appendChild(data)
    }
    return row
}

// Заполняем заголовки таблицы
function headings(arr) {
    row = writeStr(arr, elem = 'th')
    thead.appendChild(row);
}

// Заполняем тело таблицы
function body(arr) {
    row = writeStr(arr);
    tbody.appendChild(row);
}





// document.querySelectorAll('.createTable').forEach(el => el.addEventListener('click', () => { createTable("right_column") }));