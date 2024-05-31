/* istanbul ignore file */
import { S3 } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { CreateS3ClientInterface } from '@app/common/types/s3';

/**
 * Creates an S3 client with the specified region and credentials.
 * @param {CreateS3ClientInterface} options - The options for creating the S3 client.
 * @returns {Promise<S3>} - The created S3 client.
 */
@Injectable()
export class S3Adapter {
  /**
   * Creates an S3 client with the specified region and credentials.
   * @param {CreateS3ClientInterface} options - The options for creating the S3 client.
   * @returns {Promise<S3>} - The created S3 client.
   */
  s3Client({ region, ...credentials }: CreateS3ClientInterface) {
    const s3 = new S3({
      region,
      credentials,
    });

    return s3;
  }
}
