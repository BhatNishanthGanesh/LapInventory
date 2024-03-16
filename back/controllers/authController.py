import bcrypt
import jwt
from model.userModel import create_user, login_user
from flask import request, jsonify

def register_user_controller():
    try:
        # Extract data from the request
        data = request.json
        username = data.get('username')
        password = data.get('password')
        role = data.get('role', 'user')

        # Check if username and password are provided
        if not username or not password:
            return jsonify({'message': 'Username and password are required'}), 400

        # Hash the password before storing it in the database
        # hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Call the model to create the user
        user_id = create_user(username, password, role)

        return jsonify({'message': 'User registered successfully', 'userId': user_id}), 201

    except Exception as error:
        print(error)
        if 'bcrypt' in str(error):
            return jsonify({'message': 'Error during password hashing'}), 500
        else:
            return jsonify({'message': 'Internal server error'}), 500

# Corrected login_user function without arguments
# Corrected login_user function without arguments
def login_user_controller():
    try:
        # Extract data from the request
        data = request.json
        username = data.get('username')
        password = data.get('password')
        role = data.get('role')

        # Check if username, password, and role are provided
        if not username or not password or not role:
            return jsonify({'message': 'Username, password, and role are required'}), 400

        # Call the model to retrieve the user data from the database
        user = login_user(username)

        # Check if any user was found
        if not user:
            return jsonify({'message': 'Invalid username or password meow'}), 401

        # Extract the hashed password from the user object
        stored_hashed_password = user['password'].encode('utf-8')

        # Compare the provided password with the stored hashed password
        password_match = bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password)

        if password_match:
            # Passwords match, login successful
            token = jwt.encode({'username': username, 'role': role}, 'sbnsbd', algorithm='HS256')
            return jsonify({'message': 'Login successful', 'token': token, 'username': username}), 200
        else:
            # Passwords don't match, login failed
            return jsonify({'message': 'Invalid username or password meow meow'}), 401

    except Exception as error:
        print('Error executing login query:', error)
        raise error