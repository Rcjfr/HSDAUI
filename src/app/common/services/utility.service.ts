import { Injectable } from '@angular/core';
import '../rxjs-extensions';

@Injectable()
export class UtilityService {
    constructor() { }

    getYesNoOptions() {
        var yesNoOptions = [
            { id: '1', description: 'Yes' },
            { id: '0', description: 'No' },
            { id: '2', description: 'Both' }
        ];

        return yesNoOptions;

    };


}
