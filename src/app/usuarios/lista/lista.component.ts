import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

import * as usuariosActions from '../../store/actions';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styles: []
})
export class ListaComponent implements OnInit {
	usuarios: Usuario[];
	loading: boolean;
	error: any;

	// constructor(private usuarioService: UsuarioService) {}
	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		this.store.select('usuarios').subscribe((usuarios) => {
			this.usuarios = usuarios.users;
			this.loading = usuarios.loading;
			this.error = usuarios.error;
		});
		this.store.dispatch(new usuariosActions.CargarUsuarios());

		// new actions.CargarUsuarios()
		// this.usuarioService
		// 	.getUsers()
		// 	.pipe(
		// 		map((resp) => {
		// 			return resp['data'];
		// 		})
		// 	)
		// 	.subscribe((users) => {
		// 		// console.log(users);
		// 		this.usuarios = users;
		// 	});
	}
}
