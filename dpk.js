const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (data) => {
  const stringifiedData =
    typeof data !== "string" ? JSON.stringify(data) : data;

  return crypto.createHash("sha3-512").update(stringifiedData).digest("hex");
};

const deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!event.partitionKey) {
    return createHash(event);
  }

  if (event?.partitionKey <= MAX_PARTITION_KEY_LENGTH) {
    return `${event?.partitionKey}`;
  }

  return createHash(event.partitionKey);
};


module.exports = deterministicPartitionKey;
