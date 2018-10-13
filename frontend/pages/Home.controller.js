sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("evaluations.ui.pages.Home", {
        onOpenDialog : function () {
            this.getOwnerComponent().openHelloDialog();
        },
        onPickEnglish:function(){
            this.getOwnerComponent().setLanguage('en');
        },
        onPickGerman:function(){
            this.getOwnerComponent().setLanguage('de');
        }
    });
});