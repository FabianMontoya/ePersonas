﻿/*--------------- region de variables globales --------------------*/
var Matrix_Sucursal = [];
var Matrix_Moneda = [];
var Matrix_Sucursal = [];
var ArrayTdoc = [];
var Matrix_Ciclo = [];
var Matrix_Productos = [];
var Matrix_Financiacion = [];
var Matrix_Direcciones = [];
var Matrix_Tasas = [];

var ArrayC_Contrato = [];
var ArrayEmpresaNit = [];
var Array_Hijo_Cliente = [];
var ArrayEstado = [];
var ArrayTerceros = [];

var ID;
var T_Doc;
var Doc;

var NIT;
var tiempo;
var baseCalculo;
var ciclo;
var Modalidad;

var Periodo_Pago;
var Tipo_Cuota;
var Tasa;
var Pto_Adicionales;

var TEbase;
var TNbase;

var signo;
var numero;
var namePersona;

var Persona1 = false;
var Persona2 = false;
var ContTerceros = 0;

/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    $("#Marco_trabajo_Contrato").css("height", "440px");
    $("#Marco_trabajo_Contrato").css("width", "95%");

    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Documento('Documento');
    transacionAjax_MMoneda('MATRIX_MONEDA');
    transaccionAjax_MSucursal('MATRIX_SUCURSAL');
    transaccionAjax_MCiclo('MATRIX_CICLO');
    transacionAjax_Productos('MATRIX_PRODUCTOS');
    transacionAjax_Financiacion('MATRIX_FINANCIACION');
    transaccionAjax_MTasas('MATRIX_TASAS');

    Ocultar_IMGS_Errores();

    //Imagenes de los dialog con mensajes
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");

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

    $("#Dialog_Activos").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1100,
        height: 600,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Terceros").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 760,
        height: 430,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#T_Activo_Grid").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

    $("#T_Terceros").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

    //Dialog para agregar la dirección
    $("#Dialog_Format_Adress").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1000,
        height: 250,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    Picker_Fechas();

    $(function () { //Función del acordeon
        $("#Acordeon_Contrato").accordion({
            heightStyle: "content",
            collapsible: true
        });
    });

    $("#Select_Base_Calculo").prop('disabled', true); //Desactivamos el Chosen
    Change_Select_Nit();
    Change_Select_Sucursal();
    Change_Select_Moneda();
    Change_Select_Documento_C();
    Change_Select_Documento_C2();

    Change_Select_Producto();
    Change_Select_Condicion_Financiacion();
    Change_Select_Unidad_Tiempo();
    Change_Select_Signo_Puntos();
    Change_Select_Base_Calculo();

    Format_Adress("Txt_Adress_C");
    Restric_long_decimal("TXT_Puntos_Adicionales");
    ReCalcularTasas("TXT_Puntos_Adicionales");
    Date_Document();
    Date_Document2();
});

//Ocultamos las imagenes de error al iniciar la pantalla
function Ocultar_IMGS_Errores() {
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img4").css("display", "none"); //Img del Warning del Alert
    $("#Img5").css("display", "none");

    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#Img8").css("display", "none");
    $("#Img9").css("display", "none");
    $("#Img10").css("display", "none");

    $("#Img11").css("display", "none");
    $("#Img12").css("display", "none");
    $("#Img13").css("display", "none");
    $("#Img14").css("display", "none");
    $("#Img15").css("display", "none");

    $("#Img16").css("display", "none");
    $("#Img17").css("display", "none");
    $("#Img18").css("display", "none");
    $("#Img19").css("display", "none");
    $("#Img20").css("display", "none"); //Terceros

    $("#Img_TD_C").css("display", "none");
    $("#Img_D_C").css("display", "none");
    $("#Img_TD_C2").css("display", "none");
    $("#Img_D_C2").css("display", "none");
}

