import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export function ImageGallery({ imagesArray }) {
  return (
    <ul className={css.gallery}>
      {imagesArray.map(img => (
        <ImageGalleryItem key={img.id} image={img} />
      ))}
    </ul>
  );
}
