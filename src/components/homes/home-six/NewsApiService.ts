const API_URL = 'https://news-backend-emfx.onrender.com/api/main_news/public';
const TRENDING_NEWS_URL = 'https://news-backend-emfx.onrender.com/api/trending_news/public';

export const fetchMainNews = async () => {
   try {
      const response = await fetch(API_URL);
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched main news data:', data);
      return data;
   } catch (error) {
      console.error('Error fetching main news:', error);
      return null;
   }
};

export const fetchTrendingNews = async () => {
   try {
      const response = await fetch(TRENDING_NEWS_URL);
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched trending news data:', data);
      return data;
   } catch (error) {
      console.error('Error fetching trending news:', error);
      return null;
   }
};
