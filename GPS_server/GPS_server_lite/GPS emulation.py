import socket
import time

HOST, PORT = "127.0.0.1", 1002

# Пакет авторизации
package_L = "#L#2.0;860000000000002;NA;817D"
# Пакет с черного ящика
package_B = "#B#" \
            "260522;111000;4503.8258;N;03859.7408;E;0;157;44;13;0.67;3;0;;NA;status:1:2097152,sats_gps:1:10,sats_glonass:1:3,bootcount:1:1|" \
            "010104;000006;NA;NA;NA;NA;NA;NA;NA;NA;NA;0;0;;NA;status:1:100,bootcount:1:2|" \
            "010104;000007;NA;NA;NA;NA;NA;NA;NA;NA;NA;0;0;;NA;status:1:36,bootcount:1:2|" \
            "010104;000119;NA;NA;NA;NA;NA;NA;NA;NA;NA;0;0;;NA;status:1:100,bootcount:1:3|" \
            "010104;000120;NA;NA;NA;NA;NA;NA;NA;NA;NA;0;0;;NA;status:1:100,bootcount:1:3|" \
            "151022;053500;5014.8483;N;12746.0521;E;0;50;158;5;2.27;0;0;;NA;status:1:32,sats_gps:1:3,sats_glonass:1:2,bootcount:1:3|" \
            "151022;053613;NA;NA;NA;NA;NA;NA;NA;NA;NA;0;0;;NA;status:1:100,bootcount:1:4|" \
            "151022;053615;5014.8492;N;12746.0516;E;2;237;161;6;2.03;0;0;;NA;status:1:36,sats_gps:1:4,sats_glonass:1:2,bootcount:1:4|" \
            "151022;053649;5014.8485;N;12746.0420;E;3;92;161;6;2.04;0;0;;NA;status:1:4194304,sats_gps:1:4,sats_glonass:1:2,bootcount:1:4|" \
            "151022;053820;5014.8485;N;12746.0406;E;4;91;159;7;1.81;0;0;;NA;status:1:0,sats_gps:1:4,sats_glonass:1:3,bootcount:1:4|" \
            "151022;054025;5014.8490;N;12746.0507;E;3;251;150;8;1.76;0;0;;NA;status:1:0,sats_gps:1:4,sats_glonass:1:4,bootcount:1:4|" \
            "151022;054525;5014.8509;N;12746.0464;E;0;285;149;8;1.73;0;0;;NA;status:1:64,sats_gps:1:4,sats_glonass:1:4,bootcount:1:4|" \
            "151022;055025;5014.8509;N;12746.0464;E;0;285;149;9;1.62;0;0;;NA;status:1:64,sats_gps:1:4,sats_glonass:1:5,bootcount:1:4|" \
            "112A\r\n"

# Структура пакета с данными
struct_B = "#B#" \
           "Date;Time;Lat1;Lat2;Lon1;Lon2;Speed;Course;Alt;Sats|" \
           "Date;Time;Lat1;Lat2;Lon1;Lon2;Speed;Course;Alt;Sats|" \
           "Date;Time;Lat1;Lat2;Lon1;Lon2; Speed;Course;Alt;Sats|" \
           "CRC16\r\n"


def socket_GPS(send_message):
    """ Отправляет и возвращает значения """
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((HOST, PORT))

        # Отправляем данные
        sock.sendall(bytes(send_message, "utf-8"))
        print('Send_message:', send_message)

        # Ждем ответ
        server_response = str(sock.recv(1024), "utf-8")
        print('Server response:', server_response)
        return server_response


def client():
    try:
        data = socket_GPS(package_L)
        if data == '#AL#1\\r\\n':
            data = socket_GPS(package_B)
            return 'Ok'
        else:
            print(f'Ошибка пакета авторизации {data}')
    except:
        return '0'


if __name__ == '__main__':
    client()
