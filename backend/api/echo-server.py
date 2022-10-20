# echo-server.py

import socket


def GPS_server(host="127.0.0.10", port=1024):  # Адрес и порт сервера
    global server
    try:
        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # создает объект сокета
        server.bind((host, port))
        server.listen(10)  # Кол-во ожидаемых соединений
        while True:
            conn, addr = server.accept()  # Произведено подключение
            data = conn.recv(1024)
            print(f'Connect to {addr}. Data: {data}')
            conn.sendall(b'all_resp')
            conn.shutdown(socket.SHUT_WR)
            return data
    except ConnectionResetError as e:
        print('Error:', e)
    finally:
        server.close()


if __name__ == '__main__':
    GPS_server()
