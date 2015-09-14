	var ph;
	const READY_STATE_COMPLETE = 4;
	function inicializaXHR (){
		if(window.XMLHttpRequest) {
			ph = new XMLHttpRequest();
		}
		else if(window.ActiveXObject) {
			ph = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return ph;
	}
	
	window.onload = function (){
		// var pathImagen = '/img/';
		
		var fotos = document.getElementsByClassName('foto');
		var idFestis;
		var n;
		for(var i=0; i<fotos.length; i++){
			fotos[i].addEventListener('click', cargaContenido, false);
		}
		function cargaContenido (f){
			n = f.target.id;
			ph = inicializaXHR();

			if (ph) {
				ph.onreadystatechange = muestraContenido;
				console.log(n+'.json');
				console.log('quedaria->')
				console.log('json/'+n+'.json');
				ph.open('get', 'json/'+n+'.json', true);
				ph.send(null);
			};
		};
		function rellenaArea (f){
			var h2 = document.getElementById('h2');
			if (h2) {
				h2.parentNode.removeChild(h2);
			};
			
			document.getElementById('n').innerHTML = 'NOMBRE';
			document.getElementById('nombre').innerHTML = f.nombre;

			document.getElementById('a').innerHTML = 'ARTISTAS';
			// console.log(f);
			for(var i = 0; i<f.artistas.length; i++){
				
				document.getElementById('a').innerHTML += "<p class='ar'>"+f.artistas[i]+"</p>"
			}
			document.getElementById('l').innerHTML = 'LOCALIZACIÓN';
			document.getElementById('localizacion').innerHTML = f.localizacion;

			document.getElementById('d').innerHTML = 'DURACIÓN';
			document.getElementById('duracion').innerHTML = f.duracion;

			document.getElementById('c').innerHTML = 'CAMPING';
			document.getElementById('camping').innerHTML = f.camping;

			document.getElementById('de').innerHTML = 'DESCRIPCIÓN';
			document.getElementById('descripcion').innerHTML = f.descripcion;
			// document.getElementById('nombre').innerHTML = f.nombre;
			// console.dir(f.artistas);
		}
		function muestraContenido() {
			if(ph.readyState == READY_STATE_COMPLETE && ph.status == 200)
			{
				var oFesti = JSON.parse(ph.responseText);

				rellenaArea(oFesti);

				document.getElementById('i-lateral').setAttribute('src', oFesti.img2)
				// console.log(oFesti.img2);

			}
		}

	};