import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'

})
export class UserService {
  private httpOptions: any; // http options
  public token: string; // JWT auth token
  public tokenExpires: any; // the token expiration date
  public username: string; //  username

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
   }

   public login(user) {
     this.http.post('/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
       data => {
         this.updateData(data['token']);
       }
     );
   }

   public refreshToken() {
     this.http.post('/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
       data => {
         this.updateData(data['token']);
       }
     );
   }

   public logout() {
     this.token = null;
     this.tokenExpires = null;
     this.username = null;
   }

  private updateData(token) {
    this.token = token;
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.tokenExpires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
}
