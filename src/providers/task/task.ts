import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskProvider {

  private userId;
  private PATH;

  constructor(private db: AngularFireDatabase) {
    this.userId = firebase.auth().currentUser.uid;
    this.PATH = 'users/' + this.userId + '/tasks/';
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }

  save(task: any) {
    return new Promise((resolve, reject) => {
      if (task.key) {
        this.db.list(this.PATH)
          .update(task.key, { name: task.name, desc: task.desc })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ name: task.name, desc: task.desc })
          .then(() => resolve());
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
