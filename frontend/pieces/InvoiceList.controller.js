sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("evaluations.ui.pieces.InvoiceList", {

        onInit : function () {
            var oViewModel = new JSONModel({
                currency: "EUR"
            });
            this.getView().setModel(oViewModel, "view");
        },
        onPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oPath = oItem.getBindingContext("invoice").getPath();
            oRouter.navTo("detail", {
                invoicePath: "1" //drop the first /
            });
        }

    });
});
