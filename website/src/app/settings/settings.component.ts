import { Component, OnInit } from '@angular/core';
import { Settings } from './settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings = new Settings('Peter', 'Moorey', 'petermoorey@gmail.com');

  constructor() { }

  ngOnInit(): void {
  }

}
