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
  }

  ngOnInit(): void {

  }

  reactiveForm(){


  }

  submitM(){}

  listMaterials(){
    this.gService
    .list('material')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      console.log('Call back',data);
      this.MateList = data.Data;
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.CenterForm.controls[control].hasError(error);
  };
  

}
