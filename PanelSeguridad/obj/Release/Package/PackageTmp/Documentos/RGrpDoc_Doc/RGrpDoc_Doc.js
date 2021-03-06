﻿/*--------------- region de variables globales --------------------*/
var Matrix_GrpDoc = [];
var Matrix_Doc = [];

var ArrayRGrpDoc_Doc = [];
var ArrayCombo = [];
var ArrayRGrpDoc_DocDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transaccionAjax_MGrpDoc('MATRIX_GRPDOC');
    transaccionAjax_MDoc('MATRIX_DOC');
    Change_Select_Nit();
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

    $("#TablaDatos_D").css("display", "none");
    $("#TablaConsulta").css("display", "none");

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

});

//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        Charge_Combos_Depend_Nit(Matrix_GrpDoc, "Select_GrpDocumento", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Doc, "Select_Documento", index_ID, "");
    });
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos_D").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $('.C_Chosen').trigger('chosen:updated');
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TRGrpDoc_Doc").html("");
            estado = opcion;
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TRGrpDoc_Doc").html("");
            estado = opcion;
            Clear();
            break;

    }
}

//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_RGrpDoc_Doc("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_RGrpDoc_Doc("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_RGrpDoc_Doc_create("crear");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_RGrpDoc_Doc_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Select_GrpDocumento").val();
    var Campo_3 = $("#Select_Documento").val();

    var validar = 0;

    if (Campo_3 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }

        if (Campo_2 == "-1") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
        if (Campo_3 == "-1") {
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

// crea la tabla en el cliente
function Table_RGrpDoc_Doc() {

    var html_RGrpDoc_Doc;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_RGrpDoc_Doc = "<table id='TRGrpDoc_Doc' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Grupo Documento</th><th>Documento</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayRGrpDoc_Doc) {
                if (ArrayRGrpDoc_Doc[itemArray].RGrpDoc_Doc_ID != 0) {
                    html_RGrpDoc_Doc += "<tr id= 'TRGrpDoc_Doc_" + ArrayRGrpDoc_Doc[itemArray].GrpDoc_ID + "'><td>" + ArrayRGrpDoc_Doc[itemArray].Nit_ID + " - " + ArrayRGrpDoc_Doc[itemArray].DescripEmpresa + "</td><td>" + ArrayRGrpDoc_Doc[itemArray].GrpDoc_ID + " - " + ArrayRGrpDoc_Doc[itemArray].DescripGrupoDoc + "</td><td>" + ArrayRGrpDoc_Doc[itemArray].Doc_ID + " - " + ArrayRGrpDoc_Doc[itemArray].DescripDoc + "</td><td>" + ArrayRGrpDoc_Doc[itemArray].UsuarioCreacion + "</td><td>" + ArrayRGrpDoc_Doc[itemArray].FechaCreacion + "</td><td>" + ArrayRGrpDoc_Doc[itemArray].UsuarioActualizacion + "</td><td>" + ArrayRGrpDoc_Doc[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_RGrpDoc_Doc = "<table id='TRGrpDoc_Doc' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Grupo Documento</th><th>Documento</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayRGrpDoc_Doc) {
                if (ArrayRGrpDoc_Doc[itemArray].RGrpDoc_Doc_ID != 0) {
                    Index_Pos = parseInt(ArrayRGrpDoc_Doc[itemArray].Index) - 1;
                    html_RGrpDoc_Doc += "<tr id= 'TRGrpDoc_Doc_" + ArrayRGrpDoc_Doc[itemArray].GrpDoc_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + Index_Pos + "')\"></input></td><td>" + ArrayRGrpDoc_Doc[itemArray].Nit_ID + " - " + ArrayRGrpDoc_Doc[itemArray].DescripEmpresa + "</td><td>" + ArrayRGrpDoc_Doc[itemArray].GrpDoc_ID + " - " + ArrayRGrpDoc_Doc[itemArray].DescripGrupoDoc + "</td><td>" + ArrayRGrpDoc_Doc[itemArray].Doc_ID + " - " + ArrayRGrpDoc_Doc[itemArray].DescripDoc + "</td><td>" + ArrayRGrpDoc_Doc[itemArray].UsuarioCreacion + "</td><td>" + ArrayRGrpDoc_Doc[itemArray].FechaCreacion + "</td><td>" + ArrayRGrpDoc_Doc[itemArray].UsuarioActualizacion + "</td><td>" + ArrayRGrpDoc_Doc[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_RGrpDoc_Doc += "</tbody></table>";
    $("#container_TRGrpDoc_Doc").html("");
    $("#container_TRGrpDoc_Doc").html(html_RGrpDoc_Doc);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TRGrpDoc_Doc").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}

//muestra el registro a eliminar
function Eliminar(Index_GrpDocumento) {

    editNit_ID = ArrayRGrpDoc_Doc[Index_GrpDocumento].Nit_ID;
    editID = ArrayRGrpDoc_Doc[Index_GrpDocumento].GrpDoc_ID;
    editDocID = ArrayRGrpDoc_Doc[Index_GrpDocumento].Doc_ID;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Select_GrpDocumento").val("-1");
    $("#Select_Documento").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}