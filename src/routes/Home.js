//제일먼저 보여지는 페이지
import React, { Component } from 'react';
import axios from'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends Component{
    state={
    //count:0,
    isLoading: true,
    movies:[]
    };

  //axios로 온 데이터 잡기, 기다려야한다 항상 빠르지 않다 그래서 약간 기다려줘야한다
  //async와 await을 추가했는데 이것이 비동기라는 것을 뜻한다
  //async는 기다려랴 라는 뜻 await은 무엇을 기다렸다가 계속해라는 것인데 뒤에 나오는 것을 기다려라 라는 뜻이다.
    getMovies= async ()=>{
    const {data:{data:{movies}}}= await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
    this.setState({movies,
                    isLoading:false})
    }

    componentDidMount(){
    this.getMovies();
    }
    render (){
        const {isLoading,movies}=this.state;
        return(
            <section className="container">
                <div>{isLoading ? (<div className="loader">
                                <span className="loader__text">Loading...</span>
                            </div>) : (
                                <div className="movies">
                                {movies.map(movie =>(
                                    <Movie id={movie.id} year={movie.year} 
                                        title={movie.title} summary={movie.summary} 
                                        poster={movie.medium_cover_image}
                                        key={movie.id}
                                        genres={movie.genres}/>
                                    )
                                    )
                                }
                                </div>)
                            }
                </div>
            </section>
        )
    }
}

export default Home;