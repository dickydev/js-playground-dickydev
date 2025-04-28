function runCode() {
  const code = document.getElementById("code").value;
  const outputElement = document.getElementById("output");

  try {
    const consoleLog = [];
    const consoleSpy = new Proxy(console, {
      get: (target, prop) => {
        if (prop === "log") {
          return (...args) => {
            consoleLog.push(args.join(" "));
          };
        }
        return target[prop];
      },
    });

    (function (console) {
      eval(code);
    })(consoleSpy);

    outputElement.textContent =
      consoleLog.join("\n") || "Kode berhasil dijalankan!";
  } catch (error) {
    outputElement.textContent = "Error: " + error.message;
  }
}
