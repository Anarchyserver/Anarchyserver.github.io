document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const characterName = params.get("name");

    if (characterName) {
        // Character Page: Load images dynamically
        fetch("characters.json")
            .then(response => response.json())
            .then(data => {
                const character = data.characters.find(c => c.name === characterName);
                if (character) {
                    document.getElementById("character-name").textContent = character.name;
                    const imageGallery = document.getElementById("image-gallery");

                    character.images.forEach(imgSrc => {
                        let img = document.createElement("img");
                        img.src = imgSrc;
                        img.alt = `${character.name} Image`;
                        imageGallery.appendChild(img);
                    });
                }
            })
            .catch(error => console.error("Error loading character images:", error));
    } else {
        // Homepage: Load character thumbnails dynamically
        fetch("characters.json")
            .then(response => response.json())
            .then(data => {
                const gallery = document.getElementById("characterGallery");
                data.characters.forEach(character => {
                    let a = document.createElement("a");
                    a.href = `character.html?name=${character.name}`;

                    let img = document.createElement("img");
                    img.src = character.thumbnail;
                    img.alt = character.name;

                    let p = document.createElement("p");
                    p.textContent = character.name;

                    a.appendChild(img);
                    a.appendChild(p);
                    gallery.appendChild(a);
                });
            })
            .catch(error => console.error("Error loading characters:", error));
    }
});