export interface INewsResponse {
  count: number;
  next_url: string;
  request_id: string;
  results: Result[];
  status: string;
}

export interface Result {
  amp_url: string;
  article_url: string;
  author: string;
  description: string;
  id: string;
  image_url: string;
  keywords: string[];
  published_utc: Date;
  publisher: Publisher;
  tickers: string[];
  title: string;
}

export interface Publisher {
  favicon_url: string;
  homepage_url: string;
  logo_url: string;
  name: string;
}
