#!/user/bin/python3
import json, websocket
from modules.firestore import get_prefixes, create_event
from modules.bgp import *

if __name__ == "__main__":

    monitored_prefixes = get_prefixes()
    print(f"monitoring {len(monitored_prefixes)} prefixes")
    download_asn_names()
    print(f"downloaded {len(asn_names)} ASN names")
    print("connecting to RIS Live websocket...")
    ws = websocket.WebSocket()
    ws.connect("wss://ris-live.ripe.net/v1/ws/?client=peter")
    params = {"host": "rrc22", "type": "UPDATE", "require": "announcements"}
    ws.send(json.dumps({"type": "ris_subscribe", "data": params}))

    for data in ws:
        msg = json.loads(data)['data']
        for a in msg['announcements']:
            for prefix in a['prefixes']:
                if prefix in monitored_prefixes:
                    prefix_peer = prefix+"-peer-"+msg['peer']
                    if prefix_peer in prefix_history:

                        # check if ASN path has changed
                        result = as_path_changed(msg, prefix_peer)
                        if result is not False:
                            new_as_path_named = list(get_asn_name(number) for number in msg['path'])
                            previous_as_path_named = list(get_asn_name(number) for number in prefix_history[prefix_peer]['msg']['path'])
                            print(f"AS Path Changed: {prefix_peer}")
                            print(previous_as_path_named)
                            print(new_as_path_named)
                            create_event(prefix, 'as-path-change', f'from: {previous_as_path_named} to {new_as_path_named}')

                            # check if origin ASN has changed
                            result = origin_asn_changed(msg, prefix_peer)
                            if result is not False:
                                print(f"Origin AS Changed: {prefix_peer}")
                                print(result)
                    
                    # update prefix history with latest value
                    prefix_history[prefix_peer] = {"msg": msg}