import React from 'react'

// Return colour scheme for Light, Dark, Darker

export function getLightColor (mode){
  
  if(mode == 'default'){
    return '#de6562';
  }
  else if(mode == 'break'){
    return '#5a9b9c';
  }
  else{
    return '#588cb1';
  }
}

export function  getDarkColor (mode) {
  
  if(mode == 'default'){
    return '#db524d';
  }
  else if(mode == 'break'){
    return '#468e90';
  }
  else{
    return '#437ea8';
  }
}

export function  getDarkerColor (mode) {
  if(mode == 'default'){
    return '#c15755';
  }
  else if(mode == 'break'){
    return '#4d8786';
  }
  else{
    return '#4b7999';
  }
}