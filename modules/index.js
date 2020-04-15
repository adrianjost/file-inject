const core = require("@actions/core");
const { promises: fs } = require("fs");

require("./string-splice");
const context = require("./context");

const main = async () => {
	const { filepath, content, alignment, regexp } = context();
	const existingContent = await fs.readFile(filepath, "utf8");

	const match = existingContent.match(regexp);

	if (!match) {
		throw new Error(`regexp "${regexp}" does not match`);
	}

	const matchStartPosition = match.index;
	const matchEndPosition = matchStartPosition + match[0].length;

	core.debug(`content: ${content}`);
	core.debug(`alignment: ${alignment}`);
	core.debug(`regexp: ${regexp}`);
	core.debug(`matchStartPosition: ${matchStartPosition}`);

	const newContent =
		alignment === "before"
			? existingContent.splice(matchStartPosition, 0, content)
			: existingContent.splice(matchEndPosition, 0, content);

	core.setOutput("content", newContent);
	await fs.writeFile(filepath, newContent, "utf8");
};

module.exports = main;
