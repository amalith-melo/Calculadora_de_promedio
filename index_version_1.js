
const analizarPromedio = (nota1, nota2, nota3) => {
    const promedio = (nota1 + nota2 + nota3) / 3;
    const promedioRedondeado = promedio.toFixed(2);
    return promedioRedondeado >= 3 ? (`El promedio es:  ${promedioRedondeado} ¡Felicidades, has aprobado! 🎉🎉`) : ('El promedio es ' + promedioRedondeado + ', lo siento, no has aprobado.❌😔😔');
}

const ejecutarCalculo = () => {
    const inputNota1 = document.getElementById('nota1');
    const inputNota2 = document.getElementById('nota2');
    const inputNota3 = document.getElementById('nota3');

    const valorNota1 = parseFloat(inputNota1.value);
    const valorNota2 = parseFloat(inputNota2.value);
    const valorNota3 = parseFloat(inputNota3.value);


    const mensajeResultado = analizarPromedio(valorNota1, valorNota2, valorNota3);
    console.log(mensajeResultado);

    const resultadoComparacionDiv = document.getElementById('resultadoComparacion');

    resultadoComparacionDiv.innerHTML = mensajeResultado;
}

const calcularPromedioBoton= document.getElementById('calcularPromedioBoton');

calcularPromedioBoton.addEventListener('click', ejecutarCalculo);


