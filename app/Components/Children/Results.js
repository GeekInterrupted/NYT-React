//include React et al
import React, { Component } from "react";
import ReactDOM from "react-dom";

class Results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			date: "",
			url: "",
			results: []
		}
		this.clickToSave= this.clickToSave.bind(this);	
	};
	
	// save the article
	clickToSave(result){
		this.props.saveArticle(result.headline.main, result.pub_date, result.web_url);
		console.log("stuff to be saved: ", result);
	}
	componentWillReceiveProps(nextProps) {
		var that = this;
		var myResults = nextProps.results.map(function(search, i) {
			var boundClick = that.clickToSave.bind(that, search);
			return <div className="list-group-item" key={i}><a href={search.web_url} target="_blank">{search.headline.main}</a><br />{search.pub_date}<br /><button type="button" className="btn btn-primary" style={{'float': 'right', 'marginTop': '-35px'}} onClick={boundClick}>Save</button></div>
		});
		this.setState({results: myResults});
	}
	
	render() {
	return(
		<div className="panel panel-warning">
				<div className="panel-heading">
					<h2 className="panel-title text-center">Results</h2>
				</div>
				<div className="panel-body">
						{this.state.results}
				</div>
			</div>
		)	
	}
};

module.exports = Results;
