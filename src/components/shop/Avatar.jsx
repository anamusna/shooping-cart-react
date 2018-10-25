import React from 'react';

class Avatar extends React.Component {
  render () {
    return <div><img src={this.props.src} width="20" alt="avatar" /></div>;
  }
}

export default Avatar;
