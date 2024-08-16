const fs = require("fs");

const generateBackupCodes = () => {
  const file = fs.createWriteStream("backup_codes.txt");
  const totalCodes = 10_000; // Total number of codes to generate
  const batchSize = 1_000; // Number of codes to write in each batch
  let batch = [];

  for (let i = 0; i < totalCodes; i++) {
    const code = String(i).padStart(8, "0");
    batch.push(`'${code}'`); // Format the code as '12345678'

    // Write batch to file when the batch size is reached
    if (batch.length === batchSize) {
      file.write(batch.join(", ") + "\n");
      batch = []; // Clear the batch
    }
  }

  // Write any remaining codes
  if (batch.length > 0) {
    file.write(batch.join(", ") + "\n");
  }

  file.end();
};

generateBackupCodes();
