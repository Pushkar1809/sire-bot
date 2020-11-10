module.exports = {
	name: 'dp',
	description: 'Return link to avatar',
	execute(message, args) {
		if (!message.mentions.users.size) {
            return message.channel.send(`ye le tera dp < ${message.author.displayAvatarURL({ format: "png", dynamic: true })} >`);
        }

        const avatarList = message.mentions.users.map(user => {
		    return `${user.username} ka dp: < ${user.displayAvatarURL({ format: "png", dynamic: true })} >`;
        });
        
        message.channel.send(avatarList);
	},
};