//Función de control del picker de las fechas
function Picker_Fechas() {
    $("#TXT_Fecha_Apertura").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true }); //Inicializa Datapicker
    $("#TXT_Fecha_Apertura").datepicker("option", "yearRange", "-99:+0"); //Rango años hacia atras (-99)
    $("#TXT_Fecha_Apertura").datepicker("option", "maxDate", "+0m +0d"); //Rango días (Llega hasta el actual y bloquea los futuros)
    //$("#TXT_Fecha_Activacion").datepicker({ dateFormat: 'yy-mm-dd'});
    //$("#TXT_Fecha_Finalizacion").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 }); //Bloquea las fechas pasadas, solo fechas futuras
    //$("#TXT_Fecha_Cancelacion").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
    //$("#TXT_Fecha_Ult_Causacion").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
    //$("#TXT_Fecha_Ult_Factura").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
    //$("#TXT_Fecha_Prox_Factura").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//salida del formulario
function ReCalcularTasas(object) {
    $("#" + object).blur(function () {
        puntos = $("#TXT_Puntos_Adicionales").val();
        PuntosAdicionales_Tasas(TNbase, puntos);
    });
}

//valida campos de documentos para buscar persona
function ValidaCamposPeople() {
    var valida = 0;
    var C_Nit_ID = $("#Select_EmpresaNit").val();
    var C_TD = $("#Select_Documento_C").val();
    var C_D = $("#TxtDoc_C").val();

    if (C_Nit_ID == "-1" || C_TD == "-1" || C_D == "") {
        valida = 1;
        if (C_TD == "-1") {
            $("#Img_TD_C").css("display", "inline-table");
        }
        else {
            $("#Img_TD_C").css("display", "none");
        }
        if (C_D == "") {
            $("#Img_D_C").css("display", "inline-table");
        }
        else {
            $("#Img_D_C").css("display", "none");
        }
        if (C_Nit_ID == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img_TD_C").css("display", "none");
        $("#Img_D_C").css("display", "none");
    }
    return valida;
}

//valida campos de documentos para buscar persona en agregar terceros
function ValidaCamposPeople2() {
    var valida = 0;
    var C_TD = $("#Select_Documento_C2").val();
    var C_D = $("#TxtDoc_C2").val();

    if (C_TD == "-1" || C_TD == null || C_D == "" || C_D == null) {
        valida = 1;
        if (C_TD == "-1" || C_TD == null) {
            $("#Img_TD_C2").css("display", "inline-table");
        }
        else {
            $("#Img_TD_C2").css("display", "none");
        }
        if (C_D == "" || C_D == null) {
            $("#Img_D_C2").css("display", "inline-table");
        }
        else {
            $("#Img_D_C2").css("display", "none");
        }

    }
    else {
        $("#Img_TD_C2").css("display", "none");
        $("#Img_D_C2").css("display", "none");
    }
    return valida;
}

//Valida que ya haya seleccionado una empresa y escrito el número de la colocación para agregar un tercero
function ValidarIDColocacion() {
    var valido = false;
    var NIT = $("#Select_EmpresaNit").val();
    var ID_Colocacion = $("#TXT_ID_Colocacion").val();

    if (NIT == "-1" || NIT == null || ID_Colocacion == "" || ID_Colocacion == null) {
        Mensaje_General("¡Campos Incompletos!", "Los campos [NIT Empresa] y [Número de Colocación] son obligatorios para poder agregar una persona.", "E");

        if (NIT == "-1" || NIT == null) {
            $("#Img1").css("display", "inline-table");
        }

        if (ID_Colocacion == "" || ID_Colocacion == null) {
            $("#Img2").css("display", "inline-table");
        }

    } else {
        $("#Img2").css("display", "none");
        $("#Img1").css("display", "none");
        Add_Terceros();
    }
}

//Valida que ya haya seleccionado una empresa y escrito el número de la colocación para agregar un tercero
function ValidarIngresoTerceros() {
    var valido = false;
    var TypeDocumento = $("#Select_Documento_C2").val();
    var Documento = $("#TxtDoc_C2").val();
    var Relacion = $("#Select_Relacion").val();

    if (TypeDocumento == "-1" || TypeDocumento == null || Documento == "" || Documento == null || Relacion == "-1" || Relacion == null) {
        Mensaje_General("¡Campos Incompletos!", "Debes completar los campos obligatorios para poder agregar una persona.", "E");

        if (TypeDocumento == "-1" || TypeDocumento == null) {
            $("#Img_TD_C2").css("display", "inline-table");
        }

        if (Relacion == "-1" || Relacion == null) {
            $("#Img20").css("display", "inline-table");
        }

        if (Documento == "" || Documento == null) {
            $("#Img_D_C2").css("display", "inline-table");
        }

    } else {
        $("#Img_TD_C2").css("display", "none");
        $("#Img_D_C2").css("display", "none");
        $("#Img20").css("display", "none");
        valido = true;
    }

    return valido;
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESO DE CARGUE                                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//carga el combo 
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit").val() == "-1") {
            $("#Img1").css("display", "inline-table");
        } else {
            $("#Img1").css("display", "none");
        }
        var index_ID = this.value;
        Charge_Combos_Depend_Nit(Matrix_Sucursal, "Select_Sucursal_C", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Productos, "Select_Producto", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Financiacion, "Select_Condicion_Financiacion", index_ID, "");

        /*Escritura de L_Tasa_Mora*/
        $("#L_Tasa_Mora").html(TasaMora);

        /*Escritura de L_Tasa_Usura*/
        $("#L_Tasa_Usura").html(TasaUsura);
    });
}

