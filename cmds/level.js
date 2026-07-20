const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const M = require("../setup.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("level")
		.setDescription("Check level information by ID or name")
		.addStringOption(opt =>
			opt.setName("query").setDescription("Level ID or level name").setRequired(true)),
	async execute(interaction) {
		const id = interaction.options.getString("query");
		await interaction.deferReply();

		try {
			const res = await fetch(M.host + "/bot/api/level1.php?ID=" + encodeURIComponent(id));
			const search = await res.json();

			if (search.msg || search === "undefined") {
				return interaction.editReply("Sorry, this level is not found.");
			}

			const text = Buffer.from(search.desc, "base64").toString();

			const songRes = await fetch(M.host + "/bot/api/song.php?ID=" + search.songId);
			const songBody = await songRes.json();

			const thumb = `http://famrygd.5v.pl/img/${search.diff}${search.dmn}${search.auto}${search.F}${search.E}${search.dmns}.png`;
			const info = `ID Level: **${search.id}**\nLevel: **${search.unlisted}**\nObject: **${search.objects}**\nPass: **${search.pass}**\nLevel Version: **${search.ver}**`;
			const stats = `${search.coins}\n${search.stars}\n${search.DL}\n${search.likes}\n${search.length}`;

			const embed = new EmbedBuilder()
				.addFields(
					{ name: search.name + " By " + search.creator, value: "Description:\n**" + text + "**" },
					{ name: "Stat of level:", value: stats }
				)
				.setThumbnail(thumb)
				.setFooter({ text: "Created at " + search.create + " | Updated at " + search.UP });

			if (!songBody || JSON.stringify(songBody) === "{}") {
				embed.addFields(
					{ name: "Song Info", value: `**${search.creator}** just set the **Normal Song**` },
					{ name: "Information", value: info }
				);
			} else {
				embed.addFields(
					{ name: "Song Info", value: `ID: **${search.songId}**\nSong Name: **${songBody.name}**\nSize: **${songBody.size}**\n${songBody.download}` },
					{ name: "Information", value: info }
				);
			}

			await interaction.editReply({ embeds: [embed] });
		} catch (err) {
			console.error(err);
			await interaction.editReply("An error occurred while fetching the level.");
		}
	}
};
