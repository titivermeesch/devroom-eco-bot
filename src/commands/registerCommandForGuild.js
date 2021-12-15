import { SlashCommandBuilder } from "@discordjs/builders"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"

const registerCommandForGuild = guildId => {
  const command = new SlashCommandBuilder().setName("balance").setDescription("View your current balance").toJSON()

  const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN)
  rest
    .put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, guildId), { body: [command] })
    .catch(console.error)
}

export default registerCommandForGuild