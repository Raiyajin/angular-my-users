import {Component, EventEmitter, Input, Output} from '@angular/core';

import { IUser } from "../@shared/models/IUser";
import { User } from "../@shared/models/User";
import { USERS } from "../@shared/models/users.mock";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  @Input() user!: IUser | null;
  @Output() onDetailsHideEvent = new EventEmitter();
  @Output() onDeleteCurrentUser = new EventEmitter();
  @Output() onUpdateCurrentUser = new EventEmitter();

  hideDetails() {

    User.lastId = USERS.length
    this.onDetailsHideEvent.emit();

  }

  deleteUser() {
    if (confirm("Êtes-vous sûr de la suppression de cet utilisateur ?")) {
      this.onDeleteCurrentUser.emit();
    }

  }

  updateUser($event: IUser | null) {
    console.log(this.user);
    if ($event) {
      $event.id = <number>this.user?.id
    }
    this.onUpdateCurrentUser.emit($event);
  }

}
