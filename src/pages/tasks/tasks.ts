import { Component } from '@angular/core';
import {AlertController, Loading, LoadingController, MenuController, NavController,} from 'ionic-angular';
import { AddTaskPage } from "../add-task/add-task";
import { TaskDetailPage } from "../task-detail/task-detail";
import { LoginPage } from "../login/login";
import { AuthProvider } from "../../providers/auth/auth";
import { TaskProvider } from "../../providers/task/task";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})

export class TasksPage {

  public tasks: Observable<any>;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private provider: TaskProvider,
    private menuCtrl: MenuController) {

    this.tasks = this.provider.getAll();
  }

  openMenu() {
    this.menuCtrl.open();
  }

  logout() {
    this.authProvider.logoutUser().then( authData => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot(LoginPage);
      });
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  goToAddTask() {
    this.navCtrl.push(AddTaskPage);
  }

  goToDetailTask(key, date, name, desc, status) {
    let task = {
      key: key,
      date: date,
      name: name,
      desc: desc,
      status: status
    };
    this.navCtrl.push(TaskDetailPage, task);
  };

  changeStatus (key: string, name: string, desc: string, date, status) {
    let task = {
      key: key,
      date: date,
      name: name,
      desc: desc,
      status: status
    };

    this.provider.save(task).then(() => {

    }).catch((e) => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        message: e.message,
        buttons: [{text: "Ok", role: 'cancel' }]
      });
      alert.present();
    });
  }

}
