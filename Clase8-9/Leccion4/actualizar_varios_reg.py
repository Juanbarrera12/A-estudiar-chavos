import psycopg2

conexion = psycopg2.connect(user='postgres', password='panchito', host='127.0.0.1', port='5432', database='test_bd')
try:
    with conexion:
        with conexion.cursor() as cursor:
            sentencia = 'UPDATE persona SET nombre=%s, apellido=%s, email=%s WHERE id_persona=%s'
            valores = (
                ('Juan', 'Perez', 'jperez@gmail.com', 4),
                ('Romina', 'Ayala', 'ayalar@gmail.com', 5)
            )
            cursor.executemany(sentencia, valores)
            registros_actulizados = cursor.rowcount
            print(f'Los registros actualizados son: {registros_actulizados}')
except Exception as e:
    print(f'Ocurrio un error: {e}')
finally:
    conexion.close()
