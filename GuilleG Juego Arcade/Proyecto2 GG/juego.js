/*Creacion del objeto*/
var juego = {
	filas:[[],[],[]],
	espacioVacio:{
		fila:2,
		columna:2
	},
	iniciar:function(elemento){
		this.instalarPiezas(elemento);
		this.mezclarFichas(50);
		this.capturarTeclas();
	},
	/*Instalacion de piezas*/
	instalarPiezas(juegoEl){
		var counter = 1;
		for (var fila = 0; fila < 3; fila++) {
			for (var columna = 0; columna < 3; columna++) {
				if (fila == this.espacioVacio.fila && columna == this.espacioVacio.columna){
					this.filas[fila][columna] = null;
				}else{
					var pieza = this.crearPieza(counter++,fila,columna);
					juegoEl.append(pieza.el);
					this.filas[fila][columna] = pieza;
				}
			}
		}

		return juegoEl;
	},
	/*Cracion de la piezas*/
	crearPieza(numero,fila,columna){
		var nuevoElemento = $('<div>');
		nuevoElemento.addClass('pieza');

		nuevoElemento.css({
			backgroundImage:'url(piezas/'+ numero + '.jpg)',
			top: fila*200,
			left: columna*200
		});

		return{
			el:nuevoElemento,
			numero:numero,
			filaInicial:fila,
			columnaInicial: columna,
		};
	},
	/*Movimiento de imagen hacia abajo*/
	moverHaciaAbajo(){
		var filaOrigen = this.espacioVacio.fila-1;
		var columnaOrigen = this.espacioVacio.columna;

		this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
	},
	/*Movimiento de la imagen hacia arriba*/
	moverHaciaArriba(){
		var filaOrigen = this.espacioVacio.fila+1;
		var columnaOrigen = this.espacioVacio.columna;

		this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);

	},
	/*Movimiento de la imagen hacia la derecha*/
	moverHaciaLaDerecha(){
		var filaOrigen = this.espacioVacio.fila;
		var columnaOrigen = this.espacioVacio.columna+1;

		this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
	},
	/*Movimiento de la imagen hacia la izquierda*/
	moverHaciaLaIzquierda(){
		var filaOrigen = this.espacioVacio.fila;
		var columnaOrigen = this.espacioVacio.columna-1;

		this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
	},
	/*Capturacion de teclas*/
	capturarTeclas(){
		var that = this;
		$(document).keydown(function(evento){
			switch(evento.which){
				case 40: that.moverHaciaAbajo();

				break;
				case 38: that.moverHaciaArriba();

				break;
				case 37: that.moverHaciaLaDerecha();

				break;
				case 39:that.moverHaciaLaIzquierda();

				break;

				default: return;
			}

			evento.preventDefault();
			that.chequearSiGano();
		});
	},
	/*Movimiento de la Ficha Fila y Columna*/
	moverFichaFilaColumna(ficha,fila,columna){
		ficha.el.css({
			top: fila*200,
			left: columna*200
		})
	},
	/*Guardado del espacio vacio*/
	guardarEspacioVacio(fila,columna){
		this.espacioVacio.fila = fila;
		this.espacioVacio.columna = columna;

		this.filas[fila][columna] = null;
	},
	/*Intercambio de lugar del Espacio vacio*/
	intercambiarPosicionConEspacioVacio(fila,columna){
		var ficha = this.filas[fila] && this.filas[fila][columna];
		if(ficha){
			this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
			this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
			this.guardarEspacioVacio(fila,columna);
		}
	},
	/*Chequeo de que se gano el juego*/
	chequearSiGano(){
		for(var f = 0; f < this.filas.length; f++){
			for(var c = 0; c < this.filas.length; c++){
				var ficha = this.filas[f][c];
				if(ficha && !(ficha.filaInicial== f && ficha.columnaInicial == c)){
					return false;
				}
			}
		}
		return alert('Has ganado!');
	},
	/*Mezclado de fichas*/
	mezclarFichas(veces){
		if(veces <= 0){
			return;
		}

		var that = this;
		var funciones = ['moverHaciaAbajo','moverHaciaArriba','moverHaciaLaIzquierda','moverHaciaLaDerecha'];
		var numeroRamdom = Math.floor(Math.random()*4);
		var nombreDeFuncion = funciones[numeroRamdom];
		this[nombreDeFuncion]();

		setTimeout(function(){
			that.mezclarFichas(veces-1);
		},10);
	}

};
/*Inicio del Juego*/
$(function(){
	var elemento = $('#juego');
	juego.iniciar(elemento);
})

