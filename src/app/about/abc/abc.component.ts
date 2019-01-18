import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouteReuseComponent } from 'src/app/interface';

@Component({
  selector: 'app-abc',
  templateUrl: './abc.component.html',
  styleUrls: ['./abc.component.scss']
})
export class AbcComponent implements OnInit, RouteReuseComponent, OnDestroy {

  constructor() { }

  ngOnInit() {
    console.log('abc init');
  }
  
  onDetach() {
    console.log('abc detach');
  }
  onAttach() {
    console.log('abc attach');
  }

  ngOnDestroy(){
    console.log('abc destroy')
  }
}
