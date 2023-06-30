import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { User } from "../@shared/models/User";
import { IUser } from "../@shared/models/IUser";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  @Input('user') set setUser(user: IUser | null) {
    if (!!user) {
      this.userForm.patchValue({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
        email: user.email
      });
    this.editing = true;
    }
  }

  editing: boolean = false;

  userForm = new FormGroup({
    username: new FormControl<String>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2)
      ]}),
    email: new FormControl<String>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]}),
    firstname: new FormControl<String>(''),
    lastname: new FormControl<String>(''),
    avatar: new FormControl<String>('')
  });

  @Output() onCreateUser = new EventEmitter<IUser>();
  @Output() onUpdateUser = new EventEmitter<IUser>();

  submitUser() {
    if (this.editing) {
      this.onUpdateUser.emit(this.userForm.value as IUser);
    } else {
      this.onCreateUser.emit(User.fromPartialUser(this.userForm.value))
    }
  }
}
