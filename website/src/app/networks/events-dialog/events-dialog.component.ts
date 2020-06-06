import { Component, OnInit, Inject } from '@angular/core';
import { Event } from '../../models/event.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-network-dialog',
  templateUrl: './events-dialog.component.html',
  styleUrls: ['./events-dialog.component.css']
})
export class NetworkDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  stringToDict(object: string){
    return JSON.parse(object);
  }

}
