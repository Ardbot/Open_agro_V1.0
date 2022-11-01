"""
Коды ответов сервера GPS.
Тип:{Код:Описание, ...}
'AL':{'1':'Successful authorization', '0':'Connection failure'}
"""
# Обозначения типов пакета
letters = {
    'AL': 'Login package',
    'SD': 'Сокращенный пакет с данными',
    'ASD': 'Ответ на пакет типа SD',
    'AD': 'Ответ на расширенный пакет с данными',
    'AB': 'Ответ на пакет из черного ящика',
    'AP': 'Ответ на пинговый пакет'
}

error_code = {
    'AL': {'1': 'Successful authorization', '0': 'Connection failure (err protocol/ID)',
           '01': 'Password verification error', '10': 'Checksum verification error'},
    'ASD': {'-1': '', '0': 'Wrong time', '1': 'Пакет успешно зарегистрирован', '10': ' Ошибка получения координат',
            '11': 'Ошибка получения скорости, курса или высоты', '12': '', '13': 'Ошибка проверки контрольной суммы.'},
    'AD': {'-1': '', '0': 'Wrong time', '1': 'Пакет успешно зарегистрирован', '10': ' Ошибка получения координат',
           '11': 'Ошибка получения скорости, курса или высоты', '12': '', '16': 'Ошибка проверки контрольной суммы.'},
    'AB': {int: 'Number of successfully accepted packages', '': 'Checksum verification error'},
    'AP': {'Positive server response (ping)'}
}



# цифровой код в пакете
numbers = {
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
}
