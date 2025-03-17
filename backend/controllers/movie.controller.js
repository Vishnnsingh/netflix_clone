
import { fetchFromIMDB,fetchFromIMDBupcomin } from "../services/imdb.service.js";

export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromIMDB("most-popular-movies");
      
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomMoviee = data.find((_, index) => index === randomIndex);
        //    console.log(randomMoviee);
           
        res.json({
            success: true,
            content: randomMoviee,
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


export async function getTrendingmoviesMovie(req, res) {
    try {
        const data = await fetchFromIMDB("top250-movies");  
        res.json({
            success: true,
            TopMovieslist: data,
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function gettopMovies(req, res) {
    try {
        const data = await fetchFromIMDB("top250-movies");  
        res.json({
            success: true,
            TopMovies: data,
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


export async function gettopBoxOfficeMovies(req, res) {
    try {
        const data = await fetchFromIMDB("top-box-office");  
        res.json({
            success: true,
            TopMovies: data,
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


export async function getupcomingMovies(req, res) {
    try {
        const data = await fetchFromIMDBupcomin("upcoming-releases");  
       
        res.json({
            success: true,
            UpcomingMovies: data,
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


export async function getMovieCast(req, res) {
    const { id } =  req.params
  try {
    const data = await fetchFromIMDB(`${id}/cast`)
    res.json({
        success: true,
        casts: data
    })
  } catch (error) {
    if(error.message.includes("404")){
        return res.status(404).send(null)
    }

    res.status(500).json({
        success: false,
        message: "Internal server Error"
    })
  }  
}

export async function getMovieDeatils(req, res) {
    const { id } =  req.params
  try {
    const data = await fetchFromIMDB(`${id}`)
    res.json({
        success: true,
        details: data
    })
  } catch (error) {
    if(error.message.includes("404")){
        return res.status(404).send(null)
    }

    res.status(500).json({
        success: false,
        message: "Internal server Error"
    })
  }  
}


export async function getMovieRating(req, res) {
    const { id } =  req.params
  try {
    const data = await fetchFromIMDB(`${id}/rating`)
    res.json({
        success: true,
        details: data
    })
  } catch (error) {
    if(error.message.includes("404")){
        return res.status(404).send(null)
    }

    res.status(500).json({
        success: false,
        message: "Internal server Error"
    })
  }  
}


export async function getMovieDirector(req, res) {
    const { id } =  req.params
  try {
    const data = await fetchFromIMDB(`${id}/directors`)
    res.json({
        success: true,
        directors: data
    })
  } catch (error) {
    if(error.message.includes("404")){
        return res.status(404).send(null)
    }

    res.status(500).json({
        success: false,
        message: "Internal server Error"
    })
  }  
}


export async function getMovieWriter(req, res) {
    const { id } =  req.params
  try {
    const data = await fetchFromIMDB(`${id}/writers`)
    res.json({
        success: true,
        directors: data
    })
  } catch (error) {
    if(error.message.includes("404")){
        return res.status(404).send(null)
    }

    res.status(500).json({
        success: false,
        message: "Internal server Error"
    })
  }  
}