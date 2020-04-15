try {
	require("./modules/index")();
} catch (error) {
	core.setFailed(`Action failed with error ${error}`);
}
