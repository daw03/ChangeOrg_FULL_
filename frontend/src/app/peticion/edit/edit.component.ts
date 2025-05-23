import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Peticion } from '../peticion';
import { PeticionService } from '../peticion.service';
import { AuthService } from '../../shared/auth.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Usuario {
  id!: number;
  name!: string;
  email!: string;
  role_id!: number;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  peticionForm!: FormGroup;
  peticion!: Peticion;
  usuario: Usuario = new Usuario();
  isSignedIn = false;
  errorMessage: any;
  errores: any = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private peticionService: PeticionService,
    private authState: AuthStateService
  ) {}

  ngOnInit(): void {
    this.obtenerPeticion();
    this.verificarAuth();
  }

  obtenerPeticion() {
    const peticionId = this.route.snapshot.paramMap.get('id');
    if (peticionId) {
      this.peticionService.show(peticionId).subscribe(
        (data: any) => {
          this.peticion = data[0];
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }

  verificarAuth() {
    this.authState.userAuthState.subscribe((estado) => {
      this.isSignedIn = estado;
      if (this.isSignedIn) {
        this.authService.profileUser().subscribe((datos: any) => {
          this.usuario = datos;
        });
      }
      else{
        window.location.href = '';
      }
    });
  }

  esPropietario(id: any) {
    console.log(this.usuario.id, id);
    return this.usuario.id === id || this.usuario.role_id === 1;
  }

  onSubmit() {
    
  }
}
