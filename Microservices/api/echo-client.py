import socket
import sys

HOST, PORT = "127.0.0.1", 1002
data = ["#L#2.0;860000000000002;NA;817D", "#L#2.1;860000000000002;NA;817D",
        "#L#2.0;860000000000012;NA;817D", "#L#2.0;860000000000002;N1A;817D",
        "#L#2.0;860000000000002;NA;8171D"]
# data = "#L#;dff;NA;8157D"


def send_data(data):
    # Create a socket (SOCK_STREAM means a TCP socket)
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        # Connect to server and send data
        sock.connect((HOST, PORT))
        sock.sendall(bytes(data + "\n", "utf-8"))

        # Receive data from the server and shut down
        received = str(sock.recv(1024), "utf-8")

    print("Sent:     {}".format(data))
    print("Received: {}".format(received))
    print(received)


if __name__ == '__main__':
    for i in range(5):
        print(i)
        send_data(data[i])
