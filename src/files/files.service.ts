import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor(private readonly config: ConfigService) {}

  private getSignedUrlForEventImages(filename: string) {
    return `event/${uuid()
      .split('/')
      .join('-')
      .split(' ')
      .join('-')}-${filename}`;
  }

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: this.config.get('AWS_PUBLIC_BUCKET_NAME'),
          Body: dataBuffer,
          Key: this.getSignedUrlForEventImages(filename),
          ACL: 'public-read',
          ContentType: 'text/plain',
        })
        .promise();

      return uploadResult.Location;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
