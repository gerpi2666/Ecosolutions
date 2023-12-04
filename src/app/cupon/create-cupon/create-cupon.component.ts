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
export class CreateCuponComponent implements OnInit  {
  destroy$: Subject<boolean> = new Subject<boolean>();
  TitleForm: string = 'Crear Cupon';
  categorys: any;
  Submitted: false;
  CuponForm: FormGroup;
  IsCreate: boolean = true;
  CallCupon: any;
  IdCupon: number =0
  CuponInfo: any
  previewImage

  constructor(
    private gService: GenericService,
    private miscService: MiscService,
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private notify: NotificacionService
  ) {
    this.getCategorys();
    this.reactiveForm()
  }
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.IdCupon = params['Id'];
      if (this.IdCupon != undefined && !isNaN(Number(this.IdCupon))) {
        this.IsCreate = false;
        this.TitleForm = 'Actualizar Material';
        //call al api
        this.gService
          .get('cupon', this.IdCupon)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.CuponInfo = data.Data;
            console.log('Api return data', this.CuponInfo);
          
            //Precargar los datos en el formulario
            this.CuponForm.setValue({
              id: this.CuponInfo.Id,
              Name: this.CuponInfo.Name,
              Description: this.CuponInfo.Description,
              Price: this.CuponInfo.Price,
              ValidateDateBegin: this.CuponInfo.ValidateDateBegin,
              ValidateDateFinish: this.CuponInfo.ValidateDateFinish,
              Categoria: this.CuponInfo.Category[0].Id
            });
          });
      }
    });
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
      ValidateDateFinish: [null, Validators.compose([Validators.required])],
      
      Categoria:[null,null]
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

  InsertImage(Image: any) {
    this.gService
      .create('img', Image)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {});
  }
  
  submitForm(){



    const formData = new FormData();
    formData.append('Name', this.CuponForm.value.Name);
    formData.append('Image', this.previewImage);

    this.InsertImage(formData);
  
    if (this.IsCreate) {
      this.gService
        .create('cupon', this.CuponForm.value)
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
        .update('cupon', this.CuponForm.value)
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
}
