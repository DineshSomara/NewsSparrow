import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1,

    };
  }

  async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=07218c6914d94126b17f7460641a6d50&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data= await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles,
            totalResults: parsedData.totalResults,
            loading:false
        })
  }

handleNextClick = async () => {
    if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
        
    }
    else{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=07218c6914d94126b17f7460641a6d50&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data= await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles,
            page: this.state.page+1,
            loading: false
        })
    }

  }

handlePrevClick = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=07218c6914d94126b17f7460641a6d50&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data= await fetch(url);
    let parsedData = await data.json();
    this.setState({
        articles : parsedData.articles,
        page: this.state.page-1,
        loading: false
    })
  }

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{marginTop:'85px'}}>News Sparrow - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  newsUrl={element.url}
                  title={element.title?element.title.slice(0,45):""}
                  description={element.description?element.description.slice(0,88):""}
                  imageUrl={element.urlToImage?element.urlToImage:"https://i.blogs.es/3cc142/karl-janisse-t4i7to0sxjy-unsplash/840_560.jpg"}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} className="btn btn-secondary" onClick={this.handlePrevClick}>Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next</button>
        </div>
      </div>
    );
  }
}
