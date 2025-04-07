import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../peticion/peticion.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { Router } from '@angular/router';
import { TokenService } from '../../shared/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errors: any = null;
  peticiones: any[] = [];
  isSignedIn!: boolean;

  constructor(
    private peticionService: PeticionService,
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService
  ) { }

  ngOnInit(): void {
    this.pillarPeticiones();
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }

  pillarPeticiones(): void {
    this.peticionService.index().subscribe(
      (data) => {
        this.peticiones = data;
        console.log(this.peticiones)
      },
      (error) => {
        this.errors = error;
        console.log(this.errors);
      }
    );
  }
}