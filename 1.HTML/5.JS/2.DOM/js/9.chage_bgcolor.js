  
  
  function changeBGColor(){
       
    if( document.body.style.backgroundColor == 'red'){  document.body.style.backgroundColor = 'blue';}
    else { document.body.style.backgroundColor = 'red';}
            
  }

   let index = 0;
  function changeBGColor_Cycle(){
    
    const colors = ["red", "blue", "green"];
  
    if( document.body.style.backgroundColor == colors[index]){  document.body.style.backgroundColor = colors[index];}
    else if(document.body.style.backgroundColor == colors[index]) { document.body.style.backgroundColor = colors[index];}
    else if(document.body.style.backgroundColor == colors[index]) { document.body.style.backgroundColor = colors[index];}
    else{document.body.style.backgroundColor = colors[index];}

    if(index < colors.length){
      index++;
    }
    else{
      index = 0;
    }

    console.log(index);
    
            
  }

  let currentIndex = 0;

  function changeBGColor_Cycle2(){
    
    const colors = ["red", "blue", "green"];  
    console.log("현재 인덱스", currentIndex);

    document.body.style.backgroundColor = colors[currentIndex++];
    
    if(currentIndex > 2){
      currentIndex = 0;
    }
    
  }

  //무작위 수사 만들기..."랜덤"이라고 부름
  //힌트 : RGB 랜덤 

