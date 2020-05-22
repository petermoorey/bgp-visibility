import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

project_id = 'bgprouting-fae56'

cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {'projectId': project_id})
db = firestore.client()

def get_prefixes():
  """Get list of prefixes that have been enabled for monitoring"""
  ref = db.collection(u'prefixes')
  docs = ref.stream()

  monitored_prefixes = []
  for doc in docs:
      x = doc.to_dict()
      monitored_prefixes.append(x['prefix'])
  return monitored_prefixes

def create_event(prefix, type, value):
  """Create event"""
  ref = db.collection(u'events').document()
  ref.set({
    'prefix': prefix,
    'type': type,
    'value': value,
  })
  return