function Change_Select_Sucursal() {
    $("#Select_Sucursal_C").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Sucursal_C").val() == "-1") {
            $("#Img7").css("display", "inline-table");
        } else {
            $("#Img7").css("display", "none");
        }
    });
}

//valida campo y consulta datos de persona
function Date_Document() {

    $("#TxtDoc_C").blur(function () {

        var valida_people = ValidaCamposPeople();
        if (valida_people == 1) {
            Mensaje_General("¡Campos Incompletos!", "Los campos [NIT Empresa], [Documento] e [Identificación] deben ser diligenciados para consultar la persona.", "E");
        }
        else {
            var C_TD = $("#Select_Documento_C").val();
            var C_D = $("#TxtDoc_C").val();
            var Nit = $("#Select_EmpresaNit").val();

            transacionAjax_ShearchPeople("Buscar_Persona", C_TD, C_D, Nit, "V_Persona");
            transaccionAjax_MDirecciones("MATRIX_DIRECCIONES", C_TD, C_D);
        }

    });
}

function Date_Document2() {

    $("#TxtDoc_C2").blur(function () {
        Persona2 = false;
        var valida_people = ValidaCamposPeople2();
        if (valida_people == 1) {
            Mensaje_General("¡Campos Incompletos!", "Los campos [Documento] e [Identificación] deben ser diligenciados para consultar la persona.", "E");
        }
        else {
            var C_TD = $("#Select_Documento_C2").val();
            var C_D = $("#TxtDoc_C2").val();
            var Nit = $("#Select_EmpresaNit").val();

            transacionAjax_ShearchPeople("Buscar_Persona", C_TD, C_D, Nit, "V_Persona2");
        }

    });
}

function Change_Select_Documento_C() {
    $("#Select_Documento_C").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Documento_C").val() == "-1") {
            $("#Img_TD_C").css("display", "inline-table");
        } else {
            $("#Img_TD_C").css("display", "none");
        }

        $("#TxtDoc_C").val("");
        $("#V_Persona").html(" ");
    });
}

function Change_Select_Documento_C2() {
    $("#Select_Documento_C2").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Documento_C2").val() == "-1") {
            $("#Img_TD_C2").css("display", "inline-table");
        } else {
            $("#Img_TD_C2").css("display", "none");
        }

        $("#TxtDoc_C2").val("");
        $("#V_Persona2").html(" ");
    });
}

function Change_Select_Moneda() {
    $("#Select_Moneda_C").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Moneda_C").val() == "-1") {
            $("#Img8").css("display", "inline-table");
        } else {
            $("#Img8").css("display", "none");
        }
        var index_ID = this.value;
        for (item in Matrix_Moneda) {
            if (Matrix_Moneda[item].MonedaCod_ID == index_ID) {
                $("#L_Moneda").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_1").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_2").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_3").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_4").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_5").html(Matrix_Moneda[item].Sigla);
            } else if (index_ID == "-1") {
                $("#L_Moneda").html("");
                $("#L_Moneda_1").html("");
                $("#L_Moneda_2").html("");
                $("#L_Moneda_3").html("");
                $("#L_Moneda_4").html("");
                $("#L_Moneda_5").html(Matrix_Moneda[item].Sigla);
            }
        }
    });
}

function Change_Select_Producto() {
    $("#Select_Producto").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Producto").val() == "-1") {
            $("#Img9").css("display", "inline-table");
        } else {
            $("#Img9").css("display", "none");
        }
    });
}

