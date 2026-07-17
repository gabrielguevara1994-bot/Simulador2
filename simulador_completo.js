
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones(){
  let componente= document.getElementById("parametros")
  let listaClass=componente.classList;
  listaClass.remove("activa");

  let componente2=document.getElementById("clientes");
  let listaClass2=componente2.classList;
  listaClass2.remove("activa");

  let componente3=document.getElementById("credito");
  let listaClass3=componente3.classList;
  listaClass3.remove("activa");
}

function mostrarSeccion(id){
  ocultarSecciones();
  let componente= document.getElementById(id)
  let listaClass=componente.classList;
  listaClass.add("activa");
}

function guardarTasa(){
  let tasaInteres =recuperarFloat("tasaInteres");
  if(tasaInteres<=20 && tasaInteres>=10){
    mostrarTexto("mensajeTasa","Tasa configurada correctamente:"+tasaInteres+"%");
  }else{
    mostrarTexto("mensajeTasa","La tasa debe estar entre 10% y 20%")
  }
}


function guardarClientes(){
  let valorCedula= recuperaraTexto("idCedula");
  let valorNombre= recuperaraTexto("idNombre");
  let valorApellido= recuperaraTexto("idApellido");
  let valorIngresos=recuperaraTexto("idIngresos");
  let valorEgresos=recuperaraTexto("idEgresos");

  let cliente={};

  cliente.cedula=valorCedula;
  cliente.nombre=valorNombre;
  cliente.apellido=valorApellido;
  cliente.ingresos=valorIngresos;
  cliente.egresos=valorEgresos;

  let busqueda=buscarCliente(valorCedula);
  if(busqueda==null){
  clientes.push(cliente);
  pintarClientes();
  }else{
    busqueda.nombre=valorNombre;
    busqueda.apellido=valorApellido;
    busqueda.ingresos=valorIngresos;
    busqueda.egresos=valorEgresos;
    pintarClientes();
  }
  limpiar();
  
}

function pintarClientes(){
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";

    let elementosTabla;
    let filaTabla = "";

    for(let i=0; i<clientes.length; i++){
        elementosTabla = clientes[i];

        filaTabla += "<tr>"+
                        "<td>"+ elementosTabla.cedula   +"</td>"+
                        "<td>"+ elementosTabla.nombre   +"</td>"+
                        "<td>"+ elementosTabla.apellido +"</td>"+
                        "<td>"+ elementosTabla.ingresos +"</td>"+
                        "<td>"+ elementosTabla.egresos  +"</td>"+
                        "<td><button onclick=\"seleccionarCliente('" + elementosTabla.cedula + "')\">Actualizar</button> <button>"+'Eliminar'+"</button></td>"+
                     "</tr>";
    }
    tabla.innerHTML = filaTabla;
}

function buscarCliente(cedula){
    let elementoTabla;
    let clienteEncontrado = null;

    for(let i=0; i<clientes.length; i++){
        elementoTabla = clientes[i];
        if(elementoTabla.cedula == cedula){
            clienteEncontrado = elementoTabla;
            break;              //encuentra el valor y suspende la ejecucion del for
        }
    }

    return clienteEncontrado;
}



function seleccionarCliente(cedula){    // falta entender esta parte
    let resultado = buscarCliente(cedula);

    if(resultado != null){
        clienteSeleccionado=resultado;
        mostrarTextoEnCaja("idCedula", resultado.cedula);
        mostrarTextoEnCaja("idNombre", resultado.nombre);
        mostrarTextoEnCaja("idApellido", resultado.apellido);
        mostrarTextoEnCaja("idIngresos", resultado.ingresos);
        mostrarTextoEnCaja("idEgresos", resultado.egresos);

    }
}

function limpiar(){
    document.getElementById("idCedula").value = "";
    document.getElementById("idNombre").value = "";
    document.getElementById("idApellido").value = "";
    document.getElementById("idIngresos").value = "";
    document.getElementById("idEgresos").value = "";
}

function buscarClienteCredito(){
    let cedula = recuperaraTexto("buscarCedulaCredito");
    let cliente = buscarCliente(cedula);
    let contenedor = document.getElementById("datosClienteCredito");

    if(cliente === null){
        clienteSeleccionado = null;
        contenedor.innerHTML = "<h3>CLIENTE NO ENCONTRADO</h3>";
    } else {
        clienteSeleccionado = cliente; // Guardamos para usar en el cálculo
        contenedor.innerHTML = `<h3>Datos del Cliente</h3>
            <p><strong>Cédula:</strong>${cliente.cedula}</p>
            <p><strong>Nombre:</strong>${cliente.nombre}</p>
            <p><strong>Apellido:</strong>${cliente.apellido}</p>
            <p><strong>Ingresos:</strong>${cliente.ingresos}</p>
            <p><strong>Egresos:</strong>${cliente.egresos}</p>`;

    }
}

function calcularCredito() {
    if (clienteSeleccionado === null) {
        alert("Por favor, busque un cliente primero.");
        return;
    }
    
    let ingresos = parseFloat(clienteSeleccionado.ingresos) || 0;
    let totalEgresos = parseFloat(clienteSeleccionado.egresos) || 0;

    let disponible = calcularDisponible(ingresos, totalEgresos);
    let capacidad = calcularCapacidadDePago(disponible);
    
    let monto = parseInt(document.getElementById("montoCredito").value) || 0;
    let plazo = parseInt(document.getElementById("plazoCredito").value) || 0;
    let tasa = tasaInteres;

    let interes = calcularInteresSimple(monto, tasa, plazo / 12);
    let total = calcularTotalPagar(monto, interes/12);
    let cuota = calcularCuotaMensual(total, plazo / 12);

    let esAprobado = aprobarCredito(capacidad, cuota);
    let resultadoContenedor = document.getElementById("resultadoCredito");

    if (resultadoContenedor) {
        resultadoContenedor.innerHTML = 
            "Capacidad de pago: " + capacidad.toFixed(2) + "<br>" +
            "Total a pagar: " + total.toFixed(2) + "<br>" +
            "Cuota mensual: " + cuota.toFixed(2) + "<br>" +
            "RESULTADO: " + (esAprobado && cuota > 0 ? "APROBADO" : "RECHAZADO");

        if (esAprobado && cuota > 0) {
            resultadoContenedor.className = "aprobado";
            document.getElementById("btnSolicitarCredito").disabled = false;
        } else {
            resultadoContenedor.className = "rechazado";
            document.getElementById("btnSolicitarCredito").disabled = true;
        }
    }
}