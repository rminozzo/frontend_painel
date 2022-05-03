import React from "react";

 function Comment(props){

     function formataData(date){
         return date.toLocaleDateString();
     }
     return(
         <div>
             <hr />
            <Avatar author={props.author}/><br />
            <span>{props.author.nome}</span><br /><br />
            <span>{props.text}</span><br />
            <span>{formataData (props.date)}</span><br />
            <hr />
         </div>
     );
 }

 function Avatar(props){
     return(
        <img src={props.author.AvatarUrl} alt={props.author.nome}/>
     );
 }

 export default Comment;