// https://www.divisionantipedo.en.gp/
 // PingToRanksBOT - Un bot Discord français de type "ping to ranks".
  // Le principe est simple : si un utilisateur possède un "tag" dans son pseudo (défini dans le code),
   // il reçoit automatiquement un rôle lorsque le bot est mentionné dans le salon configuré.

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js")
const { spawn } = require("child_process")

const BOTTOKEN = "" // Token de votre bot discord
const BOTID = "" // ID de votre bot discord
const GUILDID = "" // ID de votre serveur discord
const PINGTORANKCHANEL = "" // ID du salon où les utilisateurs doivent mentionner le bot pour recevoir le rôle
const ROLESTOGIVE = ""  // ID du rôle que le bot doit donner aux utilisateurs qui ont le tag dans leur pseudo
const TAGS = "" // Tag que les utilisateurs doivent avoir dans leur pseudo pour recevoir le rôle (ex: "lks59k")
const ACTIVITYTEXT = "Crée par lks59k - https://github.com/lks59k " // Texte d'activité du bot (ex: "Crée par lks59k - https://github.com/lks59k")
const LOGSCHANEL = "" // ID du salon où le bot doit envoyer les logs de distribution et de retrait des rôles (laisser vide pour ne pas activer les logs)

const cooldown = new Set()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
})

function restart() {
  const child = spawn(process.argv[0], [process.argv[1]], {
    detached: true,
    stdio: "inherit"
  })
  child.unref()
  process.exit(1)
}

process.on("uncaughtException", () => restart())
process.on("unhandledRejection", () => restart())

function hasTag(name) {
  if (!name) return false
  return name.toLowerCase().includes(TAGS.toLowerCase())
}

function now() {
  return new Date().toLocaleString("fr-FR")
}

async function log(guild, type, member) {
  if (!LOGSCHANEL) return
  const channel = guild.channels.cache.get(LOGSCHANEL)
  if (!channel) return

  const embed = new EmbedBuilder()
    .setColor(type === "rank" ? 0x00ff00 : 0xff0000)
    .setAuthor({
      name: member.user.username,
      iconURL: member.user.displayAvatarURL()
    })
    .setDescription(
      `${type === "rank" ? "Rôle donné à" : "Rôle retiré à"} ${member.user.username} | ${now()}`
    )

  channel.send({ embeds: [embed] }).catch(() => {})
}

async function giveRole(member) {
  const role = member.guild.roles.cache.get(ROLESTOGIVE)
  if (!role) return
  if (member.roles.cache.has(role.id)) return

  await member.roles.add(role).catch(() => {})
  await log(member.guild, "rank", member)
}

async function removeRole(member) {
  const role = member.guild.roles.cache.get(ROLESTOGIVE)
  if (!role) return
  if (!member.roles.cache.has(role.id)) return

  await member.roles.remove(role).catch(() => {})
  await log(member.guild, "unrank", member)
}

client.on("ready", async () => {
  client.user.setActivity(ACTIVITYTEXT)

  const guild = client.guilds.cache.get(GUILDID)
  if (!guild) return
  await guild.members.fetch()

  setInterval(async () => {
    try {
      const role = guild.roles.cache.get(ROLESTOGIVE)
      if (!role) return

      const members = role.members.map(m => m)
      for (const member of members) {
        if (member.user.bot) continue
        if (!hasTag(member.displayName)) {
          await removeRole(member)
          await new Promise(resolve => setTimeout(resolve, 750))
        }
      }
    } catch (err) {}
  }, 2000)
})

client.on("messageCreate", async (message) => {
  if (!message.guild) return
  if (message.guildId !== GUILDID) return
  if (message.author.bot) return
  if (message.channelId !== PINGTORANKCHANEL) return
  if (!message.mentions.users.has(BOTID)) return

  if (cooldown.has(message.author.id)) return

  cooldown.add(message.author.id)
  setTimeout(() => cooldown.delete(message.author.id), 3000)

  const member = await message.guild.members.fetch(message.author.id)
  const role = message.guild.roles.cache.get(ROLESTOGIVE)
  if (!role) return

// Si vous souhaitez que le bot reste silencieux quand un utilisateur n'a pas le tags et mentionne le bot supprimer de la ligne '126' à '133'
  if (!hasTag(member.displayName)) {
    await message.reply({
      content: `Tu dois avoir le tag ${TAGS} dans ton pseudo`,
      allowedMentions: { repliedUser: false }
    }).catch(() => {})
    return
  }

  if (member.roles.cache.has(role.id)) {
    await message.reply({
      content: "Ta deja le roles bouffon",
      allowedMentions: { repliedUser: false }
    }).catch(() => {})
    return
  }

  await giveRole(member)

  await message.reply({
    content: `Ww **<@${member.id}>**, t'a bien reçu \`\`\`${role.name}\`\`\``,
    allowedMentions: { repliedUser: false }
  }).catch(() => {})
})

client.login(BOTTOKEN)