"""
Создать базу данных с точками обработки. Автоинкримент, сортировка по датам, групировка по id машины.
доступ к данным через FastAPI (get).

"""

from sqlalchemy import Column, ForeignKey, Integer, String, Text, Date, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Machinery(Base):
    __tablename__ = 'Machinery'
    __tableargs__ = {
        'comment': 'Список техники'
    }
    id = Column(Integer, nullable=False, unique=True, primary_key=True, autoincrement=True)
    id_machinery = Column(String(128), comment='Наименование темы')
    description = Column(Text, comment='Описание темы')

    def test(self):
        return "test1"


    def __repr__(self):
        # return f'{self.topic_id} {self.name} {self.description}'
        return f'{"self.topic_id"} {"self.name"} {"self.description"}'
