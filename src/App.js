import React, { Component } from 'react';
//import PropTypes, { number } from 'prop-types';
import axios from'axios';
import Movie from './components/Movie';
import './App.css';

// function Food(props){
//   return (
//       <div>
//         <h2>I like {props.name}</h2>
//         <h4>{props.rating}/5</h4>
//         <img src={props.picture} alt={props.fav} />
//       </div>
//   )
// }

// function renderFood(dish){
//   return <Food name={dish.name} picture={dish.image} key={dish.key}
//                 rating={dish.rating}/>
// }

// //이것은 prop의 타입을 체크해주는 것으로 변수로써 하는것처럼에서 propTypes라고 해야만 react가 인식한다.
// Food.propTypes={
//   name:PropTypes.string.isRequired,
//   picture:PropTypes.string.isRequired,
//   rating:PropTypes.number.isRequired
// }

// function App() {
//   return (
//     <div className="App">
//       {foodILike.map(renderFood)}
//     </div>
//   )
// }


class App extends Component{
  state={
    //count:0,
    isLoading: true,
    movies:[]
  };
  // add=function(e){
  //   e.preventDefault();
  //   var newcount=this.state.count+1;
  //   this.setState({count:newcount});
  // }.bind(this);


  //axios로 온 데이터 잡기, 기다려야한다 항상 빠르지 않다 그래서 약간 기다려줘야한다
  //async와 await을 추가했는데 이것이 비동기라는 것을 뜻한다
  //async는 기다려랴 라는 뜻 await은 무엇을 기다렸다가 계속해라는 것인데 뒤에 나오는 것을 기다려라 라는 뜻이다.
  getMovies= async ()=>{
    const {data:{data:{movies}}}= await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
    this.setState({movies,
                    isLoading:false})
  }

  componentDidMount(){
    /*setTimeout(()=>{
      this.setState({isLoading:false})
    },6000);*/
    this.getMovies();
  }

  /*
  minus=function(e){
    e.preventDefault();
    var newcount=this.state.count-1;
    this.setState({count:newcount});
  }.bind(this);
  add=(e)=>(
    e.preventDefault(),
    this.setState(current=>({count: current.count +1})));
    */
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

      /*
      <div className="App">
        <h1>The number is {this.state.isLoading ? "isLoading..." : this.state.count}</h1>
        <button type="button" value="add" onClick={this.add}>add</button>
        <button type="button" value="subtract" onClick={this.minus}>Minus</button>
      </div>
      */
    )
  }
}

export default App;
