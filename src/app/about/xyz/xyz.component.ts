import { RouteReuseComponent } from '../../interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.scss']
})
export class XyzComponent implements OnInit, RouteReuseComponent, OnDestroy {

  constructor(
   private viewportScroller : ViewportScroller
  ) { }

  ngOnInit() {
    console.log('xyz init');
  }

  onDetach() {
    console.log('xyz detach');
  }
  onAttach() {
    console.log('xyz attach');
  }

  ngOnDestroy(){
    console.log('xyz destroy')
  }
}
