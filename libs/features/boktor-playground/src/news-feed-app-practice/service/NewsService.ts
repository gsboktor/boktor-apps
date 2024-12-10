export type HttpClientResponse<T> =
  | {
      status: number;
      error: Error;
      data: null;
    }
  | {
      status: number;
      error: null;
      data: null;
    }
  | {
      status: number;
      error: null;
      data: T;
    };

export type NewsResponse = {
  status: number;
  error?: string;

  articles: NewsArticle[];
};

export type NewsArticle = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  urlToImage: string;
  source: {
    name?: string;
  };
};

export class HttpService {
  constructor(private baseUrl: string, private apiKey: string) {}

  post<T, K>(req: T): HttpClientResponse<K> {
    return {} as HttpClientResponse<K>;
  }

  async get<T, K>(req: T): Promise<HttpClientResponse<K>> {
    try {
      const res = await fetch(this.baseUrl + req + `&apiKey=${this.apiKey}`, {
        method: 'GET',
      });

      const data = await res.json();

      if (data?.status === 'ok') {
        return {
          status: 200,
          error: null,
          data: data,
        };
      } else {
        return {
          status: data.status,
          error: new Error(),
          data: null,
        };
      }
    } catch (e) {
      throw e;
    }
  }
}

const httpService = new HttpService('https://newsapi.org/v2/everything', '3ca4901284a04436aa0d74f94a4a739d');

export class NewsService {
  constructor(private httpService: HttpService) {}

  async getNews(queryString: string): Promise<NewsArticle[]> {
    console.log('Im here');
    let data = await this.httpService.get<string, NewsResponse>(queryString);

    console.log(data);
    return data.data?.articles ?? [];
  }
}

export const newsService = new NewsService(httpService);
