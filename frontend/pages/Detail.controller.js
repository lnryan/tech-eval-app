sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("evaluations.ui.pages.Detail", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            var path = "/Invoices/" + oEvent.getParameter("arguments").invoicePath;
            this.getView().bindElement({
                path: path,
                model: "invoice"
            });
        }
    });
});