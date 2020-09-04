//const host = "http://localhost:3000"
const host = "https://casemakemywork.herokuapp.com"

setInterval(() => {
    if(document.querySelector("#loadingWord").value === "Loading..."){
        document.querySelector("#loadingWord").value = "Loading"
    }

    else if(document.querySelector("#loadingWord").value === "Loading") {
        document.querySelector("#loadingWord").value = "Loading."
    }

    else if(document.querySelector("#loadingWord").value === "Loading.") {
        document.querySelector("#loadingWord").value = "Loading.."
    }

    else if(document.querySelector("#loadingWord").value === "Loading.."){
        document.querySelector("#loadingWord").value = "Loading..."
    }

}, 500)

function submitForm() {
    document.querySelector("#container").style.display = "none"
    document.querySelector("#loading").style.display = "block"

    const searchTerm = document.querySelector("#searchTerm").value
    const prefix = document.querySelector("#prefix").value
    const lang = document.querySelector("#lang").value

    fetch(`${host}/init?searchTerm=${searchTerm}&prefix=${prefix}&lang=${lang}`)
    .then((response) => {
        return response.json()
    })
    .then(async(data) => {
        //await prepareContent(data)
        await prepareAllContent(data)
        console.log(data.sentences)
    })
    .catch((err) => {
        alert("Um erro ocorreu")
        console.log(err)
    })

}

async function prepareAllContent(content) {

    await changeScreen()

    let allRef = "https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal" + "<br>"
    const imagesContent = document.querySelectorAll("#imgContent")
    const labelContent = document.querySelectorAll("#sentence")

    for(const sentence in content.sentences){
        labelContent[sentence].innerHTML = content.sentences[sentence].text
        for(const image of content.sentences[sentence].images){
            const extension = image.substr(image.length-4, image.length)
            
            if(extension === ".png" || extension === ".jpg"){
                imagesContent[sentence].src = `${image}`
                allRef += image + "<br>"
            }
        }
    }

    document.querySelector("#references").innerHTML = allRef

    async function changeScreen() {
        document.querySelector("#loading").style.display = "none"
        document.querySelector("#search").style.display = "block"
    }

}

function prepareContent(data) {
    document.querySelector("#loading").style.display = "none"
    document.querySelector("#search").style.display = "block"
    const content = data

    let allRef = "https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal" + "<br>"

    for(let sentence = 0; sentence <= 19; sentence++){
        //console.log(content.sentences[sentence])
        if(sentence%2 === 0){
            document.querySelector(`#sentence${sentence}`).innerHTML = content.sentences[sentence].text
            const sentence2 = sentence+1
            document.querySelector(`#sentence${sentence}`).innerHTML += " " + content.sentences[sentence2].text
            try{
                const final = content.sentences[sentence].images[0].substr(content.sentences[sentence].images[0].length-4, content.sentences[sentence].images[0].length)
                if(final === ".png" || final === ".jpg"){
                    //imgs[cont].src = content.sentences[sentence].images[0]
                    document.querySelector(`#img${sentence}`).src = content.sentences[sentence].images[0]
                    allRef += content.sentences[sentence].images[0] + "<br>"
                }else{
                    //imgs[cont].src = content.sentences[sentence].images[1]
                    document.querySelector(`#img${sentence}`).src = content.sentences[sentence].images[1]
                    allRef += content.sentences[sentence].images[1] + "<br>"
                }
            }catch(err){
                console.log(err)
            }
        }
    }

    document.querySelector("#references").innerHTML = allRef

}

async function imprimir() {

    await esconder()

    window.print()

    async function esconder() {
        document.querySelector("#imprimir").style.display = "none"
    }

}