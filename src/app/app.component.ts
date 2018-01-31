import { Component } from '@angular/core';
// ng2-toasty
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
// Inject AngularFirestore
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface NOTIFICATIONS {
    ngtitle:string;
    ngmsj:string;
    id?:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private notificacionsDoc: AngularFirestoreDocument<NOTIFICATIONS>;
  notification: Observable<NOTIFICATIONS>;

  constructor(private afs:AngularFirestore, private toastyService:ToastyService) {

    this.notificacionsDoc = afs.doc<NOTIFICATIONS>('notifications/rjywFN58Rlm1qX1vZD2k');
    this.notification = this.notificacionsDoc.valueChanges();
    this.notification.subscribe(
      ( x:any) =>
        {
          this.lanzarNotificacion(x);
        }
      );
  }

  lanzarNotificacion(x){
    // Or create the instance of ToastOptions
      var toastOptions:ToastOptions = {
        title: x.title,
        msg:x.msj,
        showClose: true,
        timeout: 10000,
        theme: 'default'
      };
      // Add see all possible types in one shot
      this.toastyService.success(toastOptions);
  }

}
