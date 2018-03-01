import json
import unicodedata
from flask import Flask, render_template
from vk_worker import VkWorker

with open('./config.json') as json_data_file:
    config = json.load(json_data_file)

# login = unicodedata.normalize('NFKD', config['user']).encode('ascii', 'ignore')
# password = unicodedata.normalize('NFKD', config['password']).encode('ascii', 'ignore')
# print(type(config['user']), type(config['password']))

worker = VkWorker(config['user'], config['password'])

flaskapp = Flask(__name__)

@flaskapp.route("/")
def index():
    return render_template('index.html')

@flaskapp.route("/get_song")
def get_song():
    return json.dumps({'song': worker.get_status()})

@flaskapp.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

flaskapp.run()