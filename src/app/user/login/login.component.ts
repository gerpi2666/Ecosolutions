import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  currentUser: any;
  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private noti: NotificacionService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.reactiveForm();
  }
  // Definir el formulario con su reglas de validación
  reactiveForm() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  onReset() {
    this.formulario.reset();
  }
  submitForm() {
    this.makeSubmit = true;
    //Validación
    if (this.formulario.invalid) {
      return;
    }
    console.log('Data login', this.formulario.value);
    //Login API
    this.authService.loginUser(this.formulario.value).subscribe({
      next: (respuesta: any) => {
        console.log(respuesta);
        this.authService.decodeToken.subscribe(
          (user: any) => (this.currentUser = user)
        );
    
        if (this.currentUser.roleId === 2) {
          this.noti.mensajeRedirect(
            'Usuario',
            'Usuario logueado ',
            TipoMessage.success,
            'Dash/user/profile'
          );
    
          this.router.navigate(['Dash/user/profile']);
        }
      },
      error: (error) => {
        this.noti.mensaje(
          'Error',
          'Verificar credenciales ',
          TipoMessage.error
        );
      },
    });

   
  }

  /* Manejar errores de formulario en Angular */

  register() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      IdCupon: 1,
    };
    this.dialog.open(RegisterComponent, dialogConfig);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}
