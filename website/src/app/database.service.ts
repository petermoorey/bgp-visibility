import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notification} from './notification.model';
import { Prefix } from './prefix.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  // events
  public getEvents(uid) {
    console.log('getting events ');
    const notificationCollectionRef = this.firestore.collection('events', ref => ref.where('uid', '==', uid).orderBy('prefix'));
    return notificationCollectionRef.snapshotChanges();
  }

  // CRUD for notifications
  public getNotifications(uid) {
    console.log('getting notifications ');
    const notificationCollectionRef = this.firestore.collection('notifications', ref => ref.where('uid', '==', uid).orderBy('created', 'desc'));
    return notificationCollectionRef.snapshotChanges();
  }
  public getUnreadNotificationCount(uid) {
    console.log('getting unread notification count ');
    const notificationCollectionRef = this.firestore.collection('notifications', ref => ref.where('uid', '==', uid).where('seen', '==', false).orderBy('created', 'desc'));
    return notificationCollectionRef.snapshotChanges();
  }
  public createNotification(notification: Notification){
    console.log('added notification ', notification.message);
    delete notification.id;
    return this.firestore.collection('notifications').add({created: firebase.firestore.FieldValue.serverTimestamp(), ...notification});
  }
  public updateNotification(notification: Notification){
    console.log('updated notification ', notification.message, 'seen: ', notification.seen);
    this.firestore.collection('notifications').doc(notification.id).set({...notification});
  }
  public deleteNotification(notification: Notification){
    console.log('deleted notification ', notification.message);
    this.firestore.collection('notifications').doc(notification.id).delete();
  }

  // CRUD for prefixes
  public getPrefixes(uid) {
    console.log('getting prefixes ');
    const prefixesCollectionRef = this.firestore.collection('prefixes', ref => ref.where('uid', '==', uid).orderBy('prefix'));
    return prefixesCollectionRef.snapshotChanges();
  }
  public createPrefix(prefix: Prefix) {
    console.log('added prefix ', prefix.prefix);
    delete prefix.id;
    return this.firestore.collection('prefixes').add({created: firebase.firestore.FieldValue.serverTimestamp(), ...prefix});
  }
  public updatePrefix(prefix: Prefix){
    console.log('updated prefix ', prefix.prefix);
    delete prefix.id;
    this.firestore.collection('prefixes').doc(prefix.id).update({...prefix});
  }
  public deletePrefix(prefix: Prefix){
    console.log('deleted prefix ', prefix.prefix);
    this.firestore.collection('prefixes').doc(prefix.id).delete();
  }
}
