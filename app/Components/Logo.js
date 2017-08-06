import React, { Component } from 'react';


// Icon
class Logo extends Component {
 render() {
   return (
     <svg className="pulse" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 500 500" aria-labelledby="title">
	   <title id="title">Heart Icon</title>
        <path d="M509.2,82.41h0c-51.47-51.47-135.69-51.47-187.16,0l-16,16-16-16c-51.47-51.47-135.69-51.47-187.16,0h0c-51.47,51.47-51.47,135.69,0,187.16L208.63,375.41l3.79,3.79h0L306,472.78l93.58-93.58h0l44.34-44.34,65.28-65.28C560.67,218.1,560.67,133.88,509.2,82.41Z" transform="translate(-64.2 -43.81)" fill="#ec1c24"/>
      </svg>
   )
 }
}

//which makes this reusable component for other views
export default Logo;


