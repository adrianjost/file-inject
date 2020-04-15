const core = require("@actions/core");
const { promises: fsPromises } = require("fs");
const run = require("./index");

// hide logs, for a clean console
jest.spyOn(core, "info").mockImplementation(jest.fn());
jest.spyOn(core, "debug").mockImplementation(jest.fn());

const FILE_CONTENT = `# Changelog

## v0.1.0 (old)

- stuff
`;
const NEW_CONTENT = `
## v0.x.0 (new)

- new content
`;

describe("action", () => {
	beforeEach(() => {
		jest.resetModules();
		jest.resetAllMocks();
	});

	it.each([
		["before", "^", ""],
		["after", "^", ""],
		["before", "$", ""],
		["after", "$", ""],
		["after", "# Changelog\r?\n", ""],
		["before", "# Changelog\r?\n", ""],
		["after", "# CHANGELOG\r?\n", "i"],
		["before", "# CHANGELOG\r?\n", "i"],
	])(
		"works with alignment %p with regexp /%j/%s",
		async (alignment, regexp, regexpFlags = "") => {
			jest.spyOn(core, "getInput").mockImplementation((key) => {
				return {
					filepath: "./DEMO.md",
					content: NEW_CONTENT,
					alignment: alignment,
					"position-regexp": regexp,
					"regexp-flags": regexpFlags,
				}[key];
			});

			jest.spyOn(fsPromises, "readFile").mockReturnValue(FILE_CONTENT);
			jest.spyOn(fsPromises, "writeFile").mockImplementation(jest.fn());

			const setOutputMock = jest
				.spyOn(core, "setOutput")
				.mockImplementation(jest.fn());
			await run();
			expect(setOutputMock.mock.calls[0]).toMatchSnapshot();
		}
	);
});
