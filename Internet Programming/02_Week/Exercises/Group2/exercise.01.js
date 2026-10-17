// Exercise 1 — Select and Modify Elements
// Every step is triggered by a button; results go to the devtools console.

const heading = document.querySelector("h1");
const list = document.getElementById("list");
const image = document.querySelector("img");
const link = document.getElementById("link");
const output = document.getElementById("output");

// Remember each item's original text, so the count can be appended to it in 1.5.4
for (const item of list.children) {
    item.dataset.label = item.textContent;
}

// 1.2 — Five ways to select

document.getElementById("select-button").addEventListener("click", () => {
    console.log('getElementById("list")', document.getElementById("list"));
    console.log('getElementsByClassName("item")', document.getElementsByClassName("item"));
    console.log('getElementsByTagName("li")', document.getElementsByTagName("li"));
    console.log('querySelector(".item")', document.querySelector(".item"));
    console.log('querySelectorAll(".item")', document.querySelectorAll(".item"));
    console.log('querySelector(".does-not-exist")', document.querySelector(".does-not-exist"));
});

document.getElementById("map-button").addEventListener("click", () => {
    const items = document.querySelectorAll(".item");
    console.log("Is it an array?", Array.isArray(items));

    try {
        const texts = items.map((item) => item.textContent);
        console.log("map() on the NodeList:", texts);
    } catch (error) {
        console.error("map() on the NodeList failed:", error.message);
    }

    const asArray = Array.from(items);
    console.log("Is it an array now?", Array.isArray(asArray));
    console.log("map() on the array:", asArray.map((item) => item.textContent));
    console.log("map() on a spread copy:", [...items].map((item) => item.textContent));
});

// 1.3 — Live versus static

document.getElementById("live-button").addEventListener("click", () => {
    const live = document.getElementsByClassName("item");
    const snapshot = document.querySelectorAll(".item");
    console.log(`Before: live = ${live.length}, snapshot = ${snapshot.length}`);

    const newItem = document.createElement("li");
    newItem.className = "item";
    newItem.dataset.count = "0";
    newItem.dataset.label = `Item ${list.children.length + 1}`;
    newItem.textContent = newItem.dataset.label;
    list.appendChild(newItem);

    console.log(`After:  live = ${live.length}, snapshot = ${snapshot.length}`);
});

// 1.4 — textContent versus innerHTML

document.getElementById("bold-text-button").addEventListener("click", () => {
    output.textContent = "<strong>bold?</strong>";
});

document.getElementById("bold-html-button").addEventListener("click", () => {
    output.innerHTML = "<strong>bold?</strong>";
});

document.getElementById("img-html-button").addEventListener("click", () => {
    output.innerHTML = `<img src="x" onerror="alert('This could have been your session cookie')">`;
});

document.getElementById("img-text-button").addEventListener("click", () => {
    output.textContent = `<img src="x" onerror="alert('This could have been your session cookie')">`;
});

document.getElementById("script-html-button").addEventListener("click", () => {
    output.innerHTML = "<script>alert(1)</script>";
    console.log("#output now contains:", output.innerHTML);
});

document.getElementById("clear-output-button").addEventListener("click", () => {
    output.textContent = "";
});

// 1.5 — Attributes and data

document.getElementById("image-button").addEventListener("click", () => {
    image.src = "gallery-images/04-night.svg";
    image.alt = "Night landscape";
});

document.getElementById("link-button").addEventListener("click", () => {
    link.href = "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a";
    link.target = "_blank";
    link.textContent = "MDN: The anchor element (opens in a new tab)";
});

document.getElementById("href-button").addEventListener("click", () => {
    link.setAttribute("href", "page.html");
    console.log("link.href:", link.href);
    console.log('link.getAttribute("href"):', link.getAttribute("href"));
});

// One listener on the list handles every item, including ones appended in 1.3
list.addEventListener("click", (event) => {
    const item = event.target.closest(".item");
    if (!item) {
        return;
    }
    const count = Number(item.dataset.count) + 1;
    item.dataset.count = count;
    item.textContent = `${item.dataset.label} (${count})`;
});

// 1.6 — Styling two ways

document.getElementById("inline-style-button").addEventListener("click", () => {
    heading.classList.remove("highlight");
    heading.style.backgroundColor = "lightblue";
});

document.getElementById("class-style-button").addEventListener("click", () => {
    heading.style.backgroundColor = "";
    heading.classList.add("highlight");
});

// Adds the rule from step 4 at runtime, so the shared style.css stays clean
document.getElementById("gray-rule-button").addEventListener("click", () => {
    if (document.getElementById("gray-rule")) {
        return;
    }
    const style = document.createElement("style");
    style.id = "gray-rule";
    style.textContent = "h1 { background: gray; }";
    document.head.appendChild(style);
});

document.getElementById("reset-heading-button").addEventListener("click", () => {
    heading.style.backgroundColor = "";
    heading.classList.remove("highlight");
    document.getElementById("gray-rule")?.remove();
});

// 1.7 — The whitespace trap

document.getElementById("whitespace-button").addEventListener("click", () => {
    console.log("list.childNodes.length:", list.childNodes.length);
    console.log("list.children.length:", list.children.length);
    console.log("list.childNodes:", list.childNodes);
    console.log("list.children:", list.children);
});
