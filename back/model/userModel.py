import mysql.connector
from config.dbConfig import get_connection
import bcrypt

def create_user(username, password, role):
    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        query = "INSERT INTO users (username, password, role) VALUES (%s, %s, %s)"
        values = (username, hashed_password, role)

        connection = get_connection()
        cursor = connection.cursor()
        cursor.execute(query, values)
        connection.commit()

        cursor.close()
        connection.close()

        return cursor.lastrowid
    except Exception as error:
        print('Error executing query:', error)
        raise error


def login_user(username):
    try:
        query = 'SELECT * FROM users WHERE username = %s'
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query, (username,))

        results = cursor.fetchall()
        print(results)

        cursor.close()
        connection.close()

        if results:
            if isinstance(results, list) and len(results) > 0:
                stored_hashed_password = results[0].get('password', None)

                if stored_hashed_password:
                    return {
                        'id': results[0]['id'],
                        'username': results[0]['username'],
                        'role': results[0]['role'],
                        'password': stored_hashed_password,
                    }
                else:
                    raise ValueError('Stored hashed password not found in database')
            else:
                raise ValueError('Results is not a list or is an empty list')
        else:
            raise ValueError('No results found for the given username')
    except Exception as error:
        print('Error during login:', error)
        return None