function Change_Select_Condicion_Financiacion() {
    $("#Select_Condicion_Financiacion").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Condicion_Financiacion").val() == "-1") {
            $("#Img10").css("display", "inline-table");
        } else {
            $("#Img10").css("display", "none");
        }

        var index_ID = this.value; //el value es el index
        index_ID = parseInt(index_ID) - 1;


        NIT = Matrix_Financiacion[index_ID].Nit_ID;
        tiempo = Matrix_Financiacion[index_ID].Unidad_Tiempo;
        baseCalculo = Matrix_Financiacion[index_ID].Base_Calculo;
        ciclo = Matrix_Financiacion[index_ID].Ciclo_Cobro_FK;
        Modalidad = Matrix_Financiacion[index_ID].Modalidad_Pago;

        Periodo_Pago = Matrix_Financiacion[index_ID].Periodo_Pago;
        Tipo_Cuota = Matrix_Financiacion[index_ID].Tipo_Cuota;
        Base_Calculo = Matrix_Financiacion[index_ID].Base_Calculo;
        Tasa = Matrix_Financiacion[index_ID].Tasa_FK;
        Pto_Adicionales = Matrix_Financiacion[index_ID].Puntos_Adicionales;

        $("#Select_Tiempo").val(tiempo).trigger("chosen:updated");
        $("#Select_Base_Calculo").val(baseCalculo).trigger("chosen:updated");
        $("#Select_Ciclo").val(ciclo).trigger("chosen:updated");
        $("#Select_Ciclo_2").val(ciclo).trigger("chosen:updated");
        CambiarTiempo(tiempo);

        /*Cambio L_Modalidad de pago*/
        if (Modalidad == "A") {
            $("#L_Modalidad_Pago").html("A - Anticipado");
        } else if (Modalidad == "V") {
            $("#L_Modalidad_Pago").html("V - Vencido");
        } else {
            $("#L_Modalidad_Pago").html("");
        }

        /*Cambio L_Periodo_Pago*/
        $("#L_Periodo_Pago").html(Periodo_Pago);

        /*Cambio L_Tipo_Cuota*/
        if (Tipo_Cuota == 1) {
            $("#L_Tipo_Cuota").html("1 - Capital");
        } else if (Tipo_Cuota == 2) {
            $("#L_Tipo_Cuota").html("2 - Solo Interés");
        } else if (Tipo_Cuota == 3) {
            $("#L_Tipo_Cuota").html("3 - Capital + Interés");
        } else if (Tipo_Cuota == 4) {
            $("#L_Tipo_Cuota").html("4 - Capital + Interés + Otros Conceptos");
        } else if (Tipo_Cuota == 5) {
            $("#L_Tipo_Cuota").html("5 - Otros Conceptos");
        } else if (Tipo_Cuota == 6) {
            $("#L_Tipo_Cuota").html("6 - Canon de Arriendo");
        } else if (Tipo_Cuota == 7) {
            $("#L_Tipo_Cuota").html("7 - A Solicitud");
        }

        /*Cambio L_Base_Calculo*/
        if (baseCalculo == 1) {
            $("#L_Base_Calculo").html("1 - 360/360");
        } else if (baseCalculo == 2) {
            $("#L_Base_Calculo").html("2 - 365/365");
        }


        var indexTasa;
        for (item in Matrix_Tasas) {
            if (Matrix_Tasas[item].Codigo_ID == Tasa && Matrix_Tasas[item].Nit_ID == NIT) {
                indexTasa = Matrix_Tasas[item].Index;
            }
        }


        /*--------------------*/
        /*Validamos si el número que entra es negativo o no para mostrarlo en el TXT de puntos adicionales*/
        signo = Pto_Adicionales.toString().substring(0, 1);

        if (signo == "-") {
            /*Si hay signo negativo se cambia el combo del simbolo y se toman solo el número sin el signo*/
            numero = Pto_Adicionales.toString().substring(1, Pto_Adicionales.toString().length);
            $("#Select_Signo_Puntos").val(signo).trigger("chosen:updated");
        } else {
            numero = Pto_Adicionales;
            signo = "+";
            $("#Select_Signo_Puntos").val(signo).trigger("chosen:updated");
        }

        TNbase = Nominal_Anual(indexTasa);
        TEbase = Equivalencia_Efectiva(indexTasa);
        /*Si hay puntos adicionales los escribimos en el TXT, sino, dejamos en blanco*/
        if (numero == 0) {
            $("#TXT_Puntos_Adicionales").val(""); /*Dejamos en blanco si no hay puntos adicionales*/
            escribirTasas(TNbase, TEbase); //Cómo no hay puntos adicionales no recalculamos las Tasas
        } else {
            numero = LlenarCeros(numero, 4);
            $("#TXT_Puntos_Adicionales").val(numero); /*Escribimos los puntos adicionales que trae la financiacion seleccionada*/
            PuntosAdicionales_Tasas(TNbase, numero); //Como hay puntos adicionales recalculamos la TE y la TN
        }
        /*--------------------*/

        /*Escritura de L_Codigo_Tasa*/
        $("#L_Tasa").html(Descripcion_Tasa(indexTasa)); /*Mandamos en indice de la matriz de tasas y traemos la descripción armada*/

        /*Escritura L_Periodo*/
        $("#L_Periodo").html(Periodo_Tasa(indexTasa)); /*Mandamos el indice de la matriz de tasas y traemos el Periodo armado*/



    });
}

