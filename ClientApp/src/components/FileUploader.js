import AWS from 'aws-sdk';
import { useState } from 'react';
import {Input, Image, Button, Form} from 'semantic-ui-react'

AWS.config.update({
  accessKeyId: 'AKIAWKMQZAIBQUYJ67HR',
  secretAccessKey: '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',
  region: "us-east-1",
  signatureVersion: "v4",
});

const FileUploader = () =>  {
    const s3 = new AWS.S3();
    const [fileUrl, setFileUrl] = useState(null);
    const [file, setFile] = useState(null);
    const [typeId, setTypeId] = useState(null);
    const [englishName, setEnglishName] = useState(null);
    const [copticName, setCopticName] = useState(null);
    const [isAddedToDb, setAddedToDb] = useState(false);
  
    const handleFileSelect = (e) => {
      setFile(e.target.files[0]);
    }

    const handleTypeId = (e) => {
      setTypeId(e.target.value);
    }

    const handleEnglishName = (e) => {
      setEnglishName(e.target.value);
    }

    const handleCopticName = (e) => {
      setCopticName(e.target.value);
    }

    const upload = async () => {
        if (!file) {
          return;
        }

        const params = { 
          Bucket: 'test-bucket-hymns', 
          Key: `${Date.now()}.${file.name}`, 
          Body: file 
        };
        const { Location } = await s3.upload(params).promise();
        setFileUrl(Location);
        console.log('uploading to s3', Location);

        const asset = { 
          AssetId: 0,
          TypeId: typeId, 
          Location: Location,
          EnglishName: englishName,
          CopticName: copticName
        };
        
        const response = await fetch('asset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(asset)
        });
        console.log(JSON.stringify({ asset: asset }));
        await response.json().then(setAddedToDb(true));

        setFile(null);
    }
  
    return (
      <div >
        <h1>Test File Upload</h1>
        <Form columns={3}>
          <Form.Field>
            <label>TypeId</label>
            <Input type="text" id="typeId" onChange={handleTypeId}></Input>
          </Form.Field>
          <Form.Field>
            <label>EnglishName</label>
            <Input type="text" id="englishName" onChange={handleEnglishName}></Input>
          </Form.Field>
          <Form.Field>
            <label>CopticName</label>
            <Input type="text" id="copticName" onChange={handleCopticName}></Input>
          </Form.Field>
        </Form>
        
        <Input type="file" onChange={handleFileSelect} />
        
        <div style={{ marginTop: '10px' }}>
          <Button disabled={!file}onClick={upload}>Upload</Button>
        </div>
        
        { isAddedToDb && fileUrl &&
          (<div style={{ marginTop: '10px' }}>
            <Image src={fileUrl} alt="uploaded" />
          </div>
          )}
      </div>
    );
}

export default FileUploader;