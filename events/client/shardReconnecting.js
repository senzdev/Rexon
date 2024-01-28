module.exports = {
  name: "shardReconnecting",

  async execute(client, id) {
    client.sendLogs(new (require('discord.js')).MessageEmbed()
      .setColor("WHITE")
      .setDescription(`<:shard:1065906270630064168>・**Shard ${id}** is reconnecting.\n<:goodping:1066597247913050144>・ETA: 1 - 5 Minutes`)
    )
  }
}