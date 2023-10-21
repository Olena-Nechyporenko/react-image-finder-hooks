import { Component } from 'react';
import Modal from 'react-modal';
import css from './ImageGalleryItem.module.css';

Modal.setAppElement('#root');

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };
  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { webformatURL, tags, largeImageURL } = this.props.image;
    return (
      <li className={css.galleryItem}>
        <img
          onClick={this.openModal}
          className={css.galleryImage}
          src={webformatURL}
          alt={tags}
        />
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className={css.modal}
          overlayClassName={css.overlay}
        >
          <img
            className={css.modalImage}
            src={largeImageURL}
            alt={tags}
            width="800"
            height="500"
          />
        </Modal>
      </li>
    );
  }
}
