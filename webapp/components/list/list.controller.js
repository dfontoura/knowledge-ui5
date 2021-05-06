sap.ui.define(
    [
        'com/vaees/knowledge-ui5/components/BaseController',
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast",
        "sap/ui/core/Fragment",
        "com/vaees/knowledge-ui5/helpers/utils/i18n"
    ],
    /**
     *
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.m.MessageToast} MessageToast
     * @param {typeof sap.ui.core.Fragment} Fragment
     */
    function (
        BaseController,
        JSONModel,
        MessageToast, 
        Fragment,
        i18n,

    ) {
        class ListController extends BaseController {
            constructor() {
                super('com.vaees.knowledge-ui5.components.list.controller');
            }

            async onInit() {
                this.getPurchaseOrdersfromAPI();
                this.getProductsfromAPI();
                this.getSuppliersfromAPI();

                const currencyModel = new JSONModel({ currency: 'BRL' });
                this.getView().setModel(currencyModel, 'currency');
            }
            
            getPurchaseOrdersfromAPI() {
                $.ajax({
                    method: 'GET',
                    url: '/api/orders'
                })    
                    .done((answer) => {                   
                        const model = new JSONModel(answer.purchaseOrders);
                        this.getView().setModel(model, 'purchaseOrdersList' );
                        
                    })              
                    .fail(() => {
                        MessageToast.show(i18n.translate('APIRequestFail'));
                    })
            }

            getProductsfromAPI() {
                $.ajax({
                    method: 'GET',
                    url: '/api/products'
                })    
                    .done((answer) => {                   
                        const model = new JSONModel(answer.products);
                        this.getView().setModel(model, 'productsList' );
                        
                    })              
                    .fail(() => {
                        MessageToast.show(i18n.translate('APIRequestFail'));
                    })
            }

            getSuppliersfromAPI() {
                $.ajax({
                    method: 'GET',
                    url: '/api/suppliers'
                })    
                    .done((answer) => {                   
                        const model = new JSONModel(answer.suppliers);
                        this.getView().setModel(model, 'suppliersList' );
                        
                    })              
                    .fail(() => {
                        MessageToast.show(i18n.translate('APIRequestFail'));
                    })
            }

            async handlePressAddProduct() {
                var view = this.getView();    
                const fragmentName = "com.vaees.knowledge-ui5.components.fragments.addProduct"

                if (!this.addProductDialog) {
                    this.addProductDialog = Fragment.load({
                        id: view.getId(),
                        name: fragmentName,
                        controller: this
                    }).then(function (oDialog) {
                        view.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this.addProductDialog.then(function(oDialog) {
                    oDialog.open();
                });
            }

            handlePressAddSupplier() {
                var view = this.getView();    
                const fragmentName = "com.vaees.knowledge-ui5.components.fragments.addSupplier"
                if (!this.addSupplierDialog) {
                    this.addSupplierDialog = Fragment.load({
                        id: view.getId(),
                        name: fragmentName,
                        controller: this
                    }).then(function (oDialog) {
                        view.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this.addSupplierDialog.then(function(oDialog) {
                    oDialog.open();
                });
            }

            handlePressAddPurchaseOrder() {
                var view = this.getView();  
                const fragmentName = "com.vaees.knowledge-ui5.components.fragments.addPurchaseOrder"
                if (!this.addPurchaseOrderDialog) {
                    this.addPurchaseOrderDialog = Fragment.load({
                        id: view.getId(),
                        name: fragmentName,
                        controller: this
                    }).then(function (oDialog) {
                        view.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this.addPurchaseOrderDialog.then(function(oDialog) {
                    oDialog.open();
                });
            }

            addProduct_HandlePressCancel() {
                this.byId("addProductDialog").close();     
            }

            async addProduct_HandlePressSave() {
                const newProduct = this.getProductInformations();
                
                if (newProduct) {
                    const result = await this.postProductToAPI(newProduct);
                    
                    if (result) {
                        MessageToast.show(i18n.translate('NewProductAdded'));
                        this.byId('description').setValue('');
                        this.byId('supplierSelect').setSelectedItem(null);
                        this.getProductsfromAPI();
                        this.byId("addProductDialog").close();
                    } else {
                        MessageToast.show(i18n.translate('FillAllFields'));
                    }
                }       
            }

            getProductInformations() {
                const productDescription = this.byId('description').getValue();
                const SupplierId = parseInt(this.byId('supplierSelect').getSelectedKey());
                
                if (SupplierId && productDescription) {
                    return  {
                        description: productDescription, 
                        supplier_id: SupplierId
                    }
                } else return null                
            }

            postProductToAPI(product) {
                return new Promise ((resolve, reject) => {        
                    $.ajax({
                        method: 'POST',
                        url: '/api/products',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify(product)
                    })    
                    .done(() => resolve(true))
                    .fail(() => reject(null))
                })
            }

            addSupplier_HandlePressCancel() {
                this.byId("addSupplierDialog").close();     
            }

            async addSupplier_HandlePressSave() {
                const newSupplier = this.getSupplierInformations();
                
                if (newSupplier) {
                    const result = await this.postSupplierToAPI(newSupplier);
                    
                    if (result) {
                        MessageToast.show(i18n.translate('NewSupplierAdded'));
                        this.byId('name').setValue('');
                        this.byId('country').setValue('');
                        this.getSuppliersfromAPI();
                        this.byId("addSupplierDialog").close();
                    } else {
                        MessageToast.show(i18n.translate('FillAllFields'));
                    }
                }       
            }

            getSupplierInformations() {
                const supplierName = this.byId('name').getValue();
                const suppliercountry = this.byId('country').getValue();
                
                if (supplierName && suppliercountry) {
                    return  {
                        name: supplierName, 
                        country: suppliercountry
                    }
                } else return null                
            }

            postSupplierToAPI(supplier) {
                return new Promise ((resolve, reject) => {        
                    $.ajax({
                        method: 'POST',
                        url: '/api/suppliers',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify(supplier)
                    })    
                    .done(() => resolve(true))
                    .fail(() => reject(null))
                })
            }

            addPurchaseOrder_HandlePressCancel() {
                this.byId("addPurchaseOrderDialog").close();     
            }

            async addPurchaseOrder_HandlePressSave() {
                const newPurchaseOrder = this.getPurchaseOrderInformations();
                
                if (newPurchaseOrder) {
                    const result = await this.postPurchaseOrderToAPI(newPurchaseOrder);
                    
                    if (result) {
                        MessageToast.show(i18n.translate('NewPurchaseOrderAdded'));
                        this.byId('productSelect').setSelectedItem(null);
                        this.byId('price').setValue('');
                        this.getPurchaseOrdersfromAPI();
                        this.byId("addPurchaseOrderDialog").close();
                    } else {
                        MessageToast.show(i18n.translate('FillAllFields'));
                    }
                }       
            }

            getPurchaseOrderInformations() {
                const purchaseOrderPrice = parseFloat(this.byId('price').getValue());
                const productId = parseInt(this.byId('productSelect').getSelectedKey());
                
                if (productId && purchaseOrderPrice) {
                    return  {
                        price: purchaseOrderPrice, 
                        product_id: productId
                    }
                } else return null                
            }

            postPurchaseOrderToAPI(purchaseOrder) {
                return new Promise ((resolve, reject) => {        
                    $.ajax({
                        method: 'POST',
                        url: '/api/orders',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify(purchaseOrder)
                    })    
                    .done(() => resolve(true))
                    .fail(() => reject(null))
                })
            }

            getSelectedItemId () {               
                const selectedItem = this.byId('purchase-orders-table').getSelectedItem()
                if (selectedItem) {
                    const itemId = selectedItem
                        .mAggregations
                        .cells[0]
                        .mProperties
                        .text;
                    return itemId
                } else return null
            }
            
            
            async handlePressDeleteOrder() {
                const selectedItemId = this.getSelectedItemId();
               
                if (selectedItemId) {
                     const status = await this.deleteOrder(selectedItemId);
                    if ( status ) {
                        MessageToast.show(i18n.translate('PurchaseOrderDeleted', selectedItemId));
                        this.getPurchaseOrdersfromAPI();
                    } else {
                        MessageToast.show(i18n.translate('PurchaseOrderDeleteFail', selectedItemId))
                    }
                } else{
                    MessageToast.show(i18n.translate('MustSelectOrder'));
                }
            }

            deleteOrder(id) {
                return new Promise ((resolve, reject) => {        
                    $.ajax({
                        method: 'DELETE',
                        url: '/api/orders/' + id
                    })    
                    .done(() => resolve(true)) 
                    .fail(() => reject(false))
                })
            }

    
        }

        return ListController;
    }
);
