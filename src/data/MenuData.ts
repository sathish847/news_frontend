interface MenuItem {
   id: number;
   title: string;
   link: string;
   has_dropdown: boolean;
   sub_menus?: {
      link: string;
      title: string;
      mega_dropdown: boolean;
      mega_menus?: {
         link: string;
         title: string;
      }[];
   }[];
}

const getMenuData = async (): Promise<MenuItem[]> => {
   try {
      const response = await fetch('https://news-backend-ashy.vercel.app/api/categories/public');
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const categories = data.data.sort((a: any, b: any) => a.sortOrder - b.sortOrder);

      const menu: MenuItem[] = [
         {
            id: 1,
            has_dropdown: false,
            title: "முகப்பு",
            link: "/",
         },
         ...categories.map((cat: any, index: number) => ({
            id: index + 2,
            has_dropdown: false,
            title: cat.name,
            link: `/category-news?category=${cat.name.toLowerCase().replace(/ /g, '-')}`,
         }))
      ];

      return menu;
   } catch (error) {
      console.error('Error fetching menu data:', error);
      // Fallback to static data
      return [
         {
            id: 1,
            has_dropdown: false,
            title: "முகப்பு",
            link: "/",
         },
         {
            id: 2,
            has_dropdown: false,
            title: "Electronics",
            link: "/category-news?category=electronics",
         },
         {
            id: 3,
            has_dropdown: false,
            title: "அரசியல்",
            link: "/category-news?category=arasiyl",
         },
      ];
   }
};

export default getMenuData;
