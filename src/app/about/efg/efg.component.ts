import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouteReuseComponent } from 'src/app/interface';

@Component({
  selector: 'app-efg',
  templateUrl: './efg.component.html',
  styleUrls: ['./efg.component.scss']
})
export class EfgComponent implements OnInit, RouteReuseComponent, OnDestroy  {

  constructor() { }

  ngOnInit() {
    console.log('efg init');
  }

  
  onDetach() {
    console.log('efg detach');
  }
  onAttach() {
    console.log('efg attach');
  }

  ngOnDestroy(){
    console.log('efg destroy')
  }

}
