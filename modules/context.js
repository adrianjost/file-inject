const core = require("@actions/core");

module.exports = () => {
	const inputFilepath = core.getInput("filepath");
	const inputContent = core.getInput("content") || process.env.CONTENT;
	const inputAlignment = core.getInput("alignment");
	const inputPositionRegexp = core.getInput("position-regexp");
	const inputRegexpFlags = core.getInput("regexp-flags");

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
