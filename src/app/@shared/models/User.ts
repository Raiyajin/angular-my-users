import { Injectable } from "@angular/core";
import {IUser} from "./IUser";

@Injectable({
  providedIn: 'root'
})
export class User implements IUser {

  static lastId: number = 1;

  id: number;
  firstname?: String | null;
  lastname?: String | null;
  username: String;
  email: String;
  avatar?: String | null;

  constructor(username: String, email: String, firstname?: String | null, lastname?: String | null, avatar?: String | null) {
    this.id = ++User.lastId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
  }

  public static fromPartialUser(params: Partial<User>): User {

    return new User(
      <String>params.username,
      <String>params.email,
      params.firstname,
      params.lastname,
      params.avatar
    )
  }

}
