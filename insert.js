const { MongoClient } = require('mongodb');
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
const collectionName = 'accounts';

const referenceCollection = client.db(databaseName).collection(collectionName);

const dataObject = {
  title: 'FullStack Life',
  platforms: ['Youtube', 'Spotify'],
  year: new Date().getFullYear(),
  hosts: ['Davi SAS'],
  premium_subs: 2000,
  downloads: 1,
  podcast_type: 'audio',
  subscribers: 2323,
};

// Insert a single document

const insertDocument = async () => {
  try {
    await connectToDatabase();
    let result = await referenceCollection.insertOne(dataObject);
    console.log(`Inserted Document: ${result.insertedId}`);
  } catch (error) {
    console.log(`Error Inserting Document: ${error}`);
  } finally {
    await client.close();
  }
};

// insertDocument();

const dataArray = [
  {
    title: 'JavaScript Tips',
    platforms: ['Youtube', 'Spotify'],
    year: new Date().getFullYear(),
    hosts: ['Davi SAS'],
    premium_subs: 70,
    downloads: 3,
    podcast_type: 'audio',
    subscribers: 30,
  },
  {
    title: 'Developer Drama',
    platforms: ['Youtube', 'Spotify'],
    year: new Date().getFullYear(),
    hosts: ['Luciana Hanan'],
    premium_subs: 3000,
    downloads: 2000,
    podcast_type: 'audio',
    subscribers: 35,
  },
];

// Inserting an array of objects / documents

const insertDocuments = async () => {
  try {
    await connectToDatabase();
    let result = await referenceCollection.insertMany(dataArray);
    console.log(`Number of Documents: ${result.insertedCount}`);
    console.log(result);
  } catch (error) {
    console.error(`Error Inserting Documents: ${error}`);
  } finally {
    await client.close();
  }
};

insertDocuments();