function Change_Select_Unidad_Tiempo() {
    $("#Select_Tiempo").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Tiempo").val() == "-1") {
            $("#Img11").css("display", "inline-table");
        } else {
            $("#Img11").css("display", "none");
        }

        var index_ID = this.value;
        CambiarTiempo(index_ID);
    });
}

function Change_Select_Signo_Puntos() {
    $("#Select_Signo_Puntos").change(function () {
        signo = this.value; //Tomamos el signo que cambia
        puntos = $("#TXT_Puntos_Adicionales").val(); //Retomamos el valor de los puntos adicionales que hayan en en TXT
        PuntosAdicionales_Tasas(TNbase, puntos); //Llamamos función para recalcular las TE y TN según el nuevo simbolo
    });
}

function CambiarTiempo(index_ID) {
    if (index_ID == "D") {
        $("#L_Tiempo").html("Días");
        $("#L_Tiempo_2").html("Días");
    } else if (index_ID == "M") {
        $("#L_Tiempo").html("Meses");
        $("#L_Tiempo_2").html("Meses");
    } else if (index_ID == "S") {
        $("#L_Tiempo").html("Semestres");
        $("#L_Tiempo_2").html("Semestres");
    } else if (index_ID == "A") {
        $("#L_Tiempo").html("Años");
        $("#L_Tiempo_2").html("Años");
    } else {
        $("#L_Tiempo").html("");
        $("#L_Tiempo_2").html("");
    }
}

//Funcion que suma los puntos adicionales a la TN y re calculo la TE de acuerdo a este
function PuntosAdicionales_Tasas(tn, pts) {

    var TE = 0;
    var TN = 0;
    var PUNTOS = 0;

    if (baseCalculo == 1) {
        base = 360;
    } else if (baseCalculo == 2) {
        base = 365;
    }
    console.log("Base_Cal: " + baseCalculo + " / base = " + base);
    TN = tn / 100;
    PUNTO = pts / 100;

    switch (signo) {
        case "-":
            TN = TN - (PUNTO);
            break;
        case "+":
            TN = TN + (PUNTO);
            break;
    }

    TE = TasaEfectiva(base, tiempo, 1, Modalidad, TN);

    TN = TN * 100;
    TE = TE * 100;

    escribirTasas(TN, TE);
}

//Función que escribe los respectivos valores de TN y TE en los labels
function escribirTasas(TN, TE) {
    $("#L_Nominal_Actual").html(TN + "%"); /*Mandamos el indice de la matriz de tasas y traemos el valor*/
    $("#L_Equivalencia_Efectiva").html(TE + "%"); /*Mandamos el indice de la matriz de tasas y traemos el valor*/
}

function Change_Select_Base_Calculo() {
    $("#Select_Base_Calculo").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Base_Calculo").val() == "-1") {
            $("#Img15").css("display", "inline-table");
        } else {
            $("#Img15").css("display", "none");
        }
    });
}

