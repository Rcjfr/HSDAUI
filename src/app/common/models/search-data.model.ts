import { Record } from 'immutable';

// tslint:disable-next-line
type SearchDataProps = {
    // id: number;
    // name: string;
    // criteria: any;
    searches: any[];
};

const defaultProps = {
    // id: undefined,
    // name: undefined,
    // criteria: undefined
    searches: []
};

export class SearchData extends Record(defaultProps) {
    // id: number;
    // name: string;
    // criteria: any;
    searches: any;

    constructor(
        props: SearchDataProps = defaultProps
    ) {
        super(props);
    }
};
