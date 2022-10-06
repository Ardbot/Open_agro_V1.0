""" Отправка запроса и получение ответа с сайта """

import requests

x = requests.get('https://ankmap.ru:8443/')
print(x.status_code)
print(x.text)