//include React et al
import React, { Component } from "react";
import ReactDOM from "react-dom";

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topic: "",
			startYear: "",
			endYear: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

// Register any changes in the textbox 
    handleChange(event) {
    	console.log("updating text entries");
    // Capture any change in text to the query terms (pre-search).
    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    	var newState = {};
    	newState[event.target.id] = event.target.value;
        this.setState(newState);
	}
	handleSubmit(event) {
		event.preventDefault();
		this.props.setTerm(this.state.topic, this.state.startYear, this.state.endYear);
		this.setState({topic:"", startYear:"", endYear:""});
		return false;
	};

	// Here we render the function
	render (){
		return(
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h2 className="panel-title text-center">Search New York Times</h2>
				</div>
				<div className="panel-body text-center">

						<form>
							<div className="form-group">
								<h4 className=""><strong>Topic</strong></h4>
								<input type="text" 
										className="form-control text-center" 
										value={this.state.topic} 
										id="topic" 
										onChange= {this.handleChange} 
										required/>
								<br />

								<h4 className=""><strong>Start Year</strong></h4>
								<input type="text" 
										className="form-control text-center" 
										value={this.state.startYear}
										id="startYear" 
										onChange= {this.handleChange} 
										required/>
								<br />

								<h4 className=""><strong>End Year</strong></h4>
								<input type="text" 
										className="form-control text-center" 
										value={this.state.endYear}
										id="endYear" 
										onChange= {this.handleChange} 
										required/>
								<br />
								
								<button type="button" 
										className="btn btn-primary" 
										onClick={this.handleSubmit}> Search</button>
							</div>
						</form>
				</div>
			</div>
		)
	}
};

// Export the component back for use in other files
module.exports = Form;