require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder, REST, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const command = require('./commands/register');

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
    const commands = [command];

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

eventHandler(client);

client.login(process.env.TOKEN);