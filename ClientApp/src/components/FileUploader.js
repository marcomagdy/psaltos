import { useState } from 'react';
import { Input, Button, Form, Message, Icon } from 'semantic-ui-react'
import AWS from 'aws-sdk';
import axios from 'axios';

AWS.config.update({
  accessKeyId: "AKIAWKMQZAIBQUYJ67HR",
  secretAccessKey: "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",
  region: 'us-east-1',
  signatureVersion: 'v4',
});

const FileUploader = () =>  {
    const s3 = new AWS.S3();
    const [file, setFile] = useState(null);
    const [typeId, setTypeId] = useState(null);
    const [englishName, setEnglishName] = useState(null);
    const [copticName, setCopticName] = useState(null);
    const [isAddedToDb, setAddedToDb] = useState(false);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
  
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
        setError(false);
        setErrorMessage(null);
        if (!file) {
          setError(true);
          setErrorMessage("Please choose a file to upload.");
          return;
        }

        // S3
        const params = { 
          Bucket: 'test-bucket-hymns', 
          Key: `${Date.now()}.${file.name}`, 
          Body: file 
        };

        const { Location } = await s3.upload(params).promise().catch((error) => {
          setError(true);
          setErrorMessage("Seems S3 bucket is not working....");
          setAddedToDb(false);
          return;
        });
        console.log(Location);
        // if (Location !== null) {
        //   setError(true);
        //   setErrorMessage("Seems S3 bucket is not working....");
        //   setAddedToDb(false);
        //   return;
        // } 
        console.log('uploading to s3', Location);

        const asset = { 
          TypeId: typeId, 
          Location: Location,
          EnglishName: englishName,
          CopticName: copticName
        };

        await axios.post("https://localhost:7226/asset",  asset)
        .then((response) =>  {
            console.log(response);
            if (response.status !== 200) {
              setError(true);
              setErrorMessage("We are able to upload to our database at this time.");
              return;
            }
            setAddedToDb(true);
          })
          .catch((error) => {
              console.log(error);
              setError(true);
              setErrorMessage("We are able to upload to our database at this time.");
          });
    }
  
    return (
      <div>
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
          <Input type="file" onChange={handleFileSelect} />
        </Form>
        
        <div style={{ marginTop: '10px' }}>
          <Button disabled={!file}onClick={upload}>Upload</Button>
          <Icon disabled={isError || !isAddedToDb} color='green'  name='check circle'></Icon>
        </div>

        <Message hidden={!isError} negative>
          <Icon name='exclamation circle' loading />
          <Message.Header>An Error Has Occured</Message.Header>
          <Message.Content>{errorMessage}</Message.Content>
        </Message>
      </div>
    );
}

export default FileUploader;