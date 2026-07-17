
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