//crear link en la BD
function BtnCrear() {
    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        //transacionAjax_C_Contrato_create("crear");
        Mensaje_General("¡Colocación Agregada!", "La colocación se ha agregado correctamente.", "S");
    } else if (validate == 1) {
        var mensaje = "";
        Mensaje_General("¡Falta Completar Campos!", "Debe completar los campos obligatorios. Los campos faltantes se han marcado con una (X)", "W");
    }
}

//validamos campos para la creacion del link y envio de los datos
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val(); //Img1
    var Campo_2 = $("#Select_Sucursal_C").val(); //Img7
    var Campo_3 = $("#TXT_ID_Colocacion").val(); //Img2
    var Campo_4 = $("#TXT_Descripcion").val(); //Img3
    //var Campo_5 = $("#").val(); //Img4 - Es el Warning ---           ------           --- No está agregado en la condición
    //var Campo_6 = $("#").val(); //Img5 - No existe [No se está usando está imagen]    --- No está agregado en la condición
    var Campo_7 = $("#Select_Persona_C").val(); //Img6
    var Campo_8 = $("#Select_Moneda_C").val(); //img8
    var Campo_9 = $("#Select_Producto").val(); //Img9
    var Campo_10 = $("#Select_Condicion_Financiacion").val(); //Img10
    var Campo_11 = $("#Select_Tiempo").val(); //Img11
    var Campo_12 = $("#TXT_Fecha_Apertura").val(); //Img12
    var Campo_13 = $("#TXT_Plazo").val(); //Img13
    var Campo_14 = $("#Select_Ciclo").val(); //Img14 -- Campo no obligatorio
    var Campo_15 = $("#Select_Base_Calculo").val(); //Img15
    var Campo_16 = $("#Select_Direccion").val(); //Img16
    var Campo_17 = $("#TXT_Valor_Total").val(); //Img17
    var Campo_18 = $("#TXT_Valor_Financiado").val(); //Img18
    var Campo_19 = $("#TXT_Valor_Opcion_Compra").val(); //Img19

    var validar = 0;

    if (Campo_2 == "-1" || Campo_2 == "-1" || Campo_3 == "" || Campo_4 == "" || Campo_7 == "-1" || Campo_8 == "-1" || Campo_9 == "-1" || Campo_10 == "-1" || Campo_11 == "-1" || Campo_12 == "" || Campo_13 == "" || Campo_14 == "-1" || Campo_15 == "-1" || Campo_16 == "-1" || Campo_17 == "" || Campo_18 == "" || Campo_19 == "") {
        validar = 1;
        //--1--
        if (Campo_1 == "-1" || Campo_1 == "" || Campo_1 == null) {
            $("#Img1").css("display", "inline-table");
        } else {
            $("#Img1").css("display", "none");
        }
        //--2--
        if (Campo_2 == "-1" || Campo_2 == "" || Campo_2 == null) {
            $("#Img7").css("display", "inline-table");
        } else {
            $("#Img7").css("display", "none");
        }
        //--3--
        if (Campo_3 == "") {
            $("#Img2").css("display", "inline-table");
        } else {
            $("#Img2").css("display", "none");
        }
        //--4--
        if (Campo_4 == "") {
            $("#Img3").css("display", "inline-table");
        } else {
            $("#Img3").css("display", "none");
        }
        //--7--
        if (Campo_7 == "-1" || Campo_7 == "" || Campo_7 == null) {
            $("#Img6").css("display", "inline-table");
        } else {
            $("#Img6").css("display", "none");
        }
        //--8--
        if (Campo_8 == "-1" || Campo_8 == "" || Campo_8 == null) {
            $("#Img8").css("display", "inline-table");
        } else {
            $("#Img8").css("display", "none");
        }
        //--9--
        if (Campo_9 == "-1" || Campo_9 == "" || Campo_9 == null) {
            $("#Img9").css("display", "inline-table");
        } else {
            $("#Img9").css("display", "none");
        }
        //--10--
        if (Campo_10 == "-1" || Campo_10 == "" || Campo_10 == null) {
            $("#Img10").css("display", "inline-table");
        } else {
            $("#Img10").css("display", "none");
        }
        //--11--
        if (Campo_11 == "-1" || Campo_11 == "" || Campo_11 == null) {
            $("#Img11").css("display", "inline-table");
        } else {
            $("#Img11").css("display", "none");
        }
        //--12--
        if (Campo_12 == "") {
            $("#Img12").css("display", "inline-table");
        } else {
            $("#Img12").css("display", "none");
        }
        //--13--
        if (Campo_13 == "") {
            $("#Img13").css("display", "inline-table");
        } else {
            $("#Img13").css("display", "none");
        }
        //--14--
        if (Campo_14 == "-1" || Campo_14 == null || Campo_14 == "") { /*No es obligatorio, no se muestra error*/
            Campo_14 = "";
        } else {
            Campo_14 = Campo_14;
        }
        //--15--
        if (Campo_15 == "-1" || Campo_15 == "" || Campo_15 == null) {
            $("#Img15").css("display", "inline-table");
        } else {
            $("#Img15").css("display", "none");
        }
        //--16--
        if (Campo_16 == "-1" || Campo_16 == "" || Campo_16 == null) {
            $("#Img16").css("display", "inline-table");
        } else {
            $("#Img16").css("display", "none");
        }
        //--17--
        if (Campo_17 == "") {
            $("#Img17").css("display", "inline-table");
        } else {
            $("#Img17").css("display", "none");
        }
        //--18--
        if (Campo_18 == "") {
            $("#Img18").css("display", "inline-table");
        } else {
            $("#Img18").css("display", "none");
        }
        //--19--
        if (Campo_19 == "") {
            $("#Img19").css("display", "inline-table");
        } else {
            $("#Img19").css("display", "none");
        }
    }
    else {
        Ocultar_IMGS_Errores();
    }
    return validar;
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos Dialog Activos
function ClearActivos() {
    /*[Todo el código para limpiar los campos]*/
}

