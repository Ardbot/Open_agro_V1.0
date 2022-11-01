import socket
import logging

logging.basicConfig(filename='app.log', format='%(asctime)s - %(message)s', datefmt='%d.%m.%y %H:%M:%S', level='DEBUG')


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
    logging.info(f'Start server {host}:{port}')
    while True:
        try:
            sock.listen(10)
            conn, addr = sock.accept()
            print('connected:', addr)

            while True:
                data = conn.recv(1024)
                if not data:
                    pass
                    break
                print('INPUT:', data)
                response = type_package(str(data, "utf-8"))
                print(response)
                conn.send(bytes(response, "utf-8"))
            # print('close connection')
            conn.close()
        except Exception as e:
            return f'Error: {e}'


package_data = '#L#2.0;860000000000002;NA;817D'


def type_package(package):
    """1) Определяем тип пакета и парсим"""
    try:
        if package[0] == '#':
            pkg_name = package.split('#')[1]
            match pkg_name:
                case 'B':
                    # print('Черный ящик')
                    pass
                case 'L':
                    # print('Авторизация')
                    return handshake(package)
                case _:
                    print('Пакет не распознан')
                    logging.info(f'Package "{pkg_name}" not recognized')
        else:
            print('Отсутствует стартовый байт (#')
    except Exception as e:
        print('ERR:', e)
        logging.warning('ERR', e)


def handshake(package):
    """2) Парсинг и проверка соответствия пакета с данными и подтверждение"""
    package = package.split(';')

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
              'pass': check_pass(imei, password),
              'csum': check_sum(control_sum)}
    code = check_package(status)
    print('Kod:', code)
    return f'#AL#{code}\\r\\n'
    # Конец кода



def check_package(status):
    """Проверка пакета"""
    try:
        print(status)
        for key in status:
            if status[key] == 'OK':
                print(key, status[key])
            else:
                # Если есть ошибка, то возвращаем ее или 0
                match status[key]:
                    case '10':  # см. докуметацию
                        return '10'
                    case '01':
                        # logging.info('01')
                        return '01'
                    case _:
                        # logging.info('0')
                        return '0'
        print('Успешный успех!')
        return '1'
    except Exception as e:
        logging.warning('ERR', e)


def protocol(protocol_version):
    """Парсим протокол"""
    protocol_version = protocol_version.split('#')[2]
    match protocol_version:
        case '2.0':
            return 'OK'
        # case '1.0':
        #     msg = '1.0'
        #     return msg
        case _:
            logging.warning(f'Protocol version mismatch: ({protocol_version})')
            return '0'


def IMEI(imei):
    """Парсинг IMEI"""
    if imei in db:
        return 'OK'
    else:
        logging.warning(f'Device {imei} not found')
        return '0'


def check_pass(imei, password='NA'):
    """Проверка пароля"""
    if password == 'NA':
        return 'OK'

    # elif: #     проверка пароля в базе данных
    # pass
    else:
        logging.warning(f'Device {imei}. Password verification error')
        return '01'


def check_sum(control_sum):
    """Проверка контрольной суммы"""
    if control_sum:
        return 'OK'
    else:
        logging.debug('Checksum verification error')
        return '10'


if __name__ == "__main__":
    gps_server(host='0.0.0.0', port=1002)
    # type_package(package_data)
