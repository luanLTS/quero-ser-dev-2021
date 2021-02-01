
const TYPES = [
    'fire',
    'grass',
    'electric',
    'water',
    'ground',
    'rock',
    'fairy',
    'poison',
    'bug',
    'dragon',
    'psychic',
    'flying',
    'fighting',
    'normal'
]

const cardHtml = `
    <div class="card">
        <div class="title">
            <h2>{name}</h2>
            <small># {id}</small>
        </div>
        <div class="img bg-{type}">
            <img src="https://pokeres.bastionbot.org/images/pokemon/{id}.png" alt="{name}">
        </div>
        <div class="type {type}">
            <p>{type}</p>
        </div>
        <div class="favorite">
            <img src="./heart.png" alt="favorite">
        </div>
    </div>
`

const POKEMONS_COUNT = 200

const cards = document.querySelector('.cards')

const replacer = ( text, source, destination ) => {
    const regex = new RegExp(source, 'gi')
    return text.replace(regex, destination)
}

const getType = (data) => {
    const typeApi = data.map( type =>  type.type.name  )
    const type = typeApi.find((type) => typeApi.indexOf(type) > -1)
    return type
} 

const createPokemonCard = ( pokemon ) => {
    const { id, name, type } = pokemon
    let newCard = replacer(cardHtml, `\{id\}`, id)
    newCard = replacer(newCard, `\{name\}`, name)
    newCard = replacer(newCard, `\{type\}`, type)

    cards.innerHTML += newCard
}

const fetchPokemon = async (number) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${number}`
    const res = await fetch(URL)
        .then( res => res.json()
    )
    const { id, name, types } = res
    const type = getType(types)
    return { id, name, type }
}

const fetchPokemons = async () => {
    for ( let i = 1; i <= POKEMONS_COUNT; i++) {
        const pokemon = await fetchPokemon(i)
        createPokemonCard(pokemon)
    }
}

fetchPokemons()