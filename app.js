
// import necesary libs.
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'


let SearchBox = styled.input `
margin-top: 6%;
    margin-left: 3%;
    border-radius: 20px;
    background-color: #a9a3a3;
    color: #fff;
    font-size: -2.8rem;
    border: 0px;
    height: 22px;
    outline: none;
    padding: 0 362px 0 206px;
    text-align: center;
 
`
let Navigation = styled.header `
  display: flex;
  padding: 0px 10%;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 25px rgba(0,0,0,0.16);
  height: 100px;
`

let NewsContainer = styled.main`
  background-color: #f8f8f8;
  padding: 20px 10%;

`

let NewsItem = styled.div`
  background-color: #fff;
  border: 2px solid #E5E9F2;
  min-height: 150px;
  margin: 20px 0px;
  border-radius: 4px;
  display: flex;
  padding: 10px;
`

let NewsText = styled.div`
  padding-left: 14px;
  position: relative;
`

let DateTime = styled.time`
  position: absolute;
  bottom: 0px;
  color: #399DF2;
  font-family: sans-serif;
`

let Div=styled.div`
display: flex;
flex-direction: column;
justify-content: center;

text-align: end;


`








class News extends Component{
  
  constructor(){
    super()
  
    this.state = {
      t:20,
      news: [],
      searchValue: 'usa'
    }
    


    this.getNews()

  }
  
  sorting(e)
{

this.getNews(this.state.searchValue,e.target.value)
}
changee(e){
  

 // this.getNews('iraq',e.target.value)
 this.setState({
t:e.target.value

})
}

  getNews(searchTerm = this.state.searchValue,aa) {
    fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=978d6c3818ff431b8c210ae86550fb1f`)
    .then((response)=>{
      
      return response.json()
    })
    .then((data)=>{
      
      this.setState({
        
        news: data.articles.sort(function (a, b) { 
          if(aa=='v1'){
          if(a.title > b.title) { return 1 } 
          }
          //if(a.title < b.title) { return -1 } 
          if(aa=='v2'){
          if (a.publishedAt > b.publishedAt) { return 1}
          }

        else{
         // news: data.articles.slice(0, 5)
         return;
        }
        })
      })
    })
  }





upvote(){

        let counterElem = document.getElementById('counter');
        let counterValue = parseInt(counterElem.textContent) + 1;
        counterElem.innerHTML = counterValue
        //console.log(counterValue)
        localStorage.setItem('counter p',counterValue);
      
    }
downvote(){


  let counterElem2 = document.getElementById('counter');

  let counterValue2 = parseInt(counterElem2.textContent) - 1;
  if(counterValue2<0){
    counterValue2=0;  }
  counterElem2.innerHTML = counterValue2
  //console.log(counterValue)
  localStorage.setItem('counter p',counterValue2);



}
















 
  onInputChange(event){
    this.setState({
      searchValue: event.target.value
    })
  } 

  onKeyUp(event){
    if(event.key == 'Enter'){
      this.getNews(this.state.searchValue)
    /*  this.setState({
        searchValue: ''
      })*/
    }
  }

  
  render() {
    return (
     
      <React.Fragment>
        <Navigation>
          <img width="100px;" src={require('./assets/logo.svg')}/>
          <SearchBox 
          onChange={this.onInputChange.bind(this)} 
          onKeyUp={this.onKeyUp.bind(this)}
          value={this.state.searchValue} placeholder="search term"/>
           <select onChange={this.sorting.bind(this)}>
            <option value="v3">defualt</option>
            <option value="v2">sorting by date</option>
            <option value="v1">sorting by title</option>
            <option value="v3">sorting by vote</option>

</select>



        <select onChange={this.changee.bind(this)}>
        <option value="20">defualt</option>

            <option value="5">limit 5</option>
            <option value="10">limit 10</option>
            <option value="15">limit 15</option>

</select>



        </Navigation>
        <NewsContainer>
          {
            this.state.news.slice(0, this.state.t).map((item, i)=>{

              return (
              <NewsItem key={i}>
          
                  <img width="124px;" height="124px" src={item.urlToImage} />
                <NewsText>
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <DateTime>{item.publishedAt}</DateTime>
                
            
            
                </NewsText>
                <Div className="voter">
                <div>
                <img id="p" onClick={this.upvote.bind(this)} height="23px" src={require('./assets/caret-arrow-up.png')}   data-artice-id={i} alt=""/>
                <div id="counter">1</div>
                
                <img id="m"  onClick={this.downvote.bind(this)} height="23px" src={require('./assets/caret-down.png')} alt=""/>
                </div>
                </Div>
              </NewsItem>
             
              
              )
              
            })
            
          }
        </NewsContainer>
      </React.Fragment>
    )
  }
}

function App() {
  return <div>
    <News/>
  </div>
}

ReactDOM.render(<App/>, document.getElementById('root'))

