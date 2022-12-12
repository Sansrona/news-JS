export interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    urlToImage: string;
}

export interface ArticlesData {
    status: string;
    totalResults: number;
    articles: Article[];
}
