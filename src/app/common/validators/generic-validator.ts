import { FormGroup } from '@angular/forms';

export const Expressions = {
    Alphanumerics: "[a-zA-Z0-9]+",
    Alphabets: "[a-zA-Z]+",
    Numerics: "[0-9]+",
    ThreeDecimalsPoints: ("([0-9]{3}\.[0-9]{3}$)|([0-9]{3}\.[0-9]{2}$)|([0-9]{3}\.[0-9]{1}$)|([0-9]{2}\.[0-9]{3}$)|([0-9]{2}\.[0-9]{2}$)|([0-9]{2}\.[0-9]{1}$)|([0-9]{1}\.[0-9]{3}$)|([0-9]{1}\.[0-9]{2}$)|([0-9]{1}\.[0-9]{1}$)|([0-9]{3})|([0-9]{2})|([0-9]{1})"),
    //(([0 - 9]{3}\.[0 - 9]{3}$) | ([0 - 9]{2}\.[0- 9]{2}$)|([0 - 9]{1 } \.[0 - 9]{1 } $)|([0 - 9]{2 } \.[0 - 9]{1 } $)|([0 - 9]{2 } \.[0 - 9]{3 } $))
    FourDecimalsPoints: new RegExp( "([0-9]{3}\.[0-9]{4}$)|([0-9]{3}\.[0-9]{3}$)|([0-9]{3}\.[0-9]{2}$)|([0-9]{3}\.[0-9]{1}$)|([0-9]{2}\.[0-9]{4}$)|([0-9]{2}\.[0-9]{3}$)|([0-9]{2}\.[0-9]{2}$)|([0-9]{2}\.[0-9]{1}$)|([0-9]{1}\.[0-9]{4}$)|([0-9]{1}\.[0-9]{3}$)|([0-9]{1}\.[0-9]{2}$)|([0-9]{1}\.[0-9]{1}$)|([0-9]+)")



};

// Generic validator for Reactive forms
// Implemented as a class, not a service, so it can retain state for multiple forms.
export class GenericValidator {

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
    private _formSubmitted: boolean = false;
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
    processMessages(container: FormGroup, path: string= ''): { [key: string]: string } {
        let messages = {};
        for (let controlKey in container.controls) {
            if (container.controls.hasOwnProperty(controlKey)) {
                let c = container.controls[controlKey];
                // If it is a FormGroup, process its child controls as well.
                if (c instanceof FormGroup) {
                    let childMessages = this.processMessages(c, `${path}${controlKey}.`);
                    Object.assign(messages, childMessages);
                }
                // Only validate if there are validation messages for the control
                if (this.validationMessages[`${path}${controlKey}`]) {
                    messages[`${path}${controlKey}`] = '';
                    if ((this._formSubmitted || (c instanceof FormGroup) || (c.dirty || c.touched)) && c.errors) {
                        Object.keys(c.errors).map(messageKey => {
                          if (this.validationMessages[`${path}${controlKey}`][messageKey]) {
                            messages[`${path}${controlKey}`] += this.validationMessages[`${path}${controlKey}`][messageKey] + ' ';
                            }
                        });
                    }
                }
            }
        }
        return messages;
  }
  processMessages2(container: FormGroup, _validationMessages: any = null): { [key: string]: any } {
        let messages = {};
        if(!_validationMessages) {_validationMessages = this.validationMessages;}
        for (const controlKey in container.controls) {
            if (container.controls.hasOwnProperty(controlKey)) {
                let c = container.controls[controlKey];
                messages[controlKey] = {};
                // If it is a FormGroup, process its child controls as well.
                if (c instanceof FormGroup) {
                    messages[controlKey] = this.processMessages2(c, _validationMessages[controlKey]);
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
  private nestedObjectAssignmentFor (obj, propString, value) {
    const propNames = propString.split('.'),
        propLength = propNames.length - 1;
     let   tmpObj = obj;

    for (let i = 0; i <= propLength ; i++) {
        tmpObj = tmpObj[propNames[i]] = i !== propLength ?  {} : value;
    }
    return obj;
}
}