//limpiar campos Dialog Terceros
function ClearTerceros() {
    $("#Select_Documento_C2").val("-1").trigger("chosen:updated");
    $("#TxtDoc_C2").val("");
    $("#V_Persona2").html(" ");
    $("#Select_Relacion").val("-1").trigger("chosen:updated");
}

//limpiar campos
function Clear() {
    /*[Todo el código para limpiar los campos]*/
}

function Add_Activos(index) {
    $("#Dialog_Activos").dialog("open");
    $("#Dialog_Activos").dialog("option", "title", "Crear Activo");
    Table_Activos();
}

//limpiar campos
function Clear() {
    /*[Todo el código para limpiar los campos]*/
}

function Add_Terceros(index) {
    $("#Dialog_Terceros").dialog("open");
    $("#Dialog_Terceros").dialog("option", "title", "Agregar Persona");
    ClearTerceros();
    Table_Terceros();
}

//Agregamos el tercero
function BTNAgregarTercero() {

    if (Persona2 == true) {
        var valido = ValidarIngresoTerceros();

        if (valido == true) {
            var ok = Json_Terceros();

            if (ok == true) {
                Mensaje_General("¡Persona Relacionada!", "Se ha relacionado la persona correctamente.", "S");
                ClearTerceros();
            }
        }
    } else {
        Mensaje_General("¡Datos Incompletos!", "No puedes ingresar una persona que no esté registrada en el sistema.", "W");
    }
}

//Crea la tabla de documentos hijos
function AddArrayToTable() {
    var Html;

    Html = "<table id='T_T' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th><span class='cssToolTip_ver'><img alt='Activo' class='Add' onclick='javascript:ValidarIDColocacion();' id='Crear_Terceros' height='20px' width='20px' src='../../images/add.png' /><span>Agregar Persona</span></span></th><th>Tipo Documento</th><th>Identificación</th><th>Nombre</th><th>Tipo de relación</th></tr></thead><tbody>";
    for (itemArray in ArrayTerceros) {
        if (ArrayTerceros[itemArray].Contrato_ID != 0) {
            Html += "<tr id= 'T_T_" + ArrayTerceros[itemArray].Index + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar_Doc_H('" + ArrayTerceros[itemArray].Index + "')\"></input></td><td>" + ArrayTerceros[itemArray].Descrip_TypeDocumento + "</td><td>" + ArrayTerceros[itemArray].Document_ID + "</td><td>" + ArrayTerceros[itemArray].Descrip_Persona + "</td><td>" + ArrayTerceros[itemArray].Descrip_TypeRelation + "</td></tr>";
        }
    }

    Html += "</tbody></table>";
    $("#Container_Terceros").html("");
    $("#Container_Terceros").html(Html);

    $(".Eliminar").click(function () {
    });

    $("#T_T").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}


