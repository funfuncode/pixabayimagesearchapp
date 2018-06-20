import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../imageResults/ImageResults';


class Search extends Component {

  state = {
    searchText: '',
    amount: 15,
    images: []
  }

  onTextChange = (e) => {
    this.setState({ searchText: e.target.value }, () => {
      if(this.state.searchText){
        axios.get(`${apiUrl}?key=${apiKey}&q=${encodeURIComponent(this.state.searchText)}&image_type=photo&per_page=${this.state.amount}`)
        .then( (res) => {
          this.setState({ images: res.data.hits}) })
        .catch((err) => console.log(err));
      } else {
        this.setState({ images: [] });
      }
    });
  }

  onAmountChange = (e, index, value) => {
    this.setState({ amount: value }, () => {
      if(this.state.searchText){
        axios.get(`${apiUrl}?key=${apiKey}&q=${encodeURIComponent(this.state.searchText)}&image_type=photo&per_page=${this.state.amount}`)
        .then( (res) => this.setState({ images: res.data.hits}))
        .catch((err) => console.log(err));
      }
    });
  }

  render(){
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search for images"
          fullWidth={true} />
          <br/>
          <SelectField
            name="amount"
            floatingLabelText="amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
            >
              <MenuItem value={5} primaryText="5" />
              <MenuItem value={10} primaryText="10" />
              <MenuItem value={15} primaryText="15" />
              <MenuItem value={30} primaryText="30" />
              <MenuItem value={50} primaryText="50" />
            </SelectField>
            <br/>
            {this.state.images.length > 0 ? <ImageResults images={this.state.images} /> : null }
          </div>
        );
      }
    }

    const apiUrl = 'https://pixabay.com/api';
    const apiKey = '9342797-0217156aa0278b134874211ba';


    export default Search;
