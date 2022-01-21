import axios from "axios";

const KEY = "24382871-0dfafbe4154b35f3845ecea69";
const BASE_URL = "https://pixabay.com/api/";

const fetchArticlesWithQuery = async searchQuery => {
    console.log(searchQuery);
  const response = axios.get(`${BASE_URL}?q=${searchQuery}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
  return response.data.hits;
}

export default fetchArticlesWithQuery;