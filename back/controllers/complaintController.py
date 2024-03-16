from flask import request, jsonify
import os
from model.complaintModel import create_complaint, get_complaints_by_user_id, get_all_complaints


def submit_complaint_s():
    try:
        complaint_text = request.form.get('complaintText')
        laptop_name = request.form.get('laptopName')
        laptop_brand = request.form.get('laptopBrand')
        laptop_price = request.form.get('laptopPrice')

        # Check if a file is included in the request
        if 'image' in request.files:
            image_file = request.files['image']
            image_url = os.path.join("public/images", image_file.filename)
            image_file.save(image_url)
        else:
            image_url = None

        complaint_id = create_complaint(laptop_name, laptop_brand, laptop_price, complaint_text, image_url)

        return jsonify({'success': True, 'complaintId': complaint_id}), 201
    except Exception as error:
        print(error)
        return jsonify({'success': False, 'error': 'Internal Server Error'}), 500

def get_user_complaint_s(user_id):
    try:
        complaints = get_complaints_by_user_id(user_id)
        return jsonify({'success': True, 'complaints': complaints}), 200
    except Exception as error:
        print(error)
        return jsonify({'success': False, 'error': 'Internal Server Error'}), 500

def get_all_complaint_s():
    try:
        complaints = get_all_complaints()
        return jsonify({'success': True, 'complaints': complaints}), 200
    except Exception as error:
        print(error)
        return jsonify({'success': False, 'error': 'Internal Server Error'}), 500
