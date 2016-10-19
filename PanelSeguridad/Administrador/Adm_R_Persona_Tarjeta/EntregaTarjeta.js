﻿/*--------------- region de variables globales --------------------*/
var Matrix_Tarjeta = [];
var Matrix_Persona = [];
var Matrix_RTP = [];

var ArrayR_Persona_Tarjeta = [];
var ArrayR_Persona_TarjetaDep = [];

var estado;
var editNit_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transaccionAjax_MPersona('MATRIX_PERSONA');
    transaccionAjax_MTarjeta('MATRIX_TARJETA');
    transaccionAjax_MRTP('MATRIX_RTP');
    transacionAjax_EmpresaNit('Cliente');

    Change_Select_Nit();
    Change_Select_Tarjeta();

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

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
        Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Tarjeta, "Select_Tarjeta_Ent", index_ID, "");
        $("#Img5").css("display", "none");

    });
    Change_Select_Persona();
}

var Container_Tarjeta;

//valida los cambios del combo  de tarjeta y carga
function Change_Select_Persona() {

    $("#Select_Persona").change(function () {
        Container_Tarjeta = "N";
        var index_ID = $(this).val();

        for (item in Matrix_RTP) {
            if (Matrix_RTP[item].Document_ID == index_ID) {
                $("#Select_Tarjeta_Ent").val(Matrix_RTP[item].Tarjeta_ID);
                Container_Tarjeta = "S";
                break;
            }
        }
        ValidarAsignacion(Container_Tarjeta);
    });

}

//valida si tiene tarjeta asignada
function ValidarAsignacion(Container_Tarjeta) {

    switch (Container_Tarjeta) {
        case "N":
            $("#Select_Tarjeta_Ent").val("-1");
            $("#Select_Tarjeta_Ent").attr("disabled", "disabled");
            $('.C_Chosen').trigger('chosen:updated');

            $("#dialog").dialog("option", "title", "No tiene Tarjeta!");
            $("#Mensaje_alert").text("La persona seleccionada no tiene tarjeta asignada!");
            $("#dialog").dialog("open");
            $("#DE").css("display", "None");
            $("#SE").css("display", "none");
            $("#WE").css("display", "block");
            break;

        case "S":
            $("#Select_Tarjeta_Ent").removeAttr("disabled");
            $('.C_Chosen').trigger('chosen:updated');
            ValidarEntregaTarjeta();
            break;
    }

}

//valida si la persona ya tiene tarjeta entregada
function ValidarEntregaTarjeta() {

    var validaEntrega = $("#Select_Persona").val();
    for (item in Matrix_Tarjeta) {
        if (Matrix_Tarjeta[item].Document_ID_Entrega == validaEntrega) {
            $("#dialog").dialog("option", "title", "Ya tiene Tarjeta!");
            $("#Mensaje_alert").text("La persona seleccionada ya se le entrego tarjeta!");
            $("#dialog").dialog("open");
            $("#DE").css("display", "None");
            $("#SE").css("display", "none");
            $("#WE").css("display", "block");
            break;
        }
    }

}

//valida los cambios del combo de Persona y carga
function Change_Select_Tarjeta() {
    $("#Select_Tarjeta_Ent").change(function () {
        var index_ID = $(this).val();
        for (item in Matrix_RTP) {
            if (Matrix_RTP[item].Tarjeta_ID = index_ID) {
                $("#Select_Persona").val(Matrix_RTP[item].Document_ID);
                $('.C_Chosen').trigger('chosen:updated');
                break;
            }
        }
    });
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_UpdateEntrega("UpdateEntrega");
        }
    }
}

//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Select_Persona").val();
    var Campo_4 = $("#Select_Tarjeta_Ent").val();

    var validar = 0;

    if (Campo_4 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "-1")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");

        if (Campo_4 == "-1")
            $("#Img5").css("display", "inline-table");
        else
            $("#Img5").css("display", "none");

    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img5").css("display", "none");
    }
    return validar;
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Select_Persona").val("-1");
    $("#Select_Tarjeta_Ent").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}