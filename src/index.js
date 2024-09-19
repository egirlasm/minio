import * as Minio from 'minio'
const core = require('@actions/core');
const fs = require('fs');

console.log(process.env)
var endpoint = core.getInput('ENDPOINT')
var port = core.getInput('PORT')
var useSSL = core.getBooleanInput('USE-SSL')
var accessKey = process.env.MINIO_ACCESS_KEY //core.getInput('ACCESS_KEY')
var secretKey = process.env.MINIO_ACCESS_SECRET//core.getInput('ACCESS_SECRET')
var bucket = core.getInput('BUCKET')

console.log('check params ', endpoint, port, useSSL, bucket, accessKey, secretKey)

const minioClient = new Minio.Client({
  endPoint: endpoint,
  port: Number.parseInt(port),
  useSSL: useSSL,
  accessKey: accessKey,
  secretKey: secretKey
})



// Check if the bucket exists
// If it doesn't, create it
const exists = await minioClient.bucketExists(bucket)
if (exists) {
  console.log('Bucket ' + bucket + ' exists.')
} else {
  await minioClient.makeBucket(bucket, 'us-east-1')
  console.log('Bucket ' + bucket + ' created in "us-east-1".')
}

const paths = core.getMultilineInput('paths')

if (paths.length === 0) {
  throw ("no paths input")
}

var metaData = {
  // 'Content-Type': 'text/plain',
  // 'X-Amz-Meta-Testing': 1234,
  // example: 5678,
}
console.log(paths)
paths.map(async (path) => {


  try{
    let stat =  fs.lstatSync(path)
    console.log('check path => ', path,stat.isDirectory)
    console.log(stat.metaData)
    if (stat.isDirectory()) {
      throw ('Unsupported')
    } else {
      await minioClient.fPutObject(bucket, path, path, metaData)
    }
  }catch(e){
    console.log(e)
  }

})



