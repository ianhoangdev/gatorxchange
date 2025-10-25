import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

export async function uploadToS3(file: File): Promise<string> {
  const fileExtension = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
  
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `listings/${fileName}`,
    Body: new Uint8Array(await file.arrayBuffer()),
    ContentType: file.type,
  });

  await s3Client.send(command);
  
  // Return the public URL
  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/listings/${fileName}`;
}

export async function getPresignedUploadUrl(fileName: string, contentType: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `listings/${fileName}`,
    ContentType: contentType,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}
