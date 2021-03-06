﻿/*--------------- Región de variables globales --------------------*/
var ArrayCalendario_Grid = [];
var ArrayCalendario = [];
var ArrayCombo = [];
var ArrayCalendarioDep = [];
var ArrayC_Semana = [];

var MatrizMonday = [];
var MatrizTuesday = [];
var MatrizWednesday = [];
var MatrizThursday = [];
var MatrizFriday = [];
var MatrizSaturday = [];
var MatrizSunday = [];

var Lineas = 0; //Contador de filas que tendrán las matrices

var WorkMonday = true;
var WorkTuesday = true;
var WorkWednesday = true;
var WorkThursday = true;
var WorkFriday = true;
var WorkSaturday = true;
var WorkSunday = true;
var WorkFestivo = false;

var FirstMonday = false;
var FirstTuesday = false;
var FirstWednesday = false;
var FirstThursday = false;
var FirstFriday = false;
var FirstSaturday = false;
var FirstSunday = false;

var MensajeHora = "";
var MensajeVacio = "";
var MensajeRepetido = "";
var V_ONE = 0;

var estado;
var editNit_ID;
var index_ID;
var editID;
var TipoCalendar;

//Usadas al modificar los horarios
var editHoraIni = "";
var editHoraFin = "";
var editIndex = "";
var editNumDia = "";
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    $("#Marco_trabajo_Form").css("height", "490px");
    $(".container_TGrid").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE MÉTODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Calendario('MatrixCalendarios');

    IniciarTimeFormat();
    Change_Select_Nit();
    Change_TipoCalendario();

    Change_StateDay("Select_StateLun");
    Change_StateDay("Select_StateMar");
    Change_StateDay("Select_StateMie");
    Change_StateDay("Select_StateJue");
    Change_StateDay("Select_StateVie");
    Change_StateDay("Select_StateSab");
    Change_StateDay("Select_StateDom");
    Change_StateDay("Select_Festivo");
});

//Función que inicializa todos los label que contendran horas
function IniciarTimeFormat() {
    Time_Format("TxtIniLun");
    Time_Format("TxtFinLun");
    Time_Format("TxtIniMar");
    Time_Format("TxtFinMar");
    Time_Format("TxtIniMie");
    Time_Format("TxtFinMie");
    Time_Format("TxtIniJue");
    Time_Format("TxtFinJue");
    Time_Format("TxtIniVie");
    Time_Format("TxtFinVie");
    Time_Format("TxtIniSab");
    Time_Format("TxtFinSab");
    Time_Format("TxtIniDom");
    Time_Format("TxtFinDom");
    //Editor de las horas
    Time_Format("TxtEditIni");
    Time_Format("TxtEditFin");
}

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

    $("#Dialog_Calendar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1220,
        height: 760,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_time").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 323,
        height: 300,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });
    $("#Dialog_Edit_time").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 323,
        height: 350,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
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
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $(".Table_Header_Block").css("display", "none"); //Table que contiene el capturador de horas
    $(".container_TGrid_Create").css("display", "none"); //Tabla que dibuja el grid con las horas ya capturadas
    $("#TablaConsulta").css("display", "none");
    $("#Tabla_10").css("display", "none");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    OpenControl();

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Calendario("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Calendario("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        var LeghtArray = ArrayC_Semana.length;
        if (LeghtArray > 0) {
            if (WorkFestivo == true) { //Dejamos para el final el guardar si los festivos es laboral o no
                InsertJson_Day("8", "S", "0", "0");
            } else {
                InsertJson_Day("8", "N", "0", "0");
            }

            if ($("#Btnguardar").val() == "Guardar") {
                transacionAjax_Calendario_create("crear");
            }
            else {
                transacionAjax_Calendario_create("modificar");
            }
        } else {
            Mensaje_General("¡Sin Horarios!", "Debes ingresar por lo menos un horario para este calendario, no puedes guardar un calendario vacio.", "W");
        }

    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl();
    transacionAjax_Calendario_delete("elimina");
}

