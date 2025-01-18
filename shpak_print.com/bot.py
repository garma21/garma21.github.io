


# Замініть на свої значення


import os
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

# Замініть на свої значення
BOT_TOKEN = '7787585536:AAHua9Zx33JZj10-D8JEai8m8zE6oA4a6Os'
CHAT_ID = '297855633'


def send_message_to_telegram(message):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    data = {
        "chat_id": CHAT_ID,
        "text": message
    }
    try:
        response = requests.post(url, data=data)
        response.raise_for_status()  # Перевірка HTTP статусу
        return {"success": True, "response": response.json()}
    except requests.exceptions.RequestException as e:
        return {"success": False, "error": str(e), "response": response.text if 'response' in locals() else "No response"}

def send_file_to_telegram(file_path):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendDocument"
    with open(file_path, 'rb') as file:
        data = {
            "chat_id": CHAT_ID
        }
        files = {
            "document": file
        }
        try:
            response = requests.post(url, data=data, files=files)
            response.raise_for_status()  # Перевірка HTTP статусу
            return {"success": True, "response": response.json()}
        except requests.exceptions.RequestException as e:
            return {"success": False, "error": str(e), "response": response.text if 'response' in locals() else "No response"}

@app.route('/send-order', methods=['POST'])
def send_order():
    try:
        # Отримання даних з форми
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        description = request.form.get('description')
        material = request.form.get('material')
        quantity = request.form.get('quantity')
        file = request.files.get('file')

        # Перевірка наявності обов'язкових полів
        if not all([name, email, phone, description, material, quantity, file]):
            return jsonify({"success": False, "error": "Не всі обов'язкові поля заповнені!"}), 400

        # Збереження завантаженого файлу
        upload_folder = 'uploads'
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)  # Створення папки для завантажених файлів
        file_path = os.path.join(upload_folder, file.filename)
        file.save(file_path)

        # Формування повідомлення для Telegram
        message = (
            f"Новий запит на 3D-друк:\n"
            f"Ім'я: {name}\n"
            f"Email: {email}\n"
            f"Телефон: {phone}\n"
            f"Опис: {description}\n"
            f"Матеріал: {material}\n"
            f"Кількість: {quantity}"
        )

        # Відправлення текстового повідомлення
        message_result = send_message_to_telegram(message)

        # Відправлення файлу
        file_result = send_file_to_telegram(file_path)

        # Перевірка результатів
        if message_result["success"] and file_result["success"]:
            return jsonify({"success": True, "message": "Замовлення відправлено успішно!"})
        else:
            errors = []
            if not message_result["success"]:
                errors.append(f"Помилка текстового повідомлення: {message_result['error']}")
            if not file_result["success"]:
                errors.append(f"Помилка відправлення файлу: {file_result['error']}")
            return jsonify({"success": False, "errors": errors}), 500

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')  # Створення папки для завантажених файлів
    app.run(debug=True)
