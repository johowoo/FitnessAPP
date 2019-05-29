try {
  module.exports = require.resolve(
    "@expo/ngrok-bin-" +
      process.platform +
      "-" +
      process.arch +
      (process.platform === "win32" ? "/ngrok.exe" : "/ngrok")
  );
} catch (e) {
  module.exports = null;
}
