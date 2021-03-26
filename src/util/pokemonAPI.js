import axios from "axios";

export const getPokemons = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(`Something went wrong... ${err}`);
  }
};

export const getOnePokemon = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(`Something went wrong... ${err}`);
  }
};