//agrega calendario a un array
function BtnAgregaCalendario() {

    var validate = ValidaHoras();
    switch (validate) {
        case 0:
            if (V_ONE == 0) {
                Mensaje_General("Error - Campos Vacios", "Debe completar mínimo el horario de uno de los días de la semana.", "W");
            } else {
                $(".container_TGrid_Create").css("display", "none"); //Tabla que dibuja el grid con las horas ya capturadas
                validaTipoC();
                $("#Select_StateLun").prop('disabled', true).trigger("chosen:updated"); //Bloqueamos los chosen de estado del día
                $("#Select_StateMar").prop('disabled', true).trigger("chosen:updated");
                $("#Select_StateMie").prop('disabled', true).trigger("chosen:updated");
                $("#Select_StateJue").prop('disabled', true).trigger("chosen:updated");
                $("#Select_StateVie").prop('disabled', true).trigger("chosen:updated");
                $("#Select_StateSab").prop('disabled', true).trigger("chosen:updated");
                $("#Select_StateDom").prop('disabled', true).trigger("chosen:updated");
                $("#Select_Festivo").prop('disabled', true).trigger("chosen:updated");
                $(".container_TGrid_Create").css("display", "inline-table"); //Tabla que dibuja el grid con las horas ya capturadas
            }
            break;

        case 1:
            Mensaje_General("Error - Hora Inconsistente", "La hora inicial es mayor que la hora final en los días: " + MensajeHora + "", "E");
            break;

        case 2:
            Mensaje_General("Error - Campos Incompletos", "El campo de hora inicial u hora final no se completó en los días: " + MensajeVacio + "", "W");
            break;
    }
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION PANEL DE CONTROL                                                                                                 ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $(".Dialog_Datos_Calen").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $('.C_Chosen').trigger('chosen:updated');
            ResetError();
            Clear();
            estado = opcion;
            $("#Dialog_Calendar").dialog("open");
            $("#Dialog_Calendar").dialog("option", "title", "Crear Calendario");
            break;

        case "buscar":
            $(".Dialog_Datos_Calen").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $(".Dialog_Datos_Calen").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $(".Dialog_Datos_Calen").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del calendario
function validarCamposCrear() {
    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();
    var Campo_4 = $("#Select_TipoCalendario ").val();

    var validar = 0;

    if (Campo_4 == "-1" || Campo_4 == null || Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1" || Campo_1 == null) {
        validar = 1;
        if (Campo_1 == "-1" || Campo_1 == null) { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (Campo_2 == "") { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
        if (Campo_3 == "") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
        if (Campo_4 == "-1" || Campo_4 == null) { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");
    }
    return validar;
}

//validamos campos para la creación del calendario
function validarCamposFechas() {

    var Campo_1 = $("#TxtF_Start").val();
    var Campo_2 = $("#TxtF_End").val();

    var validar = 0;

    if (Campo_2 == "" || Campo_1 == "") {
        validar = 1;
        if (Campo_1 == "") { $("#Img6").css("display", "inline-table"); } else { $("#Img6").css("display", "none"); }
        if (Campo_2 == "") { $("#Img7").css("display", "inline-table"); } else { $("#Img7").css("display", "none"); }
    }
    else {
        $("#Img6").css("display", "none");
        $("#Img7").css("display", "none");
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

//valida horas ingresadas
function ValidaHoras() {
    var validate = 0;
    var V_H = 0;
    V_ONE = 0;
    MensajeHora = "";
    MensajeVacio = "";
    //Lunes
    if (WorkMonday == true) {
        if ($("#TxtIniLun").val() != "" || $("#TxtFinLun").val() != "") {
            V_ONE = 1;
            V_H = Validahora($("#TxtIniLun").val(), $("#TxtFinLun").val());

            switch (V_H) {
                case 1:
                    validate = 1;
                    if (MensajeHora == "") {
                        MensajeHora = MensajeHora + " Lunes";
                    } else {
                        MensajeHora = MensajeHora + ", Lunes";
                    }
                    break;

                case 2:
                    validate = 2;
                    if (MensajeVacio == "") {
                        MensajeVacio = MensajeVacio + " Lunes";
                    } else {
                        MensajeVacio = MensajeVacio + ", Lunes";
                    }
                    break;
            }
        }
    }

    //Martes
    if (WorkTuesday == true) {
        if ($("#TxtIniMar").val() != "" || $("#TxtFinMar").val() != "") {
            V_ONE = 1;
            V_H = Validahora($("#TxtIniMar").val(), $("#TxtFinMar").val());

            switch (V_H) {
                case 1:
                    validate = 1;
                    if (MensajeHora == "") {
                        MensajeHora = MensajeHora + " Martes";
                    } else {
                        MensajeHora = MensajeHora + ", Martes";
                    }
                    break;

                case 2: //Hay alguno vacio
                    validate = 2;
                    if (MensajeVacio == "") {
                        MensajeVacio = MensajeVacio + " Martes";
                    } else {
                        MensajeVacio = MensajeVacio + ", Martes";
                    }
                    break;
            }
        }
    }
    //Miércoles
    if (WorkWednesday == true) {
        if ($("#TxtIniMie").val() != "" || $("#TxtFinMie").val() != "") {
            V_ONE = 1;
            V_H = Validahora($("#TxtIniMie").val(), $("#TxtFinMie").val());

            switch (V_H) {
                case 1:
                    validate = 1;
                    if (MensajeHora == "") {
                        MensajeHora = MensajeHora + " Miércoles";
                    } else {
                        MensajeHora = MensajeHora + ", Miércoles";
                    }
                    break;
                case 2:
                    validate = 2;
                    if (MensajeVacio == "") {
                        MensajeVacio = MensajeVacio + " Miércoles";
                    } else {
                        MensajeVacio = MensajeVacio + ", Miércoles";
                    }
                    break;
            }
        }
    }
    //Jueves
    if (WorkThursday == true) {
        if ($("#TxtIniJue").val() != "" || $("#TxtFinJue").val() != "") {
            V_ONE = 1;
            V_H = Validahora($("#TxtIniJue").val(), $("#TxtFinJue").val());

            switch (V_H) {
                case 1:
                    validate = 1;
                    if (MensajeHora == "") {
                        MensajeHora = MensajeHora + " Jueves";
                    } else {
                        MensajeHora = MensajeHora + ", Jueves";
                    }
                    break;
                case 2:
                    validate = 2;
                    if (MensajeVacio == "") {
                        MensajeVacio = MensajeVacio + " Jueves";
                    } else {
                        MensajeVacio = MensajeVacio + ", Jueves";
                    }
                    break;
            }
        }
    }
    //Viernes
    if (WorkFriday == true) {
        if ($("#TxtIniVie").val() != "" || $("#TxtFinVie").val() != "") {
            V_ONE = 1;
            V_H = Validahora($("#TxtIniVie").val(), $("#TxtFinVie").val());

            switch (V_H) {
                case 1:
                    validate = 1;
                    if (MensajeHora == "") {
                        MensajeHora = MensajeHora + " Viernes";
                    } else {
                        MensajeHora = MensajeHora + ", Viernes";
                    }
                    break;
                case 2:
                    validate = 2;
                    if (MensajeVacio == "") {
                        MensajeVacio = MensajeVacio + " Viernes";
                    } else {
                        MensajeVacio = MensajeVacio + ", Viernes";
                    }
                    break;
            }
        }
    }
    //Sábado
    if (WorkSaturday == true) {
        if ($("#TxtIniSab").val() != "" || $("#TxtFinSab").val() != "") {
            V_ONE = 1;
            V_H = Validahora($("#TxtIniSab").val(), $("#TxtFinSab").val());

            switch (V_H) {
                case 1:
                    validate = 1;
                    if (MensajeHora == "") {
                        MensajeHora = MensajeHora + " Sábado";
                    } else {
                        MensajeHora = MensajeHora + ", Sábado";
                    }
                    break;
                case 2:
                    validate = 2;
                    if (MensajeVacio == "") {
                        MensajeVacio = MensajeVacio + " Sábado";
                    } else {
                        MensajeVacio = MensajeVacio + ", Sábado";
                    }
                    break;
            }
        }
    }
    //Domingo
    if (WorkSunday == true) {
        if ($("#TxtIniDom").val() != "" || $("#TxtFinDom").val() != "") {
            V_ONE = 1;
            V_H = Validahora($("#TxtIniDom").val(), $("#TxtFinDom").val());

            switch (V_H) {
                case 1:
                    validate = 1;
                    if (MensajeHora == "") {
                        MensajeHora = MensajeHora + " Domingo";
                    } else {
                        MensajeHora = MensajeHora + ", Domingo";
                    }
                    break;
                case 2:
                    validate = 2;
                    if (MensajeVacio == "") {
                        MensajeVacio = MensajeVacio + " Domingo";
                    } else {
                        MensajeVacio = MensajeVacio + ", Domingo";
                    }
                    break;
            }
        }
    }

    return validate;
}

//valida el tio de clendario para el proceso
function validaTipoC() {
    var Ingresa;

    switch ($("#Select_TipoCalendario").val()) {
        case "1":
            CargeJson();
            break;
        case "2":
            Ingresa = ValidaFechas();
            if (Ingresa == 0) {
                CargeJson();
            }
            break;
        default:
            Mensaje_General("Sin Selección Completa", "No se ha seleccionado ningún tipo de Calendario, no podemos proseguir", "W");
            break;
    }
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CARGUE GRID CALENDARIO                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//construye el Json con los datos proporcionados para la vista
function CargeJson() {
    var Repetido = ValidaDatosMatriz();
    if (Repetido == false) {
        Lineas = Lineas + 1;
        //Lunes (1)
        if (WorkMonday == true) { //Si es laboral validamos normal           
            var JSONDay = {
                "Index": Lineas,
                "IniLun": ValidaCamposJson($("#TxtIniLun").val()),
                "FinLun": ValidaCamposJson($("#TxtFinLun").val())
            };
            MatrizMonday.push(JSONDay);
            if ($("#TxtIniLun").val() != "" && $("#TxtFinLun").val() != "") {
                InsertJson_Day("1", "N", $("#TxtIniLun").val(), $("#TxtFinLun").val());
            }
        } else if (WorkMonday == false && FirstMonday == false) { //Si no laboral y es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniLun": "0",
                "FinLun": "0"
            };
            MatrizMonday.push(JSONDay);
            InsertJson_Day("1", "S", "0", "0");
            FirstMonday = true;
        } else { //Si no laboral y no es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniLun": "0",
                "FinLun": "0"
            };
            MatrizMonday.push(JSONDay);
        }
        //--------
        //Martes (2)
        if (WorkTuesday == true) { //Si es laboral validamos normal           
            var JSONDay = {
                "Index": Lineas,
                "IniMar": ValidaCamposJson($("#TxtIniMar").val()),
                "FinMar": ValidaCamposJson($("#TxtFinMar").val())
            };
            MatrizTuesday.push(JSONDay);
            if ($("#TxtIniMar").val() != "" && $("#TxtFinMar").val() != "") {
                InsertJson_Day("2", "N", $("#TxtIniMar").val(), $("#TxtFinMar").val());
            }

        } else if (WorkTuesday == false && FirstTuesday == false) { //Si no laboral y es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniMar": "0",
                "FinMar": "0"
            };
            MatrizTuesday.push(JSONDay);
            InsertJson_Day("2", "S", "0", "0");
            FirstTuesday = true;
        } else { //Si no laboral y no es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniMar": "0",
                "FinMar": "0"
            };
            MatrizTuesday.push(JSONDay);
        }
        //--------
        //Miércoles (3)
        if (WorkWednesday == true) { //Si es laboral validamos normal           
            var JSONDay = {
                "Index": Lineas,
                "IniMie": ValidaCamposJson($("#TxtIniMie").val()),
                "FinMie": ValidaCamposJson($("#TxtFinMie").val())
            };
            MatrizWednesday.push(JSONDay);
            if ($("#TxtIniMie").val() != "" && $("#TxtFinMie").val() != "") {
                InsertJson_Day("3", "N", $("#TxtIniMie").val(), $("#TxtFinMie").val());
            }

        } else if (WorkWednesday == false && FirstWednesday == false) { //Si no laboral y es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniMie": "0",
                "FinMie": "0"
            };
            MatrizWednesday.push(JSONDay);
            InsertJson_Day("3", "S", "0", "0");
            FirstWednesday = true;
        } else { //Si no laboral y no es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniMie": "0",
                "FinMie": "0"
            };
            MatrizWednesday.push(JSONDay);
        }
        //--------
        //Jueves (4)
        if (WorkThursday == true) { //Si es laboral validamos normal           
            var JSONDay = {
                "Index": Lineas,
                "IniJue": ValidaCamposJson($("#TxtIniJue").val()),
                "FinJue": ValidaCamposJson($("#TxtFinJue").val())
            };
            MatrizThursday.push(JSONDay);
            if ($("#TxtIniJue").val() != "" && $("#TxtFinJue").val() != "") {
                InsertJson_Day("4", "N", $("#TxtIniJue").val(), $("#TxtFinJue").val());
            }
        } else if (WorkThursday == false && FirstThursday == false) { //Si no laboral y es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniJue": "0",
                "FinJue": "0"
            };
            MatrizThursday.push(JSONDay);
            InsertJson_Day("4", "S", "0", "0");
            FirstThursday = true;
        } else { //Si no laboral y no es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniJue": "0",
                "FinJue": "0"
            };
            MatrizThursday.push(JSONDay);
        }
        //--------
        //Viernes (5)
        if (WorkFriday == true) { //Si es laboral validamos normal           
            var JSONDay = {
                "Index": Lineas,
                "IniVie": ValidaCamposJson($("#TxtIniVie").val()),
                "FinVie": ValidaCamposJson($("#TxtFinVie").val())
            };
            MatrizFriday.push(JSONDay);
            if ($("#TxtIniVie").val() != "" && $("#TxtFinVie").val() != "") {
                InsertJson_Day("5", "N", $("#TxtIniVie").val(), $("#TxtFinVie").val());
            }
        } else if (WorkFriday == false && FirstFriday == false) { //Si no laboral y es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniVie": "0",
                "FinVie": "0"
            };
            MatrizFriday.push(JSONDay);
            InsertJson_Day("5", "S", "0", "0");
            FirstFriday = true;
        } else { //Si no laboral y no es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniVie": "0",
                "FinVie": "0"
            };
            MatrizFriday.push(JSONDay);
        }
        //--------
        //Sábado (6)
        if (WorkSaturday == true) { //Si es laboral validamos normal           
            var JSONDay = {
                "Index": Lineas,
                "IniSab": ValidaCamposJson($("#TxtIniSab").val()),
                "FinSab": ValidaCamposJson($("#TxtFinSab").val())
            };
            MatrizSaturday.push(JSONDay);
            if ($("#TxtIniSab").val() != "" && $("#TxtFinSab").val() != "") {
                InsertJson_Day("6", "N", $("#TxtIniSab").val(), $("#TxtFinSab").val());
            }
        } else if (WorkSaturday == false && FirstSaturday == false) { //Si no laboral y es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniSab": "0",
                "FinSab": "0"
            };
            MatrizSaturday.push(JSONDay);
            InsertJson_Day("6", "S", "0", "0");
            FirstSaturday = true;
        } else { //Si no laboral y no es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniSab": "0",
                "FinSab": "0"
            };
            MatrizSaturday.push(JSONDay);
        }
        //--------
        //Domingo (7)
        if (WorkSunday == true) { //Si es laboral validamos normal           
            var JSONDay = {
                "Index": Lineas,
                "IniDom": ValidaCamposJson($("#TxtIniDom").val()),
                "FinDom": ValidaCamposJson($("#TxtFinDom").val())
            };
            MatrizSunday.push(JSONDay);
            if ($("#TxtIniDom").val() != "" && $("#TxtFinDom").val() != "") {
                InsertJson_Day("7", "N", $("#TxtIniDom").val(), $("#TxtFinDom").val());
            }

        } else if (WorkSunday == false && FirstSunday == false) { //Si no laboral y es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniDom": "0",
                "FinDom": "0"
            };
            MatrizSunday.push(JSONDay);
            InsertJson_Day("7", "S", "0", "0");
            FirstSunday = true;
        } else { //Si no laboral y no es la primera vez
            var JSONDay = {
                "Index": Lineas,
                "IniDom": "0",
                "FinDom": "0"
            };
            MatrizSunday.push(JSONDay);
        }
        CargarMatricesHorarios();
        Clear_Agregar();
    } else {
        Mensaje_General("Error - Horario Existe", "No puedes ingresar dos veces una misma combinación de horarios, esto sucedio en los siguientes días: " + MensajeRepetido + "", "W");
    }
}

