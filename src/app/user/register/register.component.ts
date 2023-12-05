import { GenericService } from '../../share/generic.service';
import { MiscService } from '../../share/misc.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificacionService } from '../../share/notification.service';
import { DialogDetailCuponComponent } from '../../cupon/dialog-detail-cupon/dialog-detail-cupon.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  TitleForm: string = 'Registro de usuario';
  roles: any;
  Submitted: false;
  UserForm: FormGroup;
  IsCreate: boolean = true;
  CallUser: any;
  IdUser: number = 0;
  UserInfo: any;
  previewImage;
  hide = true;


  

  constructor(
    private gService: GenericService,
    private miscService: MiscService,
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private notify: NotificacionService,
  ) {
   
    this.reactiveForm();
  }
  

  reactiveForm() {
    this.UserForm= this.fb.group({
     id:[null,null],
     Identification: [null, Validators.compose([Validators.required])],
     Email: [null, Validators.compose([Validators.required])],
     Name: [null, Validators.compose([Validators.required])],
     Direccion : [null, Validators.compose([Validators.required])],
     Number : [null, Validators.compose([Validators.required])],
     Password: [null, Validators.compose([Validators.required])]
   })
 }

  public errorHandling = (control: string, error: string) => {
    // return this.UserForm.controls[control].hasError(error);
  };



  submitForm(){

    console.log('data pre post', this.UserForm.value)

  }


}
