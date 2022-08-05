  const sliceString = (string, lenghtString = 13,point = true) =>{
    if(string){
        return string && string.length > lenghtString ? string.slice(0, lenghtString) + (point ? '...' : '') : string;
    }

  }

  export default sliceString;