import { Component, OnInit, NgModule } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';


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
  callCent: any;
  Submitted: false;
  CenterForm: FormGroup;
  IdMaterial: number =0;
  IsCreate: boolean=true;
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
    this.listUser()
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params)=>{
      this.IdMaterial=params['Id'];
      if(this.IdMaterial != undefined && !isNaN(Number(this.IdMaterial))){
          this.IsCreate=false;
          this.TitleForm= 'Actualizar Material';
          //call al api
          this.gService
          .get('center', this.IdMaterial)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any)=>{
            this.centerInfo=data.Data;
            console.log('Api return data',this.centerInfo)
            console.log('DATA COMBO',this.centerInfo.Materials.map(({Id})=>Id))
            //Precargar los datos en el formulario
            this.CenterForm.setValue({
              id:this.centerInfo.Id,
              Name:this.centerInfo.Name,
              Provincia:this.centerInfo.Provincia,
              Canton:this.centerInfo.Canton,
              Distrito:this.centerInfo.Distrito,
              Numero:this.centerInfo.Numero,
              Email:this.centerInfo.Email,
              Schecudale:this.centerInfo.Schecudale,
              Materials: this.centerInfo.Materials.map(({Id})=>Id),
              User: this.centerInfo.User,          
          })
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
    User:[null,Validators.compose([Validators.required])]
    //Center:[null,Validators.required]
    })

  }

  submitM(): void{
    let MaterialFormat: any= this.CenterForm.get("Materials").value.map((x:any)=>({['Id']:x}))
    this.CenterForm.patchValue({Materials:MaterialFormat})
    console.log('FORM DATA',this.CenterForm.value);

    if(this.IsCreate){
      
      this.gService
        .create('center',this.CenterForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          //Obtener respuesta
          this.callCent=data.Data;
          console.log('CALLBACK API', this.callCent);
          /* this.notify.mensajeRedirect('Crear Centro',
              `Centro creado: ${data.Data.Name}`,
              TipoMessage.success,
              '/videojuego/all');
          this.router.navigate(['/videojuego/all'])  */
        }) 
      }else{
      this.gService
      .update('center',this.CenterForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        //Obtener respuesta
        this.callCent=data;
        console.log('CALLBACK API', this.callCent);

         /* this.notify.mensajeRedirect('Actualizar Videojuego',
            `Videojuego actualizado: ${data.nombre}`,
            TipoMessage.success,
            '/videojuego/all');
        this.router.navigate(['/videojuego/all'])  */
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
