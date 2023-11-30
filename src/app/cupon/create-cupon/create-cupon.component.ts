import { GenericService } from '../../share/generic.service';
import { MiscService } from '../../share/misc.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css'],
})
export class CreateCuponComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  TitleForm: string = 'Crear Material';
  categorys: any;
  Submitted: false;
  CuponForm: FormGroup;
  IsCreate: boolean = true;
  CallCupon: any;


  constructor(
    private gService: GenericService,
    private miscService: MiscService,
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) {
    this.getCategorys();
  }

  getCategorys() {
    this.gService
      .list('category')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.categorys = data.Data;
      });
  }

  reactiveForm() {}

  submitForm(){

   


  }
}
