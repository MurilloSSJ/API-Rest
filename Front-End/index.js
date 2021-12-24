var axiosConfig = {
    headers:{
        Authorization: "Bearer " + localStorage.getItem('token')
    }
}

axios.get("http://localhost:3000/games",axiosConfig).then(response=>{
    const games = response.data
    const lista = document.querySelector('#games')

    games.forEach(game => {
        const item = document.createElement('li')
        item.setAttribute("data-id",game.id)
        item.setAttribute("data-price",game.price)
        item.setAttribute("data-title",game.title)
        item.setAttribute("data-year",game.year)
        item.innerHTML = `${game.title} - R$ ${game.price}`

        //Botão de delete
        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = "Deletar"
        deleteBtn.addEventListener('click',function(){deleteGame(item)})
        item.appendChild(deleteBtn)

        //Botão de edit
        const editBtn = document.createElement('button')
        editBtn.innerHTML = "Editar"
        editBtn.addEventListener('click',function(){
            updateGame(item)
        })
        item.appendChild(editBtn)
        lista.appendChild(item)
    })
})

function login(){
    const emailField = document.getElementById('email')
    const passwordField = document.getElementById("password")
    const mail = emailField.value
    const password = passwordField.value
    axios.post('http://localhost:3000/auth',{
        email: mail,
        senha:password
    }).then(res=>{
        const token = res.data.token
        localStorage.setItem("token",token)
        axiosConfig.headers.Authorization = "Bearer " + localStorage.getItem("token")
    }).catch(err =>{
        alert("login invalido")
    })
}
function updateGame(listItem){
    const id = listItem.getAttribute("data-id")
    const price = listItem.getAttribute("data-price")
    const title = listItem.getAttribute("data-title")
    const year = listItem.getAttribute("data-year")

    document.querySelector('#idEdit').value = id
    document.querySelector('#titleEdit').value = title
    document.querySelector('#yearEdit').value = year
    document.querySelector('#priceEdit').value = price
}
function updateSend(){
    const id = document.querySelector('#idEdit').value
    const title = document.querySelector('#titleEdit').value
    const year = document.querySelector('#yearEdit').value
    const price = document.querySelector('#priceEdit').value

    var game = {
        title,
        year,
        price
    }
    axios.put(`http://localhost:3000/games/${id}`,game).then(response=>{
        if(response.status==200){
            alert("Editado com sucesso")
            location.reload()
        }else{
            alert('Um erro ocorreu')
        }
    })
}
function deleteGame(listItem){
    const id = listItem.getAttribute("data-id")
    axios.delete(`http://localhost:3000/games/${id}`).then(response=>{
        if(response.status==200){
            alert("Deletado com sucesso")
            location.reload()
        }else{
            alert("Erro ao deletar")
        }
    })
}

function createGame(){
    var titleInput = document.querySelector('#title').value
    var yearInput = document.querySelector('#year').value
    var priceInput = document.querySelector('#price').value
    var game = {
        title:titleInput,
        year:yearInput,
        price: priceInput
    }
    axios.post("http://localhost:3000/games",game).then(response=>{
        if(response.status==200){
            alert("Cadastrado com sucesso")
            location.reload()
        }else{
            alert('Um erro ocorreu')
        }
    })
}