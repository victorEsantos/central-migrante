import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { TokenStorageService } from '../../shared/service/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  form: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit(): void {
    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        let id = this.tokenStorage.getUser().id;
        this.reloadPage();
        this.route.navigate(['/editarUsuario', id]).then(() => {
          this.reloadPage();
      });
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}
