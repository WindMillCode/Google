import sys
sys.path.append(sys.path[0]  + "\\site-packages")
from urllib.parse import urlparse,unquote
import os
import json 
import datetime
import time
import pprint 
pp = pprint.PrettyPrinter(indent=4,compact= True,width =1)
from tables import my_bigquery_client
import tornado.ioloop
import tornado.web
import json



#  your customer biguqery client
my_client = my_bigquery_client()

# web server
class MainHandler(tornado.web.RequestHandler):

    

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "*")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def post(self):
        data = ""
        if self.request.headers['Content-Type'] == 'application/json':
            data = tornado.escape.json_decode(self.request.body)  
            print(data.get("tableName"))
        self.set_header("Content-Type", "text/plain")
        self.write(my_client.execute(data))

    def options(self):
        self.set_status(204)
        self.finish()  

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

# configuring web server
PORT = 3005
#


if __name__ == "__main__":
    app = make_app()
    app.listen(3005)
    print("serving at port {}".format(PORT))
    tornado.ioloop.IOLoop.current().start()


       





##############################################################################   



