﻿/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          LISTAS DE CARGA                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Documento(State) {
    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'IMPUESTO_GASTO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayTdoc = [];
            }
            else {
                ArrayTdoc = JSON.parse(result);
                charge_CatalogList(ArrayTdoc, "Select_Documento", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_Door_Access(State) {
   
    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": Array_G_Usuario[0].Nit_ID
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                List_Puerta_Acceso = [];
            }
            else {
                List_Puerta_Acceso = JSON.parse(result);
              
            }
        },
        error: function () {

        },
    }).done(function () {
        Charge_Combos_Depend_Nit(List_Puerta_Acceso, "Select_PAcceso", Array_G_Usuario[0].Nit_ID, "");
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_Door_Access_Area(State) {
    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": Array_G_Usuario[0].Nit_ID
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                List_PAcceso_Area = [];
            }
            else {
                List_PAcceso_Area = JSON.parse(result);
            }
        },
        error: function () {
        }
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          CONSULTAS EN PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ShearchPeopleAccess(State, TD, D, NIT, Tarjeta_ID) {

    if (Tarjeta_ID != "") {
        TD = 0;
        D = 0;
    }
    else {
        Tarjeta_ID = 0;
    }

    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "TD": TD,
            "D": D,
            "NIT": NIT,
            "Tarjeta_ID": Tarjeta_ID
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Array_People = [];
            }
            else {
                Array_People = JSON.parse(result);
                switch (Array_People.length) {
                    case 0:
                        Mensaje_General("No existe", "Los datos diligenciados No coinciden con las personas registradas en el sitema", "W");
                        break;

                    case 1:

                        if (Tarjeta_Proccess == 1) {
                            transacionAjax_Search_Foto("Buscar_Foto", Array_People[0].TypeDocument_ID, Array_People[0].Document_ID);
                        }
                        else
                            transacionAjax_Search_Foto("Buscar_Foto", TD, D);
                        break;

                    default:
                        Mensaje_General("existe en varias Empresas", "La persona a ingresar esta registrada en varias empresas ", "W");
                        break;
                }
            }

        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Search_Foto(State, TD, D) {
    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "TD": TD,
            "D": D
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            Datos_principales();
            if (result == "") {
                Array_Foto = [];
            }
            else {
                Array_Foto = JSON.parse(result);
                SearchFoto();
                transacionAjax_Consult_Ingress("Revisa_Ingreso", Array_People[0].TypeDocument_ID, Array_People[0].Document_ID, Array_People[0].Nit_ID);

            }
        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Consult_Ingress(State, TD, D, NIT) {
    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "TD": TD,
            "D": D,
            "NIT": NIT
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            En_Planta = result;
            if (En_Planta != 0)
                Mensaje_General("Esta en planta", "La persona se encuentra registrada en el ingreso", "W");
            else
                Valida_Access_Minimo();
        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Shearch_DocPersona(State, TD, D, NIT) {

    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "TD": TD,
            "D": D,
            "NIT": NIT,
            "TipoSQL": "Persona"
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Array_InfDoc_Persona = [];
            }
            else {
                Array_InfDoc_Persona = JSON.parse(result);
                switch (Array_InfDoc_Persona.length) {
                    case 0:
                        //Mensaje_General("No existe", "la persona No tiene Documentos Fisicos", "W");
                        break;
                    default:
                        Tabla_Persona = 1;
                        break;

                }
            }

        },
        error: function () {

        },
        async: false,
        cache: false
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Shearch_DocEmpresa(State, NIT) {

    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": NIT,
            "TipoSQL": "Empresa"
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Array_InfDoc_Empresa = [];
            }
            else {
                Array_InfDoc_Empresa = JSON.parse(result);
                switch (Array_InfDoc_Empresa.length) {
                    case 0:
                        //Mensaje_General("No existe", "la Empresa No tiene Documentos Fisicos", "W");
                        break;
                    default:
                        Tabla_Empresa = 1;
                        break;
                }
            }

        },
        error: function () {

        },
        async: false,
        cache: false
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Bring_DocPersona(State, TD, D, NIT) {

    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "TD": TD,
            "D": D,
            "NIT": NIT,
            "TipoSQL": "Persona"
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Array_Doc_Persona = [];
            }
            else {
                Array_Doc_Persona = JSON.parse(result);
                switch (Array_Doc_Persona.length) {
                    case 0:
                        //Mensaje_General("No existe", "la persona No tiene Documentos Fisicos", "W");
                        break;
                    default:
                        break;
                }
            }
        },
        error: function () {
        },
        async: false,
        cache: false
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Bring_DocEmpresa(State, NIT) {

    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": NIT,
            "TipoSQL": "Empresa"
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Array_Doc_Persona = [];
            }
            else {
                Array_Doc_Empresa = JSON.parse(result);
                switch (Array_Doc_Empresa.length) {
                    case 0:
                       // Mensaje_General("No existe", "la Empresa No tiene Documentos Fisicos", "W");
                        break;
                    default:
                        break;

                }
            }

        },
        error: function () {

        },
        async: false,
        cache: false
    }).done(function () {
        Paint_Grid_Docs();
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_Access_Predeterminado(State) {
    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": Array_G_Usuario[0].Nit_ID
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                List_Acceso_Predeterminado = [];
            }
            else {
                List_Acceso_Predeterminado = JSON.parse(result);
            }
        },
        error: function () {
        },
    }).done(function () {
        if (Tarjeta_Proccess == 1)
            Tabla_AccesosPredeterminados();
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_Search_Encargado(State) {
    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": Array_G_Usuario[0].Nit_ID,
            "Argumento": $("#Txt_Nombre").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                List_Encargado = [];
            }
            else {
                List_Encargado = JSON.parse(result);
            }
        },
        error: function () {
        },
    }).done(function () {
        Tabla_Encargados();
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Search_Address(State, TD, D) {
    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": Array_G_Usuario[0].Nit_ID,
            "TDoc": TD,
            "Doc": D
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                List_Extencion = [];
            }
            else {
                List_Extencion = JSON.parse(result);
            }
        },
        error: function () {
        },
    }).done(function () {
        Table_Extenciones();
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                         INGRESO DE LA PERSONA                                                                                                             ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_LogAcceso_create(State) {

    //recorer array para el ingreso de los ingresos realizados
    ListIngresoLog = JSON.stringify(Array_IngresoLog);

    $.ajax({
        url: "IngresoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ListIngresoLog": ListIngresoLog
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "falla en el registro ,no puede ingresar", "E");
                    break;

                case "Exito":
                    Mensaje_General("Exito", "se ha registrado el ingreso,la persona puede ingresar", "S");
                    $("#dialog_eliminar").dialog("close");
                    Clear();
                    break;
            }
        },
        error: function () {
        }
    });
}

