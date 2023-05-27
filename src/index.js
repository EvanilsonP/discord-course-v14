require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on('messageCreate', (message) => {
    if(message.author.bot) return;

    if(message.content === 'hello') {
        message.reply('hello');
    }
});

client.on('ready', (client) => {
    console.log(`${client.user.tag} is online. ✔️`);
});

client.login(process.env.TOKEN);