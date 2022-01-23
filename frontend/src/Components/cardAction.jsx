import React, { useEffect } from "react";
import axios from "axios";

export default function Btns({
  userRole,
  changeName,
  cardData,
  deleteMovie,
    toggleColor,
    updatenam,
  indexMe,
  elem,
}) {
  return (
    <div className="container p-1">
      <div className="row mx-0">
        <div hidden={userRole !== "admin"} class="col icon"
         onClick={() => updatenam(cardData._id)}
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            width={24}
            fill="none"
            viewBox="0 0 24 24"
            stroke="#fff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
        <div       
        class="col icon"
                   onClick={() => toggleColor(cardData._id) } 
           
        >
  
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6" 
             
            fill="#f00"
            viewBox="0 0 24 24"
            stroke="#fff"
            width={24}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <div hidden={userRole !== "admin"}
                

          class="col icon"
               
          onClick={() => deleteMovie(cardData._id, indexMe)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            width={24}
            stroke="#fff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>
      <div>
        {userRole && userRole == "admin" ? (
          <input
            className="inpout"
            onChange={(e) => {
              changeName(e);
            }}
            type="text"
            placeholder="name"
          />
        ) : null}
      </div>
    </div>
  );
}
