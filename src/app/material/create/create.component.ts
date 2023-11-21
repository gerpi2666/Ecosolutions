import { Component, OnInit, NgModule } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{

  destroy$: Subject<boolean> = new Subject<boolean>();
  TitleForm: string='Crear Material';
  CenterList: any;
  MaterialInfo:any;
  CallMat: any;
  Submitted: false;
  MaterialForm: FormGroup;
  IdMaterial: number =0;
  previewImage :any;
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
   
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params)=>{
      this.IdMaterial=params['Id'];
      if(this.IdMaterial != undefined && !isNaN(Number(this.IdMaterial))){
          this.IsCreate=false;
          this.TitleForm= 'Actualizar Material';
          //call al api
          this.gService
          .get('material', this.IdMaterial)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any)=>{
            this.MaterialInfo=data.Data;
            console.log('Api return data',this.MaterialInfo)
            console.log('DATA COMBO',this.MaterialInfo.RecicleCenter.map(({Id})=>Id))
            //Precargar los datos en el formulario
            this.MaterialForm.setValue({
              id: this.MaterialInfo.Id,
              Name: this.MaterialInfo.Name,
              Description: this.MaterialInfo.Description,
              Color: this.MaterialInfo.Color,
              Unit: this.MaterialInfo.Unit,
              Price: this.MaterialInfo.Price,
              Imagen: '',
              Center: this.MaterialInfo.RecicleCenter.map(({Id})=>Id),
            })
          })
      }
    })
  }

  reactiveForm(){
  this.MaterialForm=this.fb.group({
    id:[null,null],
    Name:[null,Validators.compose([Validators.required])],
    Description:[null,Validators.compose([Validators.required])],
    Color:[null, Validators.compose([Validators.required])],
    Imagen:[null,Validators.compose([Validators.required])],
    Unit:[null,Validators.compose([Validators.required])],
    Price:[null,Validators.compose([Validators.required,Validators.pattern(this.expreRegula)])],
    Center:[null,Validators.required]

  })
  }

  // Dentro de tu componente de Angular
  handleFileInput(event: any) {
    this.previewImage = event.target.files[0];

    console.log('FILE IN HANDLE',this.previewImage)
    if (this.previewImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // e.target.result contiene la URL de la imagen
        let eve=e.target.result;
      };
      reader.readAsDataURL(this.previewImage); // Esto lee el archivo como una URL base64
    }
  }


  InsertImage(Image:any){
    this.gService
    .create('img',Image)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      
      
    });
  }

  discard(){
    this.router.navigate(['Dash/material'])
  }

  submitM(): void{
    
    /* let centerFormat: any= this.MaterialForm.get("Center").value.map((x:any)=>({['Id']:x}))
    this.MaterialForm.patchValue({Center:centerFormat}) */
    console.log('FORM DATA',this.MaterialForm.value);
    
    const formData = new FormData();
    formData.append('Name', this.MaterialForm.value.Name);
    formData.append('Image', this.previewImage);

    this.InsertImage(formData)

    if(this.IsCreate){
      
      this.gService
        .create('material',this.MaterialForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          //Obtener respuesta
          this.CallMat=data;
          console.log('CALLBACK API', this.CallMat);
          this.notify.mensajeRedirect('Crear Material',
              `Material creado: ${data.Data.Name}`,
              TipoMessage.success,
              '/Dash/material');
          this.router.navigate(['/Dash/material']) 
        }) 
      }else{
      this.gService
      .update('material',this.MaterialForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        //Obtener respuesta
        this.CallMat=data;
        console.log('CALLBACK API', this.CallMat);
        this.notify.mensajeRedirect('Actualizar Material',
        `Material Actualizado: ${data.Data.Name}`,
        TipoMessage.success,
        '/Dash/material');
    this.router.navigate(['/Dash/material']) 
      })
      } 

  }

  public errorHandling = (control: string, error: string) => {
  return this.MaterialForm.controls[control].hasError(error);
  };




}
