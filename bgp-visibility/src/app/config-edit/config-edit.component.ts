import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-config-edit',
  templateUrl: './config-edit.component.html',
  styleUrls: ['./config-edit.component.css']
})
export class ConfigEditComponent implements OnInit {
  @Output() eventCreated = new EventEmitter<string>();
  prefixList = [];
  prefix = '';

  constructor() { }

  ngOnInit(): void {
  }

  onClickAddPrefix() {
    this.prefixList.push(this.prefix);
    this.eventCreated.emit('Created ' + this.prefix);
    console.log('output:' + this.prefix);
  }

}
