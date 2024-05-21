def sumar_numeros(lista):
    """Función que suma los números en una lista."""
    suma = sum(lista)
    return suma

def main():
    """Función principal del programa."""
    numeros = []
    print("Introduce números para sumar. Escribe 'fin' para terminar.")

    while True:
        entrada = input("Introduce un número: ")
        if entrada.lower() == 'fin':
            break
        try:
            numero = float(entrada)
            numeros.append(numero)
        except ValueError:
            print("Por favor, introduce un número válido.")

    resultado = sumar_numeros(numeros)
    print(f"La suma de los números introducidos es: {resultado}")

if __name__ == "__main__":
    main()
