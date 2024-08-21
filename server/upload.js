const fs = require('fs');
const { MongoClient } = require('mongodb');

// MongoDB Atlas connection URI
const uri = "mongodb+srv://ashishgoutham:1rreHoNerSCPQTv4@cluster0.8o1zr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Function to upload data
async function uploadData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('fin_dash'); // Replace with your database name
    const collection = database.collection('customerx'); // Replace with your collection name

    // Read JSON data
    const data = JSON.parse(fs.readFileSync('output(3).json', 'utf8'));

    // Insert data into MongoDB
    await collection.insertMany(data);

    console.log('Data has been uploaded successfully.');
  } catch (error) {
    console.error('Error uploading data:', error);
  } finally {
    await client.close();
  }
}

uploadData();