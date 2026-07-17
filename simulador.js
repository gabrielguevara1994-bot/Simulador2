function calcular() {
    
    let ingresos = parseFloat(document.getElementById("txtIngresos").value) || 0;

    let arriendo = parseFloat(document.getElementById("txtArriendo").value) || 0;
    let alimentacion = parseFloat(document.getElementById("txtAlimentacion").value) || 0;
    let varios = parseFloat(document.getElementById("txtVarios").value) || 0;

    let totalEgresos = arriendo + alimentacion + varios;

    texto("spnTotalEgresos", totalEgresos);

    let disponible = calcularDisponible(ingresos, totalEgresos);
    let capacidad = calcularCapacidadDePago(disponible);
    
    let monto = parseInt(document.getElementById("txtMonto").value) || 0;
    let plazo = parseInt(document.getElementById("txtPlazo").value) || 0;
    let tasa = parseInt(document.getElementById("txtTasaInteres").value) || 0;

    let interes = calcularInteresSimple(monto, tasa, plazo);
    let total = calcularTotalPagar(monto, interes);
    let cuota = calcularCuotaMensual(total, plazo);

    texto("spnDisponible", disponible);
    texto("spnCapacidadPago", capacidad);
    texto("spnInteresPagar", interes);
    texto("lblTotalValor", total);
    texto("lblCuotaValor", cuota);

    let esAprobado = aprobarCredito(capacidad, cuota);
    let lblMensaje = document.getElementById("lblMensaje");
    if (lblMensaje) {
        if (esAprobado && cuota > 0) {
            lblMensaje.innerText = "CREDITO APROBADO";
            lblMensaje.style.color = "#10b981";
        } else {
            lblMensaje.innerText = "CREDITO RECHAZADO";
            lblMensaje.style.color = "#ff0055";
        }
    }
}

