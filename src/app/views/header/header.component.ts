import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  form: FormGroup = this.fb.group({
    countryControl: "pt-BR"
  })

  ngOnInit(): void {
    this.form.patchValue({
      countryControl: localStorage.getItem('language')
    })
  }

  onChange(language: any): void{
    if(!language){
      language = 'pt'
    }else{
      language = language.value
    }

    console.log("o idioma é: ",  language)

    localStorage.setItem('language', language)
    window.location.reload();
  }

}
