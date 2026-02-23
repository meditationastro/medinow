import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
  tls: true,
  forcePathStyle: true
});

export async function uploadToR2(file: File) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const key = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    
    await S3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return `${process.env.R2_PUBLIC_URL}/${key}`;
  } catch (error) {
    console.error('Error uploading to R2:', error);
    throw new Error('Failed to upload image');
  }
} 