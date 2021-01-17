import { Injectable } from '@angular/core';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _noficationSubject: Subject<NotificationMessage> = new Subject<NotificationMessage>();

  constructor(private _toastService: ToastrService){
    this.initSubject();
  }

  sendMessage(message: NotificationMessage): void{
    console.log("oi");
    this._noficationSubject.next(message);
  }

  private initSubject(): void{
    this._noficationSubject.subscribe(notification => {
      switch(notification.type){
        case NotificationType.success: 
          this._toastService.success(notification.message);
          break;
        case NotificationType.error: 
          this._toastService.error(notification.message);
          break;
        case NotificationType.warning: 
          this._toastService.warning(notification.message);
          break; 
        case NotificationType.info: 
          this._toastService.info(notification.message);
          break;
        default: 
        case NotificationType.info: 
          this._toastService.info(notification.message);
          break;
      }
    },error => {
      console.log("Something went wrong with the notification");
    });
  }
}
