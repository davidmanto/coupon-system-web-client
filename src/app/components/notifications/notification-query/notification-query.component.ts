import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-query',
  templateUrl: './notification-query.component.html',
  styleUrls: ['./notification-query.component.scss']
})
export class NotificationQueryComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<NotificationQueryComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancel(){
    this.matDialogRef.close();
  }

  ngOnInit() {
  }

}
