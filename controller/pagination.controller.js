const movies = require('../services/pagination.services');


const numOfMoviesInAPage = 10;
const total_pages = 2;

exports.pagination = async (req, res) =>{
    let limit = req.params.limit;
    let page_no = req.params.pageNum;

    // number of movies (limit)
    if(limit==0){
        return res.send(`Please provide number of movies you wanna see on page number ${page_no}`);
    }else if(limit>numOfMoviesInAPage){
        return res.send("A page can only have <= 10 movies. you can change the page number as per your requirement.")
    }
    
    // Page Number
    if(page_no > total_pages){
        return res.send(`Available pages ${total_pages}`);
    }else if(page_no == 0){
        page_no = 1;
    }else if(page_no < 0){
        return res.send("Page number should a positive number.")
    }

    try{
        all_movies = await movies.getAllMovies();
        count = (page_no-1) * 10;
        movie_list = []
        while(count < all_movies.length){
            movie_list.push(all_movies[count]);
            count = count + 1
        }
        moviesToShow = [];
        if(limit<=movie_list.length){
            count = 0;
            while(count<limit){
                moviesToShow.push(movie_list[count]);
                count = count + 1;
            }
            res.send(moviesToShow);
        }else{
            res.send(movie_list);
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

// module.exports = pagination;