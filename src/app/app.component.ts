import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'spring-security-ui';

  userrole: Observable<String>
  constructor(private as: AuthenticationService,
    private router: Router) {

    this.userrole = this.as.userrole
  }




  logout() {
    this.as.logOut()
    this.router.navigateByUrl('login')
  }
}
