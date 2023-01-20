//  Работа с устройством

if (!("NDEFReader" in window))
    document.querySelector('#status_nfc').textContent = "Веб-NFC недоступен.";

const ndef = new NDEFReader();

// Ошибки чтения метки
ndef.addEventListener("readingerror", () => {
    document.querySelector('#status_nfc').textContent = "Не удается прочитать данные из метки NFC. Попробуйте еще раз";
    
});


ndef.addEventListener("reading", ({ message, serialNumber }) => {
    const decoder = new TextDecoder();
    for (const record of message.records) {
        switch (record.recordType) {

            case "text":
                const textDecoder = new TextDecoder(record.encoding);
                log(`Text: ${textDecoder.decode(record.data)} (${record.lang})`);
                break;

            case "url":
                log(`URL: ${decoder.decode(record.data)}`);
                break;

            case "mime":
                if (record.mediaType === "application/json") {
                    res = JSON.parse(decoder.decode(record.data));
                    log(res);

                    // Парсим и выводим данные о животном
                    info_nfc(serialNumber, res)

                }
                else if (record.mediaType.startsWith("image/")) {
                    const blob = new Blob([record.data], { type: record.mediaType });

                    const img = document.createElement("img");
                    img.src = URL.createObjectURL(blob);
                    img.onload = () => window.URL.revokeObjectURL(this.src);

                    document.body.appendChild(img);
                }
                else {
                    log(`Media not handled`);
                }
                break;

            default:
                log(`Record not handled`);
        }
    }
}
)



// Сканирование   
async function ndef_scan() {
    try {
        await ndef.scan();
        localStorage.setItem("flag_scan", true)
        document.querySelector('#status_nfc').textContent = "Сканирование запущено";
        document.querySelector('.scan_btn').disabled = true;
    } catch (error) {
        document.querySelector('#status_nfc').textContent = "Ошибка сканирования";
        localStorage.setItem("flag_scan", false)
        log("Scan:", error.name, error.message)
    }
}

//  Запись данных json
async function ndef_write(data_json) {
    try {
        const encoder = new TextEncoder();
        const newMessage = {
            records: [{
                id: "/my-game",
                recordType: "mime",
                mediaType: "application/json",
                // Данные для записи
                data: encoder.encode(JSON.stringify(data_json))
            }]
        };
        await ndef.write(newMessage);    // await ndef.write({ records: [{ recordType: "text", data: "Hello World111" }] });
    } catch (error) {
        document.querySelector('#status_nfc').textContent = "Ошибка записи";
        log("Write:", error.name, error.message)
    }
}


// function ndef_err_read() {

// }




// Сканирование
// async function start_scan1() {
//     try {
//         const ndef = new NDEFReader();

//         // await ndef.write(newMessage);
//         await ndef.write({ records: [{ recordType: "text", data: "Hello World111" }] });


// // 1) Сканирование   
// await ndef.scan();
// localStorage.setItem("flag_scan", true)
// document.querySelector('#status_nfc').textContent = "Сканирование запущено";
// document.querySelector('#scan_btn').disabled = true;

// Обработка ошибки
// ndef.addEventListener("readingerror", () => {
//     localStorage.setItem("flag_scan", false)
//     document.querySelector('#status_nfc').textContent = "Не удается прочитать данные из метки NFC. Попробуйте еще раз";
// });



// // 2) Чтение метки
// ndef.addEventListener("reading", ({ message, serialNumber }) => {
//     const decoder = new TextDecoder();
//     for (const record of message.records) {
//         switch (record.recordType) {

//             case "text":
//                 const textDecoder = new TextDecoder(record.encoding);
//                 log(`Text: ${textDecoder.decode(record.data)} (${record.lang})`);
//                 break;

//             case "url":
//                 log(`URL: ${decoder.decode(record.data)}`);
//                 break;

//             case "mime":
//                 if (record.mediaType === "application/json") {
//                     res = JSON.parse(decoder.decode(record.data));
//                     log(res);

//                     // Парсим и выводим данные о животном
//                     info_nfc(serialNumber, res)

//                 }
//                 else if (record.mediaType.startsWith("image/")) {
//                     const blob = new Blob([record.data], { type: record.mediaType });

//                     const img = document.createElement("img");
//                     img.src = URL.createObjectURL(blob);
//                     img.onload = () => window.URL.revokeObjectURL(this.src);

//                     document.body.appendChild(img);
//                 }
//                 else {
//                     log(`Media not handled`);
//                 }
//                 break;

//             default:
//                 log(`Record not handled`);
//         }
//     }

// });

//     } catch (error) {
//         localStorage.setItem("flag_scan", false)
//         document.querySelector('#status_nfc').textContent = "Ошибка! " + error;
//     }
// };


info = new Local_DB("nfc");   // Создаем экземляр класса для работы с локальной базой данных
var data_test = info.read();

    
document.querySelectorAll('.scan_btn').forEach(el => el.addEventListener('click', () => { ndef_scan() }));
document.querySelectorAll('.write_nfc_btn').forEach(el => el.addEventListener('click', () => { ndef_write(data_test) }));
