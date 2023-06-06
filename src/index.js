require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder, REST, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType } = require('discord.js');
const command = require('./commands/register');
const mongoose = require('mongoose');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

async function main() {
    const commands = [command, timeoutCommand ];

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
            body: commands
        })
    } catch (err) {
        console.log(err);
    }
};
main();

client.on('messageCreate', (message) => {
    if(message.author.bot) return;

    if(message.content === 'hello') {
        message.reply('hello');
    }
});


(async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb+srv://EvanilsonP:<88813091a>@cluster0.rq4v2yp.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }
    client.on('ready', (c) => {
        console.log(`${c.user.tag} is now online.`);
    });
})();
client.login(process.env.TOKEN);