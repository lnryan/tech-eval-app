sap.ui.define([
    "sap/ui/core/Core",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "evaluations/ui/pieces/HelloDialog"
], function (Core,UIComponent,JSONModel,ResourceModel,HelloDialog) {
    "use strict";
    return UIComponent.extend("evaluations.ui.Component", {
        metadata : {
            manifest:"json"
        },

        init : function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            // set data model
            var oData = {
                recipient : {
                    name : "World"
                }
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);

            this.setResourceModel();

            // set dialog
            this._helloDialog = new HelloDialog(this.getRootControl());
            this.getRouter().initialize();
        },

        exit:function(){
            this._helloDialog.destroy();
            delete this._helloDialog;
        },
        setResourceModel:function(refresh){
            // set i18n model
            var i18nModel = new ResourceModel({
                bundleName : "evaluations.ui.i18n.i18n"
            });
            this.setModel(i18nModel, "i18n");
            if(refresh) console.log('Switched Language and reset model');
        },
        setLanguage:function(language){
            //this.getCore().getConfiguration().setLanguage(language); //this is mentioned in docs but doesn't workwindow["sap-ui-config"].language
            window["sap-ui-config"].language = language;
            this.setResourceModel(true);
        },
        openHelloDialog:function(){ //can't use lambda format ()=>{...} this is set differently
            this._helloDialog.open();
        }
    });
});