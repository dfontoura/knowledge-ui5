sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        'com/vaees/knowledge-ui5/core/models/device'
    ],
    /**
     *
     * @param {sap.ui.core.UIComponent} UIComponent
     * @param {DeviceModel} deviceModel
     */
    function (UIComponent, deviceModel) {
        // eslint-disable-next-line quotes
        return UIComponent.extend("com/vaees/knowledge-ui5.Component", {

            metadata: {
                manifest: 'json'
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(deviceModel.create(), 'device');
            }
        });
    });
