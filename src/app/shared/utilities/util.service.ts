import { Injectable } from "@angular/core";

@Injectable()

export class UtilSerrvice {

    constructor() { }

    keyPressEvt(evt: KeyboardEvent, type: string) {
        const number = /[0-9]/;
        const alphabets = /[a-zA-Z]/;
        const inputChar = evt.key;
        
        console.log(inputChar);

        if (type == "NUMBER") {
            if (!number.test(inputChar)) {
                // invalid character, prevent input
                evt.preventDefault();
            }
        }
        else if (type == "PHONE") {
            if (alphabets.test(inputChar)) {
                // invalid charater, if alphabets
                evt.preventDefault();
            }           
        }
    }
}