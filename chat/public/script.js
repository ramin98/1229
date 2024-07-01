let friendsList = ['Taleh', 'Tamerlan', 'Alexandr']
let me = 'Ramin'
let friends = document.getElementById('friends')

function chooseChat(friend) {
    let chatContainer = document.getElementById('chatContainer')
    chatContainer.innerHTML = `
    <div id="chat">
        <ul id="chatList"></ul>
    </div>
    <form id="fromMeForm">
        <input type="text" id="fromMeInput">
        <input type="file" name='files' id="photoInput">
        <button>SEND TO ${friend}</button>
    </form>
    <form id="fromFriendForm">
        <input type="text" id="toFriendInput">
        <input type="file" name='files' id="photoInput">
        <button>SEND TO ${me}</button>
    </form>`
}

function getDate() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    return `${year}/${month}/${day} - ${hour}:${minutes}:${seconds}`
}

function showMessages(arr) {
    let chatList = document.getElementById('chatList')
    chatList.innerHTML = ''
    arr.forEach((item) => {
        let li = document.createElement('li')
        li.classList.add(item.from === me ? 'from' : 'to')
        li.innerText = item.letter + '---' + item.time
        chatList.appendChild(li)
    })
}

function savePhoto(fileInput) {
    const files = fileInput.files[0];

    const formData = new FormData();
    formData.append("files", files);
    fetch('/save-photo', {
        method: 'POST',
        body: formData
    })
}

friendsList.forEach((item) => {
    let li = document.createElement('li')
    li.innerHTML = `<button>${item}</button>`

    li.addEventListener('click', () => {
        chooseChat(item)

        fetch('/create-or-choose-chat', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chat: `${me}and${item}` })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.array) {
                    showMessages(data.array)
                } else if (data.text) {
                    console.log(data.text)
                }
            })

        let fromMeForm = document.getElementById('fromMeForm')
        let fromFriendForm = document.getElementById('fromFriendForm')

        fromMeForm.addEventListener('submit', (ev) => {
            ev.preventDefault()
            let fromMeFormInput = document.querySelector('#fromMeForm input').value

            let fromMeLetter = {
                letter: fromMeFormInput,
                from: me,
                to: item,
                time: getDate(),
                chat: me + "and" + item
            }

            fetch('/letter-sending', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(fromMeLetter)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        showMessages(data)
                    }
                })

            let fileInput = document.querySelector('#fromMeForm input[type="file"]');
            savePhoto(fileInput)
        })

        fromFriendForm.addEventListener('submit', (ev) => {
            ev.preventDefault()
            let fromFriendInput = document.querySelector('#fromFriendForm input').value

            let fromFriendLetter = {
                letter: fromFriendInput,
                from: item,
                to: me,
                time: getDate(),
                chat: me + "and" + item
            }

            fetch('/letter-sending', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(fromFriendLetter)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        showMessages(data)
                    }
                })

            let fileInput = document.querySelector('#fromFriendForm input[type="file"]');
            savePhoto(fileInput)
        })
    })
    
    friends.appendChild(li)
})


