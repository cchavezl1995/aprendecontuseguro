import { Component, OnInit } from '@angular/core';
import{Router, NavigationEnd} from '@angular/router';
import { Idle } from 'idlejs/dist';
import { LoginService } from "./services/login.service";
import { environment } from "../environments/environment";
import { filter } from 'rxjs/operators';
import { Token } from "./services/token";
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cardif';
  analytics = environment.analytics;

  constructor(public router: Router, public login: LoginService, public token: Token){
    // Google Tag Manager
    // const script = document.createElement('script');
    // script.async = true;
    // script.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.analytics;
    // document.head.prepend(script);

    // const navEndEvent$ = router.events.pipe(
    //   filter(e => e instanceof NavigationEnd)
    // );
    // navEndEvent$.subscribe((e: NavigationEnd) => {
    //   gtag('config', `${this.analytics}`, {'page_path':e.urlAfterRedirects});
    // });

    // console.log('Script: '+document.head.textContent);
    
    // console.log('Google Analytics ID: ', `${this.analytics}`);
    



    // Configuración para cerrar sesión por inactividad
    const idle = new Idle()
    .whenNotInteractive()
    .within(60)
    .do(() => {
      if (this.login.isActive()) {
        this.login.logOut();
        document.getElementById('btnModalTime').click();
      }
    }).start();
}

  ngOnInit(){
    if (this.token.isTokenExpired()) {
      this.login.logOut();
      document.getElementById('btnModalTime').click();
    }
  }

}
