import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Peticion } from '../peticion';
import { PeticionService } from '../peticion.service';
import { AuthService } from '../../shared/auth.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { TokenService } from '../../shared/token.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class Usuario {
  id!: number;
  name!: string;
  email!: string;
  role_id!: number;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  peticion!: Peticion;
  usuario: Usuario = new Usuario();
  isSignedIn = false;
  errorMessage: any;
  errores: any = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private peticionService: PeticionService,
    private authState: AuthStateService,
    public token: TokenService
  ) {}

  ngOnInit(): void {
    this.authState.userAuthState
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.isSignedIn = val;
      });

    this.checkAuthAndLoadUser();
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
    });
  }

  eliminarPeticion(id: any) {
    if (id) {
      this.peticionService.delete(id.toString()).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          this.errores = error.error.error;
        }
      );
    }
  }

  firmarPeticion(id: any) {
    if (id) {
      this.peticionService.firmar(id.toString()).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          //console.error('Error al firmar la petición, ya la has firmado', error);
          //this.errores = error.error.error;
        }
      );
    }
  }

  estadoPeticion(id: any) {
    if (id) {
      this.peticionService.estado(id.toString()).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          //console.error('Error al cambiar estado, no tienes permisos', error);
          //this.errores = error.error.error;
        }
      );
    }
  }

  esPropietario(id: any) {
    //console.log(this.usuario.id, id);
    return this.usuario.id === id || this.usuario.role_id === 1;
  }

  private getUserLoggedIn() {
    this.authService
      .profileUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.usuario = data;
        },
        error: (error) => {
          console.error('Error al cargar el perfil del usuario', error);
          this.authState.setAuthState(false);
          this.token.removeToken();
        },
      });
  }

  private checkAuthAndLoadUser() {
    if (this.token.isLoggedIn()) {
      this.authState.setAuthState(true);
      this.getUserLoggedIn();
    }
  }
}
