import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
export async function requestImages(keyword, page) {
  const response = await axios.get(
    `${BASE_URL}?key=39980960-8181afd9891da861448a3d5ca&q=${keyword}&per_page=12&page=${page}`
  );
  return response.data;
}
