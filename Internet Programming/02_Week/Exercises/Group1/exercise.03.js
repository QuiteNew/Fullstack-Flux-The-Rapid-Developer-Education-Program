// Exercise 3 — Image Gallery

const photos = [
    { file: "01-dawn.svg",   title: "Dawn" },
    { file: "02-noon.svg",   title: "Noon" },
    { file: "03-dusk.svg",   title: "Dusk" },
    { file: "04-night.svg",  title: "Night" },
    { file: "05-autumn.svg", title: "Autumn" },
    { file: "06-winter.svg", title: "Winter" },
    { file: "07-spring.svg", title: "Spring" },
    { file: "08-storm.svg",  title: "Storm" },
];

const grid = document.getElementById("grid");
const filterInput = document.getElementById("filter");
const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlay-image");
const overlayCaption = document.getElementById("overlay-caption");
const overlayCounter = document.getElementById("overlay-counter");

// Index of the photo shown in the overlay
let currentIndex = 0;

// 3.1 — Build the grid from data
photos.forEach((photo, i) => {
    const img = document.createElement("img");
    img.src = `gallery-images/${photo.file}`;
    img.alt = photo.title;
    img.dataset.index = i;
    grid.appendChild(img);
});

// 3.2 — One listener for the whole grid
grid.addEventListener("click", (event) => {
    const img = event.target.closest("img");
    if (!img) {
        return;
    }
    openOverlay(Number(img.dataset.index));
});

// 3.3 — The large view
function showPhoto(index) {
    currentIndex = index;
    const photo = photos[index];
    overlayImage.src = `gallery-images/${photo.file}`;
    overlayImage.alt = photo.title;
    overlayCaption.textContent = photo.title;
    overlayCounter.textContent = `${index + 1} / ${photos.length}`;
    updateActiveThumbnail();
}

function openOverlay(index) {
    showPhoto(index);
    overlay.classList.remove("hidden");
}

function isOverlayOpen() {
    return !overlay.classList.contains("hidden");
}

// 3.4 — Closing it
function closeOverlay() {
    overlay.classList.add("hidden");
}

document.getElementById("close-button").addEventListener("click", closeOverlay);

overlay.addEventListener("click", (event) => {
    // Only a click on the backdrop itself closes; clicks on the image or buttons do not
    if (event.target === overlay) {
        closeOverlay();
    }
});

document.addEventListener("keydown", (event) => {
    if (!isOverlayOpen()) {
        return;
    }
    if (event.key === "Escape") {
        closeOverlay();
    } else if (event.key === "ArrowLeft") {
        step(-1);
    } else if (event.key === "ArrowRight") {
        step(1);
    }
});

// 3.5 — Next and previous, skipping photos hidden by the filter
function visibleIndexes() {
    return [...grid.children]
        .filter((img) => !img.classList.contains("hidden"))
        .map((img) => Number(img.dataset.index));
}

function step(direction) {
    const visible = visibleIndexes();
    if (visible.length === 0) {
        return;
    }
    const position = Math.max(visible.indexOf(currentIndex), 0);
    const next = (position + direction + visible.length) % visible.length;
    showPhoto(visible[next]);
}

document.getElementById("prev-button").addEventListener("click", () => step(-1));
document.getElementById("next-button").addEventListener("click", () => step(1));

// 3.6 — Keep the grid in sync
function updateActiveThumbnail() {
    for (const img of grid.children) {
        img.classList.remove("active");
    }
    grid.querySelector(`[data-index="${currentIndex}"]`).classList.add("active");
}

// Stretch — filter thumbnails by title
filterInput.addEventListener("input", () => {
    const query = filterInput.value.trim().toLowerCase();
    for (const img of grid.children) {
        const title = photos[img.dataset.index].title.toLowerCase();
        img.classList.toggle("hidden", !title.includes(query));
    }
});
