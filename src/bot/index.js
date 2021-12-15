import { Client as DiscordClient, Intents, MessageEmbed } from "discord.js"
import registerCommandsForGuilds from "../commands/registerCommandsForGuilds.js"
import registerCommandForGuild from "../commands/registerCommandForGuild.js"
import MoneyManager from "../money/MoneyManager.js"

const moneyManager = new MoneyManager()
const client = new DiscordClient({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] })

client.on("ready", (e) => {
  registerCommandsForGuilds(client.guilds.cache.map(guild => guild.id))
})

client.on("guildCreate", guild => registerCommandForGuild(guild.id))

client.on("messageCreate", message => {
  if (message.author.bot) {
    return
  }

  moneyManager.incrementMoney(message.author.id, 1)
})

client.on("voiceStateUpdate", (oldState, newState) => {
  if(newState.channelId) {
    moneyManager.incrementMoney(newState.id, 2)
  }
})

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) {
    return
  }

  const { commandName } = interaction

  if (commandName === "balance") {
    const embed = new MessageEmbed()
    embed.setDescription(`Your current balance is:\n
    :coin: ${moneyManager.getMoney(interaction.user.id)}\n
    You can receive more coins by doing one of the following things:\n
    1. Writing messages\n
    2. Joining vocal channels
    `)
    embed.setAuthor("DevRoom Economy")
    interaction.reply({ embeds: [embed] })
  }
})


// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)