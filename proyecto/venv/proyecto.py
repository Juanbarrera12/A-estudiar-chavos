import sqlite3
import random
import string


# Conectar a la base de datos (se creará si no existe)
conn = sqlite3.connect('banco.db')
cursor = conn.cursor()

# Crear tabla de cuentas bancarias
cursor.execute('''
CREATE TABLE IF NOT EXISTS cuentas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_usuario TEXT UNIQUE,
    contra TEXT,
    nombre_real TEXT,
    dni TEXT,
    sexo TEXT,
    edad INTEGER,
    dinero REAL,
    cbu TEXT UNIQUE
)
''')
conn.commit()

class CuentaBancaria:
    def __init__(self, nombre_usuario, contra, nombre_real, dni, sexo, edad, dinero, cbu):
        self.nombre_usuario = nombre_usuario
        self.contra = contra
        self.nombre_real = nombre_real
        self.dni = dni
        self.sexo = sexo
        self.edad = edad
        self.dinero = dinero
        self.cbu = cbu

    def __str__(self):
        return f"Usuario: {self.nombre_usuario}, Nombre: {self.nombre_real}, DNI: {self.dni}, Sexo: {self.sexo}, Edad: {self.edad}, Dinero: {self.dinero}, CBU: {self.cbu}"

def tiene_numeros(s):
    return any(char.isdigit() for char in s)

def cumple_requisitos_contrasena(s):
    tiene_numero = any(char.isdigit() for char in s)
    tiene_mayuscula = any(char.isupper() for char in s)
    return tiene_numero and tiene_mayuscula

def es_dni_valido(dni):
    return dni.isdigit() and 7 <= len(dni) <= 8

def es_sexo_valido(sexo):
    return sexo in ["M", "F"]

def es_edad_valida(edad):
    return 16 <= edad < 100

def generar_cbu():
    return ''.join(random.choices(string.digits, k=22))

def iniciar_sesion():
    while True:
        usuario_input = input("Ingrese su Nombre de Usuario: ")
        cuenta_encontrada = buscar_cuenta_por_usuario(usuario_input)

        if cuenta_encontrada is None:
            print("Nombre de Usuario Incorrecto. Intente nuevamente.")
            continue

        contra_input = input("Ingrese su Contraseña: ")
        if cuenta_encontrada[2] == contra_input:
            print("Sesión Iniciada con Éxito")
            return cuenta_encontrada
        else:
            print("Contraseña Incorrecta. Intente nuevamente.")

def buscar_cuenta_por_usuario(nombre_usuario):
    cursor.execute("SELECT * FROM cuentas WHERE nombre_usuario = ?", (nombre_usuario,))
    return cursor.fetchone()

