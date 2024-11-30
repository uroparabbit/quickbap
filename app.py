from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

camera = [0, 0, 0]

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/admin")
def admin():
    return render_template("admin.html")

@app.route("/get", methods=["GET"])
def get():
    return camera


@socketio.on("camera_changed")
def handle_camera_changed(data):
    camera[data["cameraMode"]] = data["detectedFaces"]
    emit("update_data", camera, broadcast=True)


if __name__ == "__main__":
    socketio.run(app, debug=True)
