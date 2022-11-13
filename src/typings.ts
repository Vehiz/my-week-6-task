interface IMovies{
         title: string,
         description : string,
         image:string,
         price: number,
         id: string,
        email?: string
}

interface IMoviesEdit{
         title: string,
         description : string,
         image:string,
         price: number,
         email: string

}

interface IUser{
    fullname: string,
    username: String,
    email: string,
    password: string
    id?: string
}


interface IUserProfile{
    User: IUser,
    Movies: IMovies []
}


interface ILoginData{
    email: string,
    password: string
}


declare namespace Express{
    interface Request{
        user?: IUser
    }
}