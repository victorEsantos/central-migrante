import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {

  signOut(): void {
    window.sessionStorage.clear();
}
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public userIsAdmin(): boolean {
    const user = this.getUser();
    let isAdmin = false;

    if (user) {
      let roles = user.roles;

      for (let i = 0; i < roles.length; i++) {

        console.log(roles[0])
        if (roles[i] == "ROLE_ADMIN") {
          isAdmin = true;
          break;
        }
      }
    }

    return isAdmin;
  }
}
