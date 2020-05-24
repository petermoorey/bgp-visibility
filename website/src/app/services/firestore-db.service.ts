import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements OnInit{

  constructor(private firestore: AngularFirestore) { }

  db: any;

  ngOnInit() {
  }

  getEventPromise(uid: string) {
    return this.firestore.collection('events').snapshotChanges();
  }
  getNotficationPromise(uid: string) {
    return this.firestore.collection('notifications', ref => ref.where('uid', '==', uid)).snapshotChanges();
  }
  getNotficationUnreadPromise(uid: string) {
    return this.firestore.collection('notifications', ref => ref.where('uid', '==', uid).where('seen', '==', false)).snapshotChanges();
  }
  getNetworkPromise(uid: string) {
    return this.firestore.collection('networks', ref => ref.where('uid', '==', uid)).snapshotChanges();
  }
  deleteNetwork(id: string) {
    this.firestore.collection('networks').doc(id).delete();
  }
  createNotification(notification){
    console.log('added notification ', notification.message);
    return this.firestore.collection('notifications').add(notification);
  }
  updateNotification(notification){
    console.log('updated notification ', notification.message);
    return this.firestore.collection('notifications').doc(notification.id).set({...notification});
  }
  createNetwork(network){
    console.log('added network ', network.network);
    return this.firestore.collection('networks').add({created: firebase.firestore.FieldValue.serverTimestamp(), ...network});
  }
}
