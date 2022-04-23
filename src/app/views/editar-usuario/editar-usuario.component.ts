import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  form: FormGroup = this.fb.group({
    nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    email: [null, [Validators.required, Validators.email]]
  });

  submmited: Boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      email: [null, [Validators.required, Validators.email]]
    })
  }

  onSubmit(): void {
    this.submmited = true;

    console.log(this.form.value)
    if (this.form.valid) {
      console.log('submittt')
    }

  }

  hasError(field: string) {
    return this.form.get(field)?.errors

  }

}
