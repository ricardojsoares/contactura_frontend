import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Authentication } from '../model';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  authentication: Authentication;
  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem('username');
    localStorage.removeItem('password');

    document.querySelector('html').style.background = 'linear-gradient(to right, rgba(255,0,0,0), rgba(0,0,255,1))';
  }

  ngOnDestroy(): void{
    document.querySelector('html').style.background = 'none';
  }

  login(){
    this.authentication = this.loginForm.value;
    if (this.loginForm.valid) {
        this.loginService.authenticate(this.authentication).subscribe(
          data => {
            localStorage.setItem('token', data);
            localStorage.setItem('username', this.authentication.username);
            localStorage.setItem('password', this.authentication.password);
            localStorage.setItem('admin', 'true');
            this.router.navigate(['/contact_list']);
          }
        );
    }else{
      Swal.fire({
        title: 'Ooops!',
        text: 'Preencha todos os campos',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  }

}
