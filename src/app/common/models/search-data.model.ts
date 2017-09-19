import { Record } from 'immutable';

// tslint:disable-next-line
type SearchDataProps = {
    id: number;
    name: string;
    criteria: any;
};

const defaultProps = {
    id: undefined,
    name: undefined,
    criteria: undefined
};

export class SearchData extends Record(defaultProps) {
    id: number;
    name: string;
    criteria: any;

    constructor(
        props: SearchDataProps = defaultProps
    ) {
        super(props);
    }
};
