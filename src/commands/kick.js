module.exports = {
	name: 'kick',
	aliases: ['kck'],
	description: 'alerts for kicking',
	// cooldown: 5,
	args: true,
	usage: '<user>',
	guildOnly: true,
	execute(message, args) {
		// if (!message.mentions.users.size) {
	    //     return message.reply('you need to tag a user in order to kick them!');
        // }
        const taggedUser = message.mentions.users.first();

        return message.channel.send(`You wanted to kick ${taggedUser.username} 😠`);
	},
};