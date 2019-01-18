import { Component, OnInit } from '@angular/core';
import { ReuseComponent } from '../../../Reuse.component';

@Component({
  selector: 'app-paper-detail',
  templateUrl: './paper-detail.component.html',
  styleUrls: ['./paper-detail.component.scss']
})
export class PaperDetailComponent extends ReuseComponent implements OnInit {

  constructor() {
    super();
    this.componentName = 'PaperDetailComponent';
   }

  ngOnInit() {
    
  }

}
