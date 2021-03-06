﻿/*--------------- region de variables globales --------------------*/
var ArraySucursalServicio = [];
var ArrayCombo = [];
var ArraySucursalServicioDep = [];
var ArrayEmpresaNit = [];
var Matrix_Moneda = [];
var Matrix_Sucursal = [];
var Matrix_Calendarios = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
var Nit_ID_proccess;

/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {


    $("#Marco_trabajo_Form").css("height", "490px");
    $(".container_TGrid").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_MMoneda('Moneda');
    
    Change_Select_Nit();

});


//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el Control de Carga

    //funcion para las ventanas emergentes
    $("#dialog").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });

    $("#dialog_eliminar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });

}

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#Img12").css("display", "none");
    $("#Img13").css("display", "none");
    $("#ImgCal").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $("#TablaConsulta").css("display", "none");
    $(".Dialog_Datos").css("display", "none");
}

//carga el combo de Cargo dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        Nit_ID_proccess = $(this).val();
        TransaccionesSegunNIT(Nit_ID_proccess);
    });
    Change_Select_Moneda();
}

function TransaccionesSegunNIT(vp_index_ID) {
    if (vp_index_ID != "-1") {
        transacionAjax_Calendario('MatrixCalendarios', vp_index_ID);
        transaccionAjax_MSucursal('MatrixSucursal');
    }
}

function Change_Select_Sucursal() {
    $("#Select_Sucursal").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Sucursal").val() == "-1") {
            $("#Img3").css("display", "inline-table");
        } else {
            $("#Img3").css("display", "none");
            $("#Select_Sucursal").prop('disabled', true);
        }
    });
}