//Función que crea el array que contendrá los datos para dibujar en la tabla de horarios
function CargarMatricesHorarios() {
    ArrayCalendario_Grid = [];
    ArrayCalendario_Grid.push(MatrizMonday);
    ArrayCalendario_Grid.push(MatrizTuesday);
    ArrayCalendario_Grid.push(MatrizWednesday);
    ArrayCalendario_Grid.push(MatrizThursday);
    ArrayCalendario_Grid.push(MatrizFriday);
    ArrayCalendario_Grid.push(MatrizSaturday);
    ArrayCalendario_Grid.push(MatrizSunday);
    $(".container_TGrid_Create").offsetHeight;
    $(".container_TGrid_Create").html("");
    TGridCalendar();
}

//Función que valida que los nuevos datos de cualquiera de los días no estén repetidos en la matriz
function ValidaDatosMatriz() {
    var repetido = false;
    MensajeRepetido = "";
    Inicio: do {
        if (WorkMonday == true) {
            if ($("#TxtIniLun").val() != "" && $("#TxtFinLun").val() != "") {
                repetido = ValidarHoras("1", $("#TxtIniLun").val(), $("#TxtFinLun").val());
                if (repetido == true) {
                    MensajeRepetido = MensajeRepetido + ", Lunes";
                    break Inicio;
                }
            }
        }
        if (WorkTuesday == true) {
            if ($("#TxtIniMar").val() != "" && $("#TxtFinMar").val() != "") {
                repetido = ValidarHoras("2", $("#TxtIniMar").val(), $("#TxtFinMar").val());
                if (repetido == true) {
                    MensajeRepetido = MensajeRepetido + ", Martes";
                    break Inicio;
                }
            }
        }
        if (WorkWednesday == true) {
            if ($("#TxtIniMie").val() != "" && $("#TxtFinMie").val() != "") {
                repetido = ValidarHoras("3", $("#TxtIniMie").val(), $("#TxtFinMie").val());
                if (repetido == true) {
                    MensajeRepetido = MensajeRepetido + ", Miércoles";
                    break Inicio;
                }
            }
        }
        if (WorkThursday == true) {
            if ($("#TxtIniJue").val() != "" && $("#TxtFinJue").val() != "") {
                repetido = ValidarHoras("4", $("#TxtIniJue").val(), $("#TxtFinJue").val());
                if (repetido == true) {
                    MensajeRepetido = MensajeRepetido + ", Jueves";
                    break Inicio;
                }
            }
        }
        if (WorkFriday == true) {
            if ($("#TxtIniVie").val() != "" && $("#TxtFinVie").val() != "") {
                repetido = ValidarHoras("5", $("#TxtIniVie").val(), $("#TxtFinVie").val());
                if (repetido == true) {
                    MensajeRepetido = MensajeRepetido + ", Viernes";
                    break Inicio;
                }
            }
        }
        if (WorkSaturday == true) {
            if ($("#TxtIniSab").val() != "" && $("#TxtFinSab").val() != "") {
                repetido = ValidarHoras("6", $("#TxtIniSab").val(), $("#TxtFinSab").val());
                if (repetido == true) {
                    MensajeRepetido = MensajeRepetido + ", Sábado";
                    break Inicio;
                }
            }
        }
        if (WorkSaturday == true) {
            if ($("#TxtIniDom").val() != "" && $("#TxtFinDom").val() != "") {
                repetido = ValidarHoras("7", $("#TxtIniDom").val(), $("#TxtFinDom").val());
                if (repetido == true) {
                    MensajeRepetido = MensajeRepetido + ", Domingo";
                    break Inicio;
                }
            }
        }
    } while (0);
    if (MensajeRepetido != "") {
        MensajeRepetido = MensajeRepetido.substr(1);
    }
    return repetido;
}

