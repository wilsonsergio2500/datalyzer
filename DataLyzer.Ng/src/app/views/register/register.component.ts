import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRegistrationForm } from './register.form';
import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { Validators } from '@angular/forms';
import { NgTypeFormGroup, FormTypeBuilder, NgTypeFormControl } from 'reactive-forms-typed';
import { AuthState } from '@states/auth/auth.state';
import { Observable, Subscription, merge } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AuthCreateUserSetErrors, AuthCreateUserWithEmailAndPassword } from '@states/auth/auth.actions';
import { ErrorForUserResponse } from '@states/auth/auth.model';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: [`register.component.scss`]
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: NgTypeFormGroup<IRegistrationForm>;
  @Select(AuthState.getErrorMessages) errors$: Observable<ErrorForUserResponse[]>;
  @Select(AuthState.IsWorking) working$: Observable<boolean>;
  private subscriptions: Subscription[];

  constructor(
    private formTypeBuilder: FormTypeBuilder,
    private store: Store,
    private actions: Actions
  ) {
  }

  ngOnInit() {

    this.form = this.formTypeBuilder.group<IRegistrationForm>({
      Username: [null, [Validators.required, Validators.email]],
      Password: [null, [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: [null, [
        (c: NgTypeFormControl<string, IRegistrationForm>) => {
          if (c && c.parent && (c.parent.value as IRegistrationForm).Password === c.value) {
            return null;
          }
          return { notMatch: true };
        }
      ]]
    });

    this.form.setFormErrors({
      Username: {
        required: 'Username is required',
        email: 'Username must be a valid email'
      },
      Password: {
        required: 'Password is required',
        minlength: 'Password is invalid'
      },
      ConfirmPassword: {
        notMatch: 'Password must match'
      }
    });

    const onPasswordChange$ = this.form.controls.Password.valueChanges.pipe(
      delay(1),
      tap(_ => {
        this.form.controls.ConfirmPassword.updateValueAndValidity();
      })
    ).subscribe();

    const finalized$ = merge(this.actions.pipe(ofActionSuccessful(AuthCreateUserSetErrors)), this.actions.pipe(ofActionSuccessful(AuthCreateUserWithEmailAndPassword))).pipe(
      tap(() => this.form.reset())
    ).subscribe();

    this.subscriptions = [onPasswordChange$, finalized$];

  }

  Submit() {
    const { Username: email, Password: password } = this.form.value;
    this.store.dispatch(new AuthCreateUserWithEmailAndPassword({ email, password }));
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(g => g.unsubscribe());
    }
  }

}
