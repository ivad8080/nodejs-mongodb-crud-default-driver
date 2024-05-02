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

// Deleting specific document by ID

const filterCriteria = { _id: new ObjectId('662c59bac70097cbb9111c89') };

const deleteDocument = async () => {
  try {
    await connectToDatabase();
    let result = await referenceCollection.deleteOne(filterCriteria);
    result.deletedCount === 1
      ? console.log(`Document Deleted`)
      : console.log(`No Documents Deleted`);
  } catch (error) {
    console.error(`Error Deleting Document: ${error}`);
  } finally {
    await client.close();
  }
};

// deleteDocument();

// Deleting all documents with less than 40 subscribers

const filterCriteria2 = { subscribers: { $lt: 40 } };

const deleteDocuments = async () => {
  try {
    let result = await referenceCollection.deleteMany(filterCriteria2);
    result.deletedCount > 0
      ? console.log(`${result.deletedCount} Deleted Documents`)
      : console.log('No Documents Deleted');
  } catch (error) {
    console.log(`Error Deleting Documents: ${error}`);
  } finally {
    client.close();
  }
};

deleteDocuments();
