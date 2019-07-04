import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  id: number;
  title: string;

  constructor(private router: Router, private titleService: Title) {
  }

  ngOnInit() {

    let base = ' | uniloadr';

    this.router.events.subscribe(
      e => {
        if (e instanceof NavigationEnd) {
          let href = e.url;

          if (href === '/') {
            this.id = 1;
            this.titleService.setTitle('YouTube Link' + base);
          } else if (href === '/playlist') {
            this.id = 2;
            this.titleService.setTitle('YouTube Playlist' + base);
          } else if (href === '/channel') {
            this.id = 3;
            this.titleService.setTitle('YouTube Channel' + base);
          } else if (href === '/facebook') {
            this.id = 4;
            this.titleService.setTitle('Facebook Link' + base);
          } else if (href === '/vimeo') {
            this.id = 5;
            this.titleService.setTitle('Vimeo' + base);
          } else if (href === '/daily-motion') {
            this.id = 6;
            this.titleService.setTitle('DailyMotion Link' + base);
          } else if (href === '/instagram') {
            this.id = 7;
            this.titleService.setTitle('Instagram Link' + base);
          } else if (href === '/terms-of-use') {
            this.id = 8;
            this.titleService.setTitle('Terms of Use' + base);
          } else if (href === '/contact-us') {
            this.id = 9;
            this.titleService.setTitle('Contact Us' + base);
          }
        }
      }
    );

  }

  clicked(id) {
    this.id = id;
  }

}
