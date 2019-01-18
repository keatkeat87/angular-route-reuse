import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  private sub : Subscription = new Subscription();
  constructor(
    private router: Router, private viewportScroller: ViewportScroller,
    private activatedRoute : ActivatedRoute
  ) { 
  
  }

  ngOnInit() {
    console.log('about init', { name: '1' });
    // this.activatedRoute.paramMap.subscribe(p => {
    //   console.log('change', p.get('Id')); 
    // });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
