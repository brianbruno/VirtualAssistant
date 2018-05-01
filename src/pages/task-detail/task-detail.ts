import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TaskProvider} from "../../providers/task/task";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the TaskDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {

  public key;
  public name;
  public desc;
  public date;
  public status;
  public task: Observable<any> = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: TaskProvider) {
    this.key = this.navParams.get('key');
    this.name = this.navParams.get('name');
    this.desc = this.navParams.get('desc');
    this.date = this.navParams.get('date');
    this.status = this.navParams.get('status');
  }

  remove() {
    this.provider.remove(this.key);
    this.navCtrl.pop();
  }

}
