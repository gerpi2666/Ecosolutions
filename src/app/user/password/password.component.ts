import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Subject, takeUntil } from 'rxjs';

import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GenericService } from '../../share/generic.service';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();

  UserForm: FormGroup;
  TitleForm: string = 'Modificacion de credenciales';
  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private noti: NotificacionService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private gService: GenericService,
  ) {
    this.reactiveForm();
  }

  public errorHandling = (control: string, error: string) => {
     return this.UserForm.controls[control].hasError(error);
  };


  reactiveForm() {
    this.UserForm= this.fb.group({
     id:[null,null],
     Email: [null, Validators.compose([Validators.required])],      
     Password: [null, Validators.compose([Validators.required])],
     NewPassword: [null, Validators.compose([Validators.required])],
   })
 }

 submitForm(){
  console.log('DATA PREPOST',this.UserForm.value)
  this.gService
  .create('user/pass', this.UserForm.value)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
    //Obtener respuesta
   
    console.log('CALLBACK API', data);
    if(data.Data=='Credenciales cambiadas correctamente'){
      this.noti.mensaje(
        'Cambiar contraseña',
        ` ${data.Data}`,
        TipoMessage.success
      );
      this.router.navigate(['/Dash/user/profile']);
    }else{
      this.noti.mensaje(
        'Error al cambiar las credenciales',
        ` ${data.Data}`,
        TipoMessage.error
      );
    }
    //this.router.navigate(['/Dash/material']);
  });
 }

 
}
