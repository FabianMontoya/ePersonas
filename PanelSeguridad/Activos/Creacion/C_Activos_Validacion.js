﻿/*--------------- region de variables globales --------------------*/

/*--------------- region de variables globales --------------------*/


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//valida campos de documentos para buscar persona
function ValidaCamposPeople() {
    var valida = 0;
    var C_Nit_ID = $("#Select_EmpresaNit").val();
    var C_TD = $("#Select_Documento").val();
    var C_D = $("#TxtDoc").val();

    if (C_Nit_ID == "-1" || C_TD == "-1" || C_D == "") {
        valida = 1;
        if (C_TD == "-1") { $("#Img_TD").css("display", "inline-table"); } else { $("#Img_TD").css("display", "none"); }
        if (C_D == "") { $("#Img_D").css("display", "inline-table"); } else { $("#Img_D").css("display", "none"); }
        if (C_Nit_ID == "-1") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img_TD").css("display", "none");
        $("#Img_D").css("display", "none");
    }
    return valida;
}

//validamos que tipo de busqueda es y verificamos
function ValidaCamposConsultaFasecolda() {

    var Busqueda;
    var Campo_BF_1 = $("#TxtFasecolda_ID").val();
    var Campo_BF_2 = $("#Select_ClaseF").val();
    var Campo_BF_3 = $("#Select_MarcaF").val();
    var Campo_BF_4 = $("#Select_LineaF").val();
    var Campo_BF_5 = $("#Select_modelo").val();

    switch (Campo_BF_1) {

        case "":
            if (Campo_BF_5 == "-1" || Campo_BF_4 == "" || Campo_BF_3 == "" || Campo_BF_4 == "-1" || Campo_BF_3 == "-1" || Campo_BF_2 == "-1")
                Busqueda = 1;
            else
                Busqueda = Search_Fasecolda(0, "", Campo_BF_2, Campo_BF_3, Campo_BF_4, Campo_BF_5);
            break;

        default:
            if (Campo_BF_5 != "-1") {
                Busqueda = Search_Fasecolda(1, Campo_BF_1, "", "", "", Campo_BF_5);
            }
            else
                Busqueda = 1;
            break;
    }

    return Busqueda;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           PROCESO DE VALIDACION CAMPOS   DINAMICOS                                                             ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// paso 1
//valida fase de guardado
function ValidarGuardado() {

    var Valida_Campos_Op;
    var C_Generales = V_Campos_Generales();

    switch (C_Generales) {

        case 1:
            Mensaje_General("Campos Generales Incompletos!", "Debe diligenciar los Campos minimos requeridos pestañas (Datos Activos, Ubicación)", "E");
            break;

        case 0:
            switch (Tipo_Activo) {
                case 0: //activo default
                    Valida_Campos_Op = V_Campos_K("D");
                    if (Valida_Campos_Op == 1)
                        Mensaje_General("Campo llave Incompleto!", "Debe diligenciar el Campo (C. Identificación)", "E");
                    break;

                case 1: //activo inmueble
                    Valida_Campos_Op = V_Campos_Immuebles();
                    break;

                case 2: //activo automovil
                    Valida_Campos_Op = V_Campos_Vehiculos();
                    break;
            }
            break;
    }

    return Valida_Campos_Op;
}

// paso 2
//validamos campos para la creacion del formulario 
//Obligatorios (Campos generales)
function V_Campos_Generales() {

    var validar = 0;
    //1. identificar campos generales
    var Campo_G1 = $("#Select_EmpresaNit").val(); //Img1
    var Campo_G2 = $("#Select_Sucursal").val(); //Img2
    var Campo_G3 = $("#Select_Tipo").val(); //Img3
    var Campo_G4 = $("#Select_Documento").val(); //Img_TD
    var Campo_G5 = $("#TxtDoc").val();  //Img_D
    var Campo_G6 = $("#txtDescripcion").val(); //Img_5
    var Campo_G7 = $("#Select_Moneda").val(); //Img_6
    var Campo_G8 = $("#Select_Pais_U").val(); //Img_7
    var Campo_G9 = $("#Select_Ciudad_U").val(); //Img_8
    var Campo_G10 = $("#Txt_Adress_U").val(); //Img_9

    if (Campo_G1 == "-1" || Campo_G2 == "-1" ||
        Campo_G3 == "-1" || Campo_G4 == "-1" ||
        Campo_G5 == "" || Campo_G6 == "" ||
        Campo_G7 == "-1" || Campo_G8 == "-1" ||
        Campo_G9 == "-1" || Campo_G10 == "") {

        validar = 1;
        if (Campo_G1 == "-1") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (Campo_G2 == "-1") { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
        if (Campo_G3 == "-1") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
        if (Campo_G4 == "-1") { $("#Img_TD").css("display", "inline-table"); } else { $("#Img_TD").css("display", "none"); }
        if (Campo_G5 == "") { $("#Img_D").css("display", "inline-table"); } else { $("#Img_D").css("display", "none"); }
        if (Campo_G6 == "") { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }
        if (Campo_G7 == "-1") { $("#Img6").css("display", "inline-table"); } else { $("#Img6").css("display", "none"); }
        if (Campo_G8 == "-1") { $("#Img7").css("display", "inline-table"); } else { $("#Img7").css("display", "none"); }
        if (Campo_G9 == "-1") { $("#Img8").css("display", "inline-table"); } else { $("#Img8").css("display", "none"); }
        if (Campo_G10 == "") { $("#Img9").css("display", "inline-table"); } else { $("#Img9").css("display", "none"); }
    }
    else {
        $("#Img_TD").css("display", "none");
        $("#Img_D").css("display", "none");

        $("#Img9").css("display", "none");
        $("#Img8").css("display", "none");
        $("#Img7").css("display", "none");
        $("#Img6").css("display", "none");
        $("#Img5").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img1").css("display", "none");
    }
    return validar;
}

// paso 3
//valida campos referentes a los inmuebles
//Obligatorios (Campos Inmuebles)
function V_Campos_Immuebles() {

    var validar;
    var validar_inmueble = 0;
    var valida_llave = V_Campos_K("I");

    var Campo_In_1 = $("#Select_TipoEscritura").val(); //Inmu_1
    var Campo_In_2 = $("#Txt_NunImobiliaria").val(); //Inmu_2

    if (Campo_In_1 == "-1" || Campo_In_2 == "") {
        validar_inmueble = 1;
        if (Campo_In_1 == "-1") { $("#Inmu_1").css("display", "inline-table"); } else { $("#Inmu_1").css("display", "none"); }
        if (Campo_In_2 == "") { $("#Inmu_2").css("display", "inline-table"); } else { $("#Inmu_2").css("display", "none"); }
    }
    else {
        $("#Inmu_1").css("display", "none");
        $("#Inmu_2").css("display", "none");
    }

    validar = Valida_Keys_Bloque("I", valida_llave, validar_inmueble);
    return validar;
}

// paso 3
//valida campos referentes a los Vehiculos
//Obligatorios (Campos Vehiculos)
function V_Campos_Vehiculos() {

    var validar;
    var validar_Vehiculo = 0;
    var valida_llave = V_Campos_K("V");

    var Campo_F_1 = $("#TxtFasecolda_ID").val(); //Fase_1
    var Campo_F_2 = $("#Select_ClaseF").val(); //Fase_2
    var Campo_F_3 = $("#Select_MarcaF").val(); //Fase_3
    var Campo_F_4 = $("#Select_LineaF").val(); //Fase_4
    var Campo_F_5 = $("#Select_modelo").val(); //Fase_5
    var Campo_F_6 = $("#Txt_Cilindraje").val(); //Fase_6
    var Campo_F_7 = $("#Select_TServicio").val(); //Fase_7
    var Campo_F_8 = $("#Select_Combustible").val(); //Fase_8
    var Campo_F_9 = $("#Select_Color").val(); //Fase_9
    var Campo_F_10 = $("#Txt_Capacidad").val(); //Fase_10

    if (Campo_F_1 == "" || Campo_F_2 == "-1" ||
       Campo_F_3 == "-1" || Campo_F_4 == "-1" ||
       Campo_F_5 == "-1" || Campo_F_6 == "" ||
       Campo_F_7 == "-1" || Campo_F_8 == "-1" ||
       Campo_F_9 == "-1" || Campo_F_10 == "") {

        validar_Vehiculo = 1;
        if (Campo_F_1 == "") { $("#Fase_1").css("display", "inline-table"); } else { $("#Fase_1").css("display", "none"); }
        if (Campo_F_2 == "-1") { $("#Fase_2").css("display", "inline-table"); } else { $("#Fase_2").css("display", "none"); }
        if (Campo_F_3 == "-1") { $("#Fase_3").css("display", "inline-table"); } else { $("#Fase_3").css("display", "none"); }
        if (Campo_F_4 == "-1") { $("#Fase_4").css("display", "inline-table"); } else { $("#Fase_4").css("display", "none"); }
        if (Campo_F_5 == "-1") { $("#Fase_5").css("display", "inline-table"); } else { $("#Fase_5").css("display", "none"); }
        if (Campo_F_6 == "") { $("#Fase_6").css("display", "inline-table"); } else { $("#Fase_6").css("display", "none"); }
        if (Campo_F_7 == "-1") { $("#Fase_7").css("display", "inline-table"); } else { $("#Fase_7").css("display", "none"); }
        if (Campo_F_8 == "-1") { $("#Fase_8").css("display", "inline-table"); } else { $("#Fase_8").css("display", "none"); }
        if (Campo_F_9 == "-1") { $("#Fase_9").css("display", "inline-table"); } else { $("#Fase_9").css("display", "none"); }
        if (Campo_F_10 == "") { $("#Fase_10").css("display", "inline-table"); } else { $("#Fase_10").css("display", "none"); }
    }
    else {
        $("#Fase_10").css("display", "none");
        $("#Fase_9").css("display", "none");
        $("#Fase_8").css("display", "none");
        $("#Fase_7").css("display", "none");
        $("#Fase_6").css("display", "none");
        $("#Fase_5").css("display", "none");
        $("#Fase_4").css("display", "none");
        $("#Fase_3").css("display", "none");
        $("#Fase_2").css("display", "none");
        $("#Fase_1").css("display", "none");
    }

    validar = Valida_Keys_Bloque("V", valida_llave, validar_Vehiculo);
    return validar;
}

// paso 4
//valida campos llave dependiendo de la opcion
function V_Campos_K(Type) {

    validar_key = 0;
    //1. identificar campos llaves
    var Campo_K_1 = $("#TxtRef_1").val(); //K_1
    var Campo_K_2 = $("#TxtRef_2").val(); //K_2
    var Campo_K_3 = $("#TxtRef_3").val(); //K_3
    var Campo_K_4 = $("#TxtRef_Other").val(); //K_4

    switch (Type) {
        case "I":
            if (Campo_K_1 == "" && Campo_K_2 == "" && Campo_K_1 == "") {
                validar_key = 1;

                if (Campo_K_1 == "") { $("#K_1").css("display", "inline-table"); } else { $("#K_1").css("display", "none"); }
                if (Campo_K_2 == "") { $("#K_2").css("display", "inline-table"); } else { $("#K_2").css("display", "none"); }
                if (Campo_K_3 == "") { $("#K_3").css("display", "inline-table"); } else { $("#K_13").css("display", "none"); }
            }
            else {
                $("#K_1").css("display", "none");
                $("#K_2").css("display", "none");
                $("#K_3").css("display", "none");
            }
            break;

        case "V":
            if (Campo_K_4 == "") {
                validar_key = 1;
                if (Campo_K_4 == "") { $("#K_4").css("display", "inline-table"); } else { $("#K_4").css("display", "none"); }
            }
            else
                $("#K_4").css("display", "none");
            break;

        case "D":
            if (Campo_K_4 == "") {
                validar_key = 1;
                if (Campo_K_4 == "") { $("#K_4").css("display", "inline-table"); } else { $("#K_4").css("display", "none"); }
            }
            else
                $("#K_4").css("display", "none");
            break;

    }

    return validar_key;
}

// paso 5
//valida el resultado de las llaves y bloque de tipo de activo seleccionado
function Valida_Keys_Bloque(Type, Val_Key, Val_Bloque) {
    var validar;

    switch (Type) {
        case "I":
            //revisamos resultado de campos seleccionados
            if (Val_Bloque == 0 && Val_Key == 0)
                validar = 0;
            else {
                validar = 1;
                if (Val_Bloque == 1)
                    Mensaje_General("Campos Inmueble Incompletos!", "Debe diligenciar los Campos de inmuebles requeridos (1 - Inmueble)", "E");

                if (Val_Key == 1)
                    Mensaje_General("Campos Llaves Inmueble!", "Debe diligenciar alguna de las 3 llaves de inmuebles (Cedula Catastral, Matricula Imbiliaria, Numero Unico ID)", "E");

                if (Val_Key == 1 && Val_Bloque == 1)
                    Mensaje_General("Inmueble Incompleto!", "Debe diligenciar alguna de las 3 llaves de inmuebles (Cedula Catastral, Matricula Imbiliaria, Numero Unico ID) y revisar el modulo de (1 - Inmueble)", "E");
            }
            break;

        case "V":
            if (Val_Bloque == 0 && Val_Key == 0)
                validar = 0;
            else {
                validar = 1;
                if (Val_Bloque == 1)
                    Mensaje_General("Campos Vehículo Incompletos!", "Debe diligenciar los Campos de Vehículo requeridos (2 - Vehículos)", "E");

                if (Val_Key == 1)
                    Mensaje_General("Campos Llave Vehículo!", "Debe diligenciar la (Placa) del Vehículo", "E");

                if (Val_Key == 1 && Val_Bloque == 1)
                    Mensaje_General("Vehículo Incompleto!", "Debe diligenciar la (Placa) del Vehículo y revisar el modulo de (2 - Vehículos)", "E");
            }
            break;
    }
    return validar;
}
