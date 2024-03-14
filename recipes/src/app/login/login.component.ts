import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../user.model';
import { UserService } from '../user.service';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    CommonModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    "name": new FormControl(null, [Validators.required]),
    "password": new FormControl(null, [Validators.required])
  });
  public user!: User;
  constructor(private _userService: UserService, private route: Router) { }

  ngOnInit(): void {
  }
  checkUserExists() {
    if (this.loginForm.invalid) {
      alert("שדה חובה");
    }
    else {
      const user = this.loginForm.value;
      this._userService.getUser(user.name).subscribe({
        next: (res) => {
          if (res && res.name) {
            if (res.password == user.password) {
              this.route.navigate(['/allrecipes']);
            }
            else {
              console.log("no")

            }
            console.log(this.user)
          }
          else {
            this.route.navigate(['/signup'], { queryParams: { name: user.password } })
          }
        },
        error: (err) => {
          console.log(err, user.password);
        }
      });
    }
  }
  signin() {
    this.route.navigate(['/signup']);
  }
  add() {
    this.route.navigate(['/addrecipes']);
  }
}
