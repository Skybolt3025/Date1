const sections = document.querySelectorAll(".section");
const nos = document.querySelectorAll(".choice.no");
const choice1 = document.querySelector("#choice1");
const no1 = document.querySelector("#no1");
const yes1 = document.querySelector("#yes1");

const inpDate = document.querySelector("#inpDate");
const inpDateAdd = document.querySelector("#dateAdd");
const inpKind = document.querySelector("#inpKind");
const inpKindAdd = document.querySelector("#kindAdd");
const inpAfter = document.querySelector("#inpAfter");
const inpAfterAdd = document.querySelector("#afterAdd");
const inpHate = document.querySelector("#inpHate");
const inpLove = document.querySelector("#inpLove");
const inpAdd = document.querySelector("#inpAdd");
const codeBox = document.querySelector("#codeBox");

const codeDisplay = document.querySelector("#codeDisplay");

let i = 0;
let step = 0;
let yesv1 = false;

function checkButtons()
{
    sections.forEach(oSection => {
        const oDropButton = oSection.querySelector(".topbar button");

        const mI = Number(oSection.dataset.I);

        let cond = true;

        if (oSection.id == "ac1")
        {
            cond = yesv1;
        }
        
        if (step >= mI && cond)
        {
            oDropButton.classList.add("enabled");
        }
        else
        {
            oDropButton.classList.remove("enabled");
        }
    })
}

sections.forEach(section => {
    const mI = i;
    
    const dropButton = section.querySelector(".topbar button");
    const window = section.querySelector(".window");

    section.dataset.I = i;

    let shown = false;

    dropButton.addEventListener("click", () => {
        if (shown || step < mI) return;

        shown = true;
        
        step += 1;
        
        section.classList.add("show");
        window.classList.add("show");
        dropButton.classList.add("clicked");

        checkButtons();
    })

    i += 1;
})

checkButtons();

nos.forEach(no => {
    no.addEventListener("click", () => {
        no.remove();
    })
})

no1.addEventListener("click", () => {
    choice1.classList.add("no")
})

yes1.addEventListener("click", () => {
    yesv1 = true;

    checkButtons();
})

function encode(text) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) + 1);
    }

    return result;
}

function decode(text) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) - 1);
    }

    return result;
}

let code = "";

function generateCode()
{
    code = "";
    
    const date = inpDate.value;
    const dateAdd = inpDateAdd.value;
    const kind = inpKind.value;
    const kindAdd = inpKindAdd.value;
    const after = inpAfter.value;
    const afterAdd = inpAfterAdd.value;
    const hate = inpHate.value;
    const love = inpLove.value;
    const add = inpAdd.value;

    code += "Date: " + date + "\n";
    code += "Addtional Date Info: " + dateAdd + "\n";
    code += "Date kind: " + kind + "\n";
    code += "Additional Date Kind Info: " + kindAdd + "\n";
    code += "After: " + after + "\n";
    code += "Additional After Info: " + afterAdd + "\n";
    code += "Hate: " + hate + "\n";
    code += "Love: " + love + "\n";
    code += "Additional: " + add;

    const encoded = encode(code);

    codeDisplay.textContent = encoded;
}

function copyCode()
{
    navigator.clipboard.writeText(encode(code));
}

function copyDecoded()
{
    const encoded = codeBox.value;

    navigator.clipboard.writeText(decode(encoded));
}