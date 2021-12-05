export class CommonMethods {
    static keyPressEvt(evt: KeyboardEvent, type: string) {
        if (type == "NUMBER") {
            const pattern = /[0-9]/;
            const inputChar = evt.key
            console.log(inputChar);

            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                evt.preventDefault();
            }
        }
    }
}