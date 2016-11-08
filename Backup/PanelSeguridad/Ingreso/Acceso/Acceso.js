﻿/*--------------- region de variables globales --------------------*/
var Matrix_Persona = [];
var Matrix_DocWork = [];
var Matrix_PersonaDoc = [];

var Matrix_PAcceso = [];
var Matrix_Area = [];

var ArrayAcceso = [];
var ArrayCombo = [];
var ArrayAccesoDep = [];
var ArraySeguridad = [];
var ArrayTdoc = [];

var Nit_ID_Proccess;
var Fecha_Vencimiento;
var RutaDocumento;
var Imagen_Vencimiento;
var EstadoVerif;

var editNit_ID;
var index_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transaccionAjax_MPersonas('MATRIX_PERSONAS');
    transaccionAjax_MDocWork('MATIRXDOC_WORK');
    transaccionAjax_MPersona_Doc('MATRIX_PERSONAS_DOC');

    transaccionAjax_MPAcceso('MATRIX_PACCESO');
    transaccionAjax_MArea('MATRIX_AREA');
    //transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Documento('Documento');

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

    $("#Inf_persona").css("display", "none");
    $("#Div_D").css("display", "none");

    //funcion para las ventanas emergentes
    $("#dialog").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif_Web",
        modal: true
    });

    $("#dialog_eliminar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif_Web",
        modal: true
    });

    $("#Dialog_Visor").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif_Web",
        modal: true,
        width: 1000,
        height: 520,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    Capture_Tarjeta_ID();
});

//consuta datos
function BtnConsulta() {
    var validate = Campos();

    if (validate == 0) {
        var Exist = SearchPersona();
        if (Exist == 1) {
            $("#Inf_persona").css("display", "inline-table");
            SearchEmpresa();
        }
        else {
            Mensaje_General("No existe!", "La persona A ingresar No existe en el Sistema!", "W");
            $("#Inf_persona").css("display", "none");
        }
    }
}

// validamos campos de captura
function Campos() {

    var Campo_1 = $("#Select_Documento").val();
    var Campo_2 = $("#TxtDoc").val();
    var validar = 0;

    if (Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
    }
    return validar;
}

//buscar persona en la matrix
function SearchPersona() {
    var TDoc = $("#Select_Documento").val();
    var Doc = $("#TxtDoc").val();
    var GrpDoc;
    var Exist = 0;
    for (item in Matrix_Persona) {
        if (TDoc == Matrix_Persona[item].TypeDocument_ID &&
             Doc == Matrix_Persona[item].Document_ID) {

            Exist = 1;

            Nit_ID_Proccess = Matrix_Persona[item].Nit_ID;
            GrpDoc = Matrix_Persona[item].GrpDocumentos;
            $("#L_Nombre").html(Matrix_Persona[item].Nombre);
            $("#L_Empresa").html(Matrix_Persona[item].DescripEmpresa);
            $("#L_Area").html(Matrix_Persona[item].DescripArea);
            $("#L_Cargo").html(Matrix_Persona[item].DescripCargo);
            SearchFoto(TDoc, Doc);
            Tabla_Docs(Matrix_Persona[item].Nit_ID, TDoc, Doc, GrpDoc, "Empleado");
            break;
        }
    }
    return Exist;
}

//buscar datos de la empresa del empleado
function SearchEmpresa() {
    var TDoc;
    var GrpDoc;
    var L_Nit = Nit_ID_Proccess.length;
    var Nit_Emp = Nit_ID_Proccess.substring(0, parseInt(L_Nit) - 1);

    for (item in Matrix_Persona) {
        if (Nit_ID_Proccess == Matrix_Persona[item].Nit_ID &&
             Nit_Emp == Matrix_Persona[item].Document_ID) {

            GrpDoc = Matrix_Persona[item].GrpDocumentos;
            TDoc = Matrix_Persona[item].TypeDocument_ID;

            Tabla_Docs(Nit_ID_Proccess, TDoc, Nit_Emp, GrpDoc, "Empresa");
            break;
        }
    }
}

//buscar Foto de la persona
function SearchFoto(TDoc, Doc) {
    var StrSrc = "";
    for (item in Matrix_DocWork) {
        if (Matrix_DocWork[item].TypeDocument_ID == TDoc &&
             Matrix_DocWork[item].Document_ID &&
             Matrix_DocWork[item].Indicativo == "S") {
            StrSrc = Matrix_DocWork[item].RutaRelativaDocumento + Matrix_DocWork[item].Nombre_Save + '.' + Matrix_DocWork[item].DescripFormato;
            break;
        }
    }
    ViewFoto(StrSrc);
}

