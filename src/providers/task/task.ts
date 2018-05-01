import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import {Loading, LoadingController} from "ionic-angular";

/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskProvider {

  private userId;
  private PATH;
  public loading: Loading;

  constructor(private db: AngularFireDatabase, public loadingCtrl: LoadingController,) {
    this.userId = firebase.auth().currentUser.uid;
    this.PATH = 'users/' + this.userId + '/tasks/';
  }

  getAll() {

    this.loading = this.loadingCtrl.create();
    this.loading.present();

    return this.db.list(this.PATH, ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(changes => {
        this.loading.dismiss();
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
      let newRow = { name: task.name, desc: task.desc, date: task.date, status: 'pause' };
      let updRow = { name: task.name, desc: task.desc, date: task.date, status: task.status };

      if (task.key) {
        this.db.list(this.PATH)
          .update(task.key, updRow)
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push(newRow)
          .then(() => resolve());
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
