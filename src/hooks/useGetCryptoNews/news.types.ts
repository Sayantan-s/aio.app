export interface INewsResponse {
    value: Result[];
}

export interface Result {
    datePublished: string;
    description: string;
    name: string;
    url: string;
    image: {
        thumbnail: {
            contentUrl: string;
        };
    };
}
