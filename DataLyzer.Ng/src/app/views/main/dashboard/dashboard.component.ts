import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [`dashboard.component.scss`]
  })
  export class DashboardComponent {

    constructor(
      private store: Store
    ) {}
  
    
  
  } 
