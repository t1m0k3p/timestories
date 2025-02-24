document.addEventListener("DOMContentLoaded", () => {
    const markerImages = document.querySelectorAll("#marker-images img");
    let selectedMarker = "";
    const notesData = [];
    
    document.getElementById("marker-images").addEventListener("click", (event) => {
        if (event.target.tagName === "IMG") {
            markerImages.forEach(marker => marker.classList.remove("selected"));
            event.target.classList.add("selected");
            selectedMarker = event.target.getAttribute("data-marker");
        }
    });
    
    function updateTitleImage() {
        const titleType = document.getElementById("title-type").value;
        const markerDiv = document.getElementById("marker-images");
        markerDiv.innerHTML = "";
        for (let i = 1; i <= 24; i++) {
            const img = document.createElement("img");
            img.src = `images/marker${i}.png`;
            img.alt = `Marker ${i}`;
            img.setAttribute("data-marker", `marker${i}`);
            img.addEventListener("click", () => {
                markerImages.forEach(marker => marker.classList.remove("selected"));
                img.classList.add("selected");
                selectedMarker = img.getAttribute("data-marker");
            });
            markerDiv.appendChild(img);
        }
    }
    
    function saveNotes() {
        const scenarioName = document.getElementById("scenario-name").value;
        const titleType = document.getElementById("title-type").value;
        const title = document.getElementById("title").value.trim();
        const statusNotes = document.getElementById("status-notes").value;
        if (!scenarioName || !title || !statusNotes) {
            alert("Bitte fülle alle Felder aus, bevor du speicherst!");
            return;
        }
        const note = {
            scenario: scenarioName,
            titleType: titleType,
            title: title,
            image: selectedMarker ? `images/${selectedMarker}.png` : "",
            notes: statusNotes
        };
        notesData.push(note);
        displayNotes();
    }
    
    function displayNotes() {
        const savedNotes = document.getElementById("saved-notes");
        savedNotes.innerHTML = "";
        notesData.forEach((note, index) => {
            const noteDiv = document.createElement("div");
            noteDiv.classList.add("saved-note");
            const markerImg = document.createElement("img");
            markerImg.src = note.image;
            markerImg.alt = note.titleType;
            const noteContent = document.createElement("div");
            noteContent.innerHTML = `<strong>${note.titleType}:</strong> ${note.title}<br><strong>Notizen:</strong> ${note.notes}`;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Löschen";
            deleteButton.onclick = () => {
                notesData.splice(index, 1);
                displayNotes();
            };
            noteDiv.appendChild(markerImg);
            noteDiv.appendChild(noteContent);
            noteDiv.appendChild(deleteButton);
            savedNotes.appendChild(noteDiv);
        });
    }
    
    window.saveNotes = saveNotes;
    window.updateTitleImage = updateTitleImage;
});
