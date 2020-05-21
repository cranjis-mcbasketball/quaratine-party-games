import React, { Component } from "react";
import Things from "./Things.jsx";


  const ThingsResponses = (props) => {
      return (

          <ul className="list-group text-center">
            {
              this.props.currentPrompts.map(function(prompt, i) {
                return <li className="list-group-item list-group-item-info">{this.props.prompt[i]}</li>
              })
            }
          </ul>

       );
   };


  export default ThingsResponses;

{/* <ul>
        {
           this.state.responses.map((res, i) => {

              return (
                <li key={i} className="things-category">
                  <div className="response" key={i} >{res}</div>
                </li>
              );
            })}
     </ul> */}