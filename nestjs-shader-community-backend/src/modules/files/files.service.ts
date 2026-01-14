import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { Multer } from 'multer';

@Injectable()
export class FilesService {
  private s3Client: S3Client;
  private bucketName = 'shaders';

  constructor() {
    this.s3Client = new S3Client({
      endpoint: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
      region: 'us-east-1', 
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY || 'minio',
        secretAccessKey: process.env.MINIO_SECRET_KEY || 'minio123',
      },
      forcePathStyle: true, 
    });
  }

  async uploadShader(file: Express.Multer.File): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    // Retourne l'URL publique du fichier (à adapter selon configuration MinIO/Reverse Proxy)
    const endpoint = process.env.MINIO_ENDPOINT || 'http://localhost:9000';
    // Si l'endpoint est localhost, on s'assure que l'URL soit accessible
    return `${endpoint}/${this.bucketName}/${fileName}`;
  }
}
