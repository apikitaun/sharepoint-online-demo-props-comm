import { ISPList } from './ISPList';

export class MockHttpClient  {

    private static _items: ISPList[] = [{ Title: 'Mock List', Id: '1' },
                                        { Title: 'Mock List 2', Id: '2' },
                                        { Title: 'Mock List 3', Id: '3' },
                                        { Title: 'Mock List 4', Id: '4' },
                                        { Title: 'Mock List 5', Id: '5' },
                                        { Title: 'Mock List 6', Id: '6' },
                                        { Title: 'Mock List 7', Id: '7' },
                                        { Title: 'Mock List 8', Id: '8' },
                                        { Title: 'Mock List 9', Id: '9' }];

    public static get(): Promise<ISPList[]> {
    return new Promise<ISPList[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
}