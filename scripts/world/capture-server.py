"""Loopback-only build tool for capturing source-generated geometry and textures."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
from pathlib import Path
from threading import Thread
from urllib.parse import urlparse, unquote
import gzip
import json
import time

ROOT = Path(__file__).resolve().parents[2]

class CaptureServer(SimpleHTTPRequestHandler):
    def __init__(self, *args, project=None, **kwargs):
        self.project = project
        directory = ROOT / 'packages/world-sources' / project / 'capture' if project else ROOT
        super().__init__(*args, directory=str(directory), **kwargs)

    def do_GET(self):
        if urlparse(self.path).path == '/capture-tool.js':
            data = (ROOT / 'scripts/world/capture-tool.js').read_bytes()
            self.send_response(200)
            self.send_header('Content-Type', 'text/javascript')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        super().do_GET()

    def do_POST(self):
        parts = Path(unquote(urlparse(self.path).path)).parts
        if len(parts) != 4 or parts[1] != '__capture' or parts[2] not in ('lagoon', 'sakura') or '..' in parts:
            self.send_error(403)
            return
        size = int(self.headers.get('Content-Length', 0))
        if size < 1 or size > 128 * 1024 * 1024:
            self.send_error(413)
            return
        name = parts[3]
        if not name.endswith(('.bin', '.webp', '.json', '.png')):
            self.send_error(403)
            return
        data = self.rfile.read(size)
        target = ROOT / 'public/world-assets' / parts[2] / name
        target.parent.mkdir(parents=True, exist_ok=True)
        if name.endswith('.bin'):
            data = gzip.compress(data, compresslevel=6, mtime=0)
            target = target.with_suffix('.bin.gz')
        target.write_bytes(data)
        response = json.dumps({'file': target.name, 'bytes': len(data)}).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(response)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, *args):
        if self.command == 'POST' or (len(args)>1 and str(args[1]) != '200'):
            super().log_message(*args)

servers = []
for name, port in [('lagoon', 0), ('sakura', 0), (None,0)]:
    server = ThreadingHTTPServer(('127.0.0.1', port), partial(CaptureServer, project=name))
    Thread(target=server.serve_forever, daemon=True).start()
    servers.append(server)
    print(f'{name or "workspace"}: http://127.0.0.1:{server.server_port}', flush=True)
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    for server in servers:
        server.shutdown()
