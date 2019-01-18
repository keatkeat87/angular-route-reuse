import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('product init');
  }

  onDetach() {
    console.log('product detach');
  }
  onAttach() {
    console.log('product attach');
  }

  ngOnDestroy(){
    console.log('product destroy')
  }

}
