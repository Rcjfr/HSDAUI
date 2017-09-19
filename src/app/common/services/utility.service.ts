import { Injectable } from '@angular/core';
import '../rxjs-extensions';

@Injectable()
export class UtilityService {
    constructor() { }

    getYesNoBothOptions() {
        var yesNoBothOptions = [
            { id: '1', description: 'Yes' },
            { id: '0', description: 'No' },
            { id: '2', description: 'Both' }
        ];

        return yesNoBothOptions;

    };


}
