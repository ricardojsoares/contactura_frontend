import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model';
import { UserService } from '../service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: User[] = [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      data => {
        this.userList = data;
      },
      error => {
        Swal.fire({
          title: 'Ooops!',
          text: 'Erro ao retornar lista de usuários',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    );
  }

  deleteUser(id: number){
    Swal.fire({
      title: 'Cuidado!!!',
      text: 'Deseja realmente excluír o usuário?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          data => {
            Swal.fire({
              title: 'Eeeeba!',
              text: 'Usuário removido com sucesso!',
              icon: 'success',
              confirmButtonText: 'Okay'
            }).then(() => {
              window.location.reload();
            });
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Ufa! Operação cancelada!', '', 'info');
      }
    });
  }

  goToCreate(){
    this.router.navigate(['/user']);
  }

  editUser(user: User){
    this.userService.getUserForList(user);
    this.router.navigate(['/user']);
  }
}
