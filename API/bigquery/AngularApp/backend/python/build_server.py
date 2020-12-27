import sys
import http.server
import socketserver
from urllib import parse
import os
import json 
import datetime
import time
import pprint 

# print(sys.argv)

#web server
class my_base_handler(http.server.BaseHTTPRequestHandler):
    server_version = 'Apache/2.0'
    sys_version= 'Java/Spring'
    directory = 'none'    

    # def setup(self):
    #     http.server.BaseHTTPRequestHandler.setup(self)
    #     self.request.settimeout(10)
    
    def do_GET(self):    
        needed = self.path.split("/",2)
        print(needed)
        # if(   self.path == '/{}/'.format(sys.argv[1]) ):

        # stuff = states_ref.get()           
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
        if  self.path == "/":
            path = "index.html"
        else:
            path = needed[2]
        
        fp = open("./{}".format(path), 'rb')
        while True:
            bytes = fp.read(8192)
            if bytes:
                self.wfile.write(bytes)
            else:
                return        
        # end while



Handler =  my_base_handler
# Handler =  MyTCPHandler

if __name__ == "__main__":
    with http.server.HTTPServer(("",  int(sys.argv[2]) ), Handler) as httpd:
        print("serving at port {}".format(sys.argv[2]))
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            httpd.server_close()
        except IndexError:
            print("port or path is missing make sure thnx :)")
        


##############################################################################   



