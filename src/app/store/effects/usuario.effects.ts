import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {
	constructor(private actions$: Actions, public usuariosService: UsuarioService) {}

	@Effect()
	cargarUsuario$ = this.actions$.pipe(
		ofType(usuarioActions.CARGAR_USUARIO),
		switchMap((action) => {
			// console.log(action);
			const id = action['id'];
			return this.usuariosService.getUserById(id).pipe(
				map((user: any) => {
					// console.log(user);
					return new usuarioActions.CargarUsuarioSuccess(user);
				}),
				catchError((error) => of(new usuarioActions.CargarUsuarioFail(error)))
			);
		})
	);
}
