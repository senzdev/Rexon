const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const ms = require("ms");

module.exports = {
    name: 'gstart',
    aliases: ["giveaway-start"],
    usage: '',
    description: 'Start a giveaway',
    category: "giveaway",
    cooldown: 0,
    userPermissions: "MANAGE_GUILD",
    botPermissions: "",
    ownerOnly: false,
    toggleOff: false,

    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args, ee) {
        try {

            const gchannel = message.mentions.channels.first();
            const duration = args[1];
            const winnersCount = args[2];
            const prize = args.slice(3).join(" ");
            console.log(prize)

            if (!gchannel) return message.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`${client.allEmojis.m} Giveaway System`)
                    .setColor(ee.mediancolor)
                    .setDescription(`Please mention the channel where give should start!`)
                ]
            });

            if (!duration) return message.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`${client.allEmojis.m} Giveaway System`)
                    .setColor(ee.mediancolor)
                    .setDescription(`Please mention the time when should the giveaway end!`)
                ]
            });

            if (!(ms(duration))) return message.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`${client.allEmojis.m} Giveaway System`)
                    .setColor(ee.wrongcolor)
                    .setDescription(`Time specified is not a valid time!`)
                ]
            });

            if (!winnersCount) return message.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`${client.allEmojis.m} Giveaway System`)
                    .setColor(ee.mediancolor)
                    .setDescription(`Please mention the winner count!`)
                ]
            });

            if (isNaN(winnersCount)) return message.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`${client.allEmojis.m} Giveaway System`)
                    .setColor(ee.wrongcolor)
                    .setDescription(`Winnercount specified is not a valid number.`)
                ]
            });

            if (!prize) return message.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`${client.allEmojis.m} Giveaway System`)
                    .setColor(ee.mediancolor)
                    .setDescription(`Please mention the Prize for the Giveaway!`)
                ]
            });

            client.giveawaysManager.start(gchannel, {
                duration: ms(duration),
                winnerCount: parseInt(winnersCount),
                prize: `${prize}`,
                hostedBy: message.author || null,
                thumbnail: message.guild.iconURL({
                    dynamic: true
                }) || null,
                messages: {
                    giveaway: `>>> **GIVEAWAY STARTED**`,
                    giveawayEnded: `>>> ${client.allEmojis.giveaway.react} **GIVEAWAY ENDED** ${client.allEmojis.giveaway.react}`,
                    drawing: `Ends: {timestamp}`,
                    // timeRemaining: "Time remaining: **{duration}**!",
                    dropMessage: `Be the first to react with ${client.allEmojis.giveaway.react} !`,
                    inviteToParticipate: `>>> React with ${client.allEmojis.giveaway.react} to participate!`,
                    winMessage: `🎉 **Congratulations** {winners} You won **{this.prize}**`,
                    embedFooter: '{this.winnerCount} winner(s)',
                    noWinner: `>>> Giveaway cancelled, No valid participations. :cry:`,
                    hostedBy: `Hosted By: {this.hostedBy}`,
                    winners: 'Winner(s):',
                    endedAt: 'Ended at',
                },
            }).catch((err) => {
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`An Error has Occurred\n>>> ${err}`)
                    ]
                });
            })
        } catch (err) {
            console.log(err)
        }
    }
        }