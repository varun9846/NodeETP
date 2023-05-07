const MongoClient = require('mongodb').MongoClient;

// Connection URL and database name
const url = 'mongodb://localhost:27017/mydb';
const dbName = 'mydb';

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }

  console.log('Connected successfully to MongoDB');

  // Get the database object
  const db = client.db(dbName);

  // Create a new collection
  const cars = db.collection('cars');

  // Insert multiple documents into the collection
  const documents = [
    { model: 'Civic', company: 'Honda', mileage: 30, colour: 'white', owner: 'John' },
    { model: 'Corolla', company: 'Toyota', mileage: 40, colour: 'black', owner: 'Jane' },
    { model: 'Accord', company: 'Honda', mileage: 25, colour: 'silver', owner: 'Bob' },
    { model: 'Camry', company: 'Toyota', mileage: 35, colour: 'red', owner: 'Alice' }
  ];
  cars.insertMany(documents, (err, result) => {
    if (err) {
      console.error('Failed to insert documents:', err);
      client.close();
      return;
    }

    console.log('Inserted documents:', result.insertedCount);

    // Query the collection to find cars with more than a specific mileage
    const mileageThreshold = 30;
    cars.find({ mileage: { $gt: mileageThreshold } }).toArray((err, docs) => {
      if (err) {
        console.error('Failed to find documents:', err);
        client.close();
        return;
      }

      console.log(`Found ${docs.length} cars with mileage > ${mileageThreshold}`);
      console.log(docs);

      // Close the client connection
      client.close();
    });
  });
});
