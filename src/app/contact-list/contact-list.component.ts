import { Component, OnInit } from '@angular/core';
import { Contact } from '../model';
import { ContactService } from '../service/contact/contact.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
 contactList: Contact[] = [];
  constructor(private contactService: ContactService, private router: Router) {
  }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(){
    this.contactService.getContacts().subscribe(
      data => {
        this.contactList = data;
      },
      error => {
        Swal.fire({
          title: 'Ooops!',
           text: 'Erro ao retornar lista',
           icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    );
  }

  deleteContact(id: number){
    Swal.fire({
      title: 'Cuidado!!!',
      text: 'Deseja realmente excluír o contato?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.deleteContacts(id).subscribe(
          data => {
            Swal.fire({
              title: 'Eeeeba!',
              text: 'Sucesso ao remover contato',
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
    this.router.navigate(['/contact']);
  }

  editContact(contact: Contact){
    this.contactService.getContactForList(contact);
    this.router.navigate(['/contact']);
  }
}
