import registerCommandForGuild from "./registerCommandForGuild.js"

const registerCommandsForGuilds = guildIds => guildIds.forEach(registerCommandForGuild)

export default registerCommandsForGuilds