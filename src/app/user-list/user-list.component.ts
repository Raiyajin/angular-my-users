import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from "@angular/forms";

import { IUser } from "../@shared/models/IUser";
import { User } from "../@shared/models/User";
import { UsersService } from "../@shared/services/users.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users!: IUser[]
  selectedUser!: IUser;

  userService!: UsersService;

  userDetailsHidden: boolean = true;
  addUserHidden: boolean = false;
  dropdownHidden: boolean = true;

  defaultDropdown: String = 'Prénom';


  searchForm = new FormControl<String>('');

  constructor(private _httpClient: HttpClient) {
    this.userService = new UsersService(this._httpClient);

  }

  ngOnInit() {

    this.userService.get()
      .subscribe(usersList => {

      this.users = usersList;
      User.lastId = this.users.length;

    });

  }

  createUser(newUser: IUser) {
    this.userService.post(newUser)
      .subscribe(data => {
        this.users.push(data);
      })

  }

  deleteUser(currentUser: IUser) {
    this.userService.delete(currentUser)
      .subscribe(data => {
        this.users.splice(this.users.indexOf(data), 1);
      });
  }

  updateUser(currentUser: IUser) {
    this.userService.put(currentUser)
      .subscribe(data => {
        this.users[data.id - 1] = data;
      })
  }

  search() {

    this.searchForm.valueChanges.subscribe(selectedValue => {
      console.log(selectedValue);
      this.userService.search(this.defaultDropdown, selectedValue)
        .subscribe(data => {
          this.users = data
        });
    });
  }

  /**
   * Hide the user-details component and display the user creation form
   * @param value whether to hide the value or not
   */
  hideUserDetails(value: boolean) {
    this.userDetailsHidden = value;
    this.addUserHidden = !value;
  }

  /**
   * Hide the user creation form component and display the user-details with the user information
   * @param user the user which data are displayed on the component
   */
  showUserDetails(user: IUser) {
    this.hideUserDetails(false)
    this.selectedUser = user;
  }

  showDropdown() {
    this.dropdownHidden = !this.dropdownHidden
  }
}
