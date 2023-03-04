import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { hymns: [], loading: true };
  }

  componentDidMount() {
    this.populateHymnsData();
  }

  static renderHymnsTable(hymns) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>AssetId</th>
            <th>TypeId</th>
            <th>Location</th>
            <th>English Name</th>
            <th>Coptic Name</th>
          </tr>
        </thead>
        <tbody>
          {hymns.map(hymn =>
            <tr key={hymn.assetId}>
              <td>{hymn.assetId}</td>
              <td>{hymn.typeId}</td>
              <td>{hymn.location}</td>
              <td>{hymn.englishName}</td>
              <td>{hymn.copticName}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderHymnsTable(this.state.hymns);

    return (
      <div>
        <h1 id="tableLabel">Hymns Table</h1>
        <p>This is the table stored in the database.</p>
        {contents}
      </div>
    );
  }

  async populateHymnsData() {
    const response = await fetch('asset');
    const data = await response.json();
    this.setState({ hymns: data, loading: false });
  }
}
