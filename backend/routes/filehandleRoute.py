from flask import Blueprint, request, jsonify, send_file
import os
import time
import pdfplumber  # For parsing PDFs
from werkzeug.utils import secure_filename

file_route = Blueprint('file_route', __name__)

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {'pdf'}
MAX_SIZE = 5 * 1024 * 1024  # 5 MB


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def parse_pdf(file_path):
    text = ""
    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() + "\n"
    except Exception as e:
        return f"Error parsing PDF: {str(e)}"
    return text


@file_route.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if file and allowed_file(file.filename):
        if file.mimetype not in ['application/pdf']:
            return jsonify({"error": "Only PDF files are allowed."}), 400

        if len(file.read()) > MAX_SIZE:
            return jsonify({"error": "File size should be less than 5MB."}), 400

        file.seek(0)  # Reset the file pointer to the beginning after checking size
        filename = secure_filename(f"{int(time.time())}-{file.filename}")
        file_path = os.path.join(UPLOAD_DIR, filename)
        file.save(file_path)

        parsed_text = parse_pdf(file_path)

        return jsonify({
            "message": "File uploaded successfully",
            "filename": filename,
            "path": file_path,
            "parsed_text": parsed_text
        }), 200

    return jsonify({"error": "Invalid file type."}), 400


@file_route.route('/uploads/<filename>', methods=['GET'])
def download_file(filename):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        return jsonify({"error": "File not found."}), 404

    try:
        return send_file(file_path, as_attachment=True)
    except Exception as e:
        return jsonify({"error": f"Error downloading file: {str(e)}"}), 500
