import random

def adivina_el_numero():
    """Juego de adivinanza de números."""
    numero_secreto = random.randint(1, 100)
    intentos = 0
    
    print("¡Bienvenido al juego de adivinanza de números!")
    print("He elegido un número entre 1 y 100. ¿Puedes adivinar cuál es?")
    
    while True:
        intento = input("Introduce tu adivinanza: ")
        intentos += 1
        
        try:
            intento = int(intento)
        except ValueError:
            print("Por favor, introduce un número válido.")
            continue
        
        if intento < numero_secreto:
            print("Demasiado bajo. Intenta de nuevo.")
        elif intento > numero_secreto:
            print("Demasiado alto. Intenta de nuevo.")
        else:
            print(f"¡Felicidades! Has adivinado el número en {intentos} intentos.")
            break

if __name__ == "__main__":
    adivina_el_numero()
