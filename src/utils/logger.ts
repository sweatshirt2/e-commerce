import fs from "fs";
import path from "path";

const LOGS_DIR = path.join(process.cwd(), "logs");
const LOG_FILE_NAME = "app.log";
const LOG_FILE_PATH = path.join(LOGS_DIR, LOG_FILE_NAME);

type TLoggerArgs = {
  type?: string;
  message: unknown;
};

function ensureLogsDirExists() {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
}

export function logger({ type = "error", message }: TLoggerArgs): void {
  ensureLogsDirExists();

  const timestamp = new Date().toISOString();
  const logMessage = `\n\n\n\n ------------------ \n\n ${timestamp} \n\n ${type} \n\n - ${
    typeof message === "string" ? message : JSON.stringify(message)
  }`;

  fs.appendFile(LOG_FILE_PATH, logMessage + "\n", (err) => {
    if (err) {
      console.error(`Failed to write to log file ${LOG_FILE_PATH}:`, err);
    }
  });
}
