const mongodb = require('mongodb')
const util = require('util')
const fs = require('fs')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

async function main() {
  const client = await mongodb.MongoClient.connect(process.env.MONGO_URI);
  console.log('connected')

  let db = await client.db('dbname');

  // Reading in binary data from a file. data is a buffer.
  let data = await readFile(__dirname + '/sample.mp3');

  // Insert binary data to the database
  let res = await db.collection('coll').insert({data: new mongodb.Binary(data)})
  console.log(res)
  let objectId = res.ops[0]._id

  // Retrieve binary data from the database
  let obj = await db.collection('coll').findOne({_id: objectId})
  console.log(obj)

  // *** This is the key part ***
  // use obj.data.read to get a buffer from the binary data and write that buffer to a file
  await writeFile(__dirname + '/out.mp3', obj.data.read(0, obj.data.length()))

  console.log('done')
}

main()