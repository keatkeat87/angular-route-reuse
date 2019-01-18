import { Component, OnInit } from '@angular/core';
import { ReuseComponent } from '../../Reuse.component';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent extends ReuseComponent  implements OnInit {

  constructor() {
    super();
    this.componentName = 'MoreComponent';
   }

  ngOnInit() {
    console.log('MoreComponent Init');
  }

}
