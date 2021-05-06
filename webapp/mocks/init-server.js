sap.ui.define([
    'com/vaees/knowledge-ui5/mocks/server'
], function (mockserver) {
    const servers = [];

    // initialize the mock server
    servers.push(mockserver.init());

    Promise.all(servers).then(function () {
        // initialize the embedded component on the HTML page
        sap.ui.require(["sap/ui/core/ComponentSupport"]);
    });
});