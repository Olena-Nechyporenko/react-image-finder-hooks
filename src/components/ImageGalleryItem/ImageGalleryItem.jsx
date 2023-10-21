import { useState } from 'react';
import Modal from 'react-modal';
import css from './ImageGalleryItem.module.css';

Modal.setAppElement('#root');

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { webformatURL, tags, largeImageURL } = image;
  return (
    <li className={css.galleryItem}>
      <img
        onClick={openModal}
        className={css.galleryImage}
        src={webformatURL}
        alt={tags}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
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
};
