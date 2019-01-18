import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('contact init');
  }

  onDetach() {
    console.log('contact detach');
  }
  onAttach() {
    console.log('contact attach');
  }

  ngOnDestroy(){
    console.log('contact destroy')
  }

}
