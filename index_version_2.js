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

        if (!isNaN(valor) && valor >= 0 && valor <= 5) {

            sumaTotal += valor;
            cantidadDeNotas++;
        }
        else {
            hayError = true;
        }
    });

    const resultadoComparacionDiv = document.getElementById('resultadoComparacion');
    if (hayError) {
        resultadoComparacionDiv.textContent = "⚠️❌ No puedes continuar, ingresa valores válidos (entre 0 y 5)";
        resultadoComparacionDiv.className = "estado-error";
        return;
    }
    console.log(hayError)
    if (cantidadDeNotas > 0) {
        const promedio = sumaTotal / cantidadDeNotas;
        const mensajeResultado = analizarPromedio(promedio);
        resultadoComparacionDiv.innerHTML = mensajeResultado;

        if (promedio >= 3) {
            resultadoComparacionDiv.className = "estado-aprobado";
        } else {
            resultadoComparacionDiv.className = "estado-reprobado";
        }
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
    nuevoInput.min = "0";
    nuevoInput.max = "5";
    nuevoInput.className = 'nota-input';


    contenedorHijoNota.appendChild(nuevoLabel);
    contenedorHijoNota.appendChild(nuevoInput);
    contenedorPadreNotas.appendChild(contenedorHijoNota);

}


const calcularPromedioBoton = document.getElementById('calcularPromedioBoton');
calcularPromedioBoton.addEventListener('click', ejecutarCalculo);

const agregarNotaBoton = document.getElementById('agregarNotaBoton');
agregarNotaBoton.addEventListener('click', agregarCampoNota);
