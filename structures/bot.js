require('dotenv').config();
const config = require('./botconfig/config.json');
const ee = require('./botconfig/embed.json');
const {
    Client,
    Intents,
} = require("discord.js");
const colors = require("colors");
const Enmap = require("enmap");
const libsodium = require("libsodium-wrappers");
const ffmpeg = require("ffmpeg-static");
const voice = require("@discordjs/voice");
const { EmbedBuilder } = require('discord.js');
require('http').createServer((req, res) => res.end(`
 |-----------------------------------------|
 |              Informations               |
 |-----------------------------------------|
 |• Alive: 24/7                            |
 |-----------------------------------------|
 |• Status: Estabilished                   |
 |-----------------------------------------|
 |• Server: https://dsc.gg/rexonbot        |
 |-----------------------------------------|
 |• Website: https://rexon-bot.xyz         |
 |-----------------------------------------|
 |• License: Apache License 2.0            |
 |-----------------------------------------|
`)).listen(8080)


const client = new Client({
    fetchAllMembers: false,
    // restTimeOffset: 0,
    shards: 'auto',
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        //Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    presence: {
        activities: [{
            name: `*help`,
            type: "Playing",
        }],
        status: "online"
    }
});

client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;

["extraEvents", "clientVariables", "antiCrash", "eventHandler", "commandHandler", "slashCommandHandler", "loadEnmapDB", "mongoDBHandler", "loadModules"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);

client.sendLogs = function(embed) {
  try {
    const channel = client.channels.cache.get("1168472329882456195");
    if(channel) channel.send({embeds:[embed]}).catch(()=>{})
  } catch (e) {
    console.log(e);
  }
}