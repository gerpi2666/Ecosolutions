import { Component, OnInit, NgModule } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { UserGuard } from '../../share/auth.guard';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateCenterComponent implements OnInit{
  destroy$: Subject<boolean> = new Subject<boolean>();
  TitleForm: string='Crear Centro de acopio';
  MateList: any;
  UserList:any
  centerInfo:any;
  userAdminCenterCurrent
  callCent: any;
  Submitted: false;
  CenterForm: FormGroup;
  IdMaterial: number =0;
  IsCreate: boolean=true;
  User
  expreRegula=  /^-?\d*[.,]?\d{0,2}$/;

  constructor(

    private fb:FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private notify:NotificacionService

  ){
    this.reactiveForm()
    this.listMaterials()
    //this.listUser()
  }

  ngOnInit(): void {
    this.listUser()
    this.activeRouter.params.subscribe((params: Params)=>{
      this.IdMaterial=params['Id'];
      if(this.IdMaterial != undefined && !isNaN(Number(this.IdMaterial))){
          this.IsCreate=false;
         
          this.TitleForm= 'Actualizar Material';
          //call al api
          this.listUser()
         
          this.gService
          .get('center', this.IdMaterial)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any)=>{
            this.centerInfo=data.Data;
           
            console.log('Api return data',this.centerInfo)
            this.userAdminCenterCurrent= this.centerInfo.User

            //Precargar los datos en el formulario
            this.UserList.find(user => user.Id === this.centerInfo.UserAdmin);
            console.log('lISTA DE USUSARIOS', this.UserList)
            this.CenterForm.setValue({
              UsuarioCurrent:this.userAdminCenterCurrent.Name,
              id:this.centerInfo.Id,
              Name:this.centerInfo.Name,
              Provincia:this.centerInfo.Provincia,
              Canton:this.centerInfo.Canton,
              Distrito:this.centerInfo.Distrito,
              Numero:this.centerInfo.Numero,
              Email:this.centerInfo.Email,
              Schecudale:this.centerInfo.Schecudale,
              Materials: this.centerInfo.Materials.map(({Id})=>Id),
              User: this.centerInfo.User.Id,
          })
          console.log('USER CURRENT', this.userAdminCenterCurrent)
         })

       
      }
    })
  
  }

  reactiveForm(){
    this.CenterForm= this.fb.group({
    
    id:[null,null],
    Name:[null,Validators.compose([Validators.required])],
    Provincia:[null,Validators.compose([Validators.required])],
    Canton:[null, Validators.compose([Validators.required])],
    Distrito:[null,Validators.compose([Validators.required])],
    Numero:[null,Validators.compose([Validators.required])],
    Email:[null,Validators.compose([Validators.required,])],
    Schecudale:[null,Validators.compose([Validators.required])],
    Materials:[null,Validators.compose([Validators.required])],
    User:[null,Validators.compose([Validators.required])],
    UsuarioCurrent: { value: null, disabled: true }
    //Center:[null,Validators.required]
    })

  }

  submitM(): void{
    
    let MaterialFormat: any= this.CenterForm.get("Materials").value.map((x:any)=>({['Id']:x}))
    this.CenterForm.patchValue({Materials:MaterialFormat})
    

    const formData = { ...this.CenterForm.value };
    formData.UserAdmin= formData.User==this.centerInfo.User.Id? this.userAdminCenterCurrent.Id: formData.User ;//
    formData.Enabled=true;
    console.log('FORM DATA',formData);
    
    if(this.IsCreate){
      
      this.gService
        .create('center',formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          //Obtener respuesta
          this.callCent=data;
          console.log('CALLBACK API', this.callCent);
          this.notify.mensaje('Crear Centro',`Centro creado: ${data.Data.Name}`,TipoMessage.success);
          this.router.navigate(['/Dash/center'])  
        }) 
      }else{
        console.log('Form data update',formData)
      this.gService
      
      .update('center',formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        //Obtener respuesta
        this.callCent=data;
        console.log('CALLBACK API', this.callCent);
        this.notify.mensaje('Actualizacion',`Centro Actualizado: ${data.Data.Name}`,TipoMessage.success);
        this.router.navigate(['/Dash/center'])  
        
      })
      } 

  }

  listUser(){
    this.gService
    .list('user/center')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.UserList = data.Data;
    });
  }

  listMaterials(){
    this.gService
    .list('material')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.MateList = data.Data;
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.CenterForm.controls[control].hasError(error);
  };
  

}
