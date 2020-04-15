const core = require("@actions/core");

module.exports = () => {
	const inputFilepath = core.getInput("filepath");
	const inputContent = core.getInput("content") || process.env.CONTENT;
	const inputAlignment = core.getInput("alignment");
	const inputPositionRegexp = core.getInput("position-regexp");
	const inputRegexpFlags = core.getInput("regexp-flags");

	core.debug(`getInput("filepath"): ${core.getInput("filepath")}`);
	core.debug(`getInput("content"): ${core.getInput("content")}`);
	core.debug(`getInput("alignment"): ${core.getInput("alignment")}`);
	core.debug(
		`getInput("position-regexp"): ${core.getInput("position-regexp")}`
	);
	core.debug(`getInput("regexp-flags"): ${core.getInput("regexp-flags")}`);
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
