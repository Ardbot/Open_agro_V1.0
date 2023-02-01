""" Подключение к базе данных """
from sqlalchemy import create_engine
def connect_to_bd():
    """ Подключение к базе данных """
    # engine = create_engine("mysql+pymysql://root:12345678900A@192.168.18.80:81/Claas")
    engine = create_engine("mariadb+mariadbconnector://root:12345678900A@192.168.18.139:3306/Openagro")
    engine.connect()
    print(engine)

if __name__ == '__main__':
    connect_to_bd()
