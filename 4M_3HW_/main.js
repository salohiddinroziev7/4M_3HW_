const list = document.querySelector("#list")
const search = document.querySelector("#search")
let users = [] 

const getAwet = async () => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        users = await res.json()
        renderList(users)
    } catch (error) {
        console.error("Ошибка при загрузке:", error)
    }
}

const renderList = (data, query = "") => {
    const q = query.toLowerCase()
    list.innerHTML = data.map((item) => {
        let name = item.name
        if (q && name.toLowerCase().includes(q)) {
            const regex = new RegExp(`(${q})`, "gi")
            name = name.replace(regex, "<mark>$1</mark>")
        }
        return `
            <div>
                <h3>${name}</h3>
                <p>${item.email}</p>
            </div>
        `
    }).join("")
}

search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(value)
    )
    renderList(filtered, value)
})

getAwet()
