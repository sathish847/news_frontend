import { StaticImageData } from "next/image";

import spotlightThumb_1 from "@/assets/img/news/politics/politics header_imresizer.jpg";
import spotlightThumb_2 from "@/assets/img/news/sports/header_imresizer.jpg";
import spotlightThumb_3 from "@/assets/img/news/cinema/header_imresizer.jpg";
import spotlightThumb_4 from "@/assets/img/news/education/header_imresizer.jpg";
import spotlightThumb_5 from "@/assets/img/news/astrology/header_imresizer.jpg";

import popularThumb_1 from "@/assets/img/blog/g_popular_post01.jpg";
import popularThumb_2 from "@/assets/img/blog/g_popular_post02.jpg";
import popularThumb_3 from "@/assets/img/blog/g_popular_post03.jpg";
import popularThumb_4 from "@/assets/img/blog/g_popular_post04.jpg";
import popularThumb_5 from "@/assets/img/blog/g_popular_post05.jpg";

import recentThumb_1 from "@/assets/img/blog/rc_post01.jpg";
import recentThumb_2 from "@/assets/img/blog/rc_post02.jpg";
import recentThumb_3 from "@/assets/img/blog/rc_post03.jpg";
import recentThumb_4 from "@/assets/img/blog/rc_post04.jpg";
import recentThumb_5 from "@/assets/img/blog/rc_post05.jpg";

import videoThumb_1 from "@/assets/img/blog/video_post01.jpg";
import videoThumb_2 from "@/assets/img/blog/video_post02.jpg";
import videoThumb_3 from "@/assets/img/blog/video_post03.jpg";
import videoThumb_4 from "@/assets/img/blog/video_post04.jpg";

import weeklyThumb_1 from "@/assets/img/news/politics/left1_imresizer.jpg";
import weeklyThumb_2 from "@/assets/img/news/politics/left2_imresizer.jpg";
import weeklyThumb_3 from "@/assets/img/news/politics/left3_imresizer.jpg";
import weeklyThumb_4 from "@/assets/img/news/politics/left4_imresizer.jpg";

interface DataType {
   id: number;
   page: string;
   category?: string;
   slug?: string;
   thumb: StaticImageData;
   tag: string;
   title: string;
   excerpt?: string;
   date: string;
   time?: string;
   class_name?: string;
   paragraphs?: string[];
   images?: StaticImageData[];
   videoUrl?: string;
}[];

