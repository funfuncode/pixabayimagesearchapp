import React, { Component } from 'react';
import propTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ImageResults extends Component {

  state = {
    open: false,
    currentImage: ''
  }

  handleOpen = (img) => {
    this.setState({ open: true, currentImage: img });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render(){
    const imageListContent = (
      <GridList cols="3">
        { this.props.images.map( (image) => {
          return (<GridTile
            title={image.tags}
            key={image.id}
            subtitle={<span><strong>by {image.user}</strong></span>}
            actionIcon={<IconButton onClick={() => this.handleOpen(image.largeImageURL) }><ZoomIn color="white"></ZoomIn></IconButton>}
            >
              <img src={image.largeImageURL} alt=""/>
            </GridTile>);
        } ) }
      </GridList>
    );

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImage} alt="" style={{ width: '100%' }} />
        </Dialog>
      </div>
    );
  }
}

ImageResults.propTypes = {
  images: propTypes.array.isRequired
}

export default ImageResults;
