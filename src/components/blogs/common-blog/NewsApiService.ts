const ALL_NEWS_URL = 'https://news-backend-ashy.vercel.app/api/all_news';

export const fetchAllNews = async () => {
   try {
      const response = await fetch(ALL_NEWS_URL);
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched all news data:', data);
      return data;
   } catch (error) {
      console.error('Error fetching all news:', error);
      return null;
   }
};
