import threading

from flask import Flask


class Server:
    def __init__(self, host, port):
        self.host = host
        self.port = port

        self.app = Flask(__name__)
        self.app.add_url_rule('/', view_func=self.get_home)

    def run_server(self):
        """Запускает поток и стартует сервер"""
        self.server = threading.Thread(target=self.app.run, kwargs={'host': self.host, 'port': self.port})
        self.server.start()
        return self.server

    def get_home(self):
        return 'index'


if __name__ == '__main__':
    server = Server(
        host='0.0.0.0',
        port='8443'
    )
    server.run_server()


