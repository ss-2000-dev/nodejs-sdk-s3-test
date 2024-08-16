import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import "dotenv/config";

// 認証の設定
// こちらの仕方はベストプラクティスではない
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const downloadObject = async (bucketName, key, downloadPath) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName, // S3バケット名
      Key: key, // S3オブジェクトキー（ファイル名）
    });

    const response = await s3Client.send(command);

    response.Body.pipe(fs.createWriteStream(downloadPath))
      .on("error", (error) => {
        throw error;
      })
      .on("close", () => {
        console.log("completed");
      });
  } catch (error) {
    console.log("error", error);
  }
};

// 使用例
const bucketName = "nodejs-sdk-s3-test";
const key = "sample-nodejs-sdk.csv";
const downloadPath = "./output.csv";

downloadObject(bucketName, key, downloadPath);
