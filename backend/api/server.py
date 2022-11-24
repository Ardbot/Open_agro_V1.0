import logging
import threading

from flask import Flask, request


class Server:
    def __init__(self, host, port):
        self.host = host
        self.port = port

        self.app = Flask(__name__)
        # self.app.add_url_rule('', view_func=self.get_home)
        self.app.add_url_rule('/', view_func=self.get_home, methods=['GET', 'POST'])
        self.app.add_url_rule('/user/<username>', view_func=self.show_user_profile)
        # self.app.add_url_rule('/#L#2.0;866854057449285;NA;69BB', view_func=self.get_home)

    def run_server(self):
        """  """
        self.server = threading.Thread(target=self.app.run, kwargs={'host': self.host, 'port': self.port})
        self.server.start()
        return self.server

    def get_home(self):
        # print(logging)
        print(self.server.name)
        # return 'STATUS\r\n'
        # print(request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr))
        # print('data: ' + str(request.data))
        # print('args: ' + str(request.args))
        # print('form: ' + str(request.form))
        # print('files: ' + str(request.files))
        # print('values: ' + str(request.values))
        # print('values: ' + str(request.json))
        return '#AL#1\r\n'

    def show_user_profile(self, username):
        # показать профиль данного пользователя
        return 'User %s' % username

    def converter_to_16(self, text=10):
        text = hex(text)
        print(text)


if __name__ == '__main__':
    server = Server(
        host='0.0.0.0',
        port='1002'
    )
    server.debug = True
    server.run_server()
    print('start')
