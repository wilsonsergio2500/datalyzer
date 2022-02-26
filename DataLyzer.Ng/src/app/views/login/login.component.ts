import { Component, OnInit } from '@angular/core';
import {  Validators } from '@angular/forms';
import { ILoginCredentials } from './login.form';
import { Store, Actions, ofActionErrored } from '@ngxs/store';
import { AuthLogin } from '@states/auth/auth.actions';
import { NgTypeFormGroup, FormTypeBuilder } from 'reactive-forms-typed';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm: NgTypeFormGroup<ILoginCredentials>;
  btnLoading: boolean = false;
  hasError: boolean = false;

  constructor(
    private formTypeBuilder: FormTypeBuilder,
    private store: Store,
    private actions: Actions
  ) {

  }
  ngOnInit() {
    this.bindForm();
  }

  bindForm() {

    this.LoginForm = this.formTypeBuilder.group<ILoginCredentials>({
      Username: [null, [Validators.required]],
      Password: [null, [Validators.required, Validators.minLength(4)]]
    });
 

    this.LoginForm.setFormErrors({
      Username: {
        required: 'Email is required'
      },
      Password: {
        required: 'Password is required',
        minlength: 'Password is invalid'
      }
    });


    this.actions.pipe(ofActionErrored(AuthLogin)).subscribe((x) => {
      this.hasError = true;
      this.btnLoading = false;
      this.LoginForm.reset();
    });

  }

  Submit() {
    if (this.LoginForm.valid) {
      this.btnLoading = true;
      this.store.dispatch(new AuthLogin(this.LoginForm.value));
    }
  }
}
