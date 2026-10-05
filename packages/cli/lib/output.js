export function printError(error, command, json) {
  const diagnostics = error.diagnostics ?? [{code: error.code || 'CLI_ERROR', severity: 'error', message: error.message}];
  if (json) console.log(JSON.stringify({schemaVersion: 1, command, valid: false, diagnostics}, null, 2));
  else console.error(`Threetopia: ${error.message}`);
  process.exitCode = 1;
}