//crear la ruta del src de la imagen
function ViewFoto(StrSrc) {
    if (StrSrc != "")
        $("#Imgfoto").attr("src", StrSrc);
    else {
        StrSrc = "../../images/avatar.png";
        $("#Imgfoto").attr("src", StrSrc);
    }
}

// crea la tabla en el cliente
function Tabla_Docs(Nit, TDoc, Doc, GrpDoc, Type) {
    var html_DP;

    switch (Type) {
        case "Empleado":
            html_DP = "<table id='TDP' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th class='T_head' colspan='6'>Documentación Empleado</th></tr><tr><th>Documento</th><th>Existe</th><th>Verificado</th><th>Vigencia</th><th>Fecha Vencimiento</th><th>Ver</th></tr></thead><tbody>";
            for (itemArray in Matrix_PersonaDoc) {
                Fecha_Vencimiento = "";
                if (Matrix_PersonaDoc[itemArray].Nit_ID == Nit &&
                     Matrix_PersonaDoc[itemArray].TypeDocument_ID == TDoc &&
                     Matrix_PersonaDoc[itemArray].Document_ID == Doc &&
                     Matrix_PersonaDoc[itemArray].GrpDocumentos_ID == GrpDoc) {
                    var Existe_Doc = ValidaDoc(Matrix_PersonaDoc[itemArray].Nit_ID, Matrix_PersonaDoc[itemArray].Document_ID, Matrix_PersonaDoc[itemArray].Documento_ID);

                    switch (Existe_Doc) {
                        case "NO":
                            var JsonVerifDoc = {
                                "Existe": 1,
                                "Verificado": 1,
                                "Vigencia": 1
                            };
                            html_DP += "<tr id= 'TDP_" + Matrix_PersonaDoc[itemArray].Nit_ID + "'><td>" + Matrix_PersonaDoc[itemArray].Descripcion + "</td><td><span class='cssToolTip'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /><span>No existe " + Matrix_PersonaDoc[itemArray].Descripcion + "!</span></span></td><td></td><td></td><td></td><td></td></tr>";
                            break;

                        case "EXISTE":
                            var JsonVerifDoc = {
                                "Existe": 0,
                                "Verificado": 0,
                                "Vigencia": 0
                            };
                            html_DP += "<tr id= 'TDP_" + Matrix_PersonaDoc[itemArray].Nit_ID + "'><td>" + Matrix_PersonaDoc[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td></td><td></td><td></td><td></td></tr>";
                            break;

                        case "PEND":
                            html_DP += "<tr id= 'TDP_" + Matrix_PersonaDoc[itemArray].Nit_ID + "'><td>" + Matrix_PersonaDoc[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td><span class='cssToolTip'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_YELLOW.png' /><span>" + EstadoVerif + "</span></span></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/" + Imagen_Vencimiento + "' /></td><td>" + Fecha_Vencimiento + "</td><td><span class='cssToolTip_Form_L'><img alt='' title='' style=' height: 21px; width: 21px;' src='../../images/LOOK_BLACK.png' onclick=\"VerDocumento('" + RutaDocumento + "','" + $("#L_Nombre").html() + "');\" /><span>Ver Documento</span></span></td></tr>";
                            break;

                        case "VERIF":
                            html_DP += "<tr id= 'TDP_" + Matrix_PersonaDoc[itemArray].Nit_ID + "'><td>" + Matrix_PersonaDoc[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td><span class='cssToolTip_Form'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /><span>" + EstadoVerif + "</span></span></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/" + Imagen_Vencimiento + "' /></td><td>" + Fecha_Vencimiento + "</td><td><span class='cssToolTip_Form_L'><img alt='' title='' style=' height: 21px; width: 21px;' src='../../images/LOOK_BLACK.png' onclick=\"VerDocumento('" + RutaDocumento + "','" + $("#L_Nombre").html() + "');\" /><span>Ver Documento</span></span></td></tr>";
                            break;

                        case "RECHA":
                            html_DP += "<tr id= 'TDP_" + Matrix_PersonaDoc[itemArray].Nit_ID + "'><td>" + Matrix_PersonaDoc[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td><span class='cssToolTip'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /><span>" + EstadoVerif + "</span></span></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/" + Imagen_Vencimiento + "' /></td><td>" + Fecha_Vencimiento + "</td><td><span class='cssToolTip_Form_L'><img alt='' title='' style=' height: 21px; width: 21px;' src='../../images/LOOK_BLACK.png' onclick=\"VerDocumento('" + RutaDocumento + "','" + $("#L_Nombre").html() + "');\" /><span>Ver Documento</span></span></td></tr>";
                            break;

                        default:
                            html_DP += "<tr id= 'TDP_" + Matrix_PersonaDoc[itemArray].Nit_ID + "'><td>" + Matrix_PersonaDoc[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /></td><td></td><td></td><td></td><td></td></tr>";
                            break;
                    }

                }
            }
            html_DP += "</tbody></table>";
            $("#container_T_DP").html("");
            $("#container_T_DP").html(html_DP);

            $("#TDP").dataTable({
                "bJQueryUI": true, "iDisplayLength": 1000,
                "bDestroy": true
            });
            break;

        case "Empresa":
            html_DP = "<table id='TDE' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th class='T_head' colspan='6'>Documentación Empresa</th></tr><tr><th>Documento</th><th>Existe</th><th>Verificado</th><th>Vigencia</th><th>Fecha Vencimiento</th><th>Ver</th></tr></thead><tbody>";
            for (itemArray in Matrix_PersonaDoc) {
                if (Matrix_PersonaDoc[itemArray].Nit_ID == Nit &&
             Matrix_PersonaDoc[itemArray].TypeDocument_ID == TDoc &&
             Matrix_PersonaDoc[itemArray].Document_ID == Doc &&
             Matrix_PersonaDoc[itemArray].GrpDocumentos_ID == GrpDoc) {

                    var Existe_Doc = ValidaDoc(Matrix_PersonaDoc[itemArray].Nit_ID, Matrix_PersonaDoc[itemArray].Document_ID, Matrix_PersonaDoc[itemArray].Documento_ID);

                    switch (Existe_Doc) {
                        case "NO":
                            html_DP += "<tr id= 'TDP_" + Matrix_PersonaDoc[itemArray].Nit_ID + "'><td>" + Matrix_PersonaDoc[itemArray].Descripcion + "</td><td><span class='cssToolTip'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /><span>No existe " + Matrix_PersonaDoc[itemArray].Descripcion + "!</span></span></td><td></td><td></td><td></td><td></td></tr>";
                            break;

                        case "EXISTE":
                            html_DP += "<tr id= 'TDP_" + Matrix_PersonaDoc[itemArray].Nit_ID + "'><td>" + Matrix_PersonaDoc[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td></td><td></td><td></td><td></td></tr>";
                            break;

                        case "PEND":
                            html_DP += "<tr id= 'TDP_" + Matrix_PersonaDoc[itemArray].Nit_ID + "'><td>" + Matrix_PersonaDoc[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td><span class='cssToolTip'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_YELLOW.png' /><span>" + EstadoVerif + "</span></span></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/" + Imagen_Vencimiento + "' /></td><td>" + Fecha_Vencimiento + "</td><td><span class='cssToolTip_Form_L'><img alt='' title='' style=' height: 21px; width: 21px;' src='../../images/LOOK_BLACK.png' onclick=\"VerDocumento('" + RutaDocumento + "','" + $("#L_Nombre").html() + "');\" /><span>Ver Documento</span></span></td></tr>";
                            break;

                        case "VERIF":
                            html_DP += "<tr id= 'TDP_" + Matrix_PersonaDoc[itemArray].Nit_ID + "'><td>" + Matrix_PersonaDoc[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td><span class='cssToolTip_Form'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /><span>" + EstadoVerif + "</span></span></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/" + Imagen_Vencimiento + "' /></td><td>" + Fecha_Vencimiento + "</td><td><span class='cssToolTip_Form_L'><img alt='' title='' style=' height: 21px; width: 21px;' src='../../images/LOOK_BLACK.png' onclick=\"VerDocumento('" + RutaDocumento + "','" + $("#L_Nombre").html() + "');\" /><span>Ver Documento</span></span></td></tr>";
                            break;

                        case "RECHA":
                            html_DP += "<tr id= 'TDP_" + Matrix_PersonaDoc[itemArray].Nit_ID + "'><td>" + Matrix_PersonaDoc[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td><span class='cssToolTip'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /><span>" + EstadoVerif + "</span></span></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/" + Imagen_Vencimiento + "' /></td><td>" + Fecha_Vencimiento + "</td><td><span class='cssToolTip_Form_L'><img alt='' title='' style=' height: 21px; width: 21px;' src='../../images/LOOK_BLACK.png' onclick=\"VerDocumento('" + RutaDocumento + "','" + $("#L_Nombre").html() + "');\" /><span>Ver Documento</span></span></td></tr>";
                            break;

                        default:
                            html_DP += "<tr id= 'TDP_" + Matrix_PersonaDoc[itemArray].Nit_ID + "'><td>" + Matrix_PersonaDoc[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /></td><td></td><td></td><td></td><td></td></tr>";
                            break;
                    }
                  
                }
            }
            html_DP += "</tbody></table>";
            $("#container_T_DE").html("");
            $("#container_T_DE").html(html_DP);

            $("#TDE").dataTable({
                "bJQueryUI": true, "iDisplayLength": 1000,
                "bDestroy": true
            });
            break;
    }
}

//verificar documento
function ValidaDoc(Nit, PDoc, Doc_ID) {
    var estado = "NO";
    console.log(Nit + "," + PDoc + "," + Doc_ID);
    for (item in Matrix_DocWork) {
        if (Matrix_DocWork[item].Nit_ID == Nit &&
            Matrix_DocWork[item].Document_ID == PDoc &&
            Matrix_DocWork[item].Documento_ID == Doc_ID) {
            var verifico = Matrix_DocWork[item].Verificado;
            Fecha_Vencimiento = Matrix_DocWork[item].Fecha_Vencimiento;
            RutaDocumento = Matrix_DocWork[item].RutaRelativaDocumento + Matrix_DocWork[item].Nombre_Save + "." + Matrix_DocWork[item].DescripFormato;
            var comparacion;

            if (Fecha_Vencimiento != "") {
                comparacion = validate_fechaMayorQue(Fecha_Vencimiento, "", "SystemCompare");
                if (comparacion == "Mayor")
                    Imagen_Vencimiento = "C_RED.png";
                else
                    Imagen_Vencimiento = "C_GREEN.png";
            }
            else {
                Imagen_Vencimiento = "C_GREEN.png";
            }

            switch (verifico) {
                case "1":
                    estado = "PEND";
                    EstadoVerif = "Pendiente por Verificar";
                    break;
          
                case "2":
                    estado = "VERIF";
                    EstadoVerif = "verificado";
                    break;
          
                case "3":
                    estado = "RECHA";
                    EstadoVerif = "Rechazado";
                    break;
          
                case "0":
                    estado = "VERIF";
                    EstadoVerif = "verificado";
                    break;
          
                case "":
                    estado = "VERIF";
                    EstadoVerif = "verificado";
                    break;
          
                default:
                    estado = "EXISTE";
                    break;
            }
        }
    }

    return estado;
}

//ver documento en pantalla
function VerDocumento(RutaDocumento, Documento) {

    $("#IF_Visor").attr("width", "100%");
    $("#IF_Visor").attr("height", "100%");
    $("#IF_Visor").attr("src", RutaDocumento);

    $("#Dialog_Visor").dialog("open");
    $("#Dialog_Visor").dialog("option", "title", Documento);
}





//captura el numero y uesta info
function Capture_Tarjeta_ID() {
    $("#ID_Tarjeta_Cap").change(function () {
        var StrID = $(this).val();
        console.log("E2");
    });

}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}



//muestra el registro a eliminar
function Eliminar(Index_GrpDocumento) {

    editNit_ID = ArrayAcceso[Index_GrpDocumento].Nit_ID;
    editID = ArrayAcceso[Index_GrpDocumento].PuertaAcceso_ID;
    editDocID = ArrayAcceso[Index_GrpDocumento].Area_ID;

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
    $("#Select_PAcceso").val("-1");
    $("#Select_Area").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}

//llamado de mensajes
function Mensaje_General(Title, Msn, Type) {
    $("#dialog").dialog("open");
    $("#dialog").dialog("option", "title", Title);
    $("#Mensaje_alert").text(Msn);

    switch (Type) {
        case "E":
            $("#DE").css("display", "block");
            $("#SE").css("display", "none");
            $("#WE").css("display", "none");
            break;

        case "W":
            $("#DE").css("display", "none");
            $("#SE").css("display", "none");
            $("#WE").css("display", "block");
            break;

        case "S":
            $("#DE").css("display", "none");
            $("#SE").css("display", "block");
            $("#WE").css("display", "none");
            break;
    }
}