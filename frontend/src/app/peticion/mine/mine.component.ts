import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';
import { AuthStateService } from '../../shared//auth-state.service';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

export class User {
  id!: number;
  role_id!: number;
  name!: String;
  email!: String;
}

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css'],
})
export class MineComponent implements OnInit {
  isSignedIn!: boolean;
  peticiones!: Peticion[];
  isLoading = true;
  user: User = new User();
  errors: any = null;

  constructor(
    public peticionservice: PeticionService,
    private auth: AuthStateService,
    private authService: AuthService,
    private router: Router
  ) {
    this.peticionservice.myPeticiones().subscribe(
      (data: any) => {
        this.peticiones = data;
      },
      (error) => {
        this.errors = error.error.error;
      }
    );
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
      if (this.isSignedIn) {
        this.authService.profileUser().subscribe((data: any) => {
          this.user = data;

          //console.log(data);
          this.isLoading = false;
        });
      }
    });
  }

  ngOnInit(): void {}

  onDelete(id: any) {
    if (id) {
      this.peticionservice.delete(id.toString()).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          this.errors = error.error.error;
        }
      );
    }
  }

  isOwner(id: any) {
    //console.log(this.user.id, id);
    return this.user.id == id || this.user.role_id == 1;
  }
}
