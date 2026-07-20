const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");

const setup = JSON.parse(
    fs.readFileSync("./setup.json", "utf8")
);


module.exports = {

    data: new SlashCommandBuilder()

        .setName("req")
        .setDescription("Show Your Permissions In PS")

        .addIntegerOption(option =>
            option
                .setName("accountid")
                .setDescription("accountID from Neo PS")
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName("username")
                .setDescription("your userName on Neo PS")
                .setRequired(false)
        ),



    async execute(interaction) {

        await interaction.deferReply();


        try {


            let url =
            setup.gdpsAPI +
            "?discordID=" +
            interaction.user.id;



            const accountID =
            interaction.options.getInteger("accountid");


            const username =
            interaction.options.getString("username");



            if(accountID){

                url =
                setup.gdpsAPI +
                "?accountID=" +
                accountID;

            }


            else if(username){

                url =
                setup.gdpsAPI +
                "?username=" +
                encodeURIComponent(username);

            }



            const response = await fetch(url);


            const data = await response.json();



            if(!data.success){

                return interaction.editReply(
                    "❌ " + data.message
                );

            }



            const account = data.account;

            const roles = data.roles;



            let roleText = "";



            if(!roles || roles.length === 0){

                roleText =
                "⚠️ You dont have Assigned Roles.";

            }

            else {


                for(const role of roles){


                    roleText +=

`
**${role.roleName}**
🆔 Role ID: \`${role.roleIDPrimaria}\`
⭐ Priority: \`${role.priorityÍndice}\`

⭐ Rate: ${role.commandRate}
🎨 Feature: ${role.commandFeature}
🔥 Epic: ${role.commandEpic}

🛠 Mod Tools: ${role.dashboardModTools}
📩 Request Mod: ${role.actionRequestMod}

🏷 Badge: ${role.modBadgeLevel}

`;

                }

            }



            const embed = new EmbedBuilder()

            .setTitle("🔐 GDPS Roles")

            .setDescription(

`
👤 User:
**${account.userName}**

🆔 Account ID:
\`${account.accountID}\`

💬 Discord:
\`${account.discordID || "Not Linked"}\`


${roleText}
`

            )

            .setColor("Blue")

            .setTimestamp();



            await interaction.editReply({

                embeds:[
                    embed
                ]

            });



        }

        catch(error){


            console.error(error);


            await interaction.editReply(
                "❌ Error With API | CALL TO NEO PS OWNER."
            );


        }

    }

};
