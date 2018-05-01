import { Component } from '@angular/core';
import { Loading, LoadingController, AlertController, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from "../login/login";
import { AddTaskPage } from "../add-task/add-task";
import {TaskProvider} from "../../providers/task/task";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public loading: Loading;
  tasks: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private provider: TaskProvider,) {

    this.tasks = this.provider.getAll();
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

}
