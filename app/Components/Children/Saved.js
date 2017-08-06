//include React et al
import React, { Component } from "react";
import ReactDOM from "react-dom";

class Saved extends Component {
	constructor(props) {
		super(props);
		this.state = {
			savedArticles: []
		};
		this.clickToDelete = this.clickToDelete.bind(this);
	};
clickToDelete(result) {
	this.props.deleteArticle(result);
};
componentWillReceiveProps(nextProps) {
	var that = this;
	console.log("this is the nextProps: ",nextProps);
	var myResults = nextProps.savedArticles.map(function(search, i) {
		var boundClick = that.clickToDelete.bind(that, search);
		return <div className="list-group-item" key={i}><a href={search.url} target="_blank">{search.title}</a><br />{search.date}<br /><button type="button" style={{'float': 'right', 'marginTop': '-35px'}} className="btn btn-primary" onClick={boundClick}>Delete</button></div>
	});
this.setState({savedArticles: myResults});
console.log("myResults: ", myResults);
}
render() {
	return(

			<div className="panel panel-success">
				<div className="panel-heading">
					<h2 className="panel-title text-center">Saved Articles</h2>
				</div>
				<div className="panel-body">
					{this.state.savedArticles}
				</div>
			</div>

		)
	}
};

// Export the component
module.exports = Saved;