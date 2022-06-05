import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

/**
 * @title Toolbar overview
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  constructor(private route: Router, private token: TokenStorageService) {}
  ngOnInit(): void {
    if(this.hasUser){
      this.id = this.token.getUser().id
    }
  }

  hasUser: boolean = this.token.getUser() !== null;
  isAdmin: boolean = this.token.userIsAdmin();
  id: number = 0;

  onEdit(id: number) {
    this.route.navigate(['/editarUsuario', id ])
  }

  onSignOut() {
    this.token.signOut()
    this.route.navigate(["/"]).then(() => {
      window.location.reload();
  });
    
  }
  
}