import socket

"""
Протокол Wialon 2.0/ Умка3.10
"""


def gps_server(host='', port=1024):
    "Сервер для сокетов"
    sock = socket.socket()
    sock.bind((host, port))
    while True:
        try:
            sock.listen(10)
            conn, addr = sock.accept()
            print('connected:', addr)
            while True:
                data = conn.recv(1024)
                data_requests = ''
                if not data:
                    break
                print(data)
                conn.send(data.upper())
            # print('close connection')
            conn.close()
        except Exception as e:
            return f'Error: {e}'


package_data = '#L#2.0;866854055517109;NA;817D'


def type_package(package):
    "Определяем тип пакета и парсим"
    pkg_name = package.split('#')[1]
    match pkg_name:
        case 'B':
            print('Черный ящик')
        case 'L':
            print('Авторизация')
            handshake(package)
        case _:
            print('Пакет не распознан')



db = ['866854055517109', '866854055517110']


def handshake(package):
    """Проверка соответствия пакета с данными и подтверждение"""

    print(package)
    package = package.split(';')
    ver_prot = package[0].split('#')[2]

    if ver_prot == '2.0':
        print(f'Протокол {ver_prot}/2.0')
    else:
        msg = f'Необходим протокол 2.0! Предоставлен {ver_prot}'
        print(msg)
        return msg
    # print(package[1])
    IMEI(package)


    return '#AL#1\r\n'


def IMEI(package):
    'Парсинг IMEI'
    print(package)
    # package = package.split(';')
    print(package[1])
    if package[1] in db:
        print('Авторизован')
    else:
        print('Неизвестное устройство')


if __name__ == "__main__":
    # gps_server(host='0.0.0.0', port=1002)
    type_package(package_data)
