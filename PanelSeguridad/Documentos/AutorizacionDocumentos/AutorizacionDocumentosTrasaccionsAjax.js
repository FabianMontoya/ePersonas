﻿/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MDocumento(vp_State, vp_Nit) {
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "Nit": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Documento = [];
            }
            else {
                Matrix_Documento = JSON.parse(result);
            }
        },
        error: function () {

        },
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Documento, "Select_Documento_V", vp_Nit, "");
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MDocWork(vl_State, vp_Nit, vp_TD, vp_D, vp_Type) {
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vl_State,
            "tabla": 'RUTA',
            "Nit": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_DocWork = [];
            }
            else {
                Matrix_DocWork = JSON.parse(result);
            }
        },
        error: function () {

        },
    }).done(function () {
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MRDocVerif(vl_State, vp_Nit) {
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vl_State,
            "Nit": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Doc_Verificacion = [];
            }
            else {
                Matrix_Doc_Verificacion = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MConsecutivo(vp_State, vp_Nit) {
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "Nit": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Consecutivo = [];
            }
            else {
                Matrix_Consecutivo = JSON.parse(result);
                if (Matrix_Consecutivo.length == 0) {
                    Mensaje_General("Exito", "El documento no se puede crear no hay consecutivos! ", "W");
                }
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_RutasOperacion(vp_State) {
    OpenControl();
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                RutasOperacion = [];
            }
            else {
                RutasOperacion = JSON.parse(result);
                RutaTemporal = RutasOperacion[0].RutaDocumentoTemporal;
                RutaRelativa = RutasOperacion[0].RutaRelativaDocumento;
            }
        },
        error: function () {

        },
    }).done(function () {

        var vl_OnlyEmpresa = VerificarNIT("Select_EmpresaNit");
    
        if (vl_OnlyEmpresa == true) {
            Nit_ID_proccess = $("#Select_EmpresaNit").val();
            TransaccionesSegunNIT(Nit_ID_proccess);
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MVerificacion(State) {
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Verificacion = [];
            }
            else {
                Matrix_Verificacion = JSON.parse(result);
                charge_CatalogList(Matrix_Verificacion, "Select_Estado", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CLIENTE'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayEmpresaNit = [];
            }
            else {
                ArrayEmpresaNit = JSON.parse(result);
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit", 1);
            }
        },
        error: function () {

        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_AutorizacionDocumentos(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayAutorizacionDocumentos = [];
            }
            else {
                ArrayAutorizacionDocumentos = JSON.parse(result);
                Table_AutorizacionDocumentos();
            }
        },
        error: function () {

        }
    });
}


/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transaccionAjax_Update_Verificacion(State) {

    var StrNit = $("#Vis_MultiEmpresa_3").val();
    var A_Nit = StrNit.split(" - ");
    var Nit = A_Nit[0];
    Nit = Nit.replace("_", "");

    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": Nit,
            "Documento": $("#Vis_Documento_3").val(),
            "NameDocumento": Doc_name_save,
            "Verificacion_ID": $("#Select_TVerificacion").val(),
            "FVerificacion": $("#TxtFVerificacion").val(),
            "Observacion": $("#TxtA_Observacion").val(),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso del AutorizacionDocumentos!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
                    break;

                case "Exito":
                    if (Array_Documento_Hijo.length == 0) {
                        $("#dialog").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("La ValidacionDocumentos fue Actualizada exitosamente! ");
                        $("#dialog").dialog("open");
                        $("#DE").css("display", "none");
                        $("#SE").css("display", "block");
                        $("#WA").css("display", "none");
                        $("#Dialog_Visor_View").dialog("close");
                        $("#Dialog_Visor").dialog("close");
                        $("#Dialog_Valida_Document").dialog("close");
                        Clear();
                    } else {
                        transacionAjax_UpdateConsecutivo("Update_Consecutivo", ConsecutivoNuevo);
                    }
                    break;
            }

        },
        error: function () {

        }
    });
}

/*                  PASO 1 CON DOCUMENTOS ANEXOS                  */
/*------------------------------ crear documento ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_UpdateConsecutivo(State, Consecutivo) {

    Consecutivo = Consecutivo + 1;
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Consecutivo": Consecutivo,
            "Nit_ID": Nit_ID_proccess
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            transacionAjax_ListDocument_Anexos("Update_D_Exist_D_Asociados");
        },
        error: function () {

        }
    });

}

/*                  PASO 2 CON DOCUMENTOS ANEXOS                  */
/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_ListDocument_Anexos(State) {

    //recorer array para el ingreso de los documentos hijos
    listDocAnexos = JSON.stringify(Array_Documento_Hijo);

    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "listDocAnexos": listDocAnexos
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso del Validación Documentos!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
                    break;

                case "Exito":
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("La Validacion Documentos fue Actualizada exitosamente, ademas se anexaron documentos de validación! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WA").css("display", "none");
                    $("#Dialog_Visor_View").dialog("close");
                    $("#Dialog_Visor").dialog("close");
                    $("#Dialog_Valida_Document").dialog("close");
                    Clear();
                    transaccionAjax_MDocWork('MATIRXDOC_WORK');
                    break;
            }

        },
        error: function () {

        }
    });
}

/*------------------------------ crear documento ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_DeleteDocument(State, Ruta, nombre) {

    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Ruta": Ruta,
            "Doc_name": nombre
        },
        //Transaccion Ajax en proceso
        success: function (result) {
        },
        error: function () {

        }
    });
}
