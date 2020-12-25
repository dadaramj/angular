import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private as: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  invalidLogin = false
  username = 'user'
  password = 'user'
  @Input() message = null
  onSubmit(){
    (this.as.authenticate(this.username, this.password).subscribe(
      data => {
        if(data.roles[0] === 'ROLE_USER'){
          this.router.navigate(['user'])
        }
        if(data.roles[0] === 'ROLE_ADMIN'){           
          this.router.navigate(['admin'])
        }
        this.invalidLogin = false
      },
      error => {
        this.message = 'Login failure'
        this.invalidLogin = true
      }
    )
    );
  }
}