//Función que valida si la combinación de horas ya existe en el array armado
function ValidarHoras(numDia, horaIni, horaFini) {
    var Encontrado = false;
    for (i in ArrayC_Semana) {//Recorremos el array que contiene los datos de los horarios día
        if (ArrayC_Semana[i].Dia == numDia) { //Entramos a revisar solo los datos que contienen el día que se quiere verificar
            if (ArrayC_Semana[i].HoraInicial == horaIni && ArrayC_Semana[i].HoraFinal == horaFini) { //Verificamos si la combinación de horas ya existe
                Encontrado = true;
                break;
            }
        }
    }
    return Encontrado;
}

//Carga JSON para Tabla de Semanas
function InsertJson_Day(vp_NumberDay, vp_Estado_Day, vp_H_In, vp_H_Fi) {
    var JsonDayCalendar = {
        "Dia": vp_NumberDay,
        "IndicativoFestivo": vp_Estado_Day,
        "HoraInicial": vp_H_In,
        "HoraFinal": vp_H_Fi
    };
    ArrayC_Semana.push(JsonDayCalendar);
}

//valida campos vacios por cero
function ValidaCamposJson(vp_Campo) {
    var vl_CampoValue = 0;

    if (vp_Campo != "") {
        vl_CampoValue = vp_Campo;
    }
    return vl_CampoValue;
}

