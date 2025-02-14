function calcularTiempoDia(fechaInicio) {
    const fechaActual = new Date();
    const tiempoTranscurrido = fechaActual - fechaInicio;

    const segundos = Math.floor(tiempoTranscurrido / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30); // Aproximación de meses
    //Mes
    return `${meses % 12}`;
}
function calcularTiempoMes(fechaInicio) {
    const fechaActual = new Date();
    const tiempoTranscurrido = fechaActual - fechaInicio;

    const segundos = Math.floor(tiempoTranscurrido / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30); // Aproximación de meses
    const anno = Math.floor(meses / 12);

    return `${anno}`;
}

function calcularTiempoHora(fechaInicio) {
    const fechaActual = new Date();
    const tiempoTranscurrido = fechaActual - fechaInicio;

    const segundos = Math.floor(tiempoTranscurrido / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30); // Aproximación de meses

    return `${dias % 30}`;
}

const fechaInicio = new Date('2023-10-13T00:00:00');
const contador_mes = document.getElementById('contador_mes');
const contador_dia = document.getElementById('contador_dia');
const contador_hora = document.getElementById('contador_hora');

setInterval(() => {
    contador_mes.textContent = calcularTiempoMes(fechaInicio);
    contador_dia.textContent = calcularTiempoDia(fechaInicio);
    contador_hora.textContent = calcularTiempoHora(fechaInicio);
}, 1000);
