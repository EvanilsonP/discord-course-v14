require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder, REST, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

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

// client.on('interactionCreate', (interaction) => {
//     if(!interaction.isChatInputCommand()) return;

//     if(interaction.commandName === 'embed') {
//         const embed = new EmbedBuilder()
//         .setTitle('Embed title')
//         .setDescription('Embed description')
//         .setColor('Random')
//         .addFields({
//             name: 'Field title', 
//             value: 'Some random value', 
//             inline: true
//         }, {
//             name: 'Field title', 
//             value: 'Some random value', 
//             inline: true
//         })

//         interaction.reply({ embeds: [embed] });
//     };
// });

// client.on('messageCreate', (message) => {
//     if(message.content === 'embed') {
//         const embed = new EmbedBuilder()
//         .setTitle('Embed title')
//         .setDescription('Embed description')
//         .setColor('Random')
//         .addFields({
//             name: 'Field title', 
//             value: 'Some random value', 
//             inline: true
//         }, {
//             name: 'Field title', 
//             value: 'Some random value', 
//             inline: true
//         })

//         message.reply({ embeds: [embed] });
//     }
// })

// client.on('messageCreate', (message) => {
//     if(message.author.bot) return;

//     if(message.content === 'hello') {
//         message.reply('hello');
//     }
// });

const roles = [
    {
        id: '1113913798944899234',
        label: 'Red'
    },
    {
        id: '1113914477662965851',
        label: 'Green'
    },
    {
        id: '1113914437338943588',
        label: 'Blue'
    },
];

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1112087746576662702');
        if(!channel) return;
        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })
        await channel.send({
            content: 'Claim or remove a role below',
            components: [row]
        })
        // process.exit();
    } 
    catch (err) {
        console.log(err);
    }
});

client.on('interactionCreate', async (interaction) => {
    try {
        if(!interaction.isButton()) return;
        await interaction.deferReply({ ephemeral: true });

        const role = interaction.guild.roles.cache.get(interaction.customId);
        if(!role) {
            interaction.editReply({
                content: 'I could not find that role',
        })
        return;
    }

        const hasRole = interaction.member.roles.cache.has(role.id);
        if(hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed.`);
        return;
    }

        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role} has been added.`);
    } 

    catch (err) {
        console.log('Something went wrong.', err);
    }
})

client.login(process.env.TOKEN);