require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');
const { REST, Routes } = require('discord.js');

const registerCommand = require('./commands/register');

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
    const commands = [registerCommand];

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

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`The sum between ${num1} and ${num2} is ${num1 + num2}`);
    };
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