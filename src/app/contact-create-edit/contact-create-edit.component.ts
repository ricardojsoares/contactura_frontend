import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../service/contact/contact.service';
import Swal from 'sweetalert2';
import { Contact } from '../model';

@Component({
  selector: 'app-contact-create-edit',
  templateUrl: './contact-create-edit.component.html',
  styleUrls: ['./contact-create-edit.component.scss']
})
export class ContactCreateEditComponent implements OnInit {
  contact: Contact = null;
  contactForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, public contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.botaoEdit.subscribe( edit => {
      if (edit !== null) {
        this.contact = edit;
        this.contactForm.get('id').setValue(edit.id);
        this.contactForm.get('name').setValue(edit.name);
        this.contactForm.get('email').setValue(edit.email);
        this.contactForm.get('phone').setValue(edit.phone);
      }
    });
  }

  createContact(){
    if (this.contactForm.valid){
      this.contact = this.contactForm.value;
      this.contactService.createContact(this.contact).subscribe(
        data => {
          Swal.fire({
            title: 'Eeeeba!',
            text: 'Contato criado com sucesso',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/contact_list']);
        },
        error => {
          Swal.fire({
            title: 'Ooops!',
            text: 'Erro ao criar contato',
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

  updateContact(){
    if (this.contactForm.valid){
      this.contact = this.contactForm.value;
      this.contactService.updateContact(this.contact).subscribe(
        data => {
          Swal.fire({
            title: 'Eeeeba!',
            text: 'Contato editado com sucesso',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/contact_list']);
        },
        error => {
          Swal.fire({
            title: 'Ooops!',
            text: 'Erro ao editar contato',
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
}
