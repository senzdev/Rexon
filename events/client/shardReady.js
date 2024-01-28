module.exports = {
  name: "shardReady",

  async execute(client, id) {
    client.sendLogs(new (require('discord.js')).MessageEmbed()
      .setColor("WHITE")
      .setDescription(`<:shard:1065906270630064168>・**Shard ${id}** is ready and back online.\n<:goodping:1066597247913050144>・All commands should now be working again!`)
    )
  }
}