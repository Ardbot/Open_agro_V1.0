""" Микросервис "RFID" """
from Microservices.FastApi import *

map_nfc = APIRouter( 
prefix='/nfc', 
tags = ['NFC, RFID'] 
)

# @app.get("/api/nfc")
# async def return_files():
#     # return 
#     return FileResponse("Microservices/Livestock_complex/NFC_scan/Client/animal.ison")

@map_nfc.get("/cow")
async def return_files12():
    """ Вернуть файл с полями"""
    return "cow1" * 5