def crear_cuenta():
    print("Crear cuenta")
    cbu = generar_cbu()

    nombre_usuario = input("Ingrese su Nombre de Usuario: ")
    nombre_real = input("Ingrese su Nombre Completo: ")
    while tiene_numeros(nombre_real):
        print("No pueden ingresarse números en el nombre. Intente nuevamente.")
        nombre_real = input("Ingrese su Nombre Completo: ")

    contrasena = input("Ingrese su Contraseña: ")
    while not cumple_requisitos_contrasena(contrasena):
        print("La contraseña debe contener al menos un número y al menos una letra mayúscula. Intente nuevamente.")
        contrasena = input("Ingrese su Contraseña: ")

    dni = input("Ingrese su DNI: ")
    while not es_dni_valido(dni):
        print("El DNI debe tener entre 7 y 8 números.")
        dni = input("Ingrese su DNI: ")

    sexo = input("Ingrese su Sexo (F o M): ")
    while not es_sexo_valido(sexo):
        print("Ingrese un valor válido para el sexo (M = Masculino, F = Femenino): ")
        sexo = input("Ingrese su Sexo (F o M): ")

    edad = int(input("Ingrese su Edad: "))
    while not es_edad_valida(edad):
        if edad < 16:
            print("La aplicación no acepta personas menores de 16 años.")
        else:
            print("La aplicación no acepta personas mayores de 100 años.")
        edad = int(input("Ingrese su Edad: "))

    cursor.execute('''
        INSERT INTO cuentas (nombre_usuario, contra, nombre_real, dni, sexo, edad, dinero, cbu)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (nombre_usuario, contrasena, nombre_real, dni, sexo, edad, 0, cbu))
    conn.commit()

    print(f"Cuenta creada con éxito: {nombre_usuario}, CBU: {cbu}")

def depositar_dinero():
    print("Depositar Dinero")
    cuenta = iniciar_sesion()

    monto_deposito = float(input("Ingrese monto a depositar: "))
    if monto_deposito <= 0:
        print("Monto inválido")
        return

    nuevo_saldo = cuenta[7] + monto_deposito
    cursor.execute("UPDATE cuentas SET dinero = ? WHERE id = ?", (nuevo_saldo, cuenta[0]))
    conn.commit()

    print("Depósito exitoso!")
    print(f"Nuevo saldo: {nuevo_saldo}")

def retirar_dinero():
    print("Retirar Dinero")
    cuenta = iniciar_sesion()

    monto_retiro = float(input("Ingrese monto a retirar: "))
    if cuenta[7] < monto_retiro:
        print("Fondos insuficientes")
        return

    nuevo_saldo = cuenta[7] - monto_retiro
    cursor.execute("UPDATE cuentas SET dinero = ? WHERE id = ?", (nuevo_saldo, cuenta[0]))
    conn.commit()

    print("Retiro exitoso!")
    print(f"Nuevo saldo: {nuevo_saldo}")

def transferir_dinero():
    print("Transferir Dinero")
    cuenta_origen = iniciar_sesion()

    usuario_destino = input("Ingrese nombre de usuario de cuenta destino: ")
    cuenta_destino = buscar_cuenta_por_usuario(usuario_destino)
    if cuenta_destino is None:
        print("Cuenta destino no encontrada")
        return

    monto_transferencia = float(input("Ingrese monto a transferir: "))
    if cuenta_origen[7] < monto_transferencia:
        print("Fondos insuficientes")
        return

    nuevo_saldo_origen = cuenta_origen[7] - monto_transferencia
    nuevo_saldo_destino = cuenta_destino[7] + monto_transferencia
    cursor.execute("UPDATE cuentas SET dinero = ? WHERE id = ?", (nuevo_saldo_origen, cuenta_origen[0]))
    cursor.execute("UPDATE cuentas SET dinero = ? WHERE id = ?", (nuevo_saldo_destino, cuenta_destino[0]))
    conn.commit()

    print("Transferencia exitosa!")
    print(f"Saldo restante en la cuenta: {nuevo_saldo_origen}")

def mostrar_datos_cuenta():
    cuenta = iniciar_sesion()
    if cuenta:
        print("Cuenta Encontrada con Éxito")
        print(f"Usuario: {cuenta[1]}, Nombre: {cuenta[3]}, DNI: {cuenta[4]}, Sexo: {cuenta[5]}, Edad: {cuenta[6]}, Dinero: {cuenta[7]}, CBU: {cuenta[8]}")
    else:
        print("No se encontró una cuenta con esos datos.")

def mostrar_menu():
    print("|  ------------------------------------------------------------------- |")
    print("|                         Sistema bancario                             |")
    print("|  ------------------------------------------------------------------- |")
    print("|                      1. Crear cuenta                                 |")
    print("|  ------------------------------------------------------------------- |")
    print("|                      2. Depositar dinero                             |")
    print("|  ------------------------------------------------------------------- |")
    print("|                      3. Retirar dinero                               |")
    print("|  ------------------------------------------------------------------- |")
    print("|                      4. Transferir dinero                            |")
    print("|  ------------------------------------------------------------------- |")
    print("|                      5. Datos de la cuenta                           |")
    print("|  ------------------------------------------------------------------- |")
    print("|                      6. Salir                                        |")
    print("|  ------------------------------------------------------------------- |")
    print("|                 Seleccione una opción del 1 al 6                     |")
    print("|  ------------------------------------------------------------------- |")

def mostrar_todas_las_cuentas():
    try:
        cursor.execute("SELECT * FROM cuentas")
        cuentas = cursor.fetchall()
        if cuentas:
            print("Cuentas encontradas:")
            for cuenta in cuentas:
                print(f"ID: {cuenta[0]}, Nombre de Usuario: {cuenta[1]}, Nombre Real: {cuenta[3]}, DNI: {cuenta[4]}, Sexo: {cuenta[5]}, Edad: {cuenta[6]}, Dinero: {cuenta[7]}, CBU: {cuenta[8]}")
        else:
            print("No se encontraron cuentas en la base de datos.")
    except Exception as e:
        print("Error al recuperar las cuentas de la base de datos:", e)

def main():
    opcion = 0
    while opcion != 6:
        mostrar_menu()
        opcion = int(input())
        if opcion == 1:
            crear_cuenta()
        elif opcion == 2:
            depositar_dinero()
        elif opcion == 3:
            retirar_dinero()
        elif opcion == 4:
            transferir_dinero()
        elif opcion == 5:
            mostrar_datos_cuenta()
        elif opcion == 6:
            print("Saliendo de la Aplicación")
        elif opcion == 7:
            mostrar_todas_las_cuentas()



if __name__ == "__main__":
    main()
    # Cerrar la conexión a la base de datos al finalizar
    conn.close()
