const { ShardingManager } = require("discord.js");

const manager = new ShardingManager('./structures/bot.js', {
    totalShards: "auto",
    token: process.env.TOKEN,
    timeout: -1,
    respawn: true
})

manager.on('shardCreate', (shard) => {
    console.log(`Shard ID #${shard.id}`)
})

manager.spawn({
    amount: 'auto',
    delay: 5500,
    timeout: 30000
}).catch((e) => console.error(e))