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
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css'],
})
export class CreateCuponComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  TitleForm: string = 'Crear Cupon';
  categorys: any;
  Submitted: false;
  CuponForm: FormGroup;
  IsCreate: boolean = true;
  CallCupon: any;
  previewImage

  constructor(
    private gService: GenericService,
    private miscService: MiscService,
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) {
    this.getCategorys();
    this.reactiveForm()
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  getCategorys() {
    this.gService
      .list('category')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.categorys = data.Data;
      });
  }

  reactiveForm() {

    this.CuponForm= this.fb.group({
      id:[null,null],
      Name: [null, Validators.compose([Validators.required])],
      Description: [null, Validators.compose([Validators.required])],
      Price: [null, Validators.compose([Validators.required])],
      ValidateDateBegin:[null, Validators.compose([Validators.required])],
      ValiteDateFinish: [null, Validators.compose([Validators.required])],
      Qr: [null, Validators.compose([Validators.required])],
      Categorias:[null,null]
    })
  }

  public errorHandling = (control: string, error: string) => {
  //  return this.MaterialForm.controls[control].hasError(error);
  };

  handleFileInput(event: any) {
    this.previewImage = event.target.files[0];

    console.log('FILE IN HANDLE', this.previewImage);
    if (this.previewImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // e.target.result contiene la URL de la imagen
        let eve = e.target.result;
      };
      reader.readAsDataURL(this.previewImage); // Esto lee el archivo como una URL base64
    }
  }

  submitForm(){

   console.log('VALOR PRE POST', this.CuponForm.value
   )


  }
}
