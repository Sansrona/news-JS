import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.up.railway.app/', {
            apiKey: 'cd0e2ba87c484057979167f80585870e', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