//Función que crea la tabla donde se mostrarán los horarios ingresados
function TGridCalendar() {
    var html_Calendario = "";

    html_Calendario = "<table id='TCalendarios' style='width: 100%'><tbody>";
    //Comenzamos a anidar tablas
    //Tabla Lunes
    html_Calendario += "<tr><td id='ID_Lunes' align='left' > <table id='TLunes' border='1' cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th colspan='2' class='Grid_Head' >Lunes</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
    //-----------
    //Lunes [0]
    for (i in ArrayCalendario_Grid[0]) {
        html_Calendario += "<tr id= 'TLunes_" + ArrayCalendario_Grid[0][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[0][i].IniLun + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[0][i].Index + "','1');\" >Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[0][i].Index + "','1');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[0][i].FinLun + "</td></tr>";
    }
    html_Calendario += "</tbody></table></td>"; //Cerramos tabla Lunes
    //------------
    //Tabla Martes
    html_Calendario += "<td id='ID_Martes' align='left' > <table id='TMartes' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Martes</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
    //Martes [1]
    for (i in ArrayCalendario_Grid[1]) {
        html_Calendario += "<tr id= 'TMartes_" + ArrayCalendario_Grid[1][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[1][i].IniMar + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[1][i].Index + "','2');\">Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[1][i].Index + "','2');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[1][i].FinMar + "</td></tr>";
    }
    html_Calendario += "</tbody></table></td>"; //Cerramos tabla Martes
    //------------
    //Tabla Miércoles
    html_Calendario += "<td id='ID_Miercoles' align='left' > <table id='TMiercoles' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Miércoles</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
    //Miércoles [2]
    for (i in ArrayCalendario_Grid[2]) {
        html_Calendario += "<tr id= 'TMiercoles_" + ArrayCalendario_Grid[2][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[2][i].IniMie + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[2][i].Index + "','3');\">Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[2][i].Index + "','3');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[2][i].FinMie + "</td></tr>";
    }
    html_Calendario += "</tbody></table></td>"; //Cerramos tabla Miércoles
    //------------
    //Tabla Jueves
    html_Calendario += "<td id='ID_Jueves' align='left' > <table id='TJueves' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Jueves</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
    //Jueves [3]
    for (i in ArrayCalendario_Grid[3]) {
        html_Calendario += "<tr id= 'TJueves_" + ArrayCalendario_Grid[3][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[3][i].IniJue + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[3][i].Index + "','4');\">Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[3][i].Index + "','4');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[3][i].FinJue + "</td></tr>";
    }
    html_Calendario += "</tbody></table></td>"; //Cerramos tabla Jueves
    //------------
    //Tabla Viernes
    html_Calendario += "<td id='ID_Viernes' align='left' > <table id='TViernes' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Viernes</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
    //Viernes [4]
    for (i in ArrayCalendario_Grid[4]) {
        html_Calendario += "<tr id= 'TViernes_" + ArrayCalendario_Grid[4][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[4][i].IniVie + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[4][i].Index + "','5');\">Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[4][i].Index + "','5');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[4][i].FinVie + "</td></tr>";
    }
    html_Calendario += "</tbody></table></td>"; //Cerramos tabla Viernes
    //------------
    //Tabla Sábado
    html_Calendario += "<td id='ID_Sabado' align='left' > <table id='TSabado' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Sábado</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
    //Sábado [5]
    for (i in ArrayCalendario_Grid[5]) {
        html_Calendario += "<tr id= 'TSabado_" + ArrayCalendario_Grid[5][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[5][i].IniSab + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[5][i].Index + "','6');\">Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[5][i].Index + "','6');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[5][i].FinSab + "</td></tr>";
    }
    html_Calendario += "</tbody></table></td>"; //Cerramos tabla Sábado
    //------------
    //Tabla Domingo
    html_Calendario += "<td id='ID_Domingo' align='left' > <table id='TDomingo' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Domingo</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th class='Grid_Head'>Inicial</th><th class='Grid_Head'>Final</th></tr></thead><tbody>";
    //Domingo [6]
    for (i in ArrayCalendario_Grid[6]) {
        html_Calendario += "<tr id= 'TDomingo_" + ArrayCalendario_Grid[6][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[6][i].IniDom + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[6][i].Index + "','7');\">Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[6][i].Index + "','7');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[6][i].FinDom + "</td></tr>";
    }
    html_Calendario += "</tbody></table></td>"; //Cerramos tabla Domingo


    html_Calendario += "</tr></tbody></table>";//Cerramos tabla principal

    $(".container_TGrid_Create").offsetHeight;
    $(".container_TGrid_Create").html("");
    $(".container_TGrid_Create").html(html_Calendario);

    //
    $("#TLunes").dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "paging": false,
        "ordering": false,
        "info": false,
        "bJQueryUI": true,
        "iDisplayLength": 1000,
        "bDestroy": true
    });
    //
    $("#TMartes").dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "paging": false,
        "ordering": false,
        "info": false,
        "bJQueryUI": true,
        "iDisplayLength": 1000,
        "bDestroy": true
    });
    //
    $("#TMiercoles").dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "paging": false,
        "ordering": false,
        "info": false,
        "bJQueryUI": true,
        "iDisplayLength": 1000,
        "bDestroy": true
    });
    //
    $("#TJueves").dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "paging": false,
        "ordering": false,
        "info": false,
        "bJQueryUI": true,
        "iDisplayLength": 1000,
        "bDestroy": true
    });
    //
    $("#TViernes").dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "paging": false,
        "ordering": false,
        "info": false,
        "bJQueryUI": true,
        "iDisplayLength": 1000,
        "bDestroy": true
    });
    //
    $("#TSabado").dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "paging": false,
        "ordering": false,
        "info": false,
        "bJQueryUI": true,
        "iDisplayLength": 1000,
        "bDestroy": true
    });
    //
    $("#TDomingo").dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "paging": false,
        "ordering": false,
        "info": false,
        "bJQueryUI": true,
        "iDisplayLength": 1000,
        "bDestroy": true
    });

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MODIFICAR HORARIOS DEL CALENDARIO                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Función que permite editar una hora que ya ha sido ingresada en el array
function EditHoraDia(IndexDia, numDia) {
    //IndexDia se usa para hacer la referencia a la Matriz del día, por ejemplo MatrizMonday y en la matriz que dibuja la grilla, para saber el primer indice de esta matriz
    //Se toma de la Matriz ArrayCalendario_Grid[NumDía][i].index
    //numDia se usa para buscar la referencia a el día en el que se va abuscar ese indice y tambien como uno de los parametros para buscar en el arrayC_Semana

    editHoraIni = "";
    editHoraFin = "";
    editIndex = "";
    editNumDia = "";

    editIndex = IndexDia;
    editNumDia = numDia;
    EDIT: do {
        if (editNumDia == "1") { //Lunes
            if (WorkMonday == true) {
                for (i in MatrizMonday) {
                    if (MatrizMonday[i].Index == editIndex) {
                        editHoraIni = MatrizMonday[i].IniLun;
                        editHoraFin = MatrizMonday[i].FinLun;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "2") { //Martes
            if (WorkTuesday == true) {
                for (i in MatrizTuesday) {
                    if (MatrizTuesday[i].Index == editIndex) {
                        editHoraIni = MatrizTuesday[i].IniMar;
                        editHoraFin = MatrizTuesday[i].FinMar;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "3") { //Miércoles
            if (WorkWednesday == true) {
                for (i in MatrizWednesday) {
                    if (MatrizWednesday[i].Index == editIndex) {
                        editHoraIni = MatrizWednesday[i].IniMie;
                        editHoraFin = MatrizWednesday[i].FinMie;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "4") { //Jueves
            if (WorkThursday == true) {
                for (i in MatrizThursday) {
                    if (MatrizThursday[i].Index == editIndex) {
                        editHoraIni = MatrizThursday[i].IniJue;
                        editHoraFin = MatrizThursday[i].FinJue;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "5") { //Viernes
            if (WorkFriday == true) {
                for (i in MatrizFriday) {
                    if (MatrizFriday[i].Index == editIndex) {
                        editHoraIni = MatrizFriday[i].IniVie;
                        editHoraFin = MatrizFriday[i].FinVie;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "6") { //Sábado
            if (WorkSaturday == true) {
                for (i in MatrizSaturday) {
                    if (MatrizSaturday[i].Index == editIndex) {
                        editHoraIni = MatrizSaturday[i].IniSab;
                        editHoraFin = MatrizSaturday[i].FinSab;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "7") { //Domingo
            if (WorkSunday == true) {
                for (i in MatrizSunday) {
                    if (MatrizSunday[i].Index == editIndex) {
                        editHoraIni = MatrizSunday[i].IniDom;
                        editHoraFin = MatrizSunday[i].FinDom;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        }
        //Abrimos el Dialogo y colocamos las horas
        $("#TxtEditIni").val("");
        $("#TxtEditFin").val("");
        if (editHoraIni != "0" || editHoraFin != "0") {
            $("#TxtEditIni").val(editHoraIni);
            $("#TxtEditFin").val(editHoraFin);
        }

        $("#TxtEditIni").focus();

        $("#Dialog_Edit_time").dialog("open");
        $("#Dialog_Edit_time").dialog("option", "title", "Modificar Horario");
        break EDIT;
    } while (0);
}

//Función que valida que los horarios sean correctos en la edición de horarios
function ValidarHorasEdit() {
    var validoEdit = 0;

    if ($("#TxtEditIni").val() != "" || $("#TxtEditFin").val() != "") {
        V_H = Validahora($("#TxtEditIni").val(), $("#TxtEditFin").val());

        switch (V_H) {
            case 1:
                validoEdit = 1;
                break;

            case 2:
                validoEdit = 2;
                break;
        }
    } else {
        Mensaje_General("ERROR - Campos Vacios", "No puedes dejar los campos vacios, debe ingresar un horario valido.", "E");
        validoEdit = 3;
    }

    return validoEdit;
}

//Función que valida que el horario a modificar no exista dentro del array ya creado
function ValidarMatrizEditHorario() {
    var repetido = false;
    EDIT: do {
        if (editNumDia == "1") { //Lunes
            if (WorkMonday == true) {
                repetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                if (repetido == true) {
                    break EDIT;
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "2") { //Martes
            if (WorkTuesday == true) {
                repetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                if (repetido == true) {
                    break EDIT;
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "3") { //Miércoles
            if (WorkWednesday == true) {
                repetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                if (repetido == true) {
                    break EDIT;
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "4") { //Jueves
            if (WorkThursday == true) {
                repetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                if (repetido == true) {
                    break EDIT;
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "5") { //Viernes
            if (WorkFriday == true) {
                repetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                if (repetido == true) {
                    break EDIT;
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "6") { //Sábado
            if (WorkSaturday == true) {
                repetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                if (repetido == true) {
                    break EDIT;
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "7") { //Domingo
            if (WorkSunday == true) {
                frepetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                if (repetido == true) {
                    break EDIT;
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        }
        break EDIT;
    } while (0);
    return repetido;
}

//Función que valida el nuevo horario al editarlo antes de mandar a modificar los arrays
function EditArraysTime() {
    var validate = ValidarHorasEdit();
    switch (validate) {
        case 0:
            var Repetido = ValidarMatrizEditHorario();
            if (Repetido == false) {
                ModifyArrays();
                CargarMatricesHorarios(); //Dibujamos nuevamente la tabla
            } else {
                Mensaje_General("Error - Horario Existe", "No puedes ingresar dos veces una misma combinación de horarios para el este día.", "W");
            }
            break;

        case 1:
            Mensaje_General("Error - Hora Inconsistente", "La hora inicial es mayor que la hora final.", "E");
            break;

        case 2:
            Mensaje_General("Error - Campos Incompletos", "El campo de hora inicial u hora final no se completó.", "W");
            break;
    }
}

//Función que modifca los arrays con los nuevos datos
function ModifyArrays() {
    var NewIni = $("#TxtEditIni").val();
    var NewFin = $("#TxtEditFin").val();

    MODIFY: do {
        if (editNumDia == "1") { //Lunes
            if (WorkMonday == true) {
                for (i in MatrizMonday) {
                    if (MatrizMonday[i].Index == editIndex) { //Cambiamos Matriz del Día
                        MatrizMonday[i].IniLun = NewIni;
                        MatrizMonday[i].FinLun = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana[x].HoraInicial = NewIni;
                                    ArrayC_Semana[x].HoraFinal = NewFin;
                                    break;
                                }
                            }
                        } else { //Sino, lo agregamos, dado que se cambia el horario
                            InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        } else if (editNumDia == "2") { //Martes
            if (WorkTuesday == true) {
                for (i in MatrizTuesday) {
                    if (MatrizTuesday[i].Index == editIndex) {
                        MatrizTuesday[i].IniMar = NewIni;
                        MatrizTuesday[i].FinMar = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana[x].HoraInicial = NewIni;
                                    ArrayC_Semana[x].HoraFinal = NewFin;
                                    break;
                                }
                            }
                        } else { //Sino, lo agregamos, dado que se cambia el horario
                            InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        } else if (editNumDia == "3") { //Miércoles
            if (WorkWednesday == true) {
                for (i in MatrizWednesday) {
                    if (MatrizWednesday[i].Index == editIndex) {
                        MatrizWednesday[i].IniMie = NewIni;
                        MatrizWednesday[i].FinMie = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana[x].HoraInicial = NewIni;
                                    ArrayC_Semana[x].HoraFinal = NewFin;
                                    break;
                                }
                            }
                        } else { //Sino, lo agregamos, dado que se cambia el horario
                            InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        } else if (editNumDia == "4") { //Jueves
            if (WorkThursday == true) {
                for (i in MatrizThursday) {
                    if (MatrizThursday[i].Index == editIndex) {
                        MatrizThursday[i].IniJue = NewIni;
                        MatrizThursday[i].FinJue = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana[x].HoraInicial = NewIni;
                                    ArrayC_Semana[x].HoraFinal = NewFin;
                                    break;
                                }
                            }
                        } else { //Sino, lo agregamos, dado que se cambia el horario
                            InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        } else if (editNumDia == "5") { //Viernes
            if (WorkFriday == true) {
                for (i in MatrizFriday) {
                    if (MatrizFriday[i].Index == editIndex) {
                        MatrizFriday[i].IniVie = NewIni;
                        MatrizFriday[i].FinVie = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana[x].HoraInicial = NewIni;
                                    ArrayC_Semana[x].HoraFinal = NewFin;
                                    break;
                                }
                            }
                        } else { //Sino, lo agregamos, dado que se cambia el horario
                            InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        } else if (editNumDia == "6") { //Sábado
            if (WorkSaturday == true) {
                for (i in MatrizSaturday) {
                    if (MatrizSaturday[i].Index == editIndex) {
                        MatrizSaturday[i].IniSab = NewIni;
                        MatrizSaturday[i].FinSab = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana[x].HoraInicial = NewIni;
                                    ArrayC_Semana[x].HoraFinal = NewFin;
                                    break;
                                }
                            }
                        } else { //Sino, lo agregamos, dado que se cambia el horario
                            InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        } else if (editNumDia == "7") { //Domingo
            if (WorkSunday == true) {
                for (i in MatrizSunday) {
                    if (MatrizSunday[i].Index == editIndex) {
                        MatrizSunday[i].IniDom = NewIni;
                        MatrizSunday[i].FinDom = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana[x].HoraInicial = NewIni;
                                    ArrayC_Semana[x].HoraFinal = NewFin;
                                    break;
                                }
                            }
                        } else { //Sino, lo agregamos, dado que se cambia el horario
                            InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        }
        $("#Dialog_Edit_time").dialog("close");
        break MODIFY;
    } while (0);

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              ELIMINAR HORARIOS DEL CALENDARIO                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Función que permite eliminar una hora que ya ha sido ingresada en el array
function DeleteHoraDia(IndexDia, numDia) {
    //IndexDia se usa para hacer la referencia a la Matriz del día, por ejemplo MatrizMonday y en la matriz que dibuja la grilla, para saber el primer indice de esta matriz
    //Se toma de la Matriz ArrayCalendario_Grid[NumDía][i].index
    //numDia se usa para buscar la referencia a el día en el que se va abuscar ese indice

    editHoraIni = "";
    editHoraFin = "";
    editIndex = "";
    editNumDia = "";

    editIndex = IndexDia;
    editNumDia = numDia;
    EDIT: do {
        if (editNumDia == "1") { //Lunes
            if (WorkMonday == true) {
                for (i in MatrizMonday) {
                    if (MatrizMonday[i].Index == editIndex) {
                        editHoraIni = MatrizMonday[i].IniLun;
                        editHoraFin = MatrizMonday[i].FinLun;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "2") { //Martes
            if (WorkTuesday == true) {
                for (i in MatrizTuesday) {
                    if (MatrizTuesday[i].Index == editIndex) {
                        editHoraIni = MatrizTuesday[i].IniMar;
                        editHoraFin = MatrizTuesday[i].FinMar;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "3") { //Miércoles
            if (WorkWednesday == true) {
                for (i in MatrizWednesday) {
                    if (MatrizWednesday[i].Index == editIndex) {
                        editHoraIni = MatrizWednesday[i].IniMie;
                        editHoraFin = MatrizWednesday[i].FinMie;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "4") { //Jueves
            if (WorkThursday == true) {
                for (i in MatrizThursday) {
                    if (MatrizThursday[i].Index == editIndex) {
                        editHoraIni = MatrizThursday[i].IniJue;
                        editHoraFin = MatrizThursday[i].FinJue;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "5") { //Viernes
            if (WorkFriday == true) {
                for (i in MatrizFriday) {
                    if (MatrizFriday[i].Index == editIndex) {
                        editHoraIni = MatrizFriday[i].IniVie;
                        editHoraFin = MatrizFriday[i].FinVie;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "6") { //Sábado
            if (WorkSaturday == true) {
                for (i in MatrizSaturday) {
                    if (MatrizSaturday[i].Index == editIndex) {
                        editHoraIni = MatrizSaturday[i].IniSab;
                        editHoraFin = MatrizSaturday[i].FinSab;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        } else if (editNumDia == "7") { //Domingo
            if (WorkSunday == true) {
                for (i in MatrizSunday) {
                    if (MatrizSunday[i].Index == editIndex) {
                        editHoraIni = MatrizSunday[i].IniDom;
                        editHoraFin = MatrizSunday[i].FinDom;
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break EDIT;
            }
        }
        if (editHoraIni != "0" || editHoraFin != "0") {
            DeleteArraysTime();
            CargarMatricesHorarios(); //Dibujamos nuevamente la tabla
        }

        break EDIT;
    } while (0);
}

//función que modifica y elimina los datos de los arrays
function DeleteArraysTime() {
    var NewIni = "0";
    var NewFin = "0";

    MODIFY: do {
        if (editNumDia == "1") { //Lunes
            if (WorkMonday == true) {
                for (i in MatrizMonday) {
                    if (MatrizMonday[i].Index == editIndex) { //Cambiamos Matriz del Día
                        MatrizMonday[i].IniLun = NewIni;
                        MatrizMonday[i].FinLun = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana.splice(x, 1);
                                    break;
                                }
                            }
                        } else { //Sino, lo dejamos igual
                            //No se hace nada, pues el dato no existe
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        } else if (editNumDia == "2") { //Martes
            if (WorkTuesday == true) {
                for (i in MatrizTuesday) {
                    if (MatrizTuesday[i].Index == editIndex) {
                        MatrizTuesday[i].IniMar = NewIni;
                        MatrizTuesday[i].FinMar = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana.splice(x, 1);
                                    break;
                                }
                            }
                        } else { //Sino, lo dejamos igual
                            //No se hace nada, pues el dato no existe
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        } else if (editNumDia == "3") { //Miércoles
            if (WorkWednesday == true) {
                for (i in MatrizWednesday) {
                    if (MatrizWednesday[i].Index == editIndex) {
                        MatrizWednesday[i].IniMie = NewIni;
                        MatrizWednesday[i].FinMie = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana.splice(x, 1);
                                    break;
                                }
                            }
                        } else { //Sino, lo dejamos igual
                            //No se hace nada, pues el dato no existe
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        } else if (editNumDia == "4") { //Jueves
            if (WorkThursday == true) {
                for (i in MatrizThursday) {
                    if (MatrizThursday[i].Index == editIndex) {
                        MatrizThursday[i].IniJue = NewIni;
                        MatrizThursday[i].FinJue = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana.splice(x, 1);
                                    break;
                                }
                            }
                        } else { //Sino, lo dejamos igual
                            //No se hace nada, pues el dato no existe
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        } else if (editNumDia == "5") { //Viernes
            if (WorkFriday == true) {
                for (i in MatrizFriday) {
                    if (MatrizFriday[i].Index == editIndex) {
                        MatrizFriday[i].IniVie = NewIni;
                        MatrizFriday[i].FinVie = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana.splice(x, 1);
                                    break;
                                }
                            }
                        } else { //Sino, lo dejamos igual
                            //No se hace nada, pues el dato no existe
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        } else if (editNumDia == "6") { //Sábado
            if (WorkSaturday == true) {
                for (i in MatrizSaturday) {
                    if (MatrizSaturday[i].Index == editIndex) {
                        MatrizSaturday[i].IniSab = NewIni;
                        MatrizSaturday[i].FinSab = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana.splice(x, 1);
                                    break;
                                }
                            }
                        } else { //Sino, lo dejamos igual
                            //No se hace nada, pues el dato no existe
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        } else if (editNumDia == "7") { //Domingo
            if (WorkSunday == true) {
                for (i in MatrizSunday) {
                    if (MatrizSunday[i].Index == editIndex) {
                        MatrizSunday[i].IniDom = NewIni;
                        MatrizSunday[i].FinDom = NewFin;
                        if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                            for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                    ArrayC_Semana.splice(x, 1);
                                    break;
                                }
                            }
                        } else { //Sino, lo dejamos igual
                            //No se hace nada, pues el dato no existe
                        }
                        break;
                    }
                }
            } else {
                Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                break MODIFY;
            }
        }
        break MODIFY;
    } while (0);
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CARGUE GRID CALENDARIO                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpieza de campos despues de agregar un calendario al grid
function Clear_Agregar() {
    $("#TxtIniLun").val("");
    $("#TxtFinLun").val("");
    $("#TxtIniMar").val("");
    $("#TxtFinMar").val("");
    $("#TxtIniMie").val("");
    $("#TxtFinMie").val("");
    $("#TxtIniJue").val("");
    $("#TxtFinJue").val("");
    $("#TxtIniVie").val("");
    $("#TxtFinVie").val("");
    $("#TxtIniSab").val("");
    $("#TxtFinSab").val("");
    $("#TxtIniDom").val("");
    $("#TxtFinDom").val("");

    $('.C_Chosen').trigger('chosen:updated');
}

// crea la tabla de consulta
function Table_Calendario() {

    var html_TableCalendario = "";
    $(".container_TGrid").html("");

    switch (estado) {

        case "buscar":
            html_TableCalendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCalendario) {
                if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                    html_TableCalendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_TableCalendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCalendario) {
                if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                    html_TableCalendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td><span class='cssToolTip_ver'><img src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayCalendario[itemArray].Nit_ID + "','" + ArrayCalendario[itemArray].Calendario_ID + "')\"></img><span>Editar Calendario</span></span></td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_TableCalendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCalendario) {
                if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                    html_TableCalendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayCalendario[itemArray].Nit_ID + "','" + ArrayCalendario[itemArray].Calendario_ID + "')\"></img><span>Eliminar Calendario</span></span></td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_TableCalendario += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_TableCalendario);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TCalendario").dataTable({
        "bJQueryUI": true,
        "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Nit, index_Calendario) {

    for (itemArray in ArrayCalendario) {
        if (index_Nit == ArrayCalendario[itemArray].Nit_ID && index_Calendario == ArrayCalendario[itemArray].Calendario_ID) {
            editNit_ID = ArrayCalendario[itemArray].Nit_ID;
            editID = ArrayCalendario[itemArray].Calendario_ID;
            TipoCalendar = ArrayCalendario[itemArray].TipoCalendario;
            $("#dialog_eliminar").dialog("option", "title", "¿Eliminar Calendario?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

// muestra el registro a editar
function Editar(index_Nit, index_Calendario) {

    $(".Dialog_Datos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayCalendario) {
        if (index_Nit == ArrayCalendario[itemArray].Nit_ID && index_Calendario == ArrayCalendario[itemArray].Calendario_ID) {

            editNit_ID = ArrayCalendario[itemArray].Nit_ID;
            editID = ArrayCalendario[itemArray].Calendario_ID;

            $("#Select_EmpresaNit").val(ArrayCalendario[itemArray].Nit_ID);
            $("#Txt_ID").val(ArrayCalendario[itemArray].Calendario_ID);

            $("#Select_EmpresaNit").attr("disabled", "disabled");
            $("#Txt_ID").attr("disabled", "disabled");

            $("#TxtDescription").val(ArrayCalendario[itemArray].Descripcion);
            $("#Select_TipoCalendario").val(ArrayCalendario[itemArray].TipoCalendario);

            $("#Btnguardar").attr("value", "Actualizar");

            $('.C_Chosen').trigger('chosen:updated');
        }
    }
}

//funcion de carga de la dependecia para edicion
function ChargeDependencia(index) {
    $('#Select_CalendarioDepent').val(index);
    $('.C_Chosen').trigger('chosen:updated');
}

//limpiar campos
function Clear() {
    ArrayCalendario_Grid = [];
    ArrayC_Semana = [];

    MatrizMonday = [];
    MatrizTuesday = [];
    MatrizWednesday = [];
    MatrizThursday = [];
    MatrizFriday = [];
    MatrizSaturday = [];
    MatrizSunday = [];

    MatrizMonday = [];
    MatrizTuesday = [];
    MatrizWednesday = [];
    MatrizThursday = [];
    MatrizFriday = [];
    MatrizSaturday = [];
    MatrizSunday = [];

    Lineas = 0; //Contador de filas que tendrán las matrices

    WorkMonday = true;
    WorkTuesday = true;
    WorkWednesday = true;
    WorkThursday = true;
    WorkFriday = true;
    WorkSaturday = true;
    WorkSunday = true;
    WorkFestivo = false;

    FirstMonday = false;
    FirstTuesday = false;
    FirstWednesday = false;
    FirstThursday = false;
    FirstFriday = false;
    FirstSaturday = false;
    FirstSunday = false;

    MensajeHora = "";
    MensajeVacio = "";
    MensajeRepetido = "";
    V_ONE = 0;

    $("#Select_EmpresaNit").val("-1");
    $("#Txt_ID").val("");
    $("#Txt_ID").prop('disabled', true);
    $("#TxtDescription").val("");
    $("#TxtDescription").prop('disabled', true);
    VerifyTextID(""); //Decir que se borró todo
    VerifyTextDescription(""); //Para decir que borramos todo

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

    $("#Select_StateLun").prop('disabled', false);
    $("#Select_StateLun").val("N").trigger("chosen:updated");
    $("#TxtIniLun").prop('disabled', false);
    $("#TxtFinLun").prop('disabled', false);
    $("#TxtIniLun").val("");
    $("#TxtFinLun").val("");
    $("#Select_StateMar").prop('disabled', false);
    $("#Select_StateMar").val("N").trigger("chosen:updated");
    $("#TxtIniMar").prop('disabled', false);
    $("#TxtFinMar").prop('disabled', false);
    $("#TxtIniMar").val("");
    $("#TxtFinMar").val("");
    $("#Select_StateMie").prop('disabled', false);
    $("#Select_StateMie").val("N").trigger("chosen:updated");
    $("#TxtIniMie").prop('disabled', false);
    $("#TxtFinMie").prop('disabled', false);
    $("#TxtIniMie").val("");
    $("#TxtFinMie").val("");
    $("#Select_StateJue").prop('disabled', false);
    $("#Select_StateJue").val("N").trigger("chosen:updated");
    $("#TxtIniJue").prop('disabled', false);
    $("#TxtFinJue").prop('disabled', false);
    $("#TxtIniJue").val("");
    $("#TxtFinJue").val("");
    $("#Select_StateVie").prop('disabled', false);
    $("#Select_StateVie").val("N").trigger("chosen:updated");
    $("#TxtIniVie").prop('disabled', false);
    $("#TxtFinVie").prop('disabled', false);
    $("#TxtIniVie").val("");
    $("#TxtFinVie").val("");
    $("#Select_StateSab").prop('disabled', false);
    $("#Select_StateSab").val("N").trigger("chosen:updated");
    $("#TxtIniSab").prop('disabled', false);
    $("#TxtFinSab").prop('disabled', false);
    $("#TxtIniSab").val("");
    $("#TxtFinSab").val("");
    $("#Select_StateDom").prop('disabled', false);
    $("#Select_StateDom").val("N").trigger("chosen:updated");
    $("#TxtIniDom").prop('disabled', false);
    $("#TxtFinDom").prop('disabled', false);
    $("#TxtIniDom").val("");
    $("#TxtFinDom").val("");
    $("#Select_Festivo").prop('disabled', false);
    $("#Select_Festivo").val("S").trigger("chosen:updated");

    var Only_Empresa = VerificarNIT("Select_EmpresaNit");

    if (Only_Empresa == true) {
        $("#Txt_ID").prop('disabled', false);
    }
}

//Proceso para detectar que han llenado en ID
function VerifyTextID(value) {
    if (value.length == 0) {
        $("#TxtDescription").val("");
        $("#TxtDescription").prop('disabled', true);
        VerifyTextDescription(""); //Para decir que borramos todo
    } else {
        $("#TxtDescription").prop('disabled', false);
    }
}

//Proceso para detectar que han llenado en Descripción
function VerifyTextDescription(value) {
    if (value.length == 0) {
        $("#Select_TipoCalendario").prop('disabled', true); //No se agrega el trigger porque se hace al seleccionar el val
        $("#Select_TipoCalendario").val("-1").trigger("chosen:updated");
        $("#Tabla_10").css("display", "none");
        $(".Table_Header_Block").css("display", "none"); //Table que contiene el capturador de horas
        $(".container_TGrid_Create").css("display", "none"); //Tabla que dibuja el grid con las horas ya capturadas
    } else {
        $("#Select_TipoCalendario").prop('disabled', false).trigger("chosen:updated");
    }
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESOS DE CHANGES                                                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Proceso de Change para el NIT Empresa
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit").val() == "-1") {
            $("#Img1").css("display", "inline-table");
            $("#Txt_ID").val("");
            $("#Txt_ID").prop('disabled', true);
            $("#TxtDescription").val("");
            $("#TxtDescription").prop('disabled', true);
            VerifyTextID(""); //Decir que se borró todo
            VerifyTextDescription(""); //Para decir que borramos todo
        } else {
            $("#Img1").css("display", "none");
            $("#Txt_ID").prop('disabled', false);
        }
    });
}

//Proceso de Change para el Tipo Calendario
function Change_TipoCalendario() {
    $("#Select_TipoCalendario").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_TipoCalendario").val() == "-1") {
            $("#Img5").css("display", "inline-table");
            $("#Tabla_10").css("display", "none");
            $(".Table_Header_Block").css("display", "none"); //Table que contiene el capturador de horas
        } else {
            $("#Img5").css("display", "none");
            $(".Table_Header_Block").css("display", "inline-table"); //Table que contiene el capturador de horas
            $("#TxtF_Start").val("");
            $("#TxtF_End").val("");
            index_ID = $(this).val();
            switch (index_ID) {
                case "1":
                    $("#Tabla_10").css("display", "none");
                    break;

                case "2":
                    $("#Tabla_10").css("display", "inline-table");
                    break;
            }
        }
    });
}

//Función que recibe por parametro el choosen del estado de cada día para hacer los cambios respectivos
function Change_StateDay(Obj) {
    $("#" + Obj).change(function () {
        //Validamos si no va a ser laboral y bloqueamos las horas de ese día
        if ($(this).val() == "S") {
            switch (Obj) {
                case "Select_StateLun":
                    $("#TxtIniLun").prop('disabled', true);
                    $("#TxtFinLun").prop('disabled', true);
                    $("#TxtIniLun").val("");
                    $("#TxtFinLun").val("");
                    WorkMonday = false;
                    break;
                case "Select_StateMar":
                    $("#TxtIniMar").prop('disabled', true);
                    $("#TxtFinMar").prop('disabled', true);
                    $("#TxtIniMar").val("");
                    $("#TxtFinMar").val("");
                    WorkTuesday = false;
                    break;
                case "Select_StateMie":
                    $("#TxtIniMie").prop('disabled', true);
                    $("#TxtFinMie").prop('disabled', true);
                    $("#TxtIniMie").val("");
                    $("#TxtFinMie").val("");
                    WorkWednesday = false;
                    break;
                case "Select_StateJue":
                    $("#TxtIniJue").prop('disabled', true);
                    $("#TxtFinJue").prop('disabled', true);
                    $("#TxtIniJue").val("");
                    $("#TxtFinJue").val("");
                    WorkThursday = false;
                    break;
                case "Select_StateVie":
                    $("#TxtIniVie").prop('disabled', true);
                    $("#TxtFinVie").prop('disabled', true);
                    $("#TxtIniVie").val("");
                    $("#TxtFinVie").val("");
                    WorkFriday = false;
                    break;
                case "Select_StateSab":
                    $("#TxtIniSab").prop('disabled', true);
                    $("#TxtFinSab").prop('disabled', true);
                    $("#TxtIniSab").val("");
                    $("#TxtFinSab").val("");
                    WorkSaturday = false;
                    break;
                case "Select_StateDom":
                    $("#TxtIniDom").prop('disabled', true);
                    $("#TxtFinDom").prop('disabled', true);
                    $("#TxtIniDom").val("");
                    $("#TxtFinDom").val("");
                    WorkSunday = false;
                    break;
                case "Select_Festivo":
                    WorkFestivo = false;
                    break;


            }
            //Sino desbloqueamos si antes se habia bloqueado y cambiamos la variable
        } else if ($(this).val() == "N") {
            switch (Obj) {
                case "Select_StateLun":
                    $("#TxtIniLun").prop('disabled', false);
                    $("#TxtFinLun").prop('disabled', false);
                    $("#TxtIniLun").val("");
                    $("#TxtFinLun").val("");
                    WorkMonday = true;
                    break;
                case "Select_StateMar":
                    $("#TxtIniMar").prop('disabled', false);
                    $("#TxtFinMar").prop('disabled', false);
                    $("#TxtIniMar").val("");
                    $("#TxtFinMar").val("");
                    WorkTuesday = true;
                    break;
                case "Select_StateMie":
                    $("#TxtIniMie").prop('disabled', false);
                    $("#TxtFinMie").prop('disabled', false);
                    $("#TxtIniMie").val("");
                    $("#TxtFinMie").val("");
                    WorkWednesday = true;
                    break;
                case "Select_StateJue":
                    $("#TxtIniJue").prop('disabled', false);
                    $("#TxtFinJue").prop('disabled', false);
                    $("#TxtIniJue").val("");
                    $("#TxtFinJue").val("");
                    WorkThursday = true;
                    break;
                case "Select_StateVie":
                    $("#TxtIniVie").prop('disabled', false);
                    $("#TxtFinVie").prop('disabled', false);
                    $("#TxtIniVie").val("");
                    $("#TxtFinVie").val("");
                    WorkFriday = true;
                    break;
                case "Select_StateSab":
                    $("#TxtIniSab").prop('disabled', false);
                    $("#TxtFinSab").prop('disabled', false);
                    $("#TxtIniSab").val("");
                    $("#TxtFinSab").val("");
                    WorkSaturday = true;
                    break;
                case "Select_StateDom":
                    $("#TxtIniDom").prop('disabled', false);
                    $("#TxtFinDom").prop('disabled', false);
                    $("#TxtIniDom").val("");
                    $("#TxtFinDom").val("");
                    WorkSunday = true;
                    break;
                case "Select_Festivo":
                    WorkFestivo = true;
                    break;
            }
        }
    });
}
