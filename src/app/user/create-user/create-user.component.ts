import { GenericService } from '../../share/generic.service';
import { MiscService } from '../../share/misc.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  TitleForm: string = 'Creación de usuarios administradores de centros';
  roles: any;
  Submitted: false;
  UserForm: FormGroup;
  IsCreate: boolean = true;
  CallUser: any;
  IdUser: number = 0;
  UserInfo: any;
  previewImage;

  constructor(
    private gService: GenericService,
    private miscService: MiscService,
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private notify: NotificacionService
  ) {
   
    this.reactiveForm();
  }
  
  ngOnInit(): void {

    this.activeRouter.params.subscribe((params: Params) => {
      this.IdUser = params['Id'];
      if (this.IdUser != undefined && !isNaN(Number(this.IdUser))) {
        this.IsCreate = false;
        this.TitleForm = 'Actualizar Material';
        //call al api
        this.gService
          .get('user', this.IdUser)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.UserInfo = data.Data;
            console.log('Api return data', this.UserInfo);
          
            //Precargar los datos en el formulario
            this.UserForm.setValue({
              id: this.UserInfo.Id,
              Name: this.UserInfo.Name,
              Identification: this.UserInfo.Identification,
              Email: this.UserInfo.Email,
              Direccion: this.UserInfo.Direccion,
              Number: this.UserInfo.Number,
              Enabled:this.UserInfo.Enabled,
              Password:""
            });
          });
      }
    });

  }



  reactiveForm() {
     this.UserForm= this.fb.group({
      id:[null,null],
      Identification: [null, Validators.compose([Validators.required])],
      Email: [null, Validators.compose([Validators.required])],
      Name: [null, Validators.compose([Validators.required])],
      Direccion : [null, Validators.compose([Validators.required])],
      Number : [null, Validators.compose([Validators.required])],
      Enabled: [null, Validators.compose([Validators.required])],
      Password: [null, Validators.compose([Validators.required])]
    })
  }

  public errorHandling = (control: string, error: string) => {
    //  return this.MaterialForm.controls[control].hasError(error);
  };

  submitForm(){

    console.log('DATA PRE POST', this.UserForm.value)
    
    if (this.IsCreate) {
      this.gService
        .create('user', this.UserForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
         
          console.log('CALLBACK API', data);
          this.notify.mensajeRedirect(
            'Crear Cupon',
            `Cupon  creado: ${data.Data.Name}`,
            TipoMessage.success,
            '/Dash/cupon'
          );
          //this.router.navigate(['/Dash/material']);
        });
    } else {
      this.gService
        .update('user', this.UserForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          
          console.log('CALLBACK API', data);
          this.notify.mensajeRedirect(
            'Actualizar cupon',
            `Cupon Actualizado: ${data.Data.Name}`,
            TipoMessage.success,
            '/Dash/cupon'
          );
          this.router.navigate(['/Dash/cupon']);
        });
    }

   
  }

  discard(){

  }


}
