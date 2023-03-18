import { useState, useEffect } from 'react';
import { Input, Button, Form, Message, Icon, Dropdown } from 'semantic-ui-react'
import { UploadAsset, PopulateTagsData } from '../BackendCalls'

const types = [
  { key: 1, text: 'Audio', value: 1 },
];

const FileUploader = () =>  {
    const [file, setFile] = useState(null);
    const [typeId, setTypeId] = useState(null);
    const [englishName, setEnglishName] = useState(null);
    const [copticName, setCopticName] = useState(null);
    const [isAddedToDb, setAddedToDb] = useState(false);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [tags, ] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isWarning, setWarning] = useState(false);
    
    useEffect(() => {
      PopulateTagsData(tags);
      setTypeId(types[0].key);
    }, [tags]);
  
    const handleFileSelect = (e) => {
      setFile(e.target.files[0]);
    }

    const handleTags = (e, data) => {
      setSelectedTags(data.value);
    }

    const handleEnglishName = (e) => {
      setEnglishName(e.target.value);
    }

    const handleCopticName = (e) => {
      setCopticName(e.target.value);
    }
  
    return (
      <div>
          <Form columns={3}>
          <Form.Field>
            <label>Type*</label>
            <Dropdown text='Audio' options={types} fluid selection/>
          </Form.Field>
          <Form.Field>
            <label>English Name*</label>
            <Input type="text" id="englishName" onChange={handleEnglishName}></Input>
          </Form.Field>
          <Form.Field>
            <label>Coptic Name*</label>
            <Input type="text" id="copticName" onChange={handleCopticName}></Input>
          </Form.Field>
          <Form.Field>
          <Dropdown
            clearable
            fluid
            multiple
            search
            selection
            options={tags}
            onChange={handleTags}
            placeholder='Select Hymns Tags'
          />
          
          </Form.Field>
          <Input type="file" onChange={handleFileSelect} />
        </Form>
        
        <div style={{ marginTop: '10px' }}>
          <Button disabled={!file}onClick={() => UploadAsset(setError, setErrorMessage, setAddedToDb, typeId, englishName, copticName, file, selectedTags, setWarning)}>Upload</Button>
          {(!isError || !isAddedToDb) && 
          <Icon color='green'  name='check circle'></Icon>
          }
        </div>

        <Message hidden={!isError} negative>
          <Icon name='exclamation circle' loading />
          <Message.Header>An Error Has Occured</Message.Header>
          <Message.Content>{errorMessage}</Message.Content>
        </Message>
        <Message hidden={!isWarning} warning>
          <Icon name='warning sign' loading />
          <Message.Header>An Error Has Occured</Message.Header>
          <Message.Content>{errorMessage}</Message.Content>
        </Message>
      </div>
    );
}

export default FileUploader;