import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
variable:any
  constructor() { }

  isLogin = new BehaviorSubject<boolean>(this.checkToken());

  private checkToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(): void {
    this.isLogin.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLogin.next(false);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Cierre de sesión exitoso!',
      showConfirmButton: false,
      timer: 1200
    })
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

}
