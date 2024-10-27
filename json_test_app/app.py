from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
   
    return jsonify({
        "message": "Hello, this is a test JSON response!",
        "status": "success",
        "data": {
            "item1": "value1",
            "item2": "value2",
            "item3": "value3"
        }
    })

if __name__ == "__main__":
    app.run(debug=True)
