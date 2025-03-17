import { fetchFromIMDB, fetchFromIMDBupcomingtv } from "../services/imdb.service.js";

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromIMDB("top250-tv");
      
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomTv = data.find((_, index) => index === randomIndex);
        //    console.log(randomMoviee);
           
        res.json({
            success: true,
            content: randomTv,
            // results: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function getTrendingTvPopular(req, res) {
    try {
        const data = await fetchFromIMDB("top250-tv");  
        res.json({
            success: true,
            TopTv: data,
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function gettopTv(req, res) {
    try {
        const data = await fetchFromIMDB("most-popular-tv");  
        res.json({
            success: true,
            TopTv: data,
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


export async function getupcomingTv(req, res) {
    try {
        const data = await fetchFromIMDBupcomingtv("upcoming-releases");  
       
        res.json({
            success: true,
            UpcomingTv: data,
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}