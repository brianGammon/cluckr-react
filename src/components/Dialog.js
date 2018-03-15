import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dialog.css';

class Dialog extends Component {
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
      this.props.onNo();
    }
  }

  handleOutsideClick(event) {
    if (event.target === this.node) {
      this.props.onNo();
    }
  }

  render() {
    const {
      showModal,
      danger,
      onNo,
      onYes,
      children,
    } = this.props;
    return (
      <div className={`modal ${showModal ? 'is-active' : ''}`}>
        <div ref={(node) => { this.node = node; }} className="modal-background" />
        <div className="modal-content">
          <div className="notification is-clearfix">
            {children}
            <div className="controls is-pulled-right">
              <button className={`button ${danger ? 'is-danger is-outlined' : ''}`} onClick={onYes}>
                Yes
              </button>
              <button className="button is-primary" onClick={onNo}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  showModal: PropTypes.bool.isRequired,
  danger: PropTypes.bool,
  onNo: PropTypes.func.isRequired,
  onYes: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Dialog.defaultProps = {
  danger: false,
};

export default Dialog;
