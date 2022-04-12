let template = document.querySelector('[data-template]')
let container = document.querySelector('[data-container]')
let searchInput = document.querySelector('[data-search]')

let pydatas = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    pydatas.forEach(data => {
        const isVisible =
            data.name.toLowerCase().includes(value)
        data.element.classList.toggle("hide", !isVisible)
    })
})

function display(e) {
    var inputTag = e.childNodes[3].childNodes[1].childNodes[1]
    var codeZone = e.childNodes[3].childNodes[1].childNodes[3]
    var outputTag = e.childNodes[3].childNodes[1].childNodes[5]
    var resultZone = e.childNodes[3].childNodes[1].childNodes[7]
    codeZone.classList.toggle('hide')
    inputTag.classList.toggle('hide')
    outputTag.classList.toggle('hide')
    resultZone.classList.toggle('hide')
    inputTag.classList.toggle('hide')
    var clickSound = new Audio('./assets/click.mp3')
    clickSound.play()
}

fetch('pythonData.json')
    .then(res => res.json())
    .then(datas => {
        // console.log(datas.python[0].name)
        pydatas = datas.python.map(data => {
            const card = template.content.cloneNode(true).children[0]
            const heading = card.querySelector('[data-heading]')
            const code = card.querySelector('[data-coding]')
            const output = card.querySelector('[data-output]')
            output.textContent = data.output
            heading.textContent = data.name
            code.innerHTML = data.code
            container.append(card)
            return { name: data.name, element: card }
        })
    })
