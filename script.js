const task = document.getElementById("js-task");
const taskWrapper = document.getElementById("js-task-wrapper");
const text = document.getElementById("js-task-text");
const color = document.getElementById("js-task-color");
let keyCode = "";
function placeCaretAtEnd(el) {
    el.focus();
    if (
        typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined"
    ) {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        const textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

text.addEventListener("focus", () => {
    task.classList.add("active");
    const value = text.textContent;
    text.textContent = value.replace("Write a new task", "");
    text.classList.add("active");
    color.classList.remove("active");
});

text.addEventListener("blur", () => {
    const value = text.textContent;
    if (!value.trim()) {
        text.textContent = "Write a new task";
    }
});

text.addEventListener("input", (e) => {
    const value = text.textContent;
    const strings = value.split("//");

    if (strings.length >= 2) {
        color.textContent = "write note";
        color.focus();
        color.classList.add("active", "input");
        text.classList.remove("active");
    } else {
        color.textContent = "";
    }
    text.textContent = strings[0];

});

color.addEventListener("input", (e) => {
    const value = color.textContent;
    color.textContent = value.replace("write note", "");
    placeCaretAtEnd(color);
    color.classList.add("input");
    taskWrapper.classList.add("hasColor");

    if (!value) {
        placeCaretAtEnd(text);
        color.classList.remove("input");
        taskWrapper.classList.remove("hasColor");
    }
});

color.addEventListener("focus", (e) => {
    task.classList.add("active");
});

document.addEventListener("keydown", (e) => {
    keyCode = e.code;
});

document.addEventListener("click", (e) => {
    const target = e.target;
    const its_task = target === task || task.contains(target);

    if (!its_task) {
        task.classList.remove("active");
    }
});
