﻿/*--------------- region de variables globales --------------------*/
var Matrix_Tarjeta = [];
var Matrix_Persona = [];
var Matrix_RTP = [];
var ArrayBloqueo = [];


var ArrayR_Persona_Tarjeta = [];
var ArrayR_Persona_TarjetaDep = [];

var estado;
var editNit_ID;
var editID;
var editDocID;
var Container_Tarjeta;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    
    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE MÉTODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Bloqueo("C_Bloqueo");
    
    Change_Select_Nit();
    Change_Select_Tarjeta();

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
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    $("#DIV_Bloqueo").css("display", "none");
    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $(".Dialog_Datos").css("padding-bottom", "20%");
    $("#TablaConsulta").css("display", "none");
}

//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        TransaccionesSegunNIT(index_ID);
    });
    Change_Select_Persona();
}

//Valida la informacio a la que puede acceder segun el usuario
function TransaccionesSegunNIT(index_ID) {
    if (index_ID != "-1") {
        transaccionAjax_MPersona('MATRIX_PERSONA');
        transaccionAjax_MTarjeta('MATRIX_TARJETA');
        transaccionAjax_MRTP('MATRIX_RTP');
        Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Tarjeta, "Select_Tarjeta_Blo", index_ID, "");
        $("#Img5").css("display", "none");
        $("#DIV_Bloqueo").css("display", "none");
    }
}

//valida los cambios del combo  de tarjeta y carga
function Change_Select_Persona() {

    $("#Select_Persona").change(function () {
        Container_Tarjeta = "N";
        var index_ID = $(this).val();

        for (item in Matrix_RTP) {
            if (Matrix_RTP[item].Document_ID == index_ID) {
                $("#Select_Tarjeta_Blo").val(Matrix_RTP[item].Tarjeta_ID);
                Container_Tarjeta = "S";
               
                break;
            }
        }
        ValidarAsignacion(Container_Tarjeta);
    });
}

//valida los cambios del combo de Persona y carga
function Change_Select_Tarjeta() {
    $("#Select_Tarjeta_Blo").change(function () {
        Container_Tarjeta = "S";

        var index_ID = $(this).val();
        for (item in Matrix_RTP) {
            if (Matrix_RTP[item].Tarjeta_ID == index_ID) {
                $("#Select_Persona").val(Matrix_RTP[item].Document_ID);
                $('.C_Chosen').trigger('chosen:updated');
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
            $("#Select_Tarjeta_Blo").val("-1");
            $("#Select_Tarjeta_Blo").attr("disabled", "disabled");
            $('.C_Chosen').trigger('chosen:updated');

            $("#dialog").dialog("option", "title", "No tiene Tarjeta!");
            $("#Mensaje_alert").text("La persona seleccionada no tiene tarjeta asignada!");
            $("#dialog").dialog("open");
            $("#DE").css("display", "None");
            $("#SE").css("display", "none");
            $("#WE").css("display", "block");
            $("#DIV_Bloqueo").css("display", "none");
            break;

        case "S":
            $("#Select_Tarjeta_Blo").removeAttr("disabled");
            $("#DIV_Bloqueo").css("display", "inline-table");
            $('.C_Chosen').trigger('chosen:updated');
            ValidarBloqueoTarjeta();
            break;
    }

}

//valida si la persona ya tiene tarjeta Bloqueada
function ValidarBloqueoTarjeta() {

    var validaDoc = $("#Select_Persona").val();
    for (item in Matrix_Tarjeta) {
        if (Matrix_Tarjeta[item].Document_ID_Asigna == validaDoc) {
            var Estado_Tarjeta = Matrix_Tarjeta[item].Estado;

                  
            switch (Estado_Tarjeta) {
                case "3":
                    $("#dialog").dialog("option", "title", "Ya tiene Tarjeta!");
                     $("#Mensaje_alert").text("La persona seleccionada ya tiene la tarjeta bloqueada!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "None");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    $("#DIV_Bloqueo").css("display", "none");
                    break;

                case "4":
                    $("#dialog").dialog("option", "title", "Ya tiene Tarjeta!");
                    $("#Mensaje_alert").text("La persona seleccionada ya tiene la tarjeta Anulada!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "None");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    $("#DIV_Bloqueo").css("display", "none");
                    break;
            }
        }
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_UpdateBloqueo("UpdateBloqueo");
        }
    }
}

//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Select_Persona").val();
    var Campo_3 = $("#Select_Bloqueo").val();
    var Campo_4 = $("#Select_Tarjeta_Blo").val();

    var validar = 0;

    if (Campo_4 == "-1" || Campo_3 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "-1")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");

        if (Campo_3 == "-1")
            $("#Img3").css("display", "inline-table");
        else
            $("#Img3").css("display", "none");

        if (Campo_4 == "-1")
            $("#Img5").css("display", "inline-table");
        else
            $("#Img5").css("display", "none");

    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
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
    $("#Select_Persona").val("-1").empty().trigger('chosen:updated');
    $("#Select_Tarjeta_Blo").val("-1").empty().trigger('chosen:updated');
    $("#Select_Bloqueo").val("-1");
    $("#TxtA_Observacion").val("");

    $("#DIV_Bloqueo").css("display", "none");
    $('.C_Chosen').trigger('chosen:updated');
    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val());
    }
}