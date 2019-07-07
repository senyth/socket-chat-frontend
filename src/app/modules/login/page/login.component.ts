/**
 * Name:          Login Component Class
 * Description:   Holds all functions for validating and checking login features
 * Developer:     Babie Entoma
 * Date:          06/29/2019
 */

import { Component, OnInit, HostListener , Injectable, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ValidationMessages } from '../shared/login-validation-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/core/models/user';
import { APIResponse } from 'src/app/core/models/api-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validationMessage = ValidationMessages;
  requestingData = false;
  invalidCredentials = false;

  // keyboard listener for "Enter"
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.loginForm.valid) {
        this.authenticate();
    }
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private next: ActivatedRoute
  ) { }

  /**
   * Instantiate the login form
   * @return        void
   * @author        Babie Entoma
   */
  private createForm() {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.createForm();
  }

  /**
   *  Authenticates user input. Login user if successful and save token. Else, display error message.
   * @return        none
   * @author        Babie Entoma
   */
  public authenticate() {
    console.log('authenticate');
    this.loginForm.controls['username'].markAsTouched();
    this.loginForm.controls['password'].markAsTouched();

    if (this.loginForm.valid) {
      const formVal = this.loginForm.value;
      const user: User = {
        username: formVal.username,
        password: formVal.password
      };

      this.requestingData = true;
      this.authService.authenticate(user).subscribe(
        (res: APIResponse) => {
          this.requestingData = false;
          if (res.data.success) {  
            this.router.navigate(['/']); // let user access the system if credentials are correct
          } else {
            this.invalidCredentials = true;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            alert('An error occurred: ' + err.error.message);
          } else {
            alert(`Backend returned code ${err.status} body was: ${err.error}`);
  
            this.router.navigate(['/login']);
          }
       }
     );
    }
  }

}
