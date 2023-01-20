# Запросы к API "Агросигнал"

# 
import keyring
# Внести пароль и удалить строку
# keyring.set_password(agrosignal, apiKey, xxxx-xxxx-xxxxxx-xxx)

# Считываем пароль с хранилища сервера
apiKey = keyring.get_password("agrosignal", "apiKey")

