import socketserver


class MyTCPHandler(socketserver.BaseRequestHandler):
    """
    """

    def handle(self):
        # self.request is the TCP socket connected to the client
        self.data = self.request.recv(1024).strip()
        print("{} send:".format(self.client_address[0]))
        print(self.data)
        # just send back the same data, but upper-cased
        self.request.sendall(self.data.upper())


# HOST, PORT = "0.0.0.0", 1002

def gps_server(host='0.0.0.0', port=1002):
    with socketserver.TCPServer((host, port), MyTCPHandler) as server:
        server.serve_forever()


if __name__ == "__main__":
    gps_server()
