import json
import websocket
import urllib.request


prefix_history = {}
asn_names = {}

def download_asn_names():
    """Downloads ASN number to name mapping from ARIN."""
    response = urllib.request.urlopen('ftp://ftp.arin.net/info/asn.txt')
    the_page = response.read()
    for line in the_page.decode("utf-8").split("\n")[11:]:
        data = line.strip().split()
        if len(data) > 0:
            asn_names[int(data[0])] = data[1]


def get_asn_name(number):
    """Returns the ASN name for a given number."""
    try:
        name = asn_names.get(number, number)
    except TypeError:
        name = number
    return name


def origin_asn_changed(msg, prefix):
    """Checks if the originating ASN for a given prefix has changed."""
    previous_asn = prefix_history[prefix]['msg']['path'][-1]
    previous_asn_name = asn_names.get(previous_asn, previous_asn)
    current_asn = msg['path'][-1]
    current_asn_name = asn_names.get(current_asn, current_asn)
    if current_asn != previous_asn:
        return f"{prefix}: {previous_asn_name} --> {current_asn_name}"
    else:
        return False


def as_path_changed(msg, prefix):
    """Checks if the AS path for a given prefix has changed."""
    previous_as_path = prefix_history[prefix]['msg']['path']
    current_as_path = msg['path']
    if previous_as_path != current_as_path:
        return f"{prefix}: {previous_as_path} --> {current_as_path}"
    else:
        return False


download_asn_names()
ws = websocket.WebSocket()
ws.connect("wss://ris-live.ripe.net/v1/ws/?client=peter")
params = {"host": "rrc22", "type": "UPDATE", "require": "announcements"}
ws.send(json.dumps({"type": "ris_subscribe", "data": params}))

for data in ws:
    msg = json.loads(data)['data']
    for a in msg['announcements']:
        for prefix in a['prefixes']:
            prefix = prefix+"-peer-"+msg['peer']
            if prefix in prefix_history:

                # check if ASN path has changed
                result = as_path_changed(msg, prefix)
                if result is not False:
                    new_as_path_named = list(get_asn_name(number) for number in msg['path'])
                    previous_as_path_named = list(get_asn_name(number) for number in prefix_history[prefix]['msg']['path'])
                    print(f"AS Path Change: {prefix}")
                    print(previous_as_path_named)
                    print(new_as_path_named)

                    # check if origin ASN has changed
                    result = origin_asn_changed(msg, prefix)
                    if result is not False:
                        print(result)
            
            # update prefix history with latest value
            prefix_history[prefix] = {"msg": msg}
