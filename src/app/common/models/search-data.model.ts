import { Record } from 'immutable';
import { ISavedSearch } from 'app/common/models/saved-search.model';

type SearchDataProps = {
    loading: boolean;
    searches: ISavedSearch[];
    currentSearchId: number;
};

const defaultProps = {
    loading: false,
    searches: [],
    currentSearchId: undefined
};

export class SearchData extends Record(defaultProps) {
    loading: boolean;
    searches: ISavedSearch[];
    currentSearchId: number;

    constructor(props: SearchDataProps = defaultProps) {
        super(props);
    }
};
