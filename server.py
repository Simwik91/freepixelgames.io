import http.server
import socketserver
import webbrowser
import os

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    # Open index.html in the default web browser
    webbrowser.open(f"http://localhost:{PORT}/index.html")
    httpd.serve_forever()
