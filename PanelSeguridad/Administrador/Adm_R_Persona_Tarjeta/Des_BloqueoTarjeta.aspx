﻿<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="Des_BloqueoTarjeta.aspx.vb" Inherits="PanelSeguridad.Des_BloqueoTarjeta" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Des_BloqueoTarjeta.js" type="text/javascript"></script>
    <script src="Des_BloqueoTarjetaTrasaccionsAjax.js" type="text/javascript"></script>
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
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div id="Container_title_Form">
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
    <div id="Marco_Container">
        <div id="Container_controls">
            <div id="TablaDatos_D">
                <table id="Tabla_1" style="width: 100%; text-align: left;">
                    <tr>
                        <td style="width: 5%;" class="Label_Bold">Empresa 
                        </td>
                        <td>
                            <select id="Select_EmpresaNit" class="C_Chosen">
                            </select>
                        </td>
                        <td style="padding-bottom: 25px; width: 50%;">
                            <span class="cssToolTip">
                                <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                    src="../../images/error.png" />
                                <span class="SpamEG"></span></span>
                        </td>
                    </tr>
                </table>
                <table id="Tabla_2" style="width: 100%; text-align: left;">
                    <tr>
                        <td style="width: 5%;" class="Label_Bold">Tarjeta
                        </td>
                        <td>
                            <select id="Select_Tarjeta_DBlo" class="C_Chosen">
                            </select>
                        </td>
                        <td style="padding-bottom: 25px; width: 70%;">
                            <span class="cssToolTip_L">
                                <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
                                    src="../../images/error.png" />
                                <span class="SpamEG"></span></span>
                        </td>
                    </tr>
                </table>
                <table id="Tabla_3" style="width: 100%; text-align: left;">
                    <tr>
                        <td style="width: 5%;" class="Label_Bold">Persona
                        </td>
                        <td id="V_Persona"></td>
                    </tr>
                </table>
                <div id="DIV_Des_Bloqueo">
                    <table id="Tabla_4" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Motivo Des_Bloqueo
                            </td>
                            <td>
                                <select id="Select_Des_Bloqueo" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 300px;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_5" style="width: 100%; text-align: left;">
                        <tr>
                            <td style="width: 140px;" class="Label_Bold">Observaciones
                            </td>
                            <td style="width: 200px;">
                                <span class="cssToolTip_Form">
                                    <textarea id="TxtA_Observacion" rows="1" cols="70"> </textarea>
                                    <span class="Spam_ACI"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center">
                                <p>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="6" align="center">
                                <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
                            </td>
                        </tr>
                    </table>
                </div>
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
                    <img alt="Warning" id="WE" src="../../images/alert.png" />
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
                        Desea eliminar el siguiente registro?
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
</asp:Content>
