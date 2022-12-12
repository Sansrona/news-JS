import { ArticlesData } from '../types/articles.types';
import { Options, ErrorCodes } from '../types/custom.types';
import { SourcesData } from '../types/sources.types';
type Resp = {
    endpoint: string;
    options?: Options;
};

export type ArticleCallbackType = (data: ArticlesData) => void;
export type SourceCallbackType = (data: SourcesData) => void;
export type CallbackType = ArticleCallbackType | SourceCallbackType;

class Loader {
    private baseLink: string;
    private options: Options;
    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: Resp,
        callback: CallbackType = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === ErrorCodes.Unauthorized || res.status === ErrorCodes.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Options, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: CallbackType, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
