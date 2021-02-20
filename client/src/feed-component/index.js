import React, { useState } from 'react';

function Feed(props) { 
   console.log(props);
   return<>
   {
       props.map((post)=>{
           const { text, name } = post;
           return(<div>
               <p>
               <b>{ text } </b> <i>{ name }  </i>
                </p>
               </div>);
       })
   }
   </>;
};

export default Feed;