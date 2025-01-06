import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function uploadToS3(file: Express.Multer.File): Promise<string> {
  const key = `bots/${uuidv4()}-${file.originalname}`;
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3Client.send(command);
    return key;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}

export async function uploadFolderToS3(files: Express.Multer.File[]): Promise<{ [key: string]: string }> {
  const s3Keys: { [key: string]: string } = {};

  for (const file of files) {
    const key = `bots/${uuidv4()}-${file.originalname}`;
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await s3Client.send(command);
      s3Keys[file.originalname] = key;
    } catch (error) {
      console.error(`Error uploading ${file.originalname} to S3:`, error);
      throw error;
    }
  }

  return s3Keys;
}