({
    handleSubmit : function(component, event, helper) {
        console.log('i am here in handleSubmit');
        event.preventDefault();  // Prevent default submit action
        var fields = event.getParam('fields');
        fields.AccountId='001NS00000b5WruYAE';//hardcoded account
        console.log(JSON.stringify(fields));
        component.find('recordEditForm').submit(fields);
    },
    handleSuccess : function(component, event, helper) {
        var recordId = event.getParam('id');
        //alert('Record created successfully: ' + recordId);
		var workspaceAPI = component.find('workspace');
        //----------------------------------------------------//
       /* workspaceAPI.getEnclosingTabId().then(function(tabId) {
            console.log(tabId);
       })
        .catch(function(error) {
            console.log(error);
        });*/
        //-----------------------------------------------------------//
        workspaceAPI.getFocusedTabInfo().then(function(response) {
            console.log('response:: '+JSON.stringify(response));
            var focusedTabId = response.tabId;
            var parentTabId = response.parentTabId;
            console.log('parentTabId:: '+parentTabId);
            workspaceAPI.refreshTab({
                      tabId: parentTabId,
                      includeAllSubtabs: true
             });
            workspaceAPI.closeTab({tabId: focusedTabId});
       })
        .catch(function(error) {
            console.log(error);
        });
        // Refresh the related list
        //$A.get('e.force:refreshView').fire();
    }
})