import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  contactMethod = [
    { id: 1, name: 'Mohammed' },
    { id: 2, name: 'Fared' },
    { id: 3, name: 'Rezk' },
  ];

  submit(f: NgForm) {
    console.log(f);
  }
}
