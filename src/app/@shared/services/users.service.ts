import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from "../models/IUser";
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _usersUrl: string = "http://localhost:3000/users"
  users: IUser[];

  constructor(private _httpClient: HttpClient) {
    this.users = [new User('tes','test')];
  }

  get(id?: number | undefined) {
    if (id === undefined) {
      return this._httpClient.get<IUser[]>(this._usersUrl)
    } else {
      return this._httpClient.get<IUser[]>(this._usersUrl + "/" + id)
    }
  }

  post(newUser: IUser) {
    return this._httpClient.post<IUser>(
      this._usersUrl,
      newUser
    )

  }

  delete(currentUser: IUser) {
    return this._httpClient.delete<IUser>(
      this._usersUrl + "/" + currentUser.id,
    )
  }

  put(currentUser: IUser) {
    return this._httpClient.put<IUser>(
      this._usersUrl + "/" + currentUser.id,
      currentUser
    )

  }
}
