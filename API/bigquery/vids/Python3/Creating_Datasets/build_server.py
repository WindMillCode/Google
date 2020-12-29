import sys
import http.server
import socketserver
from urllib.parse import urlparse,unquote
import os
import json 
import datetime
import time
import pprint 
pp = pprint.PrettyPrinter(indent=4,compact= True,width =1)
from create_dataset import my_bigquery_client

#  your customer biguqery client
my_client = my_bigquery_client()
#web server
class my_base_handler(http.server.BaseHTTPRequestHandler):
    server_version = 'Apache/2.0'
    sys_version= 'Java/Spring'
    directory = 'none'    

    # def setup(self):
    #     http.server.BaseHTTPRequestHandler.setup(self)
    #     self.request.settimeout(10)
    
    def do_GET(self):    
        urlObj = urlparse(self.path)
        name = unquote(urlObj.query).split("name=")[1]
         
        self.send_response(200)

        self.send_header('Access-Control-Allow-Origin','*')
        try: 
            if len(needed) > 2:
                if '.css' in needed[2]:
                    self.send_header('Content-Type','text/css')
                    print('hit\n\n\n\n\n')
        except BaseException:
            pass
        self.end_headers()

        path = ''
        if  urlObj.path == "/":
            self.wfile.write(my_client.execute(name))
        # else:
        #     path = needed[2]
        
        # fp = open("./{}".format(path), 'rb')
        # while True:
        #     bytes = fp.read(8192)
        #     if bytes:
        #         self.wfile.write(bytes)
        #     else:
        #         return        
        # end while


# configuring web server
Handler =  my_base_handler
PORT = 3005
#

if __name__ == "__main__":
    with http.server.HTTPServer(("",  PORT ), Handler) as httpd:
        print("serving at port {}".format(PORT))
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("ending session")
            httpd.server_close()
        except IndexError:
            print("port or path is missing make sure thnx :)")
        


##############################################################################   



