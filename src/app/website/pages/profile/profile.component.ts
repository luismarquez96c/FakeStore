import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/user.model';
import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

}
