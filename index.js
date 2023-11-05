var parentList = [];

function addBox(event) {
    console.log("Adding new box");
    const newBox = document.createElement("div");
    newBox.classList.add("box");
    newBox.classList.add("parent");
}

function selectParent(event) {
    console.log("selectParent");
    if (event.target.classList.contains("parent")) {
        if (!event.shiftKey) {
            parentList = [];
        }
        if (parentList.includes(event.target)) {
            //if you click on a selected item remove it.
            parentList = parentList.filter(item => item != event.target)
        }
        else
        {
            parentList.push(event.target);
        }
        console.log("parentList", parentList);
        updateSelectedList();
    }

}

function updateSelectedList() {
    let ol = document.getElementById("selectedList").getElementsByTagName("ol")[0];
    ol.innerHTML = '';
    parentList.forEach((item) => {
        const newLi = document.createElement("li");
        newLi.innerHTML = item.dataset.name
        console.log(ol, newLi);
        ol.appendChild(newLi);

    });
}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("AddBox").addEventListener('click', addBox);
    let pageContainer = document.getElementById("pageContainer");
    pageContainer.addEventListener('click', selectParent);
});