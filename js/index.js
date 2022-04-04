document.addEventListener('DOMContentLoaded', function () {

    let form = document.querySelector('#github-form')
    let userList = document.querySelector('#user-list')
    let repoList = document.querySelector('#repos-list')

    function getUsers() {
        let search = document.querySelector('#search').value
        
            fetch( `https://api.github.com/search/users?q=${search}`)
            .then(resp => resp.json())
            .then(data => renderUsers(data))
            
        }

        function renderRepos(repoObj) {
            repoObj.forEach(function (repo) {
                
                let li = document.createElement('li')
                let div = document.createElement('div')
                div.innerHTML = `

                    <p>Name: ${repo.name}</p>
                    <p>id:${repo.id}</p>
                
                `
                li.append(div)
                repoList.appendChild(li)
                console.log(repo)
            })
            console.log(repoObj)
        }

        function renderUsers(users) {
            let usersArray = users.items 

            usersArray.forEach(user => {
                let li = document.createElement('li')
                let div = document.createElement('div')
                div.innerHTML = `
                <h1>username: ${user.login}</h1>
                <img src=${user.avatar_url} width ="200" height ="200">
                <br>
                <a href="https://github.com/${user.login}">${user.login} Github Profile</a>
                `
                div.querySelector('h1').addEventListener('click', function (e) {
                    userList.innerHTML = " "
                    fetch(`https://api.github.com/users/${user.login}/repos`)
                    .then(resp => resp.json())
                    .then(data => renderRepos(data))
                })
                li.append(div)
                userList.appendChild(li)
                // console.log(users.items)
                // console.log(user)
            });
            
            
            console.log(usersArray)
            
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault()
            repoList.innerHTML = ""
            getUsers()
        })
})