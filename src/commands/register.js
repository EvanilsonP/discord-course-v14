const { ApplicationCommandOptionType } = require('discord.js');
const registerCommand = (
    {
        name: 'add',
        description: 'Replies with hey',
        options: [
            {
                name: 'first-number',
                description: 'The first number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'one',
                        value: 1
                    },

                    {
                        name: 'two',
                        value: 2
                    },

                    {
                        name: 'three',
                        value: 3
                    },
                ],
                required: true,
            },

            {
                name: 'second-number',
                description: 'The second number',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
        ]
    }
);

module.exports = registerCommand;

