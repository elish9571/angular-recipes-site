import { Component } from '@angular/core';
import { User } from '../user.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public name!: string;
  public user!: User;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private route: ActivatedRoute, private router: Router, private _userservice: UserService) {
    const tempname = this.route.snapshot.queryParamMap.get('name');
    this.name = tempname !== null ? tempname : '';
    console.log('Name:', tempname);
  }
  confirm(username: string, userpassword: string, useremail: string, useraddres: string) {
    if (!username || username.trim() === '' || !userpassword || userpassword.trim() === '' || !useremail || useremail.trim() === '' || !useraddres || useraddres.trim() === '') {
      Swal.fire("חובה למלא את כל השדות");
    }
    else {
      this.user = { name: username, password: userpassword, email: useremail, address: useraddres, id: 0 }
      this._userservice.getUser(username).subscribe({
        next: (res) => {
          if (res && res.name) {
            Swal.fire({
              icon: "error",
              text: "שם זה כבר קיים במערכת",
            });
          }
          else {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
              },
              buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
              title: "שמירה",
              text: "?האם אתה בטוח שברצונך לשמור את הפרטים במערכת",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "שמירה",
              cancelButtonText: "ביטול",
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                  title: "שמירה",
                  text: "הפרטים נשמרים במערכת",
                  icon: "success",
                  timer: 1000
                });
                this._userservice.addUser(this.user).subscribe({
                  next: (res) => {
                    console.log('Response:', res);
                  },
                  error: (err) => {
                    console.log('Error:', err);
                  }
                });
                this._userservice.getUser(username).subscribe({
                  next: (res) => {
                    if (res && res.id != null)
                      localStorage.setItem("user", JSON.stringify({ name: username, id: res.id }))

                  },
                  error: (err) => {
                    console.log('Error:', err);
                  }
                });

                this.router.navigate([''])
              } else if (
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire({
                  title: "ביטול",
                  text: "הפרטים לא נשמרו במערכת",
                  icon: "error"
                });
              }
            });
          }
        },
        error: (err) => {
          console.log(username)
        }
      });
    }
  }
}
