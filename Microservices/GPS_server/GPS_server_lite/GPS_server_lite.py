""" Простой сервер для GPS навигаторов """
import logging

logging.basicConfig(filename='app.log', format='%(asctime)s - %(message)s', datefmt='%d.%m.%y %H:%M:%S', level='DEBUG')

import socketserver

HOST, PORT = '', 1002

class MyTCPHandler(socketserver.BaseRequestHandler):

    def handle(self):
        # Принимаю данные. Преобразую в строку
        self.input_data = str(self.request.recv(1024).strip(), "utf-8")
        print('input:', self.input_data)

        # Отправляю ответ
        self.output_data = type_package(self.input_data)
        print('output:', self.output_data)
        self.request.sendall((bytes(self.output_data, "utf-8")))


def type_package(package):
    """ 2) Определяем тип пакета """
    try:
        if package[0] == '#':
            pkg_name = package.split('#')[1]
            match pkg_name:
                case 'B':
                    # print('Черный ящик')
                    return black_box(package)
                case 'L':
                    # print('Авторизация')
                    return handshake(package)
                case _:
                    print('Пакет не распознан')
                    logging.info(f'Package "{pkg_name}" not recognized')
        else:
            logging.info(f'Package "{package}" not recognized')
            return '0'

    except Exception as e:
        logging.warning(f'TYPE_PACKAGE: {e}\n{package}')



# Рукопожатие
def handshake(package):
    """ 3) Проходим авторизация (рукопожатие) """
    # Тупо,без проверок отправляем, что всё хорошо и устройсто авторизовано.
    return '#AL#1\\r\\n'



if __name__ == '__main__':
    # Запускаем сервер на сокетах. IP 0.0.0.0, port 1002
    with socketserver.TCPServer((HOST, PORT), MyTCPHandler) as server:
        server.serve_forever()
