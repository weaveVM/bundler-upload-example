import { BundlerSDK } from 'bundler-upload-sdk';
import { readFile } from 'fs/promises';
import 'dotenv/config';

console.log('Uploading...');

const bundler = new BundlerSDK('https://upload.onchain.rs/', process.env.API_KEY);

async function main() {
  try {
    const fileBuffer = await readFile('images/milady.png');
    const txHash = await bundler.upload([
      {
        file: fileBuffer,
        tags: {
          'content-type': 'image/png',
        }
      }
    ]);
    console.log('Upload successful! Transaction hash:', txHash);
    console.log(`https://resolver.bot/bundle/${txHash}/0`);
    process.exit(0);
  } catch (error) {
    console.error('Upload failed:', error.message);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
