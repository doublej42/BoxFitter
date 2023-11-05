var parentList = [];

function addBox(event) {
    console.log("Adding new box");
    if (parentList.length == 0)
    {
        parentList.push(document.getElementById("pageContainer"));
    }
    parentList.forEach((item) => {
        
        const newBox = document.createElement("div");
        newBox.id = "t1";
        newBox.classList.add("box");
        newBox.classList.add("parent");
        newBox.dataset.width = document.getElementById("width").value;
        newBox.dataset.height = document.getElementById("height").value;
        newBox.dataset.name = document.getElementById("name").value;
        var parentWidth, parentHeight;
        if ("width" in item.dataset)
        {
            //todo    
        }
        else
        {   
            parentWidth = item.clientWidth;
            parentHeight = item.clientHeight;
        }
        newBox.dataset.scale = Math.min(parentWidth/newBox.dataset.width,parentHeight/newBox.dataset.height);
        
        newBox.innerHTML = newBox.dataset.scale;
        item.appendChild(newBox);
        newBox.style.width = (newBox.dataset.width * newBox.dataset.scale) + "px";
        newBox.style.height = (newBox.dataset.height * newBox.dataset.scale) + "px";
    });
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