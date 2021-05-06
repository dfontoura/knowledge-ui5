sap.ui.define(
    [
        'com/vaees/knowledge-ui5/components/BaseController',
    ],
    /**
     *
     * @param {typeof sap.ui.core.mvc.Controller} BaseController
     */
    function (
        BaseController
    ) {
        class AppController extends BaseController {
            constructor() {
                super('com.vaees.knowledge-ui5.components.app.controller');
            }
        }

        return AppController;
    }
);