// Fetch spotlight data from API
const getSpotlightData = async (): Promise<DataType[]> => {
  try {
    const response = await fetch('https://news-backend-ashy.vercel.app/api/news/public');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Transform API data to match DataType interface
    const transformedData: DataType[] = data.data.map((item: any, index: number) => ({
      id: item._id || index + 1,
      page: item.page || "home_2",
      category: item.category || "General",
      slug: item.slug || `news-${item._id || index + 1}`,
      thumb: item.thumb?.data ? { src: `data:${item.thumb.mimetype};base64,${Buffer.from(item.thumb.data).toString('base64')}`, width: 400, height: 250, blurDataURL: `data:${item.thumb.mimetype};base64,${Buffer.from(item.thumb.data).toString('base64')}` } : spotlightThumb_1,
      tag: item.tag || item.category || "News",
      title: item.title || "News Title",
      excerpt: item.excerpt || item.description || "",
      date: item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "Recent"),
      time: item.time || (item.createdAt ? new Date(item.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "12:00pm"),
      paragraphs: item.paragraphs || [],
      images: item.images?.map((img: any) => ({ src: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`, width: 400, height: 250, blurDataURL: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}` })) || [],
      videoUrl: item.videoUrl || ""
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching spotlight data:', error);
    // Return empty array if API fails
    return [];
  }
};

export { getSpotlightData };

// Fetch weekly data from API
export const getWeeklyData = async (): Promise<DataType[]> => {
  try {
    const response = await fetch('https://news-backend-ashy.vercel.app/api/subnews/public');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Transform API data to match DataType interface
    const transformedData: DataType[] = data.data.map((item: any, index: number) => ({
      id: item._id || index + 1,
      page: item.page || "home_2",
      category: item.category || "General",
      slug: item.slug || `news-${item._id || index + 1}`,
      thumb: item.thumb?.data ? { src: `data:${item.thumb.mimetype};base64,${Buffer.from(item.thumb.data).toString('base64')}`, width: 400, height: 250, blurDataURL: `data:${item.thumb.mimetype};base64,${Buffer.from(item.thumb.data).toString('base64')}` } : spotlightThumb_1,
      tag: item.tag || item.category || "News",
      title: item.title || "News Title",
      excerpt: item.excerpt || item.description || "",
      date: item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "Recent"),
      time: item.time || (item.createdAt ? new Date(item.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "12:00pm"),
      paragraphs: item.paragraphs || [],
      images: item.images?.map((img: any) => ({ src: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`, width: 400, height: 250, blurDataURL: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}` })) || [],
      videoUrl: item.videoUrl || ""
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching weekly data:', error);
    // Return empty array if API fails
    return [];
  }
};

// Fetch weekly sidebar data from API
export const getWeeklySidebarData = async (): Promise<DataType[]> => {
  try {
    const response = await fetch('https://news-backend-ashy.vercel.app/api/mini_news/public');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Transform API data to match DataType interface
    const transformedData: DataType[] = data.data.map((item: any, index: number) => ({
      id: item._id || index + 1,
      page: item.page || "home_2",
      category: item.category || "General",
      slug: item.slug || `news-${item._id || index + 1}`,
      thumb: item.thumb?.data ? { src: `data:${item.thumb.mimetype};base64,${Buffer.from(item.thumb.data).toString('base64')}`, width: 400, height: 250, blurDataURL: `data:${item.thumb.mimetype};base64,${Buffer.from(item.thumb.data).toString('base64')}` } : spotlightThumb_1,
      tag: item.tag || item.category || "News",
      title: item.title || "News Title",
      excerpt: item.excerpt || item.description || "",
      date: item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "Recent"),
      time: item.time || (item.createdAt ? new Date(item.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "12:00pm"),
      paragraphs: item.paragraphs || [],
      images: item.images?.map((img: any) => ({ src: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`, width: 400, height: 250, blurDataURL: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}` })) || [],
      videoUrl: item.videoUrl || ""
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching weekly sidebar data:', error);
    // Return empty array if API fails
    return [];
  }
};

const weeklyData: DataType[] = await getWeeklyData();

export { weeklyData };

// Dummy data for weekly sidebar - category specific news
const weeklySidebarData: DataType[] = [
  {
    id: 1,
    page: "home_2",
    category: "அரசியல்",
    slug: "stalin-inaugurates-new-highway-project",
    thumb: weeklyThumb_1,
    tag: "அரசியல்",
    title: "முதலமைச்சர் ஸ்டாலின் புதிய நெடுஞ்சாலை திட்டத்தைத் தொடங்கினார்",
    excerpt: "அக்டோபர் 31 அன்று மதுரையில் 100 கி.மீ. நெடுஞ்சாலை திட்டம் தொடங்கப்பட்டது; அதிமுக விமர்சனம்.",
    date: "31 october, 2025",
    time: "09:00am",
    images: [spotlightThumb_1, spotlightThumb_2],
    videoUrl: "abc123VideoID",
    paragraphs: [
      "அக்டோபர் 31 அன்று மதுரையில் முதலமைச்சர் மு.க. ஸ்டாலின் 100 கி.மீ. நெடுஞ்சாலை திட்டத்தைத் தொடங்கினார்.",
      "இது தமிழ்நாட்டின் போக்குவரத்து வசதிகளை மேம்படுத்தும், 5 ஆண்டுகளுக்குள் முடிவடையும்.",
      "திமுக தொண்டர்கள் கொண்டாட்டம், அதிமுக இதை 'தேர்தல் டிராமா' என விமர்சித்தது.",
      "இந்த திட்டம் 2026 தேர்தலுக்கு முன் மக்களின் ஆதரவைப் பெறும் என எதிர்பார்ப்பு.",
      "மத்திய அரசிடம் நிதி உதவி கோரப்பட்டுள்ளது, விரைவான செயல்பாடு உத்தரவு."
    ]
  },
  {
    id: 2,
    page: "home_2",
    category: "அரசியல்",
    slug: "bjps-tamil-nadu-strategy-reveal",
    thumb: weeklyThumb_2,
    tag: "அரசியல்",
    title: "பாஜகவின் தமிழ்நாடு உத்தி வெளிப்படுத்தல்: புதிய தலைவர்கள்",
    excerpt: "பாஜக தமிழ்நாடு அலுவலகத்தில் புதிய உத்தி அறிவிப்பு; விஜய் கூட்டணி மறுப்பு.",
    date: "31 october, 2025",
    time: "10:30am",
    images: [spotlightThumb_1, spotlightThumb_2],
    videoUrl: "def456VideoID",
    paragraphs: [
      "பாஜக தமிழ்நாடு அலுவலகத்தில் அக்டோபர் 31 அன்று புதிய உத்தி வெளியிடப்பட்டது.",
      "விஜயின் கட்சியுடன் கூட்டணி இல்லை என தெளிவுபடுத்தப்பட்டது, சுயமரியாதை கட்சிகளுடன் பேச்சு.",
      "புதிய மாநில தலைவர்கள் அறிவிக்கப்பட்டனர், 2026 தேர்தலுக்கு தயாராகும்.",
      "இது அரசியல் வட்டங்களில் புதிய பரபரப்பை ஏற்படுத்தியுள்ளது.",
      "திமுகவினர் இதை 'வீண் முயற்சி' என குறிப்பிட்டனர்."
    ]
  },
  {
    id: 3,
    page: "home_2",
    category: "அரசியல்",
    slug: "admk-internal-meeting-outcomes",
    thumb: weeklyThumb_3,
    tag: "அரசியல்",
    title: "அதிமுக உள் கூட்டம்: பழனிச்சாமி தலைமை உறுதி",
    excerpt: "அதிமுக உள் கூட்டத்தில் எபிஎஸ் தலைமை உறுதி; விஜய் மீது குற்றச்சாட்டு.",
    date: "31 october, 2025",
    time: "12:00pm",
    images: [spotlightThumb_1, spotlightThumb_2],
    videoUrl: "ghi789VideoID",
    paragraphs: [
      "சென்னையில் அதிமுக உள் கூட்டம் அக்டோபர் 31 அன்று நடைபெற்றது.",
      "எடப்பாடி கே. பழனிச்சாமி தலைமை உறுதிப்படுத்தப்பட்டது, கட்சி ஒற்றுமை.",
      "விஜயின் கட்சியை 'நடிகர் அரசியல்' என விமர்சித்தனர்.",
      "2026 தேர்தலுக்கு புதிய உத்திகள் விவாதம், தொண்டர்கள் ஆதரவு.",
      "இது கட்சியின் உள் சச்சரவை முடிவுக்கு கொண்டுவரும் என நம்பிக்கை."
    ]
  },
  {
    id: 4,
    page: "home_2",
    category: "அரசியல்",
    slug: "tamil-nadu-opposition-unity-talks",
    thumb: weeklyThumb_4,
    tag: "அரசியல்",
    title: "தமிழ்நாடு எதிர்க்கட்சிகள் ஒற்றுமை பேச்சு: சீமான்-எபிஎஸ் சந்திப்பு",
    excerpt: "நாம் தமிழர் மற்றும் அதிமுக இடையே ஒற்றுமை பேச்சு; ஸ்டாலின் ஆட்சி மீது விமர்சனம்.",
    date: "31 october, 2025",
    time: "02:00pm",
    images: [spotlightThumb_1, spotlightThumb_2],
    videoUrl: "jkl012VideoID",
    paragraphs: [
      "அக்டோபர் 31 அன்று சீமான் மற்றும் எபிஎஸ் இடையே ஒற்றுமை பேச்சு நடைபெற்றது.",
      "ஸ்டாலின் ஆட்சியின் தோல்விகளை விமர்சித்து ஒருங்கிணைந்து செயல்படலாம் என விவாதம்.",
      "இது 2026 தேர்தலில் பெரிய மாற்றத்தை ஏற்படுத்தும்.",
      "திமுகவினர் இதை 'கூட்டணி தோல்வி' என கூறினர்.",
      "அடுத்த கூட்டம் விரைவில் நடைபெறும் என அறிவிப்பு."
    ]
  },
  {
    id: 5,
    page: "home_2",
    category: "விளையாட்டு",
    slug: "india-pakistan-t20-clash",
    thumb: spotlightThumb_1,
    tag: "விளையாட்டு",
    title: "டி20 உலகக் கோப்பை: இந்தியா-பாகிஸ்தான் மோதல்",
    excerpt: "அக்டோபர் 31 அன்று இந்தியா 180 ரன்கள், பாகிஸ்தான் 175 ரன்கள்; இந்தியா வெற்றி.",
    date: "31 october, 2025",
    time: "11:00am",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "mno345VideoID",
    paragraphs: [
      "டி20 உலகக் கோப்பை அரையிறுதியில் இந்தியா பாகிஸ்தானை 5 ரன்கள் வித்தியாசத்தில் வீழ்த்தியது.",
      "ரோகித் சர்மா அரைசதம் அடித்து 80 ரன்கள், பும்ரா 3 விக்கெட்கள்.",
      "பாகிஸ்தான் அணி இலக்கை தொட முடியவில்லை, ரசிகர்கள் உற்சாகம்.",
      "இந்தியா இறுதிப்போட்டிக்கு தகுதி, அடுத்த எதிரணி ஆஸ்திரேலியா.",
      "இந்த மோதல் விளையாட்டு வரலாற்றில் மறக்க முடியாதது."
    ]
  },
  {
    id: 6,
    page: "home_2",
    category: "விளையாட்டு",
    slug: "england-australia-ashes-test",
    thumb: spotlightThumb_2,
    tag: "விளையாட்டு",
    title: "ஆசஷஸ் டெஸ்ட்: இங்கிலாந்து ஆஸ்திரேலியாவை வீழ்த்தியது",
    excerpt: "முதல் டெஸ்ட் போட்டியில் இங்கிலாந்து 10 விக்கெட் வித்தியாசத்தில் வெற்றி.",
    date: "31 october, 2025",
    time: "01:30pm",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "pqr678VideoID",
    paragraphs: [
      "ஆசஷஸ் தொடரின் முதல் டெஸ்ட்டில் இங்கிலாந்து ஆஸ்திரேலியாவை வீழ்த்தியது.",
      "ஜோ ரூட் 150 ரன்கள், ஸ்டார்க் 4 விக்கெட்கள் இருந்தும் தோல்வி.",
      "இங்கிலாந்து ரசிகர்கள் தெரிச்செங்கோட்டை போல் கொண்டாட்டம்.",
      "அடுத்த போட்டி நவம்பர் 5 அன்று, தொடர் தீவிரம்.",
      "இது ஆஸ்திரேலியாவின் 20 ஆண்டுகளுக்குப் பிறகு முதல் தோல்வி."
    ]
  },
  {
    id: 7,
    page: "home_2",
    category: "விளையாட்டு",
    slug: "tennis-atp-finals-preview",
    thumb: spotlightThumb_3,
    tag: "விளையாட்டு",
    title: "ATP ஃபைனல்ஸ்: நட்சத்திர வீரர்கள் மோதல்",
    excerpt: "அக்டோபர் 31 அன்று டிரா: நடால் vs டஜோகோவிச் சாத்தியம்.",
    date: "31 october, 2025",
    time: "03:00pm",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "stu901VideoID",
    paragraphs: [
      "ATP ஃபைனல்ஸ் டிரா அக்டோபர் 31 அன்று வெளியிடப்பட்டது.",
      "ரஃபேல் நடால் மற்றும் நோவாக் டஜோகோவிச் மோதல் சாத்தியம்.",
      "கார்ல் அல்கராஸ் தலைமையிலான இளம் வீரர்கள் சவால்.",
      "போட்டி நவம்பர் 10 முதல் தொடங்கும், உலக ரசிகர்கள் கவனம்.",
      "இது டென்னிஸ் ஆண்டின் உச்சம் என நிபுணர்கள்."
    ]
  },
  {
    id: 8,
    page: "home_2",
    category: "விளையாட்டு",
    slug: "olympics-2028-bid-updates",
    thumb: spotlightThumb_4,
    tag: "விளையாட்டு",
    title: "2028 ஒலிம்பிக்ஸ்: இந்தியாவின் விண்ணப்பம் முன்னேற்றம்",
    excerpt: "இந்தியாவின் 2036 ஒலிம்பிக்ஸ் விண்ணப்பம் வலுவடைந்தது; அமெரிக்கா போட்டி.",
    date: "31 october, 2025",
    time: "04:30pm",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "vwx234VideoID",
    paragraphs: [
      "IOC அக்டோபர் 31 அன்று 2036 ஒலிம்பிக்ஸ் விண்ணப்பங்கள் மதிப்பீடு.",
      "இந்தியாவின் விண்ணப்பம் வலுவடைந்தது, அஹமதாபாத் விருப்பம்.",
      "அமெரிக்கா மற்றும் துருக்கி போட்டி கொடுக்கும்.",
      "இது இந்திய விளையாட்டுக்கு புதிய அத்தியாயம்.",
      "அரசு நிதி ஒதுக்கீடு அதிகரிப்பு அறிவிப்பு."
    ]
  },
  {
    id: 9,
    page: "home_2",
    category: "சினிமா",
    slug: "suriya-next-film-teaser-release",
    thumb: spotlightThumb_1,
    tag: "சினிமா",
    title: "சூர்யா அடுத்த படம் டீசர் வெளியீடு: ரசிகர்கள் உற்சாகம்",
    excerpt: "அக்டோபர் 31 அன்று 'வேலன்' டீசர் வெளியானது; இயக்கம் சுஜித்.",
    date: "31 october, 2025",
    time: "08:00am",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "yza567VideoID",
    paragraphs: [
      "நடிகர் சூர்யாவின் 'வேலன்' படத்தின் டீசர் அக்டோபர் 31 அன்று வெளியானது.",
      "இயக்குனர் சுஜித் இயக்கத்தில் உருவாகும் இந்த படம் ஆக்ஷன் த்ரில்லர்.",
      "ரசிகர்கள் சமூக வலைதளத்தில் புகழ்ந்து தள்ளினர், 10 மில்லியன் வியூஸ்.",
      "படம் 2026 இல் வெளியாகும், புதிய கதாநாயகி அறிவிப்பு.",
      "சூர்யா 'இது எனது சவால்' என கூறினார்."
    ]
  },
  {
    id: 10,
    page: "home_2",
    category: "சினிமா",
    slug: "vijay-sethupathi-multi-starrer-announce",
    thumb: spotlightThumb_2,
    tag: "சினிமா",
    title: "விஜய் சேதுபதி மல்டி ஸ்டாரர் படம் அறிவிப்பு",
    excerpt: "கமல், விஜய் சேதுபதி இணைந்த படம்; இயக்கம் ரவி குமார்.",
    date: "31 october, 2025",
    time: "10:00am",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "bcd890VideoID",
    paragraphs: [
      "விஜய் சேதுபதி மற்றும் கமல்ஹாசன் இணைந்த மல்டி ஸ்டாரர் அறிவிப்பு.",
      "இயக்குனர் ரவி குமார் இயக்கத்தில் உருவாகும் இந்த படம் சமூக கதை.",
      "ரசிகர்கள் இணைந்து கொண்டாட்டம், போஸ்டர் வெளியீடு.",
      "படம் 2027 இல் திரையிடல், பெரிய பட்ஜெட்.",
      "விஜய் சேதுபதி 'கமலுடன் நடிப்பது கனவு' என உற்சாகம்."
    ]
  },
  {
    id: 11,
    page: "home_2",
    category: "சினிமா",
    slug: "nayanthara-biopic-plans",
    thumb: spotlightThumb_3,
    tag: "சினிமா",
    title: "நயன்தாரா சுயசரிதை படம் திட்டங்கள்",
    excerpt: "நயன்தாராவின் வாழ்க்கை கதை படமாக உருவாகும்; இயக்கம் சுராஜ்.",
    date: "31 october, 2025",
    time: "12:30pm",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "efg123VideoID",
    paragraphs: [
      "நயன்தாராவின் சுயசரிதை படம் அக்டோபர் 31 அன்று அறிவிக்கப்பட்டது.",
      "இயக்குனர் சுராஜ் இயக்கத்தில் உருவாகும் இந்த படம் உண்மை சம்பவங்கள்.",
      "நயன்தாரா தானே நடிக்கிறார், ரசிகர்கள் ஆவல்.",
      "படம் 2026 இல் வெளியாகும், ஹாலிவுட் ஸ்டைல்.",
      "இது தமிழ் சினிமாவின் புதிய முயற்சி."
    ]
  },
  {
    id: 12,
    page: "home_2",
    category: "சினிமா",
    slug: "kollywood-box-office-hits-oct-2025",
    thumb: spotlightThumb_4,
    tag: "சினிமா",
    title: "கொல்லிவுட் பாக்ஸ் ஆஃபீஸ் வெற்றிகள்: அக்டோபர் 2025",
    excerpt: "அக்டோபர் மாதத்தில் 5 படங்கள் 100 கோடி சாதனை; டாப் 10 பட்டியல்.",
    date: "31 october, 2025",
    time: "02:30pm",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "hij456VideoID",
    paragraphs: [
      "அக்டோபர் 2025 இல் கொல்லிவுட் படங்கள் பாக்ஸ் ஆஃபீஸ் சாதனை.",
      "5 படங்கள் 100 கோடி வசூல், விஜய் படம் டாப்.",
      "ரசிகர்கள் தியேட்டர்களை நிரப்பினர், புதிய ரெகார்டு.",
      "நவம்பர் ரிலீஸ்கள் எதிர்பார்ப்பு, டாப் 10 பட்டியல்.",
      "சினிமா துறை வளர்ச்சி தொடரும்."
    ]
  },
  {
    id: 13,
    page: "home_2",
    category: "கல்வி",
    slug: "tn-board-exam-dates-announced",
    thumb: spotlightThumb_1,
    tag: "கல்வி",
    title: "தமிழ்நாடு பல்கலைக்கழக பொது தேர்வு தேதிகள் அறிவிப்பு",
    excerpt: "நவம்பர் 15 முதல் 10ம் வகுப்பு தேர்வு; ஆன்லைன் மதிப்பெண் பதிவு.",
    date: "31 october, 2025",
    time: "07:30am",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "klm789VideoID",
    paragraphs: [
      "தமிழ்நாடு பள்ளி கல்வித்துறை அக்டோபர் 31 அன்று தேர்வு தேதிகளை அறிவித்தது.",
      "10ம் வகுப்பு தேர்வு நவம்பர் 15 முதல், 12ம் வகுப்பு டிசம்பர்.",
      "ஆன்லைன் மதிப்பெண் பதிவு தொடங்கியது, மாணவர்கள் தயாராக.",
      "இது கல்வி ஆண்டை சீரமைக்கும்.",
      "ஆசிரியர்கள் பயிற்சி பெறும் திட்டம்."
    ]
  },
  {
    id: 14,
    page: "home_2",
    category: "கல்வி",
    slug: "scholarship-portal-launch",
    thumb: spotlightThumb_2,
    tag: "கல்வி",
    title: "அரசு ஸ்காலர்ஷிப் போர்ட்டல் தொடக்கம்",
    excerpt: "ஏழை மாணவர்களுக்கான 5000 ஸ்காலர்ஷிப்; ஆன்லைன் விண்ணப்பம்.",
    date: "31 october, 2025",
    time: "09:00am",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "nop012VideoID",
    paragraphs: [
      "அரசு அக்டோபர் 31 அன்று ஸ்காலர்ஷிப் போர்ட்டலைத் தொடங்கியது.",
      "5000 ஏழை மாணவர்களுக்கு நிதி உதவி, ஆன்லைன் விண்ணப்பம்.",
      "இது உயர்கல்வி வாய்ப்பை அதிகரிக்கும்.",
      "பெற்றோர்கள் விரைவாக விண்ணப்பிக்கலாம்.",
      "வெற்றிகரமான திட்டமாக மாறும் என எதிர்பார்ப்பு."
    ]
  },
  {
    id: 15,
    page: "home_2",
    category: "கல்வி",
    slug: "teacher-recruitment-drive-2025",
    thumb: spotlightThumb_3,
    tag: "கல்வி",
    title: "ஆசிரியர் தேர்வு ஓட்டம் 2025: 3000 பணியிடங்கள்",
    excerpt: "TRB ஆசிரியர் தேர்வுக்கு 3000 பணியிடங்கள்; விண்ணப்பம் டிசம்பர் வரை.",
    date: "31 october, 2025",
    time: "11:00am",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "qrs345VideoID",
    paragraphs: [
      "TRB அக்டோபர் 31 அன்று 3000 ஆசிரியர் பணியிடங்களை அறிவித்தது.",
      "விண்ணப்பம் டிசம்பர் வரை, தேர்வு ஜனவரி.",
      "இது கல்வி துறைக்கு புதிய சக்தி.",
      "நேரடி விண்ணப்பம் தவிர்க்கவும், ஆன்லைன் மட்டும்.",
      "மாணவர்கள் மற்றும் ஆசிரியர்கள் மகிழ்ச்சி."
    ]
  },
  {
    id: 16,
    page: "home_2",
    category: "கல்வி",
    slug: "digital-learning-initiative-tn",
    thumb: spotlightThumb_4,
    tag: "கல்வி",
    title: "தமிழ்நாட்டில் டிஜிட்டல் கல்வி திட்டம் விரிவாக்கம்",
    excerpt: "1000 பள்ளிகளுக்கு டேப்லெட்கள் விநியோகம்; ஆன்லைன் வகுப்புகள்.",
    date: "31 october, 2025",
    time: "01:00pm",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "tuv678VideoID",
    paragraphs: [
      "அரசு டிஜிட்டல் கல்வி திட்டத்தை விரிவாக்கி அக்டோபர் 31 அன்று அறிவித்தது.",
      "1000 அரசுப் பள்ளிகளுக்கு டேப்லெட்கள், இலவச இன்டர்நெட்.",
      "ஆன்லைன் வகுப்புகள் தொடங்கும், மாணவர்கள் பயனடைவர்.",
      "இது கிராமப்புற கல்வியை மேம்படுத்தும்.",
      "அடுத்த ஆண்டு 5000 பள்ளிகள் உள்ளடக்கம்."
    ]
  },
  {
    id: 17,
    page: "home_2",
    category: "ஆன்மிகம்",
    slug: "thiruvannamalai-girivalam-festival",
    thumb: spotlightThumb_1,
    tag: "ஆன்மீகம்",
    title: "திருவண்ணாமலை கிரிவலம் திருவிழா தொடக்கம்",
    excerpt: "அக்டோபர் 31 அன்று கிரிவலம் தொடங்கியது; லட்சக்கணக்கான பக்தர்கள்.",
    date: "31 october, 2025",
    time: "05:00am",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "wxy901VideoID",
    paragraphs: [
      "திருவண்ணாமலை அண்ணாமலை திருக்கோயிலில் கிரிவலம் திருவிழா தொடங்கியது.",
      "அக்டோபர் 31 அன்று லட்சக்கணக்கான பக்தர்கள் கலந்துகொண்டனர்.",
      "இது ஆன்மீக சக்தியை அளிக்கும், ஐஸ்வர்யம்.",
      "அரசு பாதுகாப்பு ஏற்பாடுகள், இலவச உணவு.",
      "நவம்பர் 1 வரை தொடரும், பக்தி உச்சம்."
    ]
  },
  {
    id: 18,
    page: "home_2",
    category: "ஆன்மிகம்",
    slug: "daily-astrology-november-1-preview",
    thumb: spotlightThumb_2,
    tag: "ஆன்மீகம்",
    title: "நாளை ராசி பலன்: நவம்பர் 1, 2025",
    excerpt: "சிம்ம ராசி நன்மை; கும்பம் சவால்கள், ஜோதிட அறிவுரைகள்.",
    date: "31 october, 2025",
    time: "06:30am",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "zab234VideoID",
    paragraphs: [
      "நவம்பர் 1 ராசி பலன் சிம்ம ராசிக்கு நன்மைகள் அதிகம்.",
      "கும்பம் ராசிக்கு சிறு சவால்கள், பொறுமை காட்டவும்.",
      "எல்லா ராசிகளுக்கும் தினசரி அறிவுரைகள்.",
      "ஜோதிடர்கள் புதிய யோகங்கள் குறிப்பு.",
      "ஆன்மீக வாழ்க்கைக்கு பயனுள்ளது."
    ]
  },
  {
    id: 19,
    page: "home_2",
    category: "ஆன்மிகம்",
    slug: "sri-lanka-temple-renovation",
    thumb: spotlightThumb_3,
    tag: "ஆன்மீகம்",
    title: "ஸ்ரீலங்கா இந்து கோயில் புதுப்பிப்பு: தமிழ் பக்தர்கள் உதவி",
    excerpt: "அக்டோபர் 31 அன்று புதுப்பிப்பு தொடக்கம்; இந்தியா நிதி உதவி.",
    date: "31 october, 2025",
    time: "08:00am",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "cde567VideoID",
    paragraphs: [
      "ஸ்ரீலங்காவில் இந்து கோயில் புதுப்பிப்பு அக்டோபர் 31 அன்று தொடங்கியது.",
      "தமிழ் பக்தர்களின் உதவியுடன், இந்தியா நிதி வழங்கியது.",
      "இது சகோதரத்துவத்தை வலுப்படுத்தும்.",
      "புதிய சிலை நிறுவல், தரிசனம் தொடக்கம்.",
      "ஆன்மீக ஒற்றுமை அதிகரிப்பு."
    ]
  },
  {
    id: 20,
    page: "home_2",
    category: "ஆன்மிகம்",
    slug: "yoga-day-global-events",
    thumb: spotlightThumb_4,
    tag: "ஆன்மீகம்",
    title: "உலக யோகா தினம்: புதிய நிகழ்ச்சிகள் அறிவிப்பு",
    excerpt: "2026 யோகா தினத்திற்கான திட்டங்கள்; 100 நகரங்களில் நிகழ்ச்சி.",
    date: "31 october, 2025",
    time: "09:30am",
    images: [spotlightThumb_3, spotlightThumb_4],
    videoUrl: "fgh890VideoID",
    paragraphs: [
      "உலக யோகா தினத்திற்கான 2026 திட்டங்கள் அறிவிக்கப்பட்டன.",
      "100 நகரங்களில் இலவச யோகா வகுப்புகள், ஆன்மீக நிகழ்ச்சிகள்.",
      "பிரதமர் மோடி உத்வேக பேச்சு.",
      "இது உடல் மற்றும் மன ஆரோக்கியத்தை மேம்படுத்தும்.",
      "பங்கேற்க அழைப்பு, உலக அளவில் பரவல்."
    ]
  }
];

export { weeklySidebarData };

// Category spotlight titles - dynamically generated from API
const getCategoryTitles = async (): Promise<Record<string, string>> => {
   try {
      const response = await fetch('https://news-backend-ashy.vercel.app/api/categories/public');
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const categories = data.data;

      const titles: Record<string, string> = {};
      categories.forEach((cat: any) => {
         titles[cat.name] = `${cat.name} செய்திகள்`;
      });

      return titles;
   } catch (error) {
      console.error('Error fetching category titles:', error);
      // Fallback to static data
      return {
         'அரசியல்': 'அரசியல் செய்திகள்',
         'விளையாட்டு': 'விளையாட்டு செய்திகள்',
         'சினிமா': 'சினிமா செய்திகள்',
         'கல்வி': 'கல்வி செய்திகள்',
         'ஆன்மிகம்': 'ஆன்மிகம் செய்திகள்',
      };
   }
};

export const categoryTitles = await getCategoryTitles();
