import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { requestImages } from './api';

export const App = () => {
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (keyword === '') {
      return;
    }
    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        // запит на бекенд
        const response = await requestImages(keyword, page);
        if (response.hits.length === 0) {
          return toast.error(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }
        toast.success(`We  have found images`);
        const pages = Math.ceil(response.totalHits / 12);
        setImages(prevState => [...prevState, ...response.hits]);
        setTotalPages(pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [keyword, page]);

  const handleSubmit = inputValue => {
    setKeyword(inputValue);
    setPage(1);
    setImages([]);
  };
  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {error && <span className="errorMessage">Something went wrong!</span>}
      <ImageGallery imagesArray={images} />
      {loading && <Loader />}
      {images.length > 0 && page !== totalPages && (
        <Button onClick={loadMore} />
      )}
      <Toaster position="top-right" />
    </>
  );
};
