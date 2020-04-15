const core = require("@actions/core");

module.exports = () => {
	const inputFilepath = core.getInput("filepath");
	const inputContent = core.getInput("content") || process.env.CONTENT;
	const inputAlignment = core.getInput("alignment");
	const inputPositionRegexp = core.getInput("position-regexp");
	const inputRegexpFlags = core.getInput("regexp-flags");

	core.debug(`getInput("filepath"): ${getInput("filepath")}`);
	core.debug(`getInput("content"): ${getInput("content")}`);
	core.debug(`getInput("alignment"): ${getInput("alignment")}`);
	core.debug(`getInput("position-regexp"): ${getInput("position-regexp")}`);
	core.debug(`getInput("regexp-flags"): ${getInput("regexp-flags")}`);
	core.debug(`process.env.CONTENT: ${process.env.CONTENT}`);

	if (!inputFilepath) {
		throw new Error(`The input "filepath" is required.`);
	}
	if (!inputContent) {
		throw new Error(`The input "content" is required.`);
	}
	if (!["before", "after"].includes(inputAlignment)) {
		throw new Error(
			`Only "before" and "after" are valid values for the input "alignment". Received "${inputAlignment}"`
		);
	}

	return {
		filepath: inputFilepath,
		content: inputContent,
		alignment: inputAlignment,
		regexp: new RegExp(inputPositionRegexp, inputRegexpFlags),
	};
};
