import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private route: Router,
    private token: TokenStorageService) {}

  ngOnInit(): void {
    if(this.hasUser){
      this.id = this.token.getUser().id
    }
  }

  hasUser: boolean = this.token.getUser() !== null;
  id: number = 0;


  onEdit(id: number) {
    this.route.navigate(['/editarUsuario', id ])
  }

}
