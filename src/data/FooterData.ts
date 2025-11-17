import getMenuData from "./MenuData";

interface DataType {
   id: number;
   title: string;
   class_name: string;
   footer_link: {
      link: string;
      title: string;
   }[];
}

const getFooterData = async (): Promise<DataType[]> => {
   const menu_data = await getMenuData();

   const footer_data: DataType[] = [
      {
         id: 1,
         title: "வகைகள்",
         class_name: "col-lg-2 col-md-5",
         footer_link: menu_data.map(item => ({ link: item.link, title: item.title }))
      },
      {
         id: 2,
         title: "உதவி பெற",
         class_name: "col-lg-3 col-md-4",
         footer_link: [
            { link: "/contact", title: "தொடர்பு & FAQ" },


         ]
      },

      {
         id: 4,
         title: "Follow Us",
         class_name: "col-lg-2 col-md-4",
         footer_link: [
            { link: "#", title: "Facebook" },
            { link: "#", title: "Twitter" },
            { link: "#", title: "Instagram" },
            { link: "#", title: "Youtube" },
            { link: "#", title: "Pinterest" },
         ]
      },
   ];

   return footer_data;
};

export default getFooterData;
