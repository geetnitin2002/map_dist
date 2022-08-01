from flask import Flask, jsonify, request
from flask_mysqldb import MySQL, MySQLdb

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'maps'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/data', methods=['GET'])
def data():
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT * FROM latlng_data")
    rv = cur.fetchall()
    list = []
    list_item = {}
    for result in rv:
        list_item = {'id': result['id'], 'name': result['name'], 'latitude': result['latitude'],
                     'longitude': result['longitude']}
        list.append(list_item)
        list_item = {}
    return jsonify(list)

"""
@app.route('/search', methods=['POST', 'GET'])
def search():
    if request.method == 'POST':
        searchedData = request.json['searchdata']
        cur = mysql.connection.cursor()
        cur.execute("SELECT name FROM latlng_data WHERE name LIKE %s",(searchedData))
        rv = cur.fetchall()
        list = []
        list_item = {}
        for result in rv:
            list_item = {'name': result['name']}
            list.append(list_item)
            list_item = {}
        return jsonify(list)
    else:
        return jsonify("GET DATA")
"""

if __name__ == '__main__':
    app.run(debug=True)
