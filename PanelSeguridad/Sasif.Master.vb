﻿Public Class Sasif
    Inherits System.Web.UI.MasterPage

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Response.Cache.SetCacheability(HttpCacheability.NoCache)
        Response.Cache.SetAllowResponseInBrowserHistory(False)
        Response.AddHeader("cache-control", "private")
        Response.CacheControl = "no-cache"
        Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate") ' HTTP 1.1.
        Response.AddHeader("Pragma", "no-cache") ' HTTP 1.0.
        Response.AddHeader("Expires", "0") ' Proxies.
    End Sub

End Class