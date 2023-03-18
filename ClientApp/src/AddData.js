import React from 'react';
import { Tab } from 'semantic-ui-react'
import FileUploader from './components/FileUploader';
import UploadTags from './components/UploadTags';

const panes = [
    { menuItem: 'Upload Asset', render: () => <Tab.Pane attached={false}>{<FileUploader/>}</Tab.Pane> },
    { menuItem: 'Upload Tag', render: () => <Tab.Pane attached={false}>{<UploadTags/>}</Tab.Pane> }
];

const AddData = () =>  {
    return (
        <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
    );
}

export default AddData;