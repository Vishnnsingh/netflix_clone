import axios from "axios";
import { ENV_VARS } from "../config/envVars.js"; // Ensure you store API keys securely



export const fetchFromIMDB = async (endpoint) => {
 
    const url = `https://${ENV_VARS.API_HOST}/imdb/${endpoint}`;
    // console.log("Fetching from:", url);

    const options = {
        headers: {
            // "Accept": "application/json",
            "x-rapidapi-key": ENV_VARS.API_KEY,
            "x-rapidapi-host": "imdb236.p.rapidapi.com"
        }
    };

    try {
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        console.error("Error fetching data from IMDb:", error.message);
        throw error;
    }
};





export const fetchFromIMDBupcomin = async (endpoint) => {
 
    const url = `https://${ENV_VARS.API_HOST}/imdb/${endpoint}`;
    // console.log("Fetching from:", url);

    const options = {
        params: {
            countryCode: 'US',
            type: 'MOVIE'
          },
        headers: {
            // "Accept": "application/json",
            "x-rapidapi-key": ENV_VARS.API_KEY,
            "x-rapidapi-host": "imdb236.p.rapidapi.com"
        }
    };

    try {
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        console.error("Error fetching data from IMDb:", error.message);
        throw error;
    }
};


export const fetchFromIMDBupcomingtv = async (endpoint) => {
 
    const url = `https://${ENV_VARS.API_HOST}/imdb/${endpoint}`;
    // console.log("Fetching from:", url);

    const options = {
        params: {
            countryCode: 'US',
            type: 'TV'
          },
        headers: {
            // "Accept": "application/json",
            "x-rapidapi-key": ENV_VARS.API_KEY,
            "x-rapidapi-host": "imdb236.p.rapidapi.com"
        }
    };

    try {
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        console.error("Error fetching data from IMDb:", error.message);
        throw error;
    }
};




























// const url = `https://imdb236.p.rapidapi.com/imdb/`;
// console.log("Fetching from:", url);



// import axios from "axios";
// import { ENV_VARS } from "../config/envVars.js"; // Ensure API keys are securely stored

// export const fetchFromIMDB = async (endpoint) => {

//     const options = {
//         method: "GET",
//         url: `https://${ENV_VARS.API_HOST}/imdb/${endpoint}`,
//         headers: {
//             // "Accept": "application/json",
//             "x-rapidapi-key": ENV_VARS.API_KEY,
//             "x-rapidapi-host": ENV_VARS.API_HOST
//         }
//     };

//     try {
//         const response = await axios.request( options);
//         // console.log(response.data);
        
//         return response.data;

//     } catch (error) {
//         console.error("Error fetching data from IMDb:", error.message);
//         throw error;
//     }
// };