//coloca la sigla de la moneda
function Change_Select_Moneda() {
    $("#Select_Moneda_Cod").change(function () {
        var index_ID = this.value;
        for (item in Matrix_Moneda) {
            if (Matrix_Moneda[item].MonedaCod_ID == index_ID) {
                $("#V_Sigla_1").html(Matrix_Moneda[item].Sigla);
            }
        }
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;


    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_SucursalServicio("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_SucursalServicio("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_SucursalServicio_create("crear");
        }
        else {
            transacionAjax_SucursalServicio_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_SucursalServicio_delete("elimina");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION PANEL DE CONTROL                                                                                                 ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $(".Dialog_Datos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $('.C_Chosen').trigger('chosen:updated');
            $("#V_Sigla_1").html("");
            ResetError();
            Clear();
            estado = opcion;

            var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

            if (OnlyEmpresa == true) {
                TransaccionesSegunNIT($("#Select_EmpresaNit").val());
            }
            break;

        case "buscar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            $("#V_Sigla_1").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            $("#V_Sigla_1").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            $("#V_Sigla_1").html("");
            estado = opcion;
            Clear();
            break;

    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del Servicio
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#Select_Sucursal").val();
    var Campo_4 = $("#Select_SucursalServicio ").val();

    var validar = 0;

    if (Campo_4 == "-1" || Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (Campo_2 == "") { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
        if (Campo_3 == "") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
        if (Campo_4 == "-1") { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");
    }

    return validar;
}

//validamos si han escogido una columna
function ValidarDroplist() {
    var flag;
    var contenido = $("#DDLColumns").val();

    if (contenido == '-1') {
        flag = 1;
    }
    else {
        flag = 0;
    }
    return flag;
}

// crea la tabla de consulta
function Table_Servicio() {
    var html_Servicio;

    switch (estado) {

        case "buscar":
            html_Servicio = "<table id='TSucursalSer' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Cod Sucursal Servicio</th><th>Sucursal</th><th>Moneda</th><th>Costo</th><th>Capacidad</th><th>Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArraySucursalServicio) {
                if (ArraySucursalServicio[itemArray].Codigo_ID != 0) {
                    html_Servicio += "<tr id= 'TSucursalSer_" + ArraySucursalServicio[itemArray].Codigo_ID + "'><td>" + ArraySucursalServicio[itemArray].Nit_ID + " - " + ArraySucursalServicio[itemArray].DescripEmpresa + "</td><td>" + ArraySucursalServicio[itemArray].Codigo_ID + "</td><td>" + ArraySucursalServicio[itemArray].Surcursal_ID + "</td><td>" + ArraySucursalServicio[itemArray].Cod_Moneda + "</td><td>" + ArraySucursalServicio[itemArray].Costo + "</td><td>" + ArraySucursalServicio[itemArray].Capacidad + "</td><td>" + ArraySucursalServicio[itemArray].Calendario_ID + "</td><td>" + ArraySucursalServicio[itemArray].UsuarioCreacion + "</td><td>" + ArraySucursalServicio[itemArray].FechaCreacion + "</td><td>" + ArraySucursalServicio[itemArray].UsuarioActualizacion + "</td><td>" + ArraySucursalServicio[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Servicio = "<table id='TSucursalSer' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Cod Sucursal Servicio</th><th>Sucursal</th><th>Moneda</th><th>Costo</th><th>Capacidad</th><th>Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArraySucursalServicio) {
                if (ArraySucursalServicio[itemArray].Codigo_ID != 0) {
                    html_Servicio += "<tr id= 'TSucursalSer_" + ArraySucursalServicio[itemArray].Codigo_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArraySucursalServicio[itemArray].Nit_ID + "','" + ArraySucursalServicio[itemArray].Codigo_ID + "')\"></img><span>Editar Sucursal Sevicio</span></span></td><td>" + ArraySucursalServicio[itemArray].Nit_ID + " - " + ArraySucursalServicio[itemArray].DescripEmpresa + "</td><td>" + ArraySucursalServicio[itemArray].Codigo_ID + "</td><td>" + ArraySucursalServicio[itemArray].Surcursal_ID + "</td><td>" + ArraySucursalServicio[itemArray].Cod_Moneda + "</td><td>" + ArraySucursalServicio[itemArray].Costo + "</td><td>" + ArraySucursalServicio[itemArray].Capacidad + "</td><td>" + ArraySucursalServicio[itemArray].Calendario_ID + "</td><td>" + ArraySucursalServicio[itemArray].UsuarioCreacion + "</td><td>" + ArraySucursalServicio[itemArray].FechaCreacion + "</td><td>" + ArraySucursalServicio[itemArray].UsuarioActualizacion + "</td><td>" + ArraySucursalServicio[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Servicio = "<table id='TSucursalSer' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Cod Sucursal Servicio</th><th>Sucursal</th><th>Moneda</th><th>Costo</th><th>Capacidad</th><th>Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArraySucursalServicio) {
                if (ArraySucursalServicio[itemArray].Codigo_ID != 0) {
                    html_Servicio += "<tr id= 'TSucursalSer_" + ArraySucursalServicio[itemArray].Codigo_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArraySucursalServicio[itemArray].Nit_ID + "','" + ArraySucursalServicio[itemArray].Codigo_ID + "')\"></img><span>Eliminar Sucursal Servicio</span></td><td>" + ArraySucursalServicio[itemArray].Nit_ID + " - " + ArraySucursalServicio[itemArray].DescripEmpresa + "</td><td>" + ArraySucursalServicio[itemArray].Codigo_ID + "</td><td>" + ArraySucursalServicio[itemArray].Surcursal_ID + "</td><td>" + ArraySucursalServicio[itemArray].Cod_Moneda + "</td><td>" + ArraySucursalServicio[itemArray].Costo + "</td><td>" + ArraySucursalServicio[itemArray].Capacidad + "</td><td>" + ArraySucursalServicio[itemArray].Calendario_ID + "</td><td>" + ArraySucursalServicio[itemArray].UsuarioCreacion + "</td><td>" + ArraySucursalServicio[itemArray].FechaCreacion + "</td><td>" + ArraySucursalServicio[itemArray].UsuarioActualizacion + "</td><td>" + ArraySucursalServicio[itemArray].FechaActualizacion + "</td></tr>";
                    
                }
            }
            break;
    }

    html_Servicio += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_Servicio);

    $("#TSucursalSer").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Nit, index_Servicio) {

    for (itemArray in ArraySucursalServicio) {
        if (index_Nit == ArraySucursalServicio[itemArray].Nit_ID && index_Servicio == ArraySucursalServicio[itemArray].Codigo_ID) {

            editNit_ID = ArraySucursalServicio[itemArray].Nit_ID;
            editID = ArraySucursalServicio[itemArray].Codigo_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

// muestra el registro a editar
function Editar(index_Nit, index_Servicio) {

    $(".Dialog_Datos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArraySucursalServicio) {
        if (index_Nit == ArraySucursalServicio[itemArray].Nit_ID && index_Servicio == ArraySucursalServicio[itemArray].Codigo_ID) {
            $("#Select_EmpresaNit").val(ArraySucursalServicio[itemArray].Nit_ID).trigger("chosen:updated");
            editNit_ID = ArraySucursalServicio[itemArray].Nit_ID;
            TransaccionesSegunNIT(editNit_ID);
            
            $("#Select_EmpresaNit").prop('disabled', true).trigger("chosen:updated");

            $("#Txt_ID").val(ArraySucursalServicio[itemArray].Codigo_ID);
            $("#Txt_ID").attr("disabled", "disabled");
            editID = ArraySucursalServicio[itemArray].Codigo_ID;

            $("#Select_Sucursal").val(ArraySucursalServicio[itemArray].Surcursal_ID);
            $("#Select_Moneda_Cod").val(ArraySucursalServicio[itemArray].Cod_Moneda);
            $("#TxtCosto").val(ArraySucursalServicio[itemArray].Costo);
            $("#Text_Capacidad").val(ArraySucursalServicio[itemArray].Capacidad);
            $("#Select_Calendario_SS").val(ArraySucursalServicio[itemArray].Calendario_ID);

            $("#Btnguardar").attr("value", "Actualizar");

            $('.C_Chosen').trigger('chosen:updated');
        }
    }
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Txt_ID").val("");
    $("#Select_Sucursal").val("-1");
    $("#Select_Moneda_Cod").val("-1");
    $("#TxtCosto").val("");
    $("#Text_Capacidad").val("");
    $("#Select_Calendario_SS").val("-1");
    $("#V_Sigla_1").html("");
    
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val());
    }
}
