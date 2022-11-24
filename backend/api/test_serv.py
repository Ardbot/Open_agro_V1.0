import werkzeug.exceptions
from flask import Flask, request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'data ' + str(request.data)


# @app.route('/<auto>')
# def prot(auto):
#     return 'auto %s' % auto

@app.errorhandler(werkzeug.exceptions.BadRequest)
def err400(error):
    print("BadRequest: " + error)
    # return "error 400: " + error


@app.errorhandler(404)
def err404(error):
    return "error 404"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=1002)
