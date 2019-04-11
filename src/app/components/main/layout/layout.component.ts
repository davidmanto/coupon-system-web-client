import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  notAtTop: boolean = false;

  ngOnInit() {
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll($event) {
  //   this.notAtTop = document.scrollingElement.scrollTop > 50;
  // }
}
