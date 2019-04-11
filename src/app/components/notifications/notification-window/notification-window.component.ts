import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-window',
  templateUrl: './notification-window.component.html',
  styleUrls: ['./notification-window.component.scss']
})
export class NotificationWindowComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<NotificationWindowComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  close(){
    this.matDialogRef.close();
  }
}
