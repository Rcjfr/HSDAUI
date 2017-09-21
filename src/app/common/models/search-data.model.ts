import { Record } from 'immutable';
import { ISavedSearch } from 'app/common/models/saved-search.model';

type SearchDataProps = {
    loading: boolean;
    searches: ISavedSearch[];
};

const defaultProps = {
    loading: false,
    searches: []
};

export class SearchData extends Record(defaultProps) {
    loading: boolean;
    searches: ISavedSearch[];

    constructor(props: SearchDataProps = defaultProps) {
        super(props);
    }
};
