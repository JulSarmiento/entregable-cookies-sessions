const MongoStore = require('connect-mongo');
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'secret';

const mongoConfig = {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const storeConfig = {
  mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.94wxqpb.mongodb.net/sessions`,
  mongoOptions: mongoConfig,
};

const mongoSessionConfig = {
  store:  MongoStore.create(storeConfig),
  secret: COOKIE_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
};

module.exports = mongoSessionConfig;