module.exports = {
  name: "shardDisconnect",

  async execute(client, event, id) {
    client.sendLogs(new (require('discord.js')).MessageEmbed()
      .setColor("WHITE")
      .setDescription(`<:shard:1065906270630064168>・**Shard ${id}** is disconnect.\n<:goodping:1066597247913050144>・ETA: 1 - 20 Minutes`)
    )
  }
}