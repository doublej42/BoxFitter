var parentList = [];

function addBox(event) {
    console.log("Adding new box");
    if (parentList.length == 0) {
        parentList.push(document.getElementById("pageContainer"));
    }
    parentList.forEach((item) => {

        const newBox = document.createElement("div");
        newBox.classList.add("box");
        newBox.classList.add("parent");
        newBox.dataset.width = document.getElementById("width").value;
        newBox.dataset.height = document.getElementById("height").value;
        newBox.dataset.name = document.getElementById("name").value;
        newBox.style.top = 0;
        newBox.style.left = 0;
        var parentWidth, parentHeight;
        if ("width" in item.dataset) {
            parentWidth = item.dataset.width;
            parentHeight = item.dataset.height;
            //newBox.dataset.scale = Math.max(1, Math.min(parentWidth / newBox.dataset.width, parentHeight / newBox.dataset.height));
            newBox.dataset.scale = item.dataset.scale;
        }
        else {
            //first item added is your worksurface
            parentWidth = item.clientWidth;
            parentHeight = item.clientHeight;
            newBox.dataset.scale = Math.min(parentWidth / newBox.dataset.width, parentHeight / newBox.dataset.height);
        }

        item.appendChild(newBox);
        setSize(newBox);
    });
}

function setSize(target) {
    target.dataset.scale = Math.floor(target.dataset.scale * 100) / 100;
    target.innerHTML = "name: " + target.dataset.name + "<br/>Scale:" + target.dataset.scale;
    if (target.parentElement.classList.contains("box")) {
        target.innerHTML += "<br/>Relative Scale: " + target.parentElement.dataset.scale / target.dataset.scale
    }
    target.style.width = (target.dataset.width * target.dataset.scale) + "px";
    target.style.height = (target.dataset.height * target.dataset.scale) + "px";
}

function handleClick(event) {
    event.preventDefault();
    console.log("click", event.button);
    console.log("selectParent");
    if (event.target.classList.contains("parent")) {
        if (!event.shiftKey) {
            parentList = [];
        }
        if (parentList.includes(event.target)) {
            //if you click on a selected item remove it.
            parentList = parentList.filter(item => item != event.target)
        }
        else {
            parentList.push(event.target);
        }
        console.log("parentList", parentList);
        updateSelectedList();
    }
}

function handleContextMenu(event) {
    if (event.target.classList.contains("box")) {
        event.preventDefault();
        console.log("Rotate");
        var oldHeight = event.target.dataset.height;
        event.target.dataset.height = event.target.dataset.width;
        event.target.dataset.width = oldHeight;
        setSize(event.target)

    }
}

function handleWheel(event) {
    if (event.target.classList.contains("box")) {
        event.preventDefault();
        event.target.dataset.scale -= (event.deltaY / 10000);
        setSize(event.target);
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

function dragBoxParent(event) {
    if (event.target.classList.contains("box")) {
        let rect = event.target.getBoundingClientRect();
        console.log("Start Drag", rect.left, rect.top, event.clientX, event.clientY, event.target.style.left, event.target.style.top);
        var shiftLeft = parseInt(event.target.style.left.replace("px", ""));
        var shiftTop = parseInt(event.target.style.top.replace("px", ""));
        var shiftX = event.clientX;
        var shiftY = event.clientY;
        var moveTarget = event.target;
        //mouse might move outside of box in a case where mouse is faster than redraw
        document.addEventListener('mousemove', moveBox);
        document.addEventListener('mouseup', cleanupMouse);
        // event.target.addEventListener('mouseout', event => {
        //     //issues because of dragging ot fast
        //     console.log("Emergency Stop Drag")
        //     event.target.removeEventListener('mousemove', moveBox);
        // });
    }

    function cleanupMouse(event) {
        console.log("Stop Drag")
        document.removeEventListener('mousemove', moveBox);
        document.removeEventListener('mouseup', cleanupMouse);
    }

    function moveBox(event) {
        //console.log(event.pageX, event.pageY);
        //console.log('before', event.target.style.left, event.target.style.top)
        //let left = event.target.style.left.replace('px', '')
        //let right = event.target.style.top.replace('px', '')
        console.log("move", event.clientX, shiftX, shiftLeft, event.clientX - shiftX + shiftLeft);
        moveTarget.style.left = event.clientX - shiftX + shiftLeft + 'px';
        moveTarget.style.top = event.clientY - shiftY + shiftTop + 'px';
        //console.log('after', event.target.style.left, event.target.style.top)

    }


}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("AddBox").addEventListener('click', addBox);
    let pageContainer = document.getElementById("pageContainer");

    pageContainer.addEventListener('click', handleClick);
    pageContainer.addEventListener('contextmenu', handleContextMenu);
    pageContainer.addEventListener('mousedown', dragBoxParent);
    pageContainer.addEventListener('wheel', handleWheel);
});