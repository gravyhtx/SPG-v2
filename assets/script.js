/////////////////////
// PWGEN VARIABLES //
/////////////////////

const lc = "qwertyuiopasdfghjklzxcvbnm"; // Character Selections //
      uc = "QWERTYUIOPASDFGHJKLZXCVBNM";
      nm = "1234567890";
      sm = "~`!@#$%^&*()_-+={[}]|\:;<>?/";

const options = ["Lowercase", "Uppercase", "Numbers", "Symbols"]
      charArr = [lc, uc, nm, sm];

let l, u, n, s = false; // Sets character option choices to false
let checks = [l, u, n, s]; // Sets up an array to check each character option

let pw = "";

copyArea = document.getElementById("copy")


/////////////////////
// PWGEN FUNCTIONS //
/////////////////////

// PASSWORD GENERATION QUERY & CHECKS //
pwQuery = () => { // *click*
    let len = window.prompt("Password length:"); // Get password length

    if (len === null) { // Exits query if user chooses "Cancel"
        return;
    } else if (isNaN(len) || len < 4 || len > 128) { // Return to beginning of query
        alert("Please enter a number between 4-128")
        pwQuery();
    } else { // Ask questions & concatenate options
        for (let i=0; i < options.length; i++) {queryConcat(options, pw, charArr, checks, i);}
        pwGen(len, pw);
    }
}

queryConcat = (options, pw, array, checks, i) => {
    if (window.confirm(options[i])) {pw += pw.concat(array[i]);checks[i]=true}; // console.log(checks[i])
}

// RANDOMIZATION FUNCTIONS //
randomize = (n) => { // Math.random() Shortcut :)
    return Math.floor(Math.random() * n);
}

shuffle = (str) => { // Randomizes character order of a string
    let arr = str.split('');
    let n = arr.length;
    // String to Array > Output randomized Array > Array back to String
    for (let i=0 ; i < n-1 ; ++i) {
        let r = randomize(n); let output = arr[i];arr[i] = arr[r]; arr[r] = output;
    }
    str = arr.join('');
    return str;
}

// GENERATION FUNCTIONS //
pwGen = (pwlength, password) => { // Generates 'Password String' to be shuffled
    const choices = pwChArr(); // Returns one of each character from options as a string
    const choicesLength = choices.length; // Checks how many options are available

    password += choices; // ** ADDS ONE OF EACH CHARACTER FROM OPTIONS TO ENSURE FINAL PASSWORD WILL HAVE AT LEAST ONE OF EACH SET ** // console.log(password)

    const randomLength = pwlength - choicesLength; // Subtract first set of characters generated from character length

    for (let i=0; i < randomLength; i++) { // Randomize rest of character length available to generate the rest of the 'Password String'
        char = password.charAt(randomize(password.length));
        const letter = pwChArr().charAt(randomize(choices.length));
        password += letter; // console.log(password) // Logs password as it generates each character for the rest of the string
    }

    renderPw(password); // Shuffle 'Password String' and render to screen
    
    for(let i=0; i < checks.length; i++) {checks[i]=false;} // Reset checks
    l, u, n, s = false;
}

pwChArr = () => { // Returns string with one character from each set of options selected
    let choices = ""

    for (let i=0; i < checks.length; i++) {
        checks[i] ? choices += charArr[i].charAt(randomize(charArr[i].length)) : null;
    }

    return choices
}

renderPw = (password) => { // Render shuffled password to screen
    let pwfinal = shuffle(password);
    document.getElementById("copy").disabled = false;
    document.getElementById("copy-btn").disabled = false;
    document.getElementById("copy-btn").classList.remove("disabled");
    document.getElementById("copy-btn-txt").classList.add("copy-ready");
    document.getElementById("pw").value = pwfinal;
}

// COPY STRING INSIDE OF ELEMENT //
copyTextSelection = (text, btn) => { // Copy password from selected input value by id
    let copyText = document.getElementById(text);
    let copyBtn = document.getElementById(btn);
    copyText.style.userSelect = "text"
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    // alert('PASSWORD COPIED!!!\r\n\r\n"' + copyText.value + '"'); // Displaays copied text in readavle forfat with regex
    console.log(copyText.value); // Displaays copied text in readavle forfat with regex
    alert('PASSWORD COPIED!!!');
    copyBtn.textContent = "COPIED!";
    copyText.classList.add("no-pointer-events");
    copyText.classList.add("no-select");
}


/////////////////////
// EVENT LISTENERS //
/////////////////////

document.getElementById("copy").addEventListener('click', function(e) {
    e.preventDefault;
    copyTextSelection('pw','copy');
})


/////////////////////////////////////////////////////
// ----------------------------------------------- //
//       ~~~ USEFUL TOOLS N SHIZZ, BROH! ~~~       //
//                STEAL THIS CODE :)               //
// ----------------------------------------------- //
/////////////////////////////////////////////////////


// LAZYLOAD IMAGES //
const lazyLoad = document.querySelectorAll('img[data-src]');
loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
    image.setAttribute('style', 'display:block;');
    // image.removeAttribute('data-src');       // Doesn't seem to do what I expected it to do :/
    };
};

lazyLoad.forEach((img) => {
    loadImages(img);
});

if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
        if(item.isIntersecting) {
            loadImages(item.target);
            observer.unobserve(item.target);
        }
        });
    });
    lazyLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    lazyLoad.forEach((img) => {
    loadImages(img);
    });
}

// CLEAR TEXT SELECTION //
clearSelection = () => { // Currently not being used
    if (window.getSelection) {window.getSelection().removeAllRanges();}
    else if (document.selection) {document.selection.empty();}
}
