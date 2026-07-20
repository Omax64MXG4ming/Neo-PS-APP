require("dotenv/config");
const {
	Client,
	GatewayIntentBits,
	Collection,
	REST,
	Routes,
	ActivityType,
	MessageFlags
} = require("discord.js");
const bot = require("./bot");
const M = require("./setup.json");
const { isOwner, isModerator } = require("./utils/permissions");
const express = require("express");
const app = express();
const fs = require("fs");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Load slash command files
const commandFiles = fs.readdirSync("./cmds").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./cmds/${file}`);
	if (command.data && command.execute) {
		client.commands.set(command.data.name, command);
	}
}

app.get("/", (req, res) => {
	res.send("OK");
});

client.once("ready", async () => {
	console.log("Login as " + client.user.username);

	client.user.setPresence({
		activities: [{ name: `Neo PS`, type: ActivityType.Playing }],
		status: M.statusbot
	});

	// Register slash commands globally
	try {
		const rest = new REST().setToken(process.env.BOT_TOKEN);
		const commands = client.commands.map(cmd => cmd.data.toJSON());
		await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
		console.log(`Registered ${commands.length} slash commands.`);
	} catch (err) {
		console.error("Failed to register commands:", err);
	}

	if (process.argv[2] === "ide-mode") {
		app.listen(process.env.PORT || process.env.SERVER_PORT || 8080);
	}

	if (!isNaN(M["channel"]["gdpsstatus"])) bot.gdpsstatus(client, M);
});

client.on("error", err => console.error("Client error:", err.message));

client.on("interactionCreate", async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	// Permission gate
	if (command.permission === "owner" && !isOwner(interaction)) {
		return interaction.reply({ content: "❌ This command is restricted to the bot owner.", flags: MessageFlags.Ephemeral });
	}
	if (command.permission === "moderator" && !isModerator(interaction)) {
		return interaction.reply({ content: "❌ This command is restricted to moderators and the bot owner.", flags: MessageFlags.Ephemeral });
	}

	try {
		await command.execute(interaction, client);
	} catch (err) {
		console.error(err);
		const msg = { content: "An error occurred while running this command.", flags: MessageFlags.Ephemeral };
		try {
			if (interaction.replied || interaction.deferred) {
				await interaction.editReply(msg);
			} else {
				await interaction.reply(msg);
			}
		} catch (replyErr) {
			console.error("Failed to send error reply:", replyErr.message);
		}
	}
});

client.login(process.env.BOT_TOKEN);
