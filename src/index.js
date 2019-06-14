//--------------- server side -----------------//

const BEER_URL = 'http://localhost:3000/beers'

const fetchBeers = () => {
    return fetch(BEER_URL).then(resp => resp.json())
}

const editBeerOnServer = editedBeer => {
    return fetch(BEER_URL + `/${editedBeer.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(editedBeer)
    }).then(resp => resp.json())
}

//--------------- global variables -----------------//

const beerUl = document.querySelector('#list-group')
const beerDetailsDiv = document.querySelector('#beer-detail')

//--------------- init function -----------------//
 
const init = () => {
    fetchBeers().then(renderBeers)
 }

//--------------- client side -----------------//

const renderBeers = beers => {
    beerUl.innerHTML = ``
    beers.forEach(renderBeer)
}

const renderBeer = beer => {
    const beerLi = document.createElement('li')
    beerLi.className = 'list-group-item'
    beerLi.innerText = beer.name
   
    beerUl.append(beerLi)

    beerLi.addEventListener('click', () => {
        renderBeerDetails(beer)
    })
}

const renderBeerDetails = beer => {
    beerDetailsDiv.innerHTML = ``
    const beerName = document.createElement('h1')
    const beerImg = document.createElement('img')
    const beerTagline = document.createElement('h3')
    const beerDescription = document.createElement('textarea')
    // beerDescription.onchange = editBeerOnDOM(beer)
    const saveBtn = document.createElement('button')
    saveBtn.className = "btn btn-info"
    saveBtn.id = "edit-beer"
    

    beerName.innerText = beer.name
    beerImg.src = beer.image_url
    beerTagline.innerText = beer.tagline
    beerDescription.innerText = beer.description
    saveBtn.innerText = 'Save'

    beerDetailsDiv.append(beerName, beerImg, beerTagline, beerDescription, saveBtn)

    saveBtn.addEventListener('click', () => {
        // event.preventDefault()
        // debugger
        let editedBeer = {
            id: beer.id,
            name: beer.name,
            tagline: beer.tagline,
            first_brewed: beer.first_brewed,
            description: beerDescription.value,
            image_url: beer.image_url,
            food_pairing: beer.food_pairing,
            brewers_tips: beer.brewers_tips,
            contributed_by: beer.contributed_by
        }

        editBeerOnDOM(editedBeer)
    })
}

const editBeerOnDOM = editedBeer => {
    debugger
    return editBeerOnServer(editedBeer)
        .then(fetchBeers())
        .then(renderBeerDetails(editedBeer))
}




//--------------- calling init function -----------------//
 
init()