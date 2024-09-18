import * as Minio from 'minio'
const core = require('@actions/core');

console.log('where is server adress')
// console.log(process.env)
console.log(core.getInput('ENDPOINT'))
// Instantiate the MinIO client with the object store service
// endpoint and an authorized user's credentials
// play.min.io is the MinIO public test cluster
const minioClient = new Minio.Client({
  endPoint: core.getInput('ENDPOINT'),
  port: 9000,
  useSSL: false,
  accessKey: 'DZL3Ee65fB1N7cQiAvdo',
  secretKey: 'ZVtV77Cck144BlgftpQaMN6Rry98z9FuH332jKYK',
})

// File to upload
const sourceFile = 'README.md'

// Destination bucket
const bucket = 'workshared'

// Destination object name
const destinationObject = 'my-test-file.md'

// Check if the bucket exists
// If it doesn't, create it
const exists = await minioClient.bucketExists(bucket)
if (exists) {
  console.log('Bucket ' + bucket + ' exists.')
} else {
  await minioClient.makeBucket(bucket, 'us-east-1')
  console.log('Bucket ' + bucket + ' created in "us-east-1".')
}

// Set the object metadata
var metaData = {
  'Content-Type': 'text/plain',
  'X-Amz-Meta-Testing': 1234,
  example: 5678,
}

// Upload the file with fPutObject
// If an object with the same name exists,
// it is updated with new data
await minioClient.fPutObject(bucket, destinationObject, sourceFile, metaData)
console.log('File ' + sourceFile + ' uploaded as object ' + destinationObject + ' in bucket ' + bucket)
// Run the File Uploader