# echo-client.py

import socket
import time

HOST = "127.0.0.10"  # Подключение к серверу на IP 127.0.0.10
PORT = 1024  # Порт сервера

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    print(f'Connect to {HOST}:{PORT}')
    message = b's.getsockname()'
    s.sendall(message)  # Отправка запроса
    # time.sleep(10)

    while True:  # Чтение ответа в цикле
        data = s.recv(1024)  # 1024 размер буфера
        if not data:
            s.close()
            break
        print(data)
