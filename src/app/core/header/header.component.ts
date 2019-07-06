import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showButton = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  /**
   * Shows the log out button if the user is not in the login page
   * @param         event RouterEvent
   * @return        void
   * @author        Babie Entoma
   */
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      if (event.url === '/login') {
        setTimeout(() => {
          this.showButton = false;
        });
      } else {
        setTimeout(() => {
          this.showButton = true;
        });
      }
    }
  }

  ngOnInit() { }

  logout() {
    this.authService.logout();
  }

}
