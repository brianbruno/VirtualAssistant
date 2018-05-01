import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { ResetPasswordPage } from "../pages/reset-password/reset-password";
import { AddTaskPage } from "../pages/add-task/add-task";

import { TaskProvider } from '../providers/task/task';

import { Push, } from "@ionic-native/push";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    AddTaskPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAwslrcRdvJvIc0t38BcP4OR1y0PaDHSs0",
      authDomain: "virtualassistant-brian.firebaseapp.com",
      databaseURL: "https://virtualassistant-brian.firebaseio.com",
      projectId: "virtualassistant-brian",
      storageBucket: "virtualassistant-brian.appspot.com",
      messagingSenderId: "856854863675"
    }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    AddTaskPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    TaskProvider,
  ]
})
export class AppModule {}
