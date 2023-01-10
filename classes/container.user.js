const { MongoClient} = require('mongodb');
const config = {
  url : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.94wxqpb.mongodb.net/sesions`,
  dbName : 'users',
}

class Users {
  constructor(collection){
    this.db = collection;
    this.collection = config.dbName;
  }

  async connect (){
    const client = new MongoClient(config.url, { 
      useUnifiedTopology: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    return client;
  }

  async create (data){
    try {
      const connection = await this.connect();
      const db = connection.db(config.dbName);
      const collection = db.collection(this.collection);
      const result = await collection.insertOne(data);
      await connection.close();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const connection = await this.connect();
      const db = connection.db(config.dbName);
      const collection = db.collection(this.collection);

      const result = await collection.find().toArray();
      await connection.close();

      return result;
    } catch (err) {
      console.error("Error getting all", this.collection, err);
    }
  }

  async getByName(name) {
    try {
      const connection = await this.connect();
      const db = connection.db(config.dbName);
      const collection = db.collection(this.collection);

      const result = await collection.find(name);
      await connection.close();

      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new Users('sessions');