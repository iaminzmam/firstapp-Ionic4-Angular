import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(
            public afAuth: AngularFireAuth,
            public alertC: AlertController,
            public router: Router,
            public afstore: AngularFirestore,
            public user: UserService
            ) { }

  ngOnInit() {
  }

  async register(){
      const { username, password, cpassword } = this

      if(password !== cpassword){
        this.showAlert('Error!', 'Password dont Match')
          return console.error("Password dont Match")
      }

      try {
         const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@door.com', password)

         this.afstore.doc(`users/${res.user.uid}`).set({
           username
         })

         this.user.setUser({
            username,
            uid: res.user.uid
          })
         this.router.navigate(['/tabs'])

         this.showAlert('Success', 'Welcome Aboard')
         this.router.navigate(['/tabs'])
      } catch (error) {
          console.dir(error)
      }
  }

  async showAlert(header: string, message: string){
      const alert = await this.alertC.create({
        header,
        message,
        buttons: ['Ok']
      })
      await alert.present()
  }

}
