'use strict';

const Alexa = require('alexa-sdk');
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;


const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function () {

        const itemImage = makeImage('https://s3-us-west-1.amazonaws.com/alexashow-images/tropical_beach_paradise_5k-2560x1600.jpg', 1024, 600);
        const listItemBuilder = new Alexa.templateBuilders.ListItemBuilder();
        const listTemplateBuilder = new Alexa.templateBuilders.ListTemplate1Builder();

        listItemBuilder.addItem(itemImage, 'listItemToken1', makePlainText('List Item 1'));
        listItemBuilder.addItem(itemImage, 'listItemToken2', makePlainText('List Item 2'));
        listItemBuilder.addItem(itemImage, 'listItemToken3', makePlainText('List Item 3'));
        listItemBuilder.addItem(itemImage, 'listItemToken4', makePlainText('List Item 4'));
        listItemBuilder.addItem(itemImage, 'listItemToken5', makePlainText('List Item 5'));
        listItemBuilder.addItem(itemImage, 'listItemToken6', makePlainText('List Item 6'));

        const listItems = listItemBuilder.build();

        const listTemplate = listTemplateBuilder.setToken('listToken').setTitle('Anand List Template').setListItems(listItems).build();

        if(this.event.context.System.device.supportedInterfaces.Display){

            this.response.speak('Rendering a list template!').renderTemplate(listTemplate);
        }
        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },

    'GetDisplayDirective': function() {
        this.emit(':tell', "Please check Echo show for more details");
    },

    'AMAZON.PreviousIntent': function() {

        this.emit(':tell', "there is no logic for previous intent");
    },

    'AMAZON.NextIntent' : function(){

        this.emit(':tell', "there is no logic for next intent");
    }

};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;

    alexa.registerHandlers(handlers);
    alexa.execute();
};
