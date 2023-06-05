module.exports = async (client, guildId) => {
    let applicationCommand;

    if(guildId) {
        const guild = await client.guilds.fetch(guildId);
        applicationCommand = guild.commands;
    } else {
        applicationCommand = await client.application.commands;
    }

    await applicationCommand.fetch();
    return applicationCommand;
}