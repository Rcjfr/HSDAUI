import { Pipe,PipeTransform } from '@angular/core';
 
@Pipe({ name: 'round' })
export class MathFunctions implements PipeTransform {
    transform(value: number): number {

        return Math.round(value);
    }
}


 

