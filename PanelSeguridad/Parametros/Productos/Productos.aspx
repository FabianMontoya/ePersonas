﻿<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="Productos.aspx.vb" Inherits="PanelSeguridad.Productos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Productos.js" type="text/javascript"></script>
    <script src="ProductosTrasaccionsAjax.js" type="text/javascript"></script>
    <link href="../../css/css_login.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_form.css" rel="stylesheet" type="text/css" />
    <link href="../../css/datatables/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../css/custom/charge.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.dataTables.min.js" type="text/javascript"></script>
    <link href="../../css/css_controles.css" rel="stylesheet" type="text/css" />
    <link href="../../css/custom/Control_Sasif.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div id="Dialog_Control" style="width: 100%; text-align: center;">
        <div class="cssload-container" style="margin-top: 25%;">
            <div class="cssload-whirlpool"></div>
            <div>
                <img id="Sasif" class="Logo_3" src="../../images/SASIF_NEW_WHITE.png" alt="SASIF S.A.S." />
            </div>
        </div>
    </div>
    <div class="Container_title_Form">
        <table id="Tabla_Title_form">
            <tr>
                <td id="Title_form"></td>
                <td id="image_exit">
                    <span class="cssToolTip_Form_L">
                        <input id="BtnExit" type="button" value="X" onclick="btnSalir();" /><span class="Spam_AEXIT_MOD"></span></span>
                </td>
            </tr>
        </table>
    </div>
    <div class="Marco_Container">
        <div class="Marco_btn_Form">
            <input id="BtnShearh" type="button" value="Consulta" onclick="HabilitarPanel('buscar');" />
            <input id="BtnCreate" type="button" value="Crear" onclick="HabilitarPanel('crear');" />
            <input id="BtnUpdate" type="button" value="Actualizar" onclick="HabilitarPanel('modificar');" />
            <input id="BtnDelete" type="button" value="Eliminar" onclick="HabilitarPanel('eliminar');" />
        </div>
        <div class="Marco_trabajo_Form">
            <div class="Container_controls">
                <table id="TablaConsulta">
                    <tr>
                        <td style="width: 25%;">
                            <select id="DDLColumns" class="C_Chosen">
                            </select>
                        </td>
                        <td style="width: 65%;">
                            <span class="cssToolTip_Form">
                                <input id="TxtRead" type="text" style="width: 60%; margin-left: 10%;" />
                                <span class="Spam_AST"></span></span>
                        </td>
                        <td colspan="4" align="center" id="TD3" style="width: 20%;">
                            <input id="BtnRead" type="button" value="Buscar" onclick="BtnConsulta();" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div class="container_TGrid">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div id="dialog" title="Basic dialog">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td class="Label_Bold">
                    <p id="Mensaje_alert">
                    </p>
                </td>
                <td>
                    <img alt="error" id="DE" src="../../images/error_2.png" />
                    <img alt="success" id="SE" src="../../images/success.png" />
                    <img alt="Warning" id="WA" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnExitD" type="button" value="Salir" style="width: 40%;" onclick="x();" />
                </td>
            </tr>
        </table>
    </div>
    <div id="dialog_eliminar" title="Basic dialog">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td>
                    <p class="Label_Bold" id="P1">
                        ¿Desea eliminar el siguiente registro?
                    </p>
                </td>
                <td>
                    <img alt="Warning" id="Img4" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnElimin" type="button" value="Confirmar" onclick="BtnElimina();" />
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Productos">
        <table class="Table_Header_Block">
            <tr>
                <td>
                    <table id="Tabla_1" style="width: 100%; margin-left: 100px;">
                        <tr>
                            <td id="TD_ID" style="width: 150px;" class="Label_Bold">Nit Empresa
                            </td>
                            <td id="TD_TID">
                                <select id="Select_EmpresaNit" class="C_Chosen" style="width: 200px;">
                                </select>
                            </td>
                            <td style="width: 550px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_2" style="margin-left: 100px;">
                        <tr>
                            <td class="Label_Bold" style="width: 150px;">Codigo
                            </td>
                            <td style="width: 100px;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Txt_ID" maxlength="5" class="Numeric" />
                                    <span class="Spam_AN"></span></span>
                            </td>
                            <td style="width: 40px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgID"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 120px;">Descripción
                            </td>
                            <td style="width: 100px;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtDescripcion" maxlength="50" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="width: 40px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_3" style="width: 100%; margin-left: 100px;">
                        <tr>
                            <td class="Label_Bold" style="width: 150px;">Tipo de Producto
                            </td>
                            <td>
                                <select id="Select_Tipo_P" class="C_Chosen" style="width: 250px;">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td class="Label_Bold">Sub-Tipo de Producto
                            </td>
                            <td>
                                <select id="Select_SubTipo_P" class="C_Chosen" style="width: 200px;">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 500px"></td>
                        </tr>
                    </table>
                    <table id="Table4" style="width: 100%; margin-left: 100px;">
                        <tr>
                            <td class="Label_Bold" style="width: 150px;">Causación de Interés Corriente
                            </td>
                            <td>
                                <select id="Select_Caus_Int_Cte" class="C_Chosen" style="width: 250px;">
                                    <option value="-1">Seleccione...</option>
                                    <option value="N">N - Nominal</option>
                                    <option value="E">E - Efectiva</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px;"></td>
                        </tr>
                        <tr>
                            <td class="Label_Bold">Causación Mora
                            </td>
                            <td>
                                <select id="Select_Caus_Mora" class="C_Chosen" style="width: 200px;">
                                    <option value="-1">Seleccione...</option>
                                    <option value="N">N - Nominal</option>
                                    <option value="E">E - Efectiva</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 500px"></td>
                        </tr>
                        <tr>
                            <td class="Label_Bold">Base de Mora
                            </td>
                            <td>
                                <select id="Select_Base_Mora" class="C_Chosen" style="width: 200px;">
                                    <option value="-1">Seleccione...</option>
                                    <option value="1">1 - Capital</option>
                                    <option value="2">2 - Interés</option>
                                    <option value="3">3 - Capital + Interés</option>
                                    <option value="4">4 - Capital + Interés + Otros Conceptos</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 500px"></td>
                        </tr>
                        <tr>
                            <td class="Label_Bold">¿Capitaliza?
                            </td>
                            <td>
                                <select id="Select_Capitalizacion" class="C_Chosen" style="width: 200px;">
                                    <option value="-1">Seleccione...</option>
                                    <option value="S">S - Si</option>
                                    <option value="N">N - No</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 500px"></td>
                        </tr>
                        <tr>
                            <td class="Label_Bold">¿Control de Activos?
                            </td>
                            <td>
                                <select id="Select_Control_Activos" class="C_Chosen" style="width: 200px;">
                                    <option value="-1">Seleccione...</option>
                                    <option value="S">S - Si</option>
                                    <option value="N">N - No</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 500px"></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table class="Table_Header_Block">
            <tr>
                <td colspan="6" align="center" class="Title_Bold">TRANSACCIONES
                </td>
            </tr>
            <tr style="text-align: center;">
                <td class="Label_Bold">TRANSACCIONES
                </td>
                <td class="Label_Bold">CREACIÓN
                </td>
                <td class="Label_Bold">MODIFICA
                </td>
                <td class="Label_Bold">RETIRA
                </td>
            </tr>
            <tr style="text-align: center;">
                <td class="Label_Bold" style="width: 200px;">AUTOMATICAS
                </td>
                <td style="width: 200px;">
                    <select id="Select_Crea" class="C_Chosen">
                    </select>
                </td>
                <td style="width: 200px;">
                    <select id="Select_Mod" class="C_Chosen">
                    </select>
                </td>
                <td style="width: 200px;">
                    <select id="Select_Ret" class="C_Chosen">
                    </select>
                </td>
            </tr>
        </table>
        <table class="Table_Header_Block">
            <tr>
                <td colspan="10" align="center" class="Title_Bold">CUENTAS CONTABLES
                </td>
            </tr>
            <tr>
                <td class="Label_Bold " style="width: 40px; text-align: center;">01
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_1" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">02
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_2" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">03
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_3" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">04
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_4" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">05
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_5" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
            </tr>
            <tr>
                <td class="Label_Bold " style="width: 40px; text-align: center;">06
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_6" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">07
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_7" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">08
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_8" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">09
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_9" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">10
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_10" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
            </tr>
            <tr>
                <td class="Label_Bold " style="width: 40px; text-align: center;">11
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_11" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">12
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_12" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">13
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_13" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">14
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_14" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">15
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_15" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
            </tr>
            <tr>
                <td class="Label_Bold " style="width: 40px; text-align: center;">16
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_16" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">17
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_17" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">18
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_18" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">19
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_19" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">20
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_20" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
            </tr>
            <tr>
                <td class="Label_Bold " style="width: 40px; text-align: center;">21
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_21" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">22
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_22" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">23
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_23" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">24
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_24" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">25
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_25" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
            </tr>
            <tr>
                <td class="Label_Bold " style="width: 40px; text-align: center;">26
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_26" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">27
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_27" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">28
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_28" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">29
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_29" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">30
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_30" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
            </tr>
            <tr>
                <td class="Label_Bold " style="width: 40px; text-align: center;">31
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_31" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">32
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_32" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">33
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_33" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">34
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_34" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">35
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_35" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
            </tr>
            <tr>
                <td class="Label_Bold " style="width: 40px; text-align: center;">36
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_36" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">37
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_37" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">38
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_38" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">39
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_39" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">40
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_40" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
            </tr>
            <tr>
                <td class="Label_Bold " style="width: 40px; text-align: center;">41
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_41" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">42
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_42" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">43
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_43" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">44
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_44" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">45
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_45" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
            </tr>
            <tr>
                <td class="Label_Bold " style="width: 40px; text-align: center;">46
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_46" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">47
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_47" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">48
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_48" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">49
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_49" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
                <td class="Label_Bold " style="width: 40px; text-align: center;">50
                </td>
                <td style="width: 100px; text-align: center;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtCuenta_50" maxlength="19" class="Numeric_letter" />
                        <span class="Spam_ANL"></span></span>
                </td>
            </tr>
        </table>
        <div style="width: 100%; text-align: center; margin-top: 25px;">
            <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
        </div>
    </div>
</asp:Content>
