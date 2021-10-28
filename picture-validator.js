const VALID_CHARS = [
    '9', 'A', 'B', 'P', 'S', 'V', 'X', 'Z', '/',
    ',', '.', '+', '-', 'CR', 'DB', '(', ')',
    '0', '1', '2', '3', '4', '5', '6', '7', '8'
];

//Validate that all characters of a string are within a list of values
function validateChars(text, list) {
    const arrText = Array.from(text);
    const validation = arrText.map(char => {
        const tempVal = list.map(valid => {
            if (char == valid) {
                return true;
            }
            return false;
        }).reduce((acc, x) => x || acc);
        return tempVal;
    });

    let errors = validation.map((x, index) => {
        if (!x) {
            return arrText[index];
        }
    }).filter(x => x);

    return [validation.reduce((acc, x) => acc && x), errors];
}

function countChars(text, char) {
    const arrText = Array.from(text);
    return arrText.reduce((acc, x) => { if (x == char) { acc++ } return acc }, 0);
}

function validateParenthesis(text) {
    const close = countChars(text, ')');
    const open = countChars(text, '(');
    const total = open + close;
    if (open != close) return false;
    if (open > 2 || close > 2) return false
    if (total != 2 && total != 4 && total != 0) return false;
    return true;
}

function validateImplicitComma(text) {
    return countChars(text, 'V') > 1 ? false : true;
}

function validateAll(text) {
    const validations = [];

    const [validChars, invalidChars] = validateChars(text, VALID_CHARS);
    if (!validChars) {
        validations.push({
            level: 8,
            text: `Contains characters invalid for PIC: ${invalidChars.flat()}`
        });
    };

    const validParenthesis = validateParenthesis(text);
    if (!validParenthesis) {
        validations.push({
            level: 8,
            text: `Incorrect parentheses`
        });
    };

    const validComma = validateImplicitComma(text);
    if (!validComma) {
        validations.push({
            level: 8,
            text: `Invalid comma`
        });
    }

    // const validCoherence = validateIncoherence(text);
    // if(!validCoherence){
    //     validations.push({
    //         level: 8,
    //         text: 'Inconsistent pic'
    //     })
    // }

    return validations;
}

// function validateIncoherence(text){
//     const textArray = Array.from(text);
//     const unique = [...new Set(textArray)];
//     if (unique.includes('9') && unique.includes('X')){
//         return false;
//     }
//     return true;
// }