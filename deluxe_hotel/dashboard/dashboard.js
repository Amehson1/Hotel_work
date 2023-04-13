const storage = localStorage;

const modal = document.getElementById("modal");
const modalButton = document.getElementById("modalButton");
const body = document.getElementsByTagName("body");
const checkInText = document.getElementById("checkIn");
const checkOutText = document.getElementById("checkOut");
const totalRoomText = document.getElementById("totalRoomText")
const availableRoomText = document.getElementById("availableRoomText")

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

function dataCount () {
    const data = storage.getItem("rooms")
    let checkIns = []
    let checkOuts = []
    let availableRoom = []
    const roomData = JSON.parse(data)
    if (roomData.length > 0) {
        for (let room of roomData) {
            if (room.checkIn === true) checkIns.push(room);
            if (room.checkOut === true) checkOuts.push(room);
            if ((room.checkOut === true && room.checkIn === false) || (room.checkOut === false && room.checkIn === false) ) availableRoom.push(room);
        }
    }
    checkInText.innerHTML = checkIns.length
    availableRoomText.innerHTML = availableRoom.length
    totalRoomText.innerHTML = roomData.length
    checkOutText.innerHTML = checkOuts.length
}

dataCount()

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
        roomFacility: roomForm.roomFacility.value,
        checkIn: false,
        checkOut: false,
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
            const td = document.createElement("td");
            const currentRoom = parseRoom[i];
            // console.log(currentRoom, " the current room")
            let rows = "";

            let btn = document.createElement("button");
            btn.style.backgroundColor = "red";
            btn.style.color = "white";
            btn.style.height = "30px";
            btn.style.width = "70px";
            btn.style.fontSize = "9px";
            btn.style.borderRadius = "5px";
            btn.innerHTML = "Check in";

            let checkOutbtn = document.createElement("button");
            checkOutbtn.style.backgroundColor = "green";
            checkOutbtn.style.color = "white";
            checkOutbtn.style.fontSize = "9px";
            checkOutbtn.style.height = "30px";
            checkOutbtn.style.width = "70px";
            checkOutbtn.style.borderRadius = "5px";
            checkOutbtn.innerHTML = "Check out";
        
            rows += "<tr><td><img src='../../Asset/pic22.dde259dc.jpg' width='200' height='auto'></td><td>" + currentRoom["roomName"] + "</td><td>" + createRoom["bedType"] + "</td><td>" + currentRoom["roomFloor"] + "</td><td>" + currentRoom["roomFacility"] + "</td></tr>"
            for (key in currentRoom) {
                const td = document.createElement("td");
                td.innerText = currentRoom[key]
                row.appendChild(td)
            }
            td.appendChild(btn)
            td.appendChild(checkOutbtn)
            row.appendChild(td)
            table.append(row);
            btn.addEventListener("click", () =>{
                // console.log(i, " the index")
                checkIn(i)
            })

            checkOutbtn.addEventListener("click", () =>{
                checkOut(i)

            })
        }   
    }
}

// the function the calls the room
roomList();
 
// the initials name
let firstName = 'Sunday'
let surName = 'Ameh'

let myname = document.getElementById('ok')

let initials = firstName.charAt(0) + surName.charAt(0)

myname.innerText = initials

function checkIn(index) {
    // console.log(index, " index")
    let data = storage.getItem("rooms")
    let roomData = JSON.parse(data)
    // console.log(roomData, " room data")
    if (roomData.length > 0) {
        let rooms = roomData
        if (rooms) {
            rooms[index].checkIn = true
            rooms[index].checkOut = false
        }
        storage.setItem("rooms", JSON.stringify(rooms))
        return

    }
    window.location.href = "./dashboard.html"
}

function checkOut(index) {
    // console.log(index, " index")
    let data = storage.getItem("rooms")
    let roomData = JSON.parse(data)
    // console.log(roomData, " room data")
    if (roomData.length > 0) {
        let rooms = roomData
        if (rooms) {
            rooms[index].checkIn = false
            rooms[index].checkOut = true
        }
        storage.setItem("rooms", JSON.stringify(rooms))
    }
    window.location.href = "./dashboard.html"
}