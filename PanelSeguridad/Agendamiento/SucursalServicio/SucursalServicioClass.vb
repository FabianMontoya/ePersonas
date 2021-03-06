﻿Public Class SucursalServicioClass

#Region "campos"
    Private _Nit_ID As String
    Private _Codigo_ID As Integer
    Private _Surcursal_ID As Integer

    Private _Cod_Moneda As Integer
    Private _Costo As Long
    Private _Capacidad As Integer
    Private _Calendario_ID As Integer

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String
    Private _DescripEmpresa As String
#End Region

#Region "propiedades"
    Public Property Nit_ID() As String
        Get
            Return Me._Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Nit_ID = value
        End Set
    End Property
    Public Property Codigo_ID() As Integer
        Get
            Return Me._Codigo_ID
        End Get
        Set(ByVal value As Integer)
            Me._Codigo_ID = value
        End Set
    End Property
    Public Property Surcursal_ID() As Integer
        Get
            Return Me._Surcursal_ID
        End Get
        Set(ByVal value As Integer)
            Me._Surcursal_ID = value
        End Set
    End Property
    Public Property Cod_Moneda() As Integer
        Get
            Return Me._Cod_Moneda
        End Get
        Set(ByVal value As Integer)
            Me._Cod_Moneda = value
        End Set
    End Property
    Public Property Costo() As Long
        Get
            Return Me._Costo
        End Get
        Set(ByVal value As Long)
            Me._Costo = value
        End Set
    End Property
    Public Property Capacidad() As Integer
        Get
            Return Me._Capacidad
        End Get
        Set(ByVal value As Integer)
            Me._Capacidad = value
        End Set
    End Property
    Public Property Calendario_ID() As Integer
        Get
            Return Me._Calendario_ID
        End Get
        Set(ByVal value As Integer)
            Me._Calendario_ID = value
        End Set
    End Property

    Public Property UsuarioCreacion() As String
        Get
            Return Me._UsuarioCreacion
        End Get
        Set(ByVal value As String)
            Me._UsuarioCreacion = value
        End Set
    End Property
    Public Property FechaCreacion() As String
        Get
            Return Me._FechaCreacion
        End Get
        Set(ByVal value As String)
            Me._FechaCreacion = value
        End Set
    End Property
    Public Property UsuarioActualizacion() As String
        Get
            Return Me._UsuarioActualizacion
        End Get
        Set(ByVal value As String)
            Me._UsuarioActualizacion = value
        End Set
    End Property
    Public Property FechaActualizacion() As String
        Get
            Return Me._FechaActualizacion
        End Get
        Set(ByVal value As String)
            Me._FechaActualizacion = value
        End Set
    End Property
    Public Property DescripEmpresa() As String
        Get
            Return Me._DescripEmpresa
        End Get
        Set(ByVal value As String)
            Me._DescripEmpresa = value
        End Set
    End Property
#End Region
End Class
