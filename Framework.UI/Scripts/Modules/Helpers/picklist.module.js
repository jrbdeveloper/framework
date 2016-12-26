﻿$.widget("custom.PickList", {
    options: {
        selected: [],
        ListLocation: ""
    },

    _init: function () {
        this._loadInactiveList();
    },

    _create: function () {        
        this.Application = Singleton.getInstance();
        this._initializeControls();
        this._loadTemplate();
        this._registerEvents();
    },

    _registerEvents: function () {
        var self = this;

        //self.SaveBtn.on({
        //    click: function () {
        //        $("#ActiveItems option").prop("selected", "true");
        //    }
        //});

        $(self.IncludeButton).on({
            click: function () {
                self._include($("#InactiveItems option:selected"), $("#ActiveItems option"), $("#ActiveItems"));
            }
        });

        $(self.ExcludeButton).on({
            click: function () {
                self._exclude($("#ActiveItems option:selected"), $("#InactiveItems option"), $("#InactiveItems"));
            }
        });
    },

    _getValues: function (ctrl) {
        var valuesArray = ctrl.map(function () {
            return this.value;
        }).get();

        return valuesArray;
    },

    _include: function (selectedItems, savedItems, destination) {
        var self = this;

        $.each(selectedItems, function (index, item) {
            var option = self._createOption(item);

            if ($.inArray($(item).val(), self._getValues(savedItems)) == -1) {
                $(option).appendTo(destination);
                $(item).remove();
            }
        });
    },

    _exclude: function (selectedItems, savedItems, destination) {
        var self = this;

        $.each(selectedItems, function (index, item) {
            var option = self._createOption(item);

            if ($.inArray($(item).val(), self._getValues(savedItems)) == -1) {
                $(option).prependTo(destination);
                $(item).remove();
            }
        });
    },

    _loadInactiveList: function () {
        var self = this;
        var inactive = this.Application.GetModel(null, this.options.ListLocation, false);

        $.each(inactive, function (index, item) {
            $("#InactiveItems").append(self._newOption(item.ID, item.Model));
        });
    },

    _initializeControls: function () {
        //this.SaveBtn = $("#saveBtn");
    },

    _createButton: function (id, cssClass, text) {
        var button = document.createElement("button");

        $(button).prop("id", id);
        $(button).prop("class", cssClass);
        $(button).html(text);

        return button;
    },

    _createContainer: function (id, cssClass) {
        var container = document.createElement("div");

        $(container).prop("id", id);
        $(container).prop("class", cssClass);

        return container;
    },

    _createSelect: function (id) {
        var select = document.createElement("select");

        $(select).prop("id", id);
        $(select).prop("class", "form-control");
        $(select).prop("multiple", "multiple");

        return select;
    },

    _createOption: function (ctrl) {
        var option = document.createElement("option");

        option.text = ctrl.text;
        option.value = ctrl.value;

        return option;
    },

    _newOption: function (value, text) {
        var control = document.createElement("option");

        control.text = text;
        control.value = value;

        return control;
    },

    _loadTemplate: function () {
        this.InactiveContainer = this._createContainer("inactive-container", "col-lg-3");
        this.InactiveItems = this._createSelect("InactiveItems");
        $(this.InactiveContainer).append(this.InactiveItems);

        this.ButtonContainer = this._createContainer("button-container", "col-lg-1 text-center");
        this.IncludeButton = this._createButton("include-button", "btn btn-default", ">");
        this.ExcludeButton = this._createButton("exclude-button", "btn btn-default", "<");
        $(this.ButtonContainer).append(this.IncludeButton);
        $(this.ButtonContainer).append(this.ExcludeButton);

        this.ActiveContainer = this._createContainer("active-container", "col-lg-3");
        this.ActiveItems = this._createSelect("ActiveItems");
        $(this.ActiveContainer).append(this.ActiveItems);
        
        $(this.element).append(this.InactiveContainer);
        $(this.element).append(this.ButtonContainer);
        $(this.element).append(this.ActiveContainer);
    },
});