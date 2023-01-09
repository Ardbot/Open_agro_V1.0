""" Микросервис "NFC" """
import json

import uvicorn

# Старт uvicorn Microservices.Livestock_complex.NFC_scan.Server.NFC_serv:app --reload --host=0.0.0.0

from fastapi import FastAPI
from starlette.responses import FileResponse
from starlette.staticfiles import StaticFiles

app = FastAPI()

""" Каталог с NFC приложением """
app.mount("/nfc", StaticFiles(directory="Microservices/Livestock_complex/NFC_scan/Client", html=True))

@app.get("/")
def read_root():
    return {"/nfc"}   

@app.get("/api/nfc")
async def return_files():
    # return 
    return FileResponse("Microservices/Livestock_complex/NFC_scan/Client/animal.ison")


