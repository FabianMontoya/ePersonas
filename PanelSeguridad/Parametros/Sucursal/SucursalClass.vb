﻿Public Class SucursalClass
#Region "Campos"
    Private _Index As Long
    Private _Nit_ID As String
    Private _Sucursal_ID As Integer
    Private _Descripcion As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

    Private _DescripEmpresa As String
    Private _Direcccion_ID As String
    Private _Calendario_ID As Integer
    Private _TypeDocument_ID As Integer
    Private _Document_ID As Long
    Private _DescripCalendario As String
    Private _DescripDireccion As String

#End Region

#Region "Propiedades"
    Public Property Index() As Long
        Get
            Return Me._Index
        End Get
        Set(ByVal value As Long)
            Me._Index = value
        End Set
    End Property
    Public Property Nit_ID() As String
        Get
            Return Me._Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Nit_ID = value
        End Set
    End Property
    Public Property Sucursal_ID() As Integer
        Get
            Return Me._Sucursal_ID
        End Get
        Set(ByVal value As Integer)
            Me._Sucursal_ID = value
        End Set
    End Property
    Public Property Descripcion() As String
        Get
            Return Me._Descripcion
        End Get
        Set(ByVal value As String)
            Me._Descripcion = value
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
    Public Property Direcccion_ID() As String
        Get
            Return Me._Direcccion_ID
        End Get
        Set(ByVal value As String)
            Me._Direcccion_ID = value
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
    Public Property TypeDocument_ID() As Integer
        Get
            Return Me._TypeDocument_ID
        End Get
        Set(ByVal value As Integer)
            Me._TypeDocument_ID = value
        End Set
    End Property
    Public Property Document_ID() As Long
        Get
            Return Me._Document_ID
        End Get
        Set(ByVal value As Long)
            Me._Document_ID = value
        End Set
    End Property
    Public Property DescripCalendario() As String
        Get
            Return Me._DescripCalendario
        End Get
        Set(ByVal value As String)
            Me._DescripCalendario = value
        End Set
    End Property
    Public Property DescripDireccion() As String
        Get
            Return Me._DescripDireccion
        End Get
        Set(ByVal value As String)
            Me._DescripDireccion = value
        End Set
    End Property
#End Region
End Class
