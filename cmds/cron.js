const { 
    SlashCommandBuilder, 
    EmbedBuilder 
} = require("discord.js");

const fs = require("fs");

const setup = JSON.parse(
    fs.readFileSync("./setup.json", "utf8")
);

let cronRunning = false;


module.exports = {

    data: new SlashCommandBuilder()
        .setName("cron")
        .setDescription("Run the Cron of Neo PS"),


    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true });


        if (cronRunning) {
            return interaction.editReply(
                "⏳ Cron is already in execution"
            );
        }


        cronRunning = true;


        try {

            await runCron(interaction.client);


            await interaction.editReply(
                "✅ Cron executed correctly.\n" +
                "📢 Result has been sent in setup channel."
            );


        } catch(err) {

            console.error(err);

            await interaction.editReply(
                "❌ Error in Running Cron."
            );

        }


        cronRunning = false;

    }

};



async function runCron(client) {


    try {

        const response = await fetch(
            setup.cronURL
        );


        const result = await response.text();



        const channel = await client.channels.fetch(
            setup.cronChannel
        );


        if (!channel) {
            console.log(
                "Channel dont Found"
            );
            return;
        }



        const embed = new EmbedBuilder()

            .setTitle("⚙️ Neo PS cron Executed")

            .setDescription(
                "```" +
                result.substring(0,4000) +
                "```"
            )

            .setTimestamp()

            .setFooter({
                text:"Neo PS Cron System"
            });



        await channel.send({
            embeds:[
                embed
            ]
        });



        console.log(
            "Cron completed"
        );



        // Espera 1 hora y media
        setTimeout(() => {

            runCron(client);

        }, 90 * 60 * 1000);



    } catch(error) {


        console.error(
            "Cron error:",
            error
        );


        const channel = await client.channels.fetch(
            setup.cronChannel
        );


        channel.send(
            "❌ An Error has noticed :\n```" +
            error.message +
            "```"
        );

    }

}
