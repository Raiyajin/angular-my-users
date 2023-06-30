import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from "../@shared/models/IUser";
import { User } from "../@shared/models/User";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private _usersUrl: string  = "http://localhost:3000/users"

  users!: IUser[]
  selectedUser!: IUser;

  userDetailsHidden: boolean = true;
  addUserHidden: boolean = false;

  constructor(private _httpClient: HttpClient) {
  }

  ngOnInit() {
    this._httpClient.get(this._usersUrl)
      .subscribe(usersList => {

          this.users = usersList as IUser[];
          User.lastId = this.users.length;

        });
      }

  createUser(newUser: IUser) {
    this._httpClient.post(
      this._usersUrl,
      newUser
    )
      .subscribe(data => {
      console.log(data);
    })
  }

  deleteUser(currentUser: IUser) {
    this._httpClient.delete(
      this._usersUrl + "/" + currentUser.id,
    )
      .subscribe(data => {
        console.log(data);
      })
  }

  updateUser(currentUser: IUser) {
    this._httpClient.put(
      this._usersUrl + "/" + currentUser.id,
      currentUser
    )
      .subscribe(data => {
        console.log(data);
      })
  }

  hideUserDetails() {
    this.userDetailsHidden = true;
    this.addUserHidden = false;
  }

  showUserDetails(user: IUser) {
    this.userDetailsHidden = false;
    this.addUserHidden = true;
    this.selectedUser = user;
  }

}
