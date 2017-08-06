// include React et al
import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Logo from "./Logo";



// offspring components
import Form from "./Children/Form";
import Results from "./Children/Results";
import Saved from "./Children/Saved";

// Helper Function
const helpers = require("./utils/helpers");

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topic: "",
			startYear: "",
			results: [],
			savedArticles: []
		}
		this.setTerm = this.setTerm.bind(this);
		this.saveArticle = this.saveArticle.bind(this);
		this.deleteArticle = this.deleteArticle.bind(this);
		this.getArticle = this.getArticle.bind(this);
	};

setTerm(topic, startYear, endYear) {
	this.setState({
		topic, startYear, endYear		
	})
}	

saveArticle(title, date, url){
		helpers.postArticle(title, date, url);
		this.getArticle();
	}

deleteArticle(article){
		console.log("this is the article: ", article);
		axios.delete('/api/saved/' + article._id)
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
				return response;
			}.bind(this));

		this.getArticle();
	}

	getArticle(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
			}.bind(this));
	}

	// If the component updates this code will run
	componentDidUpdate(prevProps, prevState){

		if(prevState.topic != this.state.topic){
			console.log("componend did update!");

			helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
				.then(function(data){
					console.log(data);
					if (data != this.state.results)
					{
						this.setState({
							results: data
						})
					}
				}.bind(this))
		}
	}

	componentDidMount(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
			}.bind(this));
	}

	// Here we render the function
	render () {
		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h1 className="text-center">I <Logo />  NEW YORK NEWS</h1>		
					</div>
				</div>
				
				<div className="row">

					<Form setTerm={this.setTerm}/>

				</div>

				<div className="row">
			
					<Results results={this.state.results} saveArticle={this.saveArticle}/>

				</div>

				<div className="row">
				
					<Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />

				</div>
			</div>
		)
	}
};

module.exports = Main;