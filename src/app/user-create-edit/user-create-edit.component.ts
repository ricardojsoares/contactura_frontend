import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model';
import { UserService } from '../service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit {

  user: User = null;
  userForm = new FormGroup({
    id:       new FormControl(''),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name:     new FormControl('', [Validators.required]),
    admin:    new FormControl('', [Validators.required])
  });

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.botaoEdit.subscribe(edit =>{
      if (edit !== null) {
        this.user = edit;
        this.userForm.get('id').setValue(edit.id);
        this.userForm.get('username').setValue(edit.username);
        this.userForm.get('password').setValue(edit.password);
        this.userForm.get('name').setValue(edit.name);
        this.userForm.get('admin').setValue(edit.admin);
      }
    });
  }

  createUser(){
    if (this.userForm.valid){
      this.user = this.userForm.value;
      console.log(this.user);
      this.user.id = null;
      console.log(this.user);
      this.userService.createUser(this.user).subscribe(
        data => {
          Swal.fire({
            title: 'Eeeeba!',
            text: 'Usuário criado com sucesso',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/user_list']);
        },
        error => {
          Swal.fire({
            title: 'Ooops!',
            text: 'Erro ao criar usuário',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
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

  updateUser(){
    if (this.userForm.valid){
      this.user = this.userForm.value;
      this.userService.updateUser(this.user).subscribe(
        data => {
          Swal.fire({
            title: 'Eeeeba!',
            text: 'Usuário editado com sucesso',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/user_list']);
        },
        error => {
          Swal.fire({
            title: 'Ooops!',
            text: 'Erro ao editar usuário',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
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

  saveUser(){
    console.log(this.user);
    if(this.user.id != null && this.user.id > 0){
      this.updateUser();
    } else {
      this.createUser();
    }
  }
}
