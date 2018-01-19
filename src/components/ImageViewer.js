import React, { Component } from 'react';

const styles = {
  width: 'auto',
};

class ImageViewer extends Component {
  constructor(props) {
    super(props);

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.preventDefault = this.preventScroll.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal) {
      document.addEventListener('click', this.handleOutsideClick, false);
      document.addEventListener('keydown', this.handleKeyDown, false);
      // https://github.com/facebook/react/issues/1169
      this.node.style.cursor = 'pointer';
      document.body.addEventListener('touchmove', this.preventScroll, false);
      document.documentElement.classList.add('modal-open');
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
      document.removeEventListener('keydown', this.handleKeyDown, false);
      this.node.style.cursor = 'none';
      document.body.removeEventListener('touchmove', this.preventScroll, false);
      document.documentElement.classList.remove('modal-open');
    }
  }

  // https://benfrain.com/preventing-body-scroll-for-modals-in-ios/
  // eslint-disable-next-line class-methods-use-this
  preventScroll(e) {
    e.preventDefault();
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  }

  handleOutsideClick(event) {
    if (event.target === this.node) {
      this.props.onClose();
    }
  }

  render() {
    const { showModal, imageUrl, onClose } = this.props;
    return (
      <div className={`modal ${showModal ? 'is-active' : ''}`}>
        <div ref={(node) => { this.node = node; }} className="modal-background" />
        <div className="modal-content" style={styles}>
          <img className="image" src={imageUrl || '/assets/images/default-profile-photo.png'} alt="" />
        </div>
        <button className="modal-close is-large" onClick={onClose} aria-label="close" />
      </div>
    );
  }
}

export default ImageViewer;

