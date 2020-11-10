module.exports = {
	name: 'avatar',
	aliases: ['pic', 'dp', 'profile', 'pp'],
	description: 'Return link to avatar',
	// cooldown: 5,
	execute(message, args) {
		if (!message.mentions.users.size) {
            return message.channel.send(`ye le tera dp:\n  ${message.author.displayAvatarURL({ format: "png", dynamic: true })}`);
        }

        const avatarList = message.mentions.users.map(user => {
		    return `${user.username} ka dp:\n ${user.displayAvatarURL({ format: "png", dynamic: true })} `;
        });
        
        message.channel.send(avatarList);
	},
};