const M = require("../setup.json");

/**
 * Returns true if the interaction user is the bot owner.
 */
function isOwner(interaction) {
	return interaction.user.id === M.owner;
}

/**
 * Returns true if the interaction user is the owner OR has the moderator role.
 */
function isModerator(interaction) {
	if (isOwner(interaction)) return true;
	if (!M.moderator) return false;
	return interaction.member?.roles?.cache?.has(M.moderator) ?? false;
}

module.exports = { isOwner, isModerator };
