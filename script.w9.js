console.log("JS LOADED");

// Exercise 6.5 — Comments viewer
const list = document.getElementById("commentsList");
const title = document.getElementById("commentsTitle");

async function loadComments(postId) {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/comments?postId=" + postId);

        if (!res.ok) throw new Error("Failed to fetch comments");

        const comments = await res.json();

        list.innerHTML = "";

        comments.forEach(c => {
            const li = document.createElement("li");
            li.textContent = c.name + " - " + c.email;
            list.appendChild(li);
        });

        title.textContent = comments.length + " comments loaded";

    } catch (error) {
        console.log(error);
        list.innerHTML = "<li>Error loading comments</li>";
        title.textContent = "Error";
    }
}

loadComments(1);

// Exercise 7.5 — Interactive photo gallery
const photoList = document.getElementById("photosList");
const photoTitle = document.getElementById("photosTitle");
const photoOutput = document.getElementById("photoOutput");

async function loadPhotos() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/photos?albumId=1");
        const photos = await res.json();

        photoList.innerHTML = "";

        photos.forEach(photo => {
            const li = document.createElement("li");
            li.textContent = photo.title;
            li.dataset.url = photo.thumbnailUrl;
            photoList.appendChild(li);
        });

        photoTitle.textContent = "Album 1 — " + photos.length + " Photos";

    } catch (error) {
        console.log(error);
        photoList.innerHTML = "Error loading photos";
    }
}

photoList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        console.log(e.target.dataset.url);

        const img = document.createElement("img");
        img.src = e.target.dataset.url;

        photoOutput.innerHTML = "";
        photoOutput.appendChild(img);
    }
});

loadPhotos();

// Exercise 8.5 — API inspector
const countryBtn = document.getElementById("loadCountriesBtn");
const countryList = document.getElementById("countriesList");
const countryTitle = document.getElementById("countriesTitle");

async function exploreAPI() {
    console.log("clicked countries");

    try {
        const params = new URLSearchParams({
            fields: "name,capital,population"
        });

        const url = "https://restcountries.com/v3.1/region/europe?" + params;
        console.log("URL:", url);

        const res = await fetch(url);

        console.log("Status:", res.status);
        console.log("Content-Type:", res.headers.get("content-type"));

        if (!res.ok) throw new Error("Request failed");

        const data = await res.json();

        console.log("Total countries:", data.length);

        const filtered = data.filter(c => c.population > 5000000);
        let names = filtered.map(c => c.name.common);

        names.sort();

        countryList.innerHTML = "";

        names.forEach(name => {
            const li = document.createElement("li");
            li.textContent = name;
            countryList.appendChild(li);
        });

        countryTitle.textContent = names.length + " Countries (>5M population)";

    } catch (error) {
        console.log(error);
        countryList.innerHTML = "Error loading countries";
    }
}

countryBtn.addEventListener("click", exploreAPI);