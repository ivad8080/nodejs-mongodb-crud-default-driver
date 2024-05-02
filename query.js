const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.error(`Error Connecting to MongoDB: ${error}`);
  }
};

const databaseName = 'test';
const collectionName = 'podcasts';

const referenceCollection = client.db(databaseName).collection(collectionName);

const query = { _id: new ObjectId('66299ed1ad790ae2e3117ba0') };

// Find a single document by ID

const findDocument = async () => {
  try {
    await connectToDatabase();
    let result = await referenceCollection.findOne(query);
    console.log(`Document Found`);
    console.log(result);
  } catch (error) {
    console.log(`Error Finding Document: ${error}`);
  } finally {
    await client.close();
  }
};

// findDocument();

const query2 = { subscribers: { $gt: 80000 } };

// Find all documents with more than 80000 subscribers

const findDocuments = async () => {
  try {
    await connectToDatabase();
    let result = referenceCollection.find(query2);
    for await (let document of result) {
      console.log(document);
    }
  } catch (error) {
    console.log(`Error Finding Document: ${error}`);
  } finally {
    await client.close();
  }
};

findDocuments();