function Json_Terceros() {

    var valido = false;

    var validaRepetido = ConsultaRepetido();
    switch (validaRepetido) {
        case 0:
            var STRTypeDocumento = $("#Select_Documento_C2 option:selected").html();
            var STRTypeRelation = $("#Select_Relacion option:selected").html();
            var JSON_terceros = {
                "Nit_ID": $("#Select_EmpresaNit").val(),
                "Contrato_ID": $("#TXT_ID_Colocacion").val(),
                "TypeDocument_ID": $("#Select_Documento_C2").val(),
                "Document_ID": $("#TxtDoc_C2").val(),
                "Descrip_Persona": namePersona,
                "TypeRelation": $("#Select_Relacion").val(),
                "Descrip_TypeDocumento": STRTypeDocumento,
                "Descrip_TypeRelation": STRTypeRelation,
                "Index": ContTerceros
            }
            ArrayTerceros.push(JSON_terceros);
            ContTerceros = ContTerceros + 1;
            valido = true;
            AddArrayToTable();
            break;

        case 1:
            Mensaje_General("¡Persona Repetida!", "La persona ya se encuentra relacionada con estos mismos datos.", "W");
            break;

    }

    return valido;
}

function ConsultaRepetido() {
    var validar = 0;
    for (itemArray in ArrayTerceros) {
        if (ArrayTerceros[itemArray].TypeDocument_ID == $("#Select_Documento_C2").val() &&
            ArrayTerceros[itemArray].Document_ID == $("#TxtDoc_C2").val() &&
            ArrayTerceros[itemArray].TypeRelation == $("#Select_Relacion").val()) {
            validar = 1;
            break;
        }
    }
    return validar;
}

function Table_Activos() {
    $("#container_TActivos").html("");
}

function Table_Terceros() {
    var colocacion;
    $("#L_Empresa").html($("#Select_EmpresaNit option:selected").html());
    $("#L_Colocacion").html($("#TXT_ID_Colocacion").val());
    $("#Container_Terceros").html("");
}

function Descripcion_Tasa(index) {
    var i = index - 1;
    var descripcion;

    var id = Matrix_Tasas[i].Codigo_ID;
    var desc = Matrix_Tasas[i].Descripcion;

    descripcion = id + " - " + desc;
    return descripcion;
}

function Periodo_Tasa(index) {
    var i = index - 1;
    var Periodo;

    var per = Matrix_Tasas[i].Periodo;
    var tipo = Matrix_Tasas[i].Tipo;

    Periodo = per + "." + tipo + ".";

    return Periodo;
}

//Función que busca la TASA EFECTIVA que tiene esa financiacion
function Equivalencia_Efectiva(index) {
    var i = index - 1;
    var valor;

    valor = Matrix_Tasas[i].Equivalencia_Efectiva.toString();
    valor = valor;

    return valor;
}

//Función que busca la TASA NOMINAL que tiene esa financiacion
function Nominal_Anual(index) {
    var i = index - 1;
    var valor;

    valor = Matrix_Tasas[i].Nominal_Anual.toString();
    valor = valor;

    return valor;
}

function TasaUsura() {
    var valor;
    var id;
    var num;

    id = Matrix_Tasas[1].Codigo_ID.toString();
    num = Matrix_Tasas[1].Equivalencia_Efectiva.toString();
    valor = id + " - " + num + "%";

    return valor;
}

function TasaMora() {
    var valor;
    var id;
    var num;

    id = Matrix_Tasas[0].Codigo_ID.toString();
    num = Matrix_Tasas[0].Equivalencia_Efectiva.toString();
    valor = id + " - " + num + "%";

    return valor;

    return valor;
}

function LlenarCeros(valor, longitud) {

    var numero;
    var A_Decimal = valor.toString().split(".");

    if (A_Decimal[1].length == 4) {
        A_Decimal[1] = A_Decimal[1];
    }
    else {
        while (A_Decimal[1].length < longitud) {
            A_Decimal[1] = A_Decimal[1] + "0";
        }
    }

    numero = A_Decimal[0] + "." + A_Decimal[1];

    return numero;
}