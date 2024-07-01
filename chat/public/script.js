let friendsList = ['Taleh', 'Tamerlan', 'Alexandr']
let me = 'Ramin'

let friends = document.getElementById('friends')

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
                let chatList = document.getElementById('chatList')
                chatList.innerHTML = ''
                if (data.array) {
                    data.array.forEach((item) => {
                        let li = document.createElement('li')
                        li.classList.add(item.from === me ? 'from' : 'to')

                        li.innerText = item.letter + '---' + item.time
                        chatList.appendChild(li)
                    })


                } else if (data.text) {
                    console.log(data.text)
                }
            })
        let fromMeForm = document.getElementById('fromMeForm')
        let fromFriendForm = document.getElementById('fromFriendForm')
        console.log(fromMeForm)
        console.log(fromFriendForm)


        fromMeForm.addEventListener('submit', (ev) => {
            ev.preventDefault()
            let fromMeFormInput = document.querySelector('#fromMeForm input').value
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let hour = date.getHours()
            let minutes = date.getMinutes()
            let seconds = date.getSeconds()
            let fromMeLetter = {
                letter: fromMeFormInput,
                from: me,
                to: item,
                time: `${year}/${month}/${day} - ${hour}:${minutes}:${seconds}`,
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
                    let chatList = document.getElementById('chatList')
                    if (data) {
                        chatList.innerHTML = ''

                        data.forEach((item) => {
                            let li = document.createElement('li')
                            li.classList.add(item.from === me ? 'from' : 'to')

                            li.innerText = item.letter + '---' + item.time
                            chatList.appendChild(li)
                        })
                    }


                })
            let fileInput = document.querySelector('#fromMeForm input[type="file"]');
            const files = fileInput.files[0];
            console.log(files);

            const formData = new FormData();
            formData.append("files", files);
            fetch('/save-photo', {
                method: 'POST',
                body: formData
            })

        })

        fromFriendForm.addEventListener('submit', (ev) => {
            ev.preventDefault()
            let fromFriendInput = document.querySelector('#fromFriendForm input').value
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let hour = date.getHours()
            let minutes = date.getMinutes()
            let seconds = date.getSeconds()

            let fromFriendLetter = {
                letter: fromFriendInput,
                from: item,
                to: me,
                time: `${year}/${month}/${day} - ${hour}:${minutes}:${seconds}`,
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
                    let chatList = document.getElementById('chatList')

                    if (data) {
                        chatList.innerHTML = ''

                        data.forEach((item) => {

                            let li = document.createElement('li')
                            li.classList.add(item.from === me ? 'from' : 'to')
                            li.innerText = item.letter + '---' + item.time
                            chatList.appendChild(li)
                        })
                    }


                })
            let fileInput = document.querySelector('#fromFriendForm input[type="file"]');
            const files = fileInput.files[0];
            console.log(files);

            const formData = new FormData();
            formData.append("files", files);
            fetch('/save-photo', {
                method: 'POST',
                body: formData
            })
        })
    })
    friends.appendChild(li)
})

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