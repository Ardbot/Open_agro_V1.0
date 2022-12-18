""" Конвертируем 16-ю систему в 10-ю (StarLine M18, StarLine EGTS) """


def main():
    gps_data = r'LFRD\x9A\x00\x00\x00\x00\x03\xC5\x01\x10'
    gps_data = r'"\x01\x00B\x03862*****55991!\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00Q" 400 157 "-" "-"'
    # gps_data = r'\x16\x03\x01\x00=\x01'

    array_data = gps_data.split("\\")
    i = 0
    print("| # | 16 | 10 |")
    for val in array_data:
        try:
            print('|', i, '|', val[1:], '|', int(val[1:], 16), '|')
            print("_______________")
            i += 1
        except:
            print("Error convert", val)
            print("_______________")


if __name__ == '__main__':
    main()
