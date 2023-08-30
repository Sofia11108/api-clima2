import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  variable:any = false;

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {

    if (this.form.valid) {
      this.client.postRequest("http://localhost:10101/login",
        {
          email: this.form.value.email,
          password: this.form.value.password
        }, undefined, undefined).subscribe(
          {
            next: (response: any) => {
              localStorage.setItem("token", response.token);
              this.auth.login();
              this.router.navigate(['']);
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Inicio de sesión exitoso!',
                showConfirmButton: false,
                timer: 1200
              })
            },
            error: (error: any) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Credenciales incorrectas!',
              })
            }
          }
        )

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: '¡Por favor complete todos los campos!',
      })
    }

  }

}

