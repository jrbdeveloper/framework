﻿$.widget("custom.Navigation", {
    options: { },

    _init: function () {        
        this.Application.WriteLog("Navigation: Initialized");
    },

    _create: function () {
        this.Application = Singleton.getInstance();
        this._initializeControls();
        this._registerEvents();
        this._determineActivePage();
    },
    
    _registerEvents: function () {
        var self = this;

        self.Application.WriteLog("Navigation: Register Events");

        self.navItem.on({
            click: function (e) {
                try {
                    self.Application.WriteLog("Navigation: Item Clicked, checking for changes");
                    
                    if (self.Application.Tracker.HasChanges(e)) {
                        e.preventDefault();
                        self.Application.Helpers.ShowError('Unsaved Changes', 'Information on the page has changed. Want to save your changes?');
                    } else {
                        self.Application.Helpers.ShowProcessing();
                    }
                } catch (er) {
                    self.Application.Helpers.ShowError("Error",er.message);
                }
            }
        });
    },
    
    _determineActivePage: function () {
        var self = this;

        this.Application.WriteLog("Navigation: Determine Active Page");

        self.navItem.each(function () {
            $(this).removeClass("active");
        });

        if (self.options.page) {
            $('#' + self.options.page).addClass("active");
        }        
    },

    _initializeControls: function () {
        var self = this;

        self.navItem = $(".nav-item");
    },
});