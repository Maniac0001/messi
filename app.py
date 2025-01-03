from flask import Flask, send_file

app = Flask(__name__)

# Serve the homepage
@app.route('/', methods=['GET'])
def serve_home():
    return send_file('home.html')  # The HTML file is directly served from the same directory

# Serve CSS and JS files
@app.route('/<filename>', methods=['GET'])
def serve_static_files(filename):
    return send_file(filename)  # Serve any static file (CSS, JS, images)

if __name__ == '__main__':
    app.run(debug=True)
