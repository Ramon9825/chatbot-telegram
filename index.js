const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const token = '1795598161:AAEAUxGKUwlaeizLS0OReR5EcTK8l1-N1Gs';

const bot = new TelegramBot(token, { polling: true});

bot.on('message', async function(msg) {
    const chatId = msg.chat.id;
    console.log(msg.text);
    const dfresponse =  dialogflow.sendMessage(chatId.toString(), msg.text);

    let responseText =  dfresponse.text
    if(dfresponse === 'Digital innovatio one') {
        responseText = await youtube.searchVideoUrl(responseText, dfresponse.fields.plataforma.stringValue);
    }

    bot.sendMessage(chatId, responseText);
});

