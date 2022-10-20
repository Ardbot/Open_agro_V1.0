# echo-client.py

import socket
import time

HOST = "127.0.0.5"  # The server's hostname or IP address
PORT = 1002  # The port used by the server

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(b"Start client(GPS-track")
    data = s.recv(1024)
    while True:
        s.sendall(b'#L#2.0;866******449525;NA;3CD\r\n')
        time.sleep(5)