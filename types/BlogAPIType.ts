export type DetailContent = {
  title: any;
  description: any;
  keyword: any;
  image: any;
  url: any;
  category: string[];
  content: string;
  date: string;
  id: string;
  categoryPath: string[];
};
export type CategoryProps = {
  data: {
    title: string;
    date: string;
    id: string;
    image: string;
    categoryPath?: string[];
    category?: string[];
  }[];
  category: string[];
  categoryPath: string[];
};
export type POST = {
  title: string;
  image: string;
  category: string[];
  date: string;
  id: string;
  categoryPath: string[];
};
export type RelatedPosts = {
  slicedItems: {
    title: string;
    date: string;
  }[];
  data: {
    title: string;
    date: string;
    id: string;
    image: string;
  }[];
  category: string[];
  categoryPath: string[];
};
export type CONTENT = {
  title: any;
  description: any;
  keyword: any;
  image: any;
  url: any;
  category: string[];
  content: string;
  date: string[];
  categoryPath: string[];
};
