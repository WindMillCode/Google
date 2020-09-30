from firebase_admin import credentials
from firebase_admin import exceptions
from firebase_admin import db
from firebase_admin import auth 
from firebase_admin import storage
import http.server
import socketserver
from urllib import parse
import os
import json 
import firebase_admin
import pyrebase
import datetime
import time
import pprint 

############################

#pyrebase setup


with open(os.environ['AF_AUTH']) as s:
    os.environ['AF_AUTH']= s.read()

lb = json.loads(os.environ['AF_AUTH'])

config  = {
    'serviceAccount': lb,
    "apiKey": lb["apiKey"],
    "authDomain": lb["authDomain"],
    "databaseURL":lb['database_url'],
    'storageBucket': lb['storage_bucket']
}

try:

    pyre_firebase = pyrebase.initialize_app(config)
    pyre_auth = pyre_firebase.auth()
    pyre_db = pyre_firebase.database()
    pyre_storage = pyre_firebase.storage()

##############################################################################   

#firebase setup

    cred = credentials.Certificate(lb)
    options = {
        'serviceAccountId': lb['client_email'],
        'databaseURL':lb['database_url'],
        'storageBucket': lb['storage_bucket']
    }
    app = firebase_admin.initialize_app(cred,options)


##############################################################################   

#database code 
    ref = db.reference('/')
    states_ref = ref.child('states')



##############################################################################   
except Exception as e:
    print(e )
    
    
#web server
class my_base_handler(http.server.BaseHTTPRequestHandler):
    server_version = 'Apache/2.0'
    sys_version= 'Java/Spring'
    directory = 'none'    

    # def setup(self):
    #     http.server.BaseHTTPRequestHandler.setup(self)
    #     self.request.settimeout(10)
    
    def do_POST(self):    
        # print(self.path)
        if(   self.path == '/env/'):
            try:
                content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
            except TypeError:
                content_length = 0
            if content_length != 0:
                post_data = self.rfile.read(content_length) # <--- Gets the data itself    
            elif (content_length == 0):
                post_data = None 
            # for name, value in sorted(self.headers.items()):
            #     print(name, value.rstrip())
                                                
            # a = self.rfile.readlines()
            # self.rfile.close()    
            stuff = states_ref.get()           
            self.send_response(200)
            self.send_header('Content-Type',
                            'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin',
                             '*')
            self.end_headers()
            self.wfile.write(  json.dumps(stuff).encode('utf-8'))


Handler =  my_base_handler
# Handler =  MyTCPHandler

if __name__ == "__main__":
    with http.server.HTTPServer(("",  int(os.environ['AF_AU'])), Handler) as httpd:
        print("serving at port")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
        httpd.server_close()


##############################################################################   



