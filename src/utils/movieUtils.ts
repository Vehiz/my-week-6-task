import fs, { readFileSync } from 'fs'
import {Request, Response} from 'express'
import { v4 as uuidv4 } from 'uuid';
import path from 'path'

export const postMovie = async function(userId: string, movieData: IMovies){

  let data: any = []
 

  const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
  //Create unique Id
  const movieId = uuidv4();
  if (movieData){
    movieData["id"] = movieId;
  }
  for (let data of database){
    if(data.User.email === userId){
      if(movieData){
        delete movieData.email;
      }
        data.Movies.push(movieData)
    }
  }


  fs.writeFileSync('database.json', JSON.stringify(database, null, 3), 'utf-8');
}

export const writeUpdate = async function(data: IMoviesEdit){
 
  const chunk = JSON.parse(fs.readFileSync( 'database.json', 'utf-8'))
     
    if(data){
      const {title, description, image, price, email} = data
      console.log(email)
      for( let movie of chunk){
        if(movie.User.email === email){
          const movies = movie.Movies;
          for (let movie of movies){
            movie["title"] = title || movie.title
            movie["description"] = description || movie.description
            movie["image"]= image || movie.image
            movie["price"]= price || movie.price 
            
          }
        }
      }
    }

    fs.writeFileSync('database.json', JSON.stringify( chunk, null, 3 ),'utf-8')
    return chunk
  }
      
    
  export const deleteFile = async function(id: string, email: string) {

    const chunk = JSON.parse(fs.readFileSync('database.json', 'utf-8'));

    for(let userDetails of chunk){
      if (userDetails.User.email === email){
        const movies = userDetails.Movies;
        for (let i in movies){
          const movie = movies[i]
          if ( movie.id === id){
              movies.splice(i, 1)
          } 
        }

      }
    }
    // console.log('IndexOf',chunk.indexOf(`${id}`))
    fs.writeFileSync('database.json', JSON.stringify( chunk, null, 3 ),'utf-8')
    return chunk
    
  }



  export const getMovies = async function(userId: string, movieData?: IMovies){
  const chunk = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
  // fs.writeFileSync('database.json', JSON.stringify(chunk, null, 3), 'utf-8');
  return chunk
  }