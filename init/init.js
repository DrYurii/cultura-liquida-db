db = db.getSiblingDB('exampledb');

db.createCollection('test');
db.test.insert({ message: 'MongoDB is live on Render!' });
