""" Микросервис "RFID" """
from FastApi import *

map_nfc = APIRouter( 
prefix='/rfid', 
tags = ['NFC, RFID'] 
)


@map_nfc.get("/cow")
async def return_files12():
    """ Вернуть файл с полями"""
    return "cow1" * 5
