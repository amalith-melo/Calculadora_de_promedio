const analizarPromedio = (promedio) => {
    const promedioRedondeado = promedio.toFixed(2);
    return promedioRedondeado >= 3 ? (`El promedio es:  ${promedioRedondeado} ¡Felicidades, has aprobado! 🎉🎉`) : ('El promedio es ' + promedioRedondeado + ', lo siento, no has aprobado.❌😔😔');
}

const ejecutarCalculo = () => {
    const todosLosInputs = document.querySelectorAll('.nota-input');

    let sumaTotal = 0;
    let cantidadDeNotas = 0;
    let hayError = false;


    todosLosInputs.forEach(input => {
        const valor = parseFloat(input.value);
        if (!isNaN(valor)) {
            if (valor >= 0 && valor <= 5) {

                sumaTotal += valor;
                cantidadDeNotas++;

            }
            else {
                hayError = true;
            }
        }
    });

    const resultadoComparacionDiv = document.getElementById('resultadoComparacion');
    if (hayError) {
        resultadoComparacionDiv.textContent = "⚠️❌ No puedes continuar, ingresa valores válidos (entre 0 y 5)";
        resultadoComparacionDiv.className = "estado-error";
        return;
    }

    if (cantidadDeNotas > 0) {
        const promedio = sumaTotal / cantidadDeNotas;
        const mensajeResultado = analizarPromedio(promedio);
        resultadoComparacionDiv.innerHTML = mensajeResultado;

        if (promedio >= 3) {
            resultadoComparacionDiv.className = "estado-aprobado";
        } else {
            resultadoComparacionDiv.className = "estado-reprobado";
        }

        const notas = Array.from(todosLosInputs).map((input) => parseFloat(input.value))

        const calculoActualParaElHistorial = {
            fecha: new Date(),
            notas: notas,
            promedio: promedio,
        };
        // LEER el historial viejo.
        const historialGuardado = localStorage.getItem('historial');

        // PREPARAR la lista.
        const historial = historialGuardado ? JSON.parse(historialGuardado) : [];

        // AÑADIR el nuevo cálculo a la lista.
        historial.push(calculoActualParaElHistorial);

        // GUARDAR la lista completa y actualizada.
        localStorage.setItem('historial', JSON.stringify(historial));


    } else {
        resultadoComparacionDiv.textContent = "Por favor, ingresa al menos una nota válida.";
        resultadoComparacionDiv.className = "estado-error";
    }


}


let contadorNotas = 3; // Empezamos a contar desde la nota 4

const agregarCampoNota = () => {
    contadorNotas++;

    // Obtenemos el div PADRE que contiene todas las notas.
    const contenedorPadreNotas = document.getElementById('contenedorNotas');

    // creamos el contenedor hijo (el contenedor de la nueva nota vacio sin nada de momento)
    const contenedorHijoNota = document.createElement('div');
    // Luego creamos la ettiqueta label vacia sin nada de momento
    const nuevoLabel = document.createElement('label');
    // empezamoa a agregar los atributos de la etiqueta label
    nuevoLabel.setAttribute("for", `nota${contadorNotas}`);
    nuevoLabel.textContent = `Nota ${contadorNotas}`

    // creamos la etiqueta input vacia 
    const nuevoInput = document.createElement('input');
    //Desde aca empezamos a agregar los atributos del input
    nuevoInput.type = 'number';
    nuevoInput.id = `nota${contadorNotas}`;
    nuevoInput.name = `nota${contadorNotas}`;
    nuevoInput.className = 'nota-input';

    const botonEliminarNota = document.createElement('button'); //Creo con el metodo el botton de quitar y añado sus atributos
    botonEliminarNota.type = 'button';
    botonEliminarNota.textContent = 'X';
    botonEliminarNota.className = 'eliminar-nota-boton'


    contenedorHijoNota.appendChild(nuevoLabel);
    contenedorHijoNota.appendChild(nuevoInput);
    contenedorHijoNota.appendChild(botonEliminarNota); //meto el nuevo boton en el div hijo 

    contenedorPadreNotas.appendChild(contenedorHijoNota); //metemos los contenedores hijos en el padre

}


const calcularPromedioBoton = document.getElementById('calcularPromedioBoton');
calcularPromedioBoton.addEventListener('click', ejecutarCalculo);

const agregarNotaBoton = document.getElementById('agregarNotaBoton');
agregarNotaBoton.addEventListener('click', agregarCampoNota);


const contenedorPadreNotas = document.getElementById('contenedorNotas');
contenedorPadreNotas.addEventListener('click', function (accionEliminarNotas) {
    if (accionEliminarNotas.target.classList.contains('eliminar-nota-boton')) {
        const notaParaEliminar = accionEliminarNotas.target.closest('div');
        //  lo eliminamos del DOM
        notaParaEliminar.remove();
    }
});

//función dedicada a mostrar el historial en el HTML
function mostrarHistorial() {
    const listaHistorial = document.getElementById('listaHistorial');
    const historialGuardado = localStorage.getItem('historial');
    const historial = historialGuardado ? JSON.parse(historialGuardado) : [];

    // limpiamos la lista actual para no mostrar datos repetidos
    listaHistorial.innerHTML = '';

    // Por cada 'calculo' en nuestro array de historial
    historial.forEach(calculo => {
        // ...creamos un nuevo elemento <li>
        const nuevoItem = document.createElement('li');



        nuevoItem.textContent = `Fecha: ${calculo.fecha} - Notas: [${calculo.notas.join(', ')}] - Promedio: ${calculo.promedio}`;  // le ponemos el texto con los datos del cálculo

        // añadimos el <li> a la lista <ul> del HTML
        listaHistorial.appendChild(nuevoItem);
    });
}


const limpiarHistorialBoton = document.getElementById('limpiarHistorialBoton');

limpiarHistorialBoton.addEventListener('click', () => {
    // borramos el historial de la memoria del navegador
    localStorage.removeItem('historial');

    // Volvemos a dibujar el historial 
    mostrarHistorial();

});



// hacemos que el historial se muestre en pantalla tan pronto como la página carga.
mostrarHistorial(); 
