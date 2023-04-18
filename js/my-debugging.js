//Does a more compliated yet concise way of console.log
function purr(input, type){
  if(input == undefined){
    console.log("Code is running");
    return;
  }

  if(type == undefined){
    console.log(`${input}`)
  }else if(type == "t"){
    console.log(`-----${input}-----`);
  }else if(type == "o"){
    console.log(input);
  }else if(type == "a"){
    console.table(input);
  }
}
