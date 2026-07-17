function calcularDisponible(ingresos, egresos) {
    let disp = ingresos - egresos;
    return disp < 0 ? 0 : disp;
}

function calcularCapacidadDePago(montoDisponible) {
    return montoDisponible / 2;
}

function calcularInteresSimple(monto, tasa, plazo) {
    return monto * (tasa / 100) * plazo;
}

function calcularTotalPagar(monto, interes) {
    return monto + interes + 100; // +100 de SOLCA/Impuestos
}

function calcularCuotaMensual(total, plazo) {
    return total / (plazo * 12);
}

function aprobarCredito(capacidad, cuota) {
    return capacidad >= cuota;
}

// FUNCIÓN CORREGIDA PARA EVITAR EL ERROR DE 'NULL'
function texto(id, variable) {
    let elemento = document.getElementById(id);
    if (elemento) {
        elemento.innerText = "$" + variable.toFixed(2);
    } else {
        console.warn("No se encontró el elemento con ID: " + id);
    }
}