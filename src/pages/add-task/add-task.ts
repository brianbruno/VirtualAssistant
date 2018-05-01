import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController,} from 'ionic-angular';
import {TaskProvider} from "../../providers/task/task";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the AddTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})

export class AddTaskPage {

  form: FormGroup;
  task: any;


  constructor(private provider: TaskProvider, private formBuilder: FormBuilder,
              private toast: ToastController, public navCtrl: NavController,) {

    this.task = {};
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [this.task.name, Validators.required],
      desc: [this.task.desc, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Tarefa salva com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar a tarefa.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }



}
