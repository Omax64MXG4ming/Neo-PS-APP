const { SlashCommandBuilder } = require("discord.js");
const M = require("../setup.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("songadd")
		.setDescription("Add a SoundCloud song to the GDPS")
		.addStringOption(opt =>
			opt.setName("url").setDescription("SoundCloud URL").setRequired(true)),
	async execute(interaction) {
		const url = interaction.options.getString("url");
		await interaction.deferReply();

		try {
			const key = "dc467dd431fc48eb0244b0aead929ccd";
			const scRes = await fetch(`https://api.soundcloud.com/resolve?url=${encodeURIComponent(url)}&client_id=${key}`);
			const json = await scRes.json();

			if (json["errors"]) return interaction.editReply("SoundCloud error: " + JSON.stringify(json["errors"]));

			const link = `${json["stream_url"]}?client_id=${key}`;
			const addRes = await fetch(
				M.host + "/bot/api/songAdd.php?" +
				`link=${encodeURIComponent(link)}&name=${encodeURIComponent(json["title"])}&author=${encodeURIComponent(json["user"]["username"])}`
			);
			const result = await addRes.text();
			await interaction.editReply(`**Song added:** ${result}`);
		} catch (err) {
			console.error(err);
			await interaction.editReply("Something went wrong while adding the song.");
		}
	}
};
