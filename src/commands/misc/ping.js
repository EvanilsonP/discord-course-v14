module.exports = {
    name: 'ping',
    description: 'Replies with the Bot ping!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[]

    callback: async (client, interaction) => {
        await interaction.deferReply();
        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp
        interaction.editReply(`Pong! ${client.ws.ping}ms. Client${ping}`);
    }
};

