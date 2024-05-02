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

const filterCriteria = { _id: new ObjectId('662c5dc2e6a6ea4f3975129f') };
const update = { $set: { subscribers: 35 } };

// Update a specific document and change the subscribers value

const updateDocument = async () => {
  try {
    await connectToDatabase();
    let result = await referenceCollection.updateOne(filterCriteria, update);
    console.log(result);
    result.modifiedCount === 1
      ? console.log('Document Updated')
      : console.log('Document Not Updated');
  } catch (error) {
    console.log(`Error Updating Document: ${error}`);
  } finally {
    await client.close();
  }
};

updateDocument();

const filterCriteria2 = { platforms: 'Spotify' };
const update2 = { $push: { hosts: 'DJ Davi' } };

// Update all documents where platforms equals Spotify and add a DJ Davi to hosts.

const updateDocuments = async () => {
  try {
    let result = await referenceCollection.updateMany(filterCriteria2, update2);
    result.modifiedCount > 0
      ? console.log(`Updated ${result.modifiedCount} Documents`)
      : console.log('No Documents Updated');
  } catch (error) {
    console.error(`Error Updating Documents ${error}`);
  } finally {
    await client.close();
  }
};

// updateDocuments();
