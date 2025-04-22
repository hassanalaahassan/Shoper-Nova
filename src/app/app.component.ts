import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  imports:[RouterOutlet],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  cachedTitle: string = '';

  constructor(private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.listenTitle()
  }

  private listenTitle():void{
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // فقط NavigationEnd
    ).subscribe(() => {
      const routeTitle = this.getRouteTitle(this.router.routerState.snapshot.root);
      if (routeTitle !== this.cachedTitle) {
        this.cachedTitle = routeTitle;
        this.titleService.setTitle(`ShoperNova | ${routeTitle}`);
      }
    });
  }

  private getRouteTitle(routeSnapshot:any): string {
    let title = routeSnapshot.data?.['title'] || '';
    if (routeSnapshot.firstChild) {
      title = this.getRouteTitle(routeSnapshot.firstChild);
    }
    return title;
  }
}
