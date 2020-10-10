import axios from 'axios';

export const getPokemons = (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(url);
            
            resolve(res.data);
        } catch(err) {
            reject(`faild... inside ${err}`)
        }
    })
}

export const getOnePokemon = (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(url);
            resolve(res.data);
        } catch(err) {
            reject(err);
        }
    }) 
}