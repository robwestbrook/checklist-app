/**
 * Backup Indexed DB Database
 *
 * @description This function takes the indexed DB and
 * converts it to JSON, prepares a download link, and
 * opens the link for user download.
 *
 * @function backupIndexedDBDatabase
 *
 * @param {String} dbName name of indexed db database
 * @param {String} backupFileName file name for backup
 * @returns {String} download link
 */
export function backupIndexedDBDatabase(dbName, backupFileName) {
  return new Promise((resolve, reject) => {
    // Open the IndexedDB database
    const request = indexedDB.open(dbName);

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Create a transaction to read from the database
      const transaction = db.transaction(db.objectStoreNames, "readonly");

      // Create an empty object to store the backup data
      const backupData = {};

      // Loop through each object store in the database
      for (const objectStoreName of db.objectStoreNames) {
        // Get all the records from the object store
        const objectStore = transaction.objectStore(objectStoreName);
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
          // Add the records to the backup data
          backupData[objectStoreName] = event.target.result;

          // Check if all object stores have been backed up
          if (Object.keys(backupData).length === db.objectStoreNames.length) {
            // Convert the backup data to JSON string
            const backupDataString = JSON.stringify(backupData);

            // Create a download link for the backup file
            const downloadLink = document.createElement("a");
            downloadLink.href = `data:text/plain;charset=utf-8,${encodeURIComponent(
              backupDataString
            )}`;
            downloadLink.download = backupFileName;
            document.body.appendChild(downloadLink);

            // Click the download link to trigger the download
            downloadLink.click();

            // Clean up the download link
            document.body.removeChild(downloadLink);

            // Resolve the promise with the backup data
            resolve(backupData);
          }
        };

        request.onerror = (event) => {
          // Reject the promise with the error event
          reject(event);
        };
      }
    };

    request.onerror = (event) => {
      // Reject the promise with the error event
      reject(event);
    };
  });
}

/**
 * Process Uploaded JSON File
 *
 * @description Takes in a file upload event, reads the
 * file, and converts into JSON data
 * that can be read into an indexed DB database.
 *
 * @function processUploadedJsonFile
 *
 * @param {Object} fileInput form data object from file select
 * @param {Function} callback function to run on success
 * @returns {String} Object generated from JSON in file
 */
export function processUploadedJsonFile(fileInput, callback) {
  console.log(`fileInput: ${fileInput}`);
  if (!fileInput.files || !fileInput.files[0]) {
    console.log("no fileInput.files");
    return; // If no file is selected, return early
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    try {
      const json = JSON.parse(event.target.result);
      // Process the JSON object as needed
      callback(null, json);
    } catch (error) {
      // Handle JSON parsing errors
      callback(error);
    }
  };

  reader.onerror = function (event) {
    // Handle file reading errors
    callback(event.target.error);
  };

  // Read the uploaded file as text
  reader.readAsText(file);
}

/**
 * Import Data into Indexed DB Database
 *
 * @description Takes in the database name and a json
 * file. Processes the JSON and inserts into the indexed
 * DB database.
 *
 * @function importDataToIndexedDBDatabase
 * @param {String} dbName indexed DB database name
 * @param {JSON} jsonData JSON data read in from restore file
 * @returns {Promise} resolve or reject
 */
export async function importDataToIndexedDBDatabase(dbName, jsonData) {
  console.log(`dbName: ${dbName}`);
  console.log(`jsonData: ${jsonData}`);

  return new Promise((resolve, reject) => {
    // Open the IndexedDB database
    const request = indexedDB.open(dbName);

    request.onsuccess = async (event) => {
      const db = event.target.result;

      // Start a transaction to write to the database
      const transaction = db.transaction(db.objectStoreNames, "readwrite");

      // Loop through each object store in the database
      for (const objectStoreName of db.objectStoreNames) {
        // Delete all existing records in the object store
        const objectStore = transaction.objectStore(objectStoreName);
        objectStore.clear();
      }

      // Loop through each object store in the JSON data
      for (const objectStoreName in jsonData) {
        if (jsonData.hasOwnProperty(objectStoreName)) {
          const objectStoreData = jsonData[objectStoreName];

          // Get the object store and add the records to it
          const objectStore = transaction.objectStore(objectStoreName);
          for (const record of objectStoreData) {
            objectStore.add(record);
          }
        }
      }

      // Complete the transaction
      transaction.oncomplete = () => {
        // Resolve the promise with the imported data
        resolve(jsonData);
      };

      transaction.onerror = (event) => {
        // Reject the promise with the error event
        reject(event);
      };
    };

    request.onerror = (event) => {
      // Reject the promise with the error event
      reject(event);
    };
  });
}
