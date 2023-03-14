import React, { useEffect, useState } from 'react';
import { Header, Table } from 'semantic-ui-react'
import axios from 'axios';
import  PsaltosLoader  from './PsaltosLoader';

const FetchData = () => {
  const [hymns, setHymns] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    populateHymnsData();
  }, [isLoading, hymns]);

  const populateHymnsData = async () => {
    await axios
      .get("https://localhost:7226/asset", function (req, res) {
          res.header("Access-Control-Allow-Origin", "*");
      })
      .then((response) =>  {
        setHymns(response.data); 
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Header as='h2' textAlign='center'>Assets Table</Header>
      {
        (isLoading && !hymns) ? 
        <PsaltosLoader /> :
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>TypeId</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>English Name</Table.HeaderCell>
              <Table.HeaderCell>Coptic Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {hymns.map(hymn =>
              <Table.Row key={hymn.assetId}>
                <Table.Cell>{hymn.typeId}</Table.Cell>
                <Table.Cell><a href={hymn.location}>{hymn.englishName}</a></Table.Cell>
                <Table.Cell>{hymn.englishName}</Table.Cell>
                <Table.Cell>{hymn.copticName}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      }
    </div>
  );

}

export default FetchData;