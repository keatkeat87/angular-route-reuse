import { Component, OnInit } from '@angular/core';
import { ReuseComponent } from '../../Reuse.component';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent extends ReuseComponent implements OnInit {

  constructor() {
    super();
    this.componentName = 'PapersComponent';
   }

  ngOnInit() {
    console.log('PapersComponent Init');
  }

}
