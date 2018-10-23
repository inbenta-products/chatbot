
/**
 * This adapter handles the configuration from AppData, check first if we have stored values in localstorage and it hasn't expired.
 * @param {object} appData 
*/
function updateConfigurationFromAppData(appData){
    return function(chatBot){
        chatBot.subscriptions.onReady(function(next) {
        var newLabels={};
        var botConfig={};
        //check if localstorage exists
        if (typeof(Storage) !== "undefined") {
            newLabels = JSON.parse(localStorage.getItem('labelsAppData'));
            if(newLabels == null){ //Check if we previously saved the configuration in localstorage
                return appDatatoLabels(chatBot,appData,true);
            }else {
                now = new Date().getTime().toString();
                if(now < newLabels.expiration){ //Check the expiration saved inside the localstorage(30 minutes)
                    botConfig.labels = newLabels;
                    chatBot.actions.updateConfiguration(botConfig);
                    return Promise.resolve();
                }
                return appDatatoLabels(chatBot,appData);
            }
        } else {
            return appDatatoLabels(chatBot,appData);
        }
        });
    };
}
/** Performs the appData request, transform labels especial characters and saves this labels in the localstorage with 30 minutes expiration
 * 
 * @param {object} chatBot 
 * @param {object} appData 
 * @param {boolean} useLocalstorage 
 */
function appDatatoLabels(chatBot,appData,useLocalstorage=false){
    var newLabels = {};
    var botConfig = {};
    //Perform AppData api request 
    return chatBot.api.getAppData(appData).then(({data})=>{
        var labelsAppData = data.results[0].value;
        //We need to parse all characters found with "_" to "-" since appData doesn't accept special characters such as "-", and the labels are defined using them.
        for (var property in labelsAppData) {
            newKey = property.replace(/_/g, "-"); // parser ...
            newLabels[newKey] = labelsAppData[property];
        }
        botConfig.labels = newLabels;
        //perform updateConfiguration action,that will update the labels
        chatBot.actions.updateConfiguration(botConfig);
        botConfig.labels.expiration =  new Date().getTime()+1800000; //sets the expiration in 30 minutes
        //Saves the labels in LocalStorage.
        if(useLocalstorage){
            localStorage.setItem('labelsAppData',JSON.stringify(botConfig.labels));
        }
    });
}