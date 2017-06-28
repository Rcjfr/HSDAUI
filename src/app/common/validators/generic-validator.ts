import { FormGroup } from '@angular/forms';

export const Expressions = {
    Alphanumerics: "[a-zA-Z0-9]+",
    Alphabets: "[a-zA-Z]+",
    Numerics: "[0-9]+",
    Decimals: "[0-9]+(\.[0-9]+)?"
    //TODO - we need to come up with a managable solution for decimal points in ng2+
};

// Generic validator for Reactive forms
// Implemented as a class, not a service, so it can retain state for multiple forms.
export class GenericValidator {
private _formSubmitted = false;
    // Provide the set of valid validation messages
    // Stucture:
    // controlName1: {
    //     validationRuleName1: 'Validation Message.',
    //     validationRuleName2: 'Validation Message.'
    // },
    // controlName2: {
    //     validationRuleName1: 'Validation Message.',
    //     validationRuleName2: 'Validation Message.'
    // }
    constructor(private validationMessages: { [key: string]: { [key: string]: string } }) {

    }

    get formSubmitted(): boolean {
        return this._formSubmitted;
    }
    set formSubmitted(submitted: boolean) {
        this._formSubmitted = submitted;
    }

    // Processes each control within a FormGroup
    // And returns a set of validation messages to display
    // Structure
    // controlName1: 'Validation Message.',
    // controlName2: 'Validation Message.'
  processMessages(container: FormGroup, _validationMessages: any = null): { [key: string]: any } {

        const messages = {};
        if (!_validationMessages) {_validationMessages = this.validationMessages;}
        for (const controlKey in container.controls) {
            if (container.controls.hasOwnProperty(controlKey)) {
                const c = container.controls[controlKey];
                messages[controlKey] = {};
                // If it is a FormGroup, process its child controls as well.
                if (c instanceof FormGroup) {
                    messages[controlKey] = this.processMessages(c, _validationMessages[controlKey]);
                }
                // Only validate if there are validation messages for the control
                if (_validationMessages[controlKey]) {
                    if (c instanceof FormGroup) {
                      messages[controlKey]['message'] = '';
                    } else {
                      messages[controlKey] = '';
                  }
                    if ((this._formSubmitted || (c instanceof FormGroup) || (c.dirty || c.touched)) && c.errors) {
                        Object.keys(c.errors).map(messageKey => {
                          if (_validationMessages[controlKey][messageKey]) {
                            if (c instanceof FormGroup) {
                            messages[controlKey]['message'] += _validationMessages[controlKey][messageKey] + ' ';
                          } else {
                            messages[controlKey] += _validationMessages[controlKey][messageKey] + ' ';
                          }
                            }
                        });
                    }
                }
            }
        }
        return messages;
  }
}
