# echo-server.py

import socket

# HOST = "127.0.0.5"  # Standard loopback interface address (localhost)
import time

HOST = "0.0.0.0"  # Standard loopback interface address (localhost)
PORT = 1002  # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:    # создает объект сокета
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print(f"Connected by {addr}")
        while True:
            data = conn.recv(1024)
            if len(data) > 0:
                # print(len(data))
                print(data)
                conn.sendall(b'#AL#1\r\n')
