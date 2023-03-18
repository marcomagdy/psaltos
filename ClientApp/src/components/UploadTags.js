import { useState, useEffect } from 'react';
import { Input, Button, Form, Message, Icon, Dropdown } from 'semantic-ui-react'
import { UploadTag, PopulateCategoriesData } from '../BackendCalls'

const UploadTags = () =>  {
    const [categoryId, setCategoryId] = useState(null);
    const [englishName, setEnglishName] = useState(null);
    const [isAddedToDb, setAddedToDb] = useState(false);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [categories, ] = useState([]);
    
    useEffect(() => {
        if (categories.length === 0)
            PopulateCategoriesData(categories);
    }, [categories]);

    const handleEnglishName = (e) => {
      setEnglishName(e.target.value);
    }
    const handleCategories = (e, data) => {
        setCategoryId(data.value);
    }

    return (
      <div>
          <Form columns={3}>
            <Form.Field>
                <label>Category*</label>
                <Dropdown placeholder='Select Category' options={categories} onChange={handleCategories} fluid selection/>
            </Form.Field>
            <Form.Field>
                <label>English Name*</label>
                <Input type="text" id="englishName" onChange={handleEnglishName}></Input>
            </Form.Field>
          </Form>
        
        <div style={{ marginTop: '10px' }}>
          <Button disabled={!englishName}onClick={() => UploadTag(setError, setErrorMessage, setAddedToDb, categoryId, englishName)}>Upload</Button>
          {(isAddedToDb) && 
          <Icon color='green'  name='check circle'></Icon>
          }
        </div>
        <Message hidden={!isError} negative>
          <Icon name='exclamation circle' loading />
          <Message.Header>An Error Has Occured</Message.Header>
          <Message.Content>{errorMessage}</Message.Content>
        </Message>
      </div>
    );
}

export default UploadTags;