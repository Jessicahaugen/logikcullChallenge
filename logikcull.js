// The Challenge
// For this code challenge, you are being asked to write a function called
// "longestSubstring" in JavaScript that takes an array of words and returns an object.
// Each word consists of lowercase letters ('a' − 'z') and has at least 1 character.The goal
// is to concatenate the words in such a way as to obtain a single word with the longest
// possible substring composed of one particular letter. The function returns an object with
// the letter and the length of the longest substring of that letter.

function permutations(arr) { // function to grab all permutations of the list of words 
    let holdPerm = []; // store "words" in a new array

    for (let i = 0; i < arr.length; i = i + 1) {
      let newPerm = permutations(arr.slice(0, i).concat(arr.slice(i + 1))); // recursive variable that slices the array to form a new one
      if(newPerm.length === 0) { 
        holdPerm.push([arr[i]]) // if newPerm was empty or had'nt been called push arr[i]
      } else {
        for(let j = 0; j < newPerm.length; j = j + 1) {
          holdPerm.push([arr[i]].concat(newPerm[j]).join('')) // loop through and join curr arr[i] with the next word as j to create new perm
        }
      }
    }
    return holdPerm; // 
}

function longestSubstring(arr) { // main function to get longest substring
    let storage = permutations(arr); // grabbing all permutations from above
    let maxResult = null; 

    for (let i = 0; i < storage.length; i++) {// loop through permutations
        let result = { //storage for letter count 
            letter: null,
            length: 0,
        }
        // current count storage on iteration
        let curCount = 0; 
        let curChar = null;
        let currentWord = null;

        let chars = storage[i].split(""); // split the individual word into letters
        for (let j = 0; j < chars.length; j++) {
            if (curChar === chars[j]) { 
                curCount += 1;// incriment count if we are on the same letter
            } else {
                curChar = chars[j]; // set letter
                curCount = 1; //set count
                currentWord = storage[i];
            }

            if (curCount > result.length) {
                result.letter = curChar; // set results 
                result.length = curCount;
                result.word = currentWord;
            }
        }

        if (!maxResult|| maxResult.length < result.length) {
            maxResult = result; // set max result to largest letter count combo 
        }
    }

    return maxResult; // return max substring! 
}

// tests
console.log(longestSubstring(["aabb", "aaaa", "bbab"]))
console.log(longestSubstring(["xxbxx", "xbx", "x"]));
console.log(longestSubstring(["dd", "bb", "cc", "dd"]));