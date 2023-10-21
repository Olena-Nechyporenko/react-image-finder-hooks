import toast, { Toaster } from 'react-hot-toast';
import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { requestImages } from './api';

export class App extends Component {
  state = {
    keyword: '',
    images: [],
    loading: false,
    error: false,
    page: 1,
    totalPages: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.keyword !== this.state.keyword ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true, error: false });
      try {
        // запит на бекенд
        const response = await requestImages(
          this.state.keyword,
          this.state.page
        );
        if (response.hits.length === 0) {
          return toast.error(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }
        toast.success(`We  have found images`);
        const pages = Math.ceil(response.totalHits / 12);
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...response.hits],
            loadMore: true,
            totalPages: pages,
          };
        });
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  handleSubmit = inputValue => {
    this.setState({ keyword: inputValue, page: 1, images: [] });
  };
  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { images, error, loading, page, totalPages } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        {error && <span className="errorMessage">Something went wrong!</span>}
        <ImageGallery imagesArray={images} onClick={this.openModal} />
        {loading && <Loader />}
        {images.length > 0 && page !== totalPages && (
          <Button onClick={this.loadMore} />
        )}
        <Toaster position="top-right" />
      </>
    );
  }
}
