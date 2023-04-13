const storage = localStorage;

const modal = document.getElementById("modal");
const modalButton = document.getElementById("modalButton");
const body = document.getElementsByTagName("body");

const clossButton = document.getElementById("clossButton");
clossButton.style.fontSize = "30px";
clossButton.style.fontWeight = "bolder";
clossButton.style.cursor = "pointer";

// Grap the form for creating rooms
const roomForm = document.getElementById("roomForm");

// grap the value from each input field in the form above

const roomButton = document.getElementById("roomButton");

function openModal () {
    modal.style.position = "absolute";
    modal.style.top = "50px";
    modal.style.left = "450px";
    document.body.style.backgroundColor = "gray";

    modal.classList.remove("invisible");
    modal.classList.add("visible");
    modal.style.backgroundColor = "white";
    modal.style.borderRadius = "7px";
}

modalButton.addEventListener("click", () => {
    openModal();
})

// function that closes the popup modal
function clossModal () {
    modal.classList.remove("visible");
    modal.classList.add("invisible");
    document.body.style.backgroundColor = "white";
}

// button for clossing pop up modal
clossButton.addEventListener("click", ()=> {
    clossModal();
});

function createRoom () {
    const rooms = storage.getItem("rooms");
    const parse = JSON.parse(rooms);
    const roomObj = { 
        roomName: roomForm.roomName.value,
        bedType: roomForm.bedType.value,
        roomFloor: roomForm.roomFloor.value,
        roomFacility: roomForm.roomFacility.value
    };
    
    if (parse && Array.isArray(parse)) {
        parse.push(roomObj)
        storage.setItem("rooms", JSON.stringify(parse));
    } else {
        let arr = [];
        arr.push(roomObj);
        storage.setItem("rooms", JSON.stringify(arr));
    }

    window.location.href = "./dashboard.html";
}

roomButton.addEventListener("click", () => {
    createRoom();
});


function roomList () {
    // storage.removeItem("rooms")
    const roomList = storage.getItem("rooms");
    const table = document.querySelector("tbody");
    
    const parseRoom = JSON.parse(roomList);
    if (parseRoom && Array.isArray(parseRoom) && parseRoom.length > 0) {
        for (let i = 0; i < parseRoom.length; i++) {
            const row = document.createElement("tr");
            const currentRoom = parseRoom[i];
            console.log(currentRoom, " the current room")
            let rows = "";
            rows += "<tr><td><img src='../../Asset/pic22.dde259dc.jpg' width='200' height='auto'></td><td>" + currentRoom["roomName"] + "</td><td>" + createRoom["bedType"] + "</td><td>" + currentRoom["roomFloor"] + "</td><td>" + currentRoom["roomFacility"] + "</td></tr>"
            for (key in currentRoom) {
                const td = document.createElement("td");
                td.innerText = currentRoom[key]
                row.appendChild(td)
            }
            table.append(row);
        }
    }
}

roomList();

let firstName = 'Sunday'
let surName = 'Ameh'

let myname = document.getElementById('ok')

let initials = firstName.charAt(0) + surName.charAt(0)

myname.innerText = initials