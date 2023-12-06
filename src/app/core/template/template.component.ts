import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from '../../share/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  currentUser: any;

  constructor(
    private router: Router,
    
    private authService: AuthenticationService) {      
      
  }

  ngOnInit(): void {
    this. authService.decodeToken.subscribe((user:any)=>(
      this.currentUser=user
    ))
   
  }

;

  
}
