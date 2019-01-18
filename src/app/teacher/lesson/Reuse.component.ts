import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


export class ReuseComponent implements OnDestroy {

    componentName: string;
    onDetach() {
        console.log(this.componentName + 'detach');
    }
    onAttach() {
        console.log(this.componentName + 'attach');
    }
    ngOnDestroy() {
        console.log(this.componentName + 'destroy');
    }
}
