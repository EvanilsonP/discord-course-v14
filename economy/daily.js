const User = require('../../models/User');

module.exports = {
    name: 'daily',
    description: 'Collect your dailies',
    callback: async (client, interaction) => {
        if(!interaction.inGuild()) {
            interaction.reply({
                content: 'You can only run commands inside a server',
                ephemeral: true
            });
            return;
        }

        try {
            await interaction.reply();

            const query = {
                userId: interaction.member.id,
                guildId: interaction.guild.id
            }
            let user = await User.findOne(query);

            if(user) {
                const lastDailyDate = user.lastDaily.toDateString();
                const currentDate = new Date().toDateString();

                if(lastDailyDate === currentDate) {
                    interaction.reply({
                        'Uou have collected your dailies today. Come back tomorrow.'
                    });
                    return;
                }
            } else {
                user = new User({
                    ...query,
                    lastDaily: new Date();
                });
            }
            user.balance += dailyAmount;
            await user.save();

            interaction.reply({
                `${dailyAmount} was added yo your balance. Your new balance is ${user.balance}`
            })
        } 
        
        catch (err) {
            console.log(err);
        }
    };
}