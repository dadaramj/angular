import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: Observable<any>
  constructor(private us: UserService) {

    this.users = this.us.getUsers()
  }


  username: string
  ngOnInit(): void {
    this.username = sessionStorage.getItem('username')
  }
}