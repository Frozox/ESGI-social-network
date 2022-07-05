const { Log } = require("../models/mongo");
const SyslogPro = require("syslog-pro");

const RFC5424_SEVERITY = {
  EMERGENCY: 0,
  ALERT: 1,
  CRITICAL: 2,
  ERROR: 3,
  WARNING: 4,
  NOTICE: 5,
  INFO: 6,
  DEBUG: 7
};

const RFC5424_REGEX = /^<(\d*)>(\d)\s(\S*)\s(\S*)\s(\S*)[\S\s]*BOM([\S\s]*)$/g;

const Logger = new SyslogPro.RFC5424({
  applacationName: process.env.APP_NAME,
  timestamp: true,
  color: false,
  server: {
    target: "localhost",
  },
})

const logMessage = async (message, severity, isServer = true) => {
  const normalizedMessage = await Logger.buildMessage(message, {severity: severity});
  await Log.create(bodyParser(normalizedMessage, isServer));
  return normalizedMessage;
}

const bodyParser = (normalizedMessage, source) => {
  const splitedMessage = [...normalizedMessage.trim().matchAll(RFC5424_REGEX)][0];
  return {
    priority: parseInt(splitedMessage[1]),
    version: parseInt(splitedMessage[2]),
    createdAt: new Date(splitedMessage[3]),
    hostName: splitedMessage[4],
    appName: splitedMessage[5],
    content: splitedMessage[6],
    sourceIsServer: source
  }
}

module.exports = {
  emer: async (message, isServer) => {
    const normalizedMessage = await logMessage(message, RFC5424_SEVERITY.EMERGENCY, isServer);
    console.log(normalizedMessage);
  },
  alert: async (message, isServer) => {
    const normalizedMessage = await logMessage(message, RFC5424_SEVERITY.ALERT, isServer);
    console.log(normalizedMessage);
  },
  crit: async (message, isServer) => {
    const normalizedMessage = await logMessage(message, RFC5424_SEVERITY.CRITICAL, isServer);
    console.error(normalizedMessage);
  },
  err: async (message, isServer) => {
    const normalizedMessage = await logMessage(message, RFC5424_SEVERITY.ERROR, isServer);
    console.error(normalizedMessage);
  },
  warn: async (message, isServer) => {
    const normalizedMessage = await logMessage(message, RFC5424_SEVERITY.WARNING, isServer);
    console.warn(normalizedMessage);
  },
  notice: async (message, isServer) => {
    const normalizedMessage = await logMessage(message, RFC5424_SEVERITY.NOTICE, isServer);
    console.log(normalizedMessage);
  },
  info: async (message, isServer) => {
    const normalizedMessage = await logMessage(message, RFC5424_SEVERITY.INFO, isServer);
    console.info(normalizedMessage);
  },
  debug: async (message, isServer) => {
    const normalizedMessage = await logMessage(message, RFC5424_SEVERITY.DEBUG, isServer);
    console.debug(normalizedMessage);
  }
}