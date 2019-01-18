import { Component, OnInit } from '@angular/core';
import { ReuseComponent } from '../../Reuse.component';

@Component({
  selector: 'app-paper-tab',
  templateUrl: './paper-tab.component.html',
  styleUrls: ['./paper-tab.component.scss']
})
export class PaperTabComponent extends ReuseComponent implements OnInit {

  constructor() {
    super();
    this.componentName = 'PaperTabComponent';
   }

  ngOnInit() {
    console.log('PaperTabComponent Init');
  }

}
