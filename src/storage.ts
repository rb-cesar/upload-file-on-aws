import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

export const storage = {
  s3: new AWS.S3(),

  getParams(filename: string, buffer: Buffer) {
    const params: PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `images/${filename}`,
      Body: buffer,
      ContentType: "image/jpeg",
    };

    return params;
  },

  upload(filename: string, buffer: Buffer) {
    const params = this.getParams(filename, buffer);

    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
      });
    });
  },

  fetchFile(src: string) {
    return new Promise((resolve, reject) => {
      this.s3.getObject(
        { Bucket: process.env.AWS_BUCKET_NAME!, Key: `images/${src}` },
        (err, data) => (err ? reject(err) : resolve(data))
      );
    });
  },
};
