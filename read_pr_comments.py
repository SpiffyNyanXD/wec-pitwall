import urllib.request
import json
import os

url = "https://api.github.com/repos/SpiffyNyanXD/wec-pitwall/issues/132/comments"
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    comments = json.loads(response.read().decode())
    for c in comments:
        print(f"{c['user']['login']}: {c['body']}\n---")

url = "https://api.github.com/repos/SpiffyNyanXD/wec-pitwall/pulls/132/reviews"
try:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        reviews = json.loads(response.read().decode())
        for c in reviews:
            print(f"Review {c['user']['login']}: {c['body']}\n---")
except Exception:
    pass
