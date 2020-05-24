import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/firestore-db.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService, private dbService: DatabaseService) { }

  user: User = new User;

  ngOnInit() {
  }
}
