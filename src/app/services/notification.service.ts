import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationWindowComponent } from '../components/notifications/notification-window/notification-window.component';
import { NotificationQueryComponent } from '../components/notifications/notification-query/notification-query.component';
import { Observable } from 'rxjs';
import { ImageDisplayComponent } from '../components/notifications/image-display/image-display.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  WIDTH = '400px';

  constructor(private dialog: MatDialog) {
  }

  public notify(message: string) {
    setTimeout(() => {
      this.dialog.open(NotificationWindowComponent, { data: { message }, width: this.WIDTH })
    }, 1);
  }

  public query(query): Observable<any> {
    const dialogref = this.dialog.open(NotificationQueryComponent, { data: query, width: this.WIDTH })

    return dialogref.afterClosed()
  }

  public showBigImage(imgUrl: string) {
    setTimeout(() => {
      this.dialog.open(ImageDisplayComponent, { data: { imgUrl }, width: "75%", height: "fit-content" })
    }, 1);
  }

}