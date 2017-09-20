import { Record } from 'immutable';
import { ISavedSearch } from 'app/common/models/saved-search.model';

type SearchDataProps = {
    searches: ISavedSearch[];
};

const defaultProps = {
    searches: []
};

export class SearchData extends Record(defaultProps) {
    searches: ISavedSearch[];

    constructor(props: SearchDataProps = defaultProps) {
        super(props);
    }
};
