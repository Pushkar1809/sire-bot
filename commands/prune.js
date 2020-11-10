module.exports = {
    name: 'prune',
    aliases: ['hata', 'del', 'purge'],
    description: 'prune',
    // cooldown: 5,
    args: true,
    usage: '<amount>',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;

        if (amount < 1 || amount > 99) {
            return message.reply('you need to input a number between 1 and 99.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune messages in this channel!');
        });
    }
};