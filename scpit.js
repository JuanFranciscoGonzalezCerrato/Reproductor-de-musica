const audio = document.createElement("audio");
const canciones = [
	{ src: 'sonidos/Elias.mp3', title: 'Elias' },
	{ src: 'sonidos/Ataca.mp3', title: 'Ataca' },
	{ src: 'sonidos/En-guerra.mp3', title: 'En-guerra' }
];

let cancionActual = 0;
let tiempoDeReproduccion = 0;
let bucleActivo = false;

const playPause = document.getElementById('play-pause');
const avanzar = document.getElementById('avanzar');
const retroceder = document.getElementById('retroceder');
const bucle = document.getElementById('bucle');
const aleatorio = document.getElementById('aleatorio');
const barraNavegacion = document.querySelector('.barra-navegacion');

function actualizarEstiloNavegacion() {
	const elementosNavegacion = barraNavegacion.children;

	for (let i = 0; i < elementosNavegacion.length; i++) {
		if (i === cancionActual) {
			elementosNavegacion[i].classList.add('hover-naranja');
		} else {
			elementosNavegacion[i].classList.remove('hover-naranja');
		}
	}
}

function reproducirCancion(posicion) {
	cancionActual = posicion;
	audio.src = canciones[cancionActual].src;
	audio.play();
	actualizarEstiloNavegacion();
}

playPause.addEventListener('click', () => {
	if (audio.paused) {
		if (audio.currentTime === 0) {
			audio.src = canciones[cancionActual].src;
		} else {
			audio.currentTime = tiempoDeReproduccion;
		}
		audio.play();
	} else {
		tiempoDeReproduccion = audio.currentTime;
		audio.pause();
	}
});

avanzar.addEventListener('click', () => {
	cancionActual++;
	if (cancionActual >= canciones.length) {
		cancionActual = 0;
	}
	audio.src = canciones[cancionActual].src;
	audio.play();
	actualizarEstiloNavegacion();
});

retroceder.addEventListener('click', () => {
	cancionActual--;
	if (cancionActual < 0) {
		cancionActual = canciones.length - 1;
	}
	audio.src = canciones[cancionActual].src;
	audio.play();
	actualizarEstiloNavegacion();
});

bucle.addEventListener('click', () => {
	if (bucleActivo) {
		audio.loop = false;
	} else {
		audio.loop = true;
	}

	bucleActivo = !bucleActivo;

	if (bucleActivo) {
		bucle.classList.add('bucle-activo');
		console.log("bucle-activo");
	} else {
		bucle.classList.remove('bucle-activo');
		console.log("bucle inactivo");
	}
});

aleatorio.addEventListener('click', () => {
	const indiceAleatorio = Math.floor(Math.random() * canciones.length);
	reproducirCancion(indiceAleatorio);
	console.log("reproduccion Aleatoria");
	actualizarEstiloNavegacion();
});

const elementosNavegacion = barraNavegacion.children;
for (let i = 0; i < elementosNavegacion.length; i++) {
	elementosNavegacion[i].addEventListener('click', () => {
		reproducirCancion(i);
	}
);
}

actualizarEstiloNavegacion();
