const fs = require('fs')
const Discord = require('discord.js');
require("dotenv/config");
const prefix = process.env.prefix

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldown = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
}); //* .once events can be triggerd only once



client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// if (!client.commands.has(commandName)) return;
	// const command = client.commands.get(commandName);

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		// return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix} ${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// if (!cooldowns.has(command.name)) {
	// 	cooldowns.set(command.name, new Discord.Collection());
	// }

	// const now = Date.now();
	// const timestamps = cooldowns.get(command.name);
	// const cooldownAmount = (command.cooldown || 3) * 1000;

	// if (timestamps.has(message.author.id)) {
	// 	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	// 	if (now < expirationTime) {
	// 		const timeLeft = (expirationTime - now) / 1000;
	// 		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	// 	}
	// }

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(process.env.token);


//todo: - cooldown

//! earlier version
// client.on('message', message => {
// 	if (message.content.startsWith(`${prefix} ping`)) {
// 	    message.channel.send('Pong.');
//     } else if (message.content.startsWith(`${prefix} beep`)) {
// 	    message.channel.send('Boop.');
//     } else if (message.content === `${prefix} server`) {
//         message.channel.send(`This is ~ ${message.guild.name} ~ named server. And here are ${message.guild.memberCount} balak.`)
//     } else if (message.content === `${prefix} helo`) {
//         message.channel.send(`Helo ${message.author.username}, your id is ${message.author.id}.`)
//     }
// }); //* .on events can be triggerd multiple times

// client.on('message', message => {
// 	if (!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).trim().split(/ +/);
//     const command = args.shift().toLowerCase();

//     if (command === 'ping') {
//         client.commands.get('ping').execute(message, args);
//     }

//     else if (command === 'kick') {
//         client.commands.get('kick').execute(message, args);
//     }

//     else if (command === 'dp') {
//         client.commands.get('avatar').execute(message, args);
//     }

//     else if (command === 'hata') {}
//         client.commands.get('prune').execute(message, args);
// });
