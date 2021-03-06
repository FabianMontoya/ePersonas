﻿/*--------------- region de variables globales --------------------*/
var ArrayCargo = [];
var ArrayCombo = [];
var ArrayCargoDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
var Nit_ID_proccess;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
       
    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');

    Change_Select_Nit();
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $(".Dialog_Datos").css("display", "none");
    $("#TablaConsulta").css("display", "none");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    OpenControl(); //Abrimos el load de espera con el logo

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Cargo("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Cargo("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Cargo_create("crear");
        }
        else {
            transacionAjax_Cargo_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl(); //Abrimos el load de espera con el logo
    transacionAjax_Cargo_delete("elimina");
    filtro = "N";
    opcion = "ALL";
    transacionAjax_Cargo("consulta", filtro, opcion);
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 PROCESOS GENERALES DE LA PAGINA                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//carga el combo de Cargo dependiente
function Change_Select_Nit() {

    $("#Select_EmpresaNit").change(function () {
        index_ID = $(this).val();
        Nit_ID_proccess = $(this).val();
        TransaccionesSegunNIT(index_ID);
    });

}

//Carga los combos de los registros relacionados con Select_Nit
function TransaccionesSegunNIT(index_ID) {
    if (index_ID != "-1") {
        transacionAjax_Seguridad('Seguridad', index_ID);
        transacionAjax_CargoDepend('Cargo_Dep', index_ID);
    }
}

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
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      REGION VALIDACIONES DEL PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();

    var validar = 0;

    if (Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }

        if (Campo_2 == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
        if (Campo_3 == "") {
            $("#Img3").css("display", "inline-table");
        }
        else {
            $("#Img3").css("display", "none");
        }

    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                  TABLA DE AREA                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// crea la tabla en el cliente
function Table_Cargo() {

    var html_Cargo;
    var vl_Index_Cargo;
    var vl_dependencia;

    switch (estado) {

        case "buscar":
            html_Cargo = "<table id='TCargo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Área</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCargo) {

                if (ArrayCargo[itemArray].Cargo_ID != 0) {

                    if (ArrayCargo[itemArray].CargoDependencia == 0)
                        vl_dependencia = "";
                    else
                        vl_dependencia = ArrayCargo[itemArray].DescripCargoDepen;

                    html_Cargo += "<tr id= 'TCargo_" + ArrayCargo[itemArray].Cargo_ID + "'><td>" + ArrayCargo[itemArray].Nit_ID + " - " + ArrayCargo[itemArray].DescripEmpresa + "</td><td>" + ArrayCargo[itemArray].Cargo_ID + "</td><td>" + ArrayCargo[itemArray].Descripcion + "</td><td>" + vl_dependencia + "</td><td>" + ArrayCargo[itemArray].DescripPolitica + "</td><td>" + ArrayCargo[itemArray].UsuarioCreacion + "</td><td>" + ArrayCargo[itemArray].FechaCreacion + "</td><td>" + ArrayCargo[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCargo[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Cargo = "<table id='TCargo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Área</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCargo) {
                if (ArrayCargo[itemArray].Cargo_ID != 0) {

                    vl_Index_Cargo = parseInt(ArrayCargo[itemArray].Index) - 1;
                    if (ArrayCargo[itemArray].CargoDependencia == 0)
                        vl_dependencia = "";
                    else
                        vl_dependencia = ArrayCargo[itemArray].DescripCargoDepen;

                    html_Cargo += "<tr id= 'TCargo_" + ArrayCargo[itemArray].Cargo_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + vl_Index_Cargo + "')\"></img><span>Editar Cargo</span></span></td><td>" + ArrayCargo[itemArray].Nit_ID + " - " + ArrayCargo[itemArray].DescripEmpresa + "</td><td>" + ArrayCargo[itemArray].Cargo_ID + "</td><td>" + ArrayCargo[itemArray].Descripcion + "</td><td>" + vl_dependencia + "</td><td>" + ArrayCargo[itemArray].DescripPolitica + "</td><td>" + ArrayCargo[itemArray].UsuarioCreacion + "</td><td>" + ArrayCargo[itemArray].FechaCreacion + "</td><td>" + ArrayCargo[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCargo[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Cargo = "<table id='TCargo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Área</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCargo) {
                if (ArrayCargo[itemArray].Cargo_ID != 0) {

                    vl_Index_Cargo = parseInt(ArrayCargo[itemArray].Index) - 1;
                    if (ArrayCargo[itemArray].CargoDependencia == 0)
                        vl_dependencia = "";
                    else
                        vl_dependencia = ArrayCargo[itemArray].DescripCargoDepen;

                    html_Cargo += "<tr id= 'TCargo_" + ArrayCargo[itemArray].Cargo_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + vl_Index_Cargo + "')\"></img><span>Eliminar Cargo</span></span></td><td>" + ArrayCargo[itemArray].Nit_ID + " - " + ArrayCargo[itemArray].DescripEmpresa + "</td><td>" + ArrayCargo[itemArray].Cargo_ID + "</td><td>" + ArrayCargo[itemArray].Descripcion + "</td><td>" + vl_dependencia + "</td><td>" + ArrayCargo[itemArray].DescripPolitica + "</td><td>" + ArrayCargo[itemArray].UsuarioCreacion + "</td><td>" + ArrayCargo[itemArray].FechaCreacion + "</td><td>" + ArrayCargo[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCargo[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Cargo += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_Cargo);

    $("#TCargo").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(vp_index) {

    editID = ArrayCargo[vp_index].Cargo_ID;
    editNit_ID = ArrayCargo[vp_index].Nit_ID;
    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

// muestra el registro a editar
function Editar(vp_index) {

    $(".Dialog_Datos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    editNit_ID = ArrayCargo[vp_index].Nit_ID;
    TransaccionesSegunNIT(editNit_ID);
    editID = ArrayCargo[vp_index].Cargo_ID;

    $("#Select_EmpresaNit").val(ArrayCargo[vp_index].Nit_ID);
    $("#Txt_ID").val(ArrayCargo[vp_index].Cargo_ID);
    $("#TxtDescription").val(ArrayCargo[vp_index].Descripcion);

    $("#Select_EmpresaNit").attr("disabled", "disabled");
    $("#Txt_ID").attr("disabled", "disabled");

    setTimeout("CargaCombos('" + ArrayCargo[vp_index].CargoDependencia + "', '" + ArrayCargo[vp_index].Politica_ID + "')", 400);

    $("#Btnguardar").attr("value", "Actualizar");
    $('.C_Chosen').trigger('chosen:updated');

}

//carga combos que dependen de una trnasaccion
function CargaCombos(vp_Cargo, vp_Politica) {

    if (vp_Cargo == 0) {
        $('#Select_CargoDepent').val('-1').trigger('chosen:updated');
    } else {
        $('#Select_CargoDepent').val(vp_Cargo).trigger('chosen:updated');
    }

    if (vp_Politica == 0) {
        $('#Select_Politica').val('-1').trigger('chosen:updated');
    }
    else {
        $('#Select_Politica').val(vp_Politica).trigger('chosen:updated');
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {
    var vl_Estado = $('#Select_EmpresaNit').is(':disabled');

    if (vl_Estado == true) {
        $("#Select_EmpresaNit").val(Nit_ID_proccess).trigger('chosen:updated');
    }
    else {
        $("#Select_EmpresaNit").val("-1").trigger('chosen:updated');
    }

    $("#Txt_ID").val("");
    $("#TxtDescription").val("");
    $("#Select_CargoDepent").empty().trigger('chosen:updated');
    $("#Select_Politica").empty().trigger('chosen:updated');

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1").trigger('chosen:updated');

    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val());
    }

}