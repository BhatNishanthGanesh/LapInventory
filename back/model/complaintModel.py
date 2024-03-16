import mysql.connector
from config.dbConfig import db

def create_complaint(complaint_text, laptop_name, laptop_brand, laptop_price, image_path):
    try:
        query = "INSERT INTO complaints (complaintText, laptopName, laptopBrand, laptopPrice, imagePath) VALUES (%s, %s, %s, %s, %s)"
        values = (complaint_text, laptop_name, laptop_brand, laptop_price, image_path)
        
        cursor = db.cursor()
        cursor.execute(query, values)
        db.commit()

        return cursor.lastrowid
    except Exception as error:
        raise error

def get_all_complaints():
    try:
        query = "SELECT * FROM complaints"
        
        cursor = db.cursor(dictionary=True)
        cursor.execute(query)

        return cursor.fetchall()
    except Exception as error:
        raise error

def get_complaints_by_user_id(user_id):
    try:
        query = "SELECT * FROM complaints WHERE user_id = %s"
        
        cursor = db.cursor(dictionary=True)
        cursor.execute(query, (user_id,))

        return cursor.fetchall()
    except Exception as error:
        raise error
