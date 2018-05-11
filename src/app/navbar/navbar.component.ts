import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  id: number;

  constructor( private _router: Router){ 
    //this.id= 1;
  }

  ngOnInit() {
    let href= window.location.pathname; 
    
    if( href=== '/' ){
      this.id= 1;
    }else if( href=== '/playlist' ){
      this.id= 2;
    }else if( href=== '/channel' ){
      this.id= 3;
    }else if( href=== '/tutorial' ){
      this.id= 4;
    }else if( href=== '/terms-of-use' ){
      this.id= 5;
    }else{
      this.id= 6;
    }
  }

  clicked( id ){
    this.id= id;
  }

}
