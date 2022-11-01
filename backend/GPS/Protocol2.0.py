import socket

"""
Протокол Wialon 2.0/ Умка3.10
"""

""" Эмуляция БД IMEI номеров """
db = ['860000000000001',
      '860000000000002',
      '860000000000003',
      '860000000000004',
      '860000000000005']


def gps_server(host='', port=1024):
    """Сервер для сокетов"""
    sock = socket.socket()
    sock.bind((host, port))
    while True:
        try:
            sock.listen(10)
            conn, addr = sock.accept()
            print('connected:', addr)
            while True:
                data = conn.recv(1024)
                if not data:
                    pass
                    # break
                print(data)
                type_package(str(data))                conn.send(data.upper())
)
            # print('close connection')
            conn.close()
        except Exception as e:
            return f'Error: {e}'


package_data = '#L#2.0;860000000000002;NA;817D'


def type_package(package):
    """1) Определяем тип пакета и парсим"""
    print('TP', package)
    pkg_name = package.split('#')[1]
    match pkg_name:
        case 'B':
            print('Черный ящик')
        case 'L':
            print('Авторизация')
            handshake(package)
        case _:
            print('Пакет не распознан')


def handshake(package):
    """2) Парсинг и проверка соответствия пакета с данными и подтверждение"""
    package = package.split(';')
    print(package)

    # Предварительная проверка
    if len(package) == 4:
        protocol_version = package[0]
        imei = package[1]
        password = package[2]
        control_sum = package[3]
    else:
        msg = f'Err package {len(package)}/4'
        print(msg)
        return msg
    status = {'protocol': protocol(protocol_version),
              'IMEI': IMEI(imei),
              'pass': check_pass(password),
              'csum': check_sum(control_sum)}
    print(status)

    for val in status:
        if status[val] == 'OK':
            print(val, status[val])
        else:
            print('\033[31mERR', val, status[val], '\033[0m')

    return f'#AL#{1}\r\n'


def protocol(protocol_version):
    """Парсим протокол"""
    protocol_version = protocol_version.split('#')[2]
    match protocol_version:
        case '2.0':
            msg = f'OK'
            return msg
        case '1.0':
            msg = '1.0'
            print('1.0')
            return msg
        case _:
            msg = f'Wrong protocol version ({protocol_version})'
            print(msg)
            return msg


def IMEI(imei):
    """Парсинг IMEI"""
    # print(imei)

    if imei in db:
        print('Авторизован')
        return 'OK'
    else:
        print('Неизвестное устройство')
        return 'No IMEI in database'


def check_pass(password):
    """Проверка пароля"""

    if password == 'NA':
        msg = 'OK'
        return msg
    # elif: #     проверка пароля в базе данных
    # pass
    else:
        msg = 'not true'
        return msg


def check_sum(control_sum):
    """Проверка контрольной суммы"""
    if control_sum == '817D':
        msg = 'OK'
        return msg
    else:
        msg = 'not true'
        return msg


if __name__ == "__main__":
    gps_server(host='0.0.0.0', port=1002)
    # type_package(package_data)
