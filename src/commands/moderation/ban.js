const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a user!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'The user to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable
        },
        {
            name: 'reason',
            description: 'The reason for banning',
            required: false,
            type: ApplicationCommandOptionType.String
        },
    ],
    permissionRequired: [PermissionFlagsBits.Administrator],

    callback: (client, interaction) => {
        interaction.reply('ban...');
    }
};