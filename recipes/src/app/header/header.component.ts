import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar'

import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, AvatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private route: Router) { }

  toAllRecipes() {
    this.route.navigate(['']);
  }
  toAddRecipe() {
    this.route.navigate(['/addrecipes']);
  }
  toSignin() {
    this.route.navigate(['/signin']);
  }
  toSignout() {
    Swal.fire({
      text: "לאחר היציאה לא תוכל עוד לבצע שינויים באתר",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "יציאה"
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['']);
        const user = localStorage.getItem('user');
        if (user) {
          localStorage.removeItem('user');
        }
      }
    });
  }
  toSignup() {
    this.route.navigate(['/signup']);
  }
  login() {
    this.route.navigate(['/signin']);
  }
  logout() {
    Swal.fire({
      text: "לאחר היציאה לא תוכל עוד לבצע שינויים באתר",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "יציאה"
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['']);
        const user = localStorage.getItem('user');
        if (user) {
          localStorage.removeItem('user');
        }
      }
    });
  }
}