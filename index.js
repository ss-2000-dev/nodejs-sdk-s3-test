import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import "dotenv/config";
import { parse } from "csv-parse";
// import { Writable } from "stream";

// 認証の設定
// こちらの仕方はベストプラクティスではない
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const downloadObjectAndConvertJson = async (bucketName, key) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName, // S3バケット名
      Key: key, // S3オブジェクトキー（ファイル名）
    });

    const response = await s3Client.send(command);

    response.Body.pipe(
      parse({ columns: true }, function (err, data) {
        console.log(data);
      })
    )
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

downloadObjectAndConvertJson(bucketName, key);
