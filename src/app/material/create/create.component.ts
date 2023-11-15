import { Component, OnInit, NgModule } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';


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
  IsCreate: boolean=true;
  expreRegula=  /^-?\d*[.,]?\d{0,2}$/;

  constructor(

    private fb:FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute

  ){
    this.reactiveForm()
    this.listCenters()
  }

  ngOnInit(): void {
  
  }

  reactiveForm(){
  this.MaterialForm=this.fb.group({
    id:[null,null],
    Name:[null,Validators.compose([Validators.required])],
    Description:[null,Validators.compose([Validators.required])],
    Color:[null, Validators.compose([Validators.required])],
    Unit:[null,Validators.compose([Validators.required])],
    Price:[null,Validators.compose([Validators.required,Validators.pattern(this.expreRegula)])],
    Center:[null,Validators.required]

  })
  }

  submitM(): void{
    
    let centerFormat: any= this.MaterialForm.get("Center").value.map((x:any)=>({['Id']:x}))
    this.MaterialForm.patchValue({Center:centerFormat})
    console.log('FORM DATA',this.MaterialForm.value)
  }

  public errorHandling = (control: string, error: string) => {
  return this.MaterialForm.controls[control].hasError(error);
  };

  listCenters(){
    this.gService
    .list('center')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      console.log('Call back',data);
      this.CenterList = data.Data;
    });
  }


}
