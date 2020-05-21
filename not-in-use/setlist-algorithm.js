calculateTopSetlist(){
  var result = {};
  // iterate over array of objects
  for (var i = 0; i < this.state.allSetlists.length; i++){
    result[i] = [];
    // iterate over the song key which contains array of songs for each obj
    for (var j = 0; j < 9; j++){
      // push the songs into corresponding key in the result obj 0-7
      result[i].push(this.state.allSetlists[i].songs[j])
      console.log('result', result)
    }
  }
  // iterate over keys 0-7 in result obj
  var setObjBySong = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: []}
  for (var key in result){
    console.log('result[key]', result[key])
    // this creates one persons setlist
    // var setArr = result[key].join(',').split(', ');
    var setArr = result[key];
    console.log('setArr: should be one setlist', setArr)
    // iterate over that persons setlist
   var songAtNumArr = []
    for (var k = 0; k < 8; k++){
      // each key 1-8 will contain all songs by all fans at the position
      setObjBySong[k].push(setArr[k]);
      console.log('setObjBySong[k], should be an array with songs', setObjBySong[k]);
      // if (setArr[k] === '' || !setArr[k]){
      //   continue;
      // }
      // if the song is not already a key
      // if (setObjBySong[k] === undefined){
      //   // make a space for it and set to 1
      //   setObjBySong[k] = arrayAtNum;
      //   console.log('setObjBySong[k] should be a song', setObjBySong[k])
      // }
              // else add one to the song
              // setObjBySong[setArr[k]]++;
              // console.log('setObjBySong[setArr[k]] after adding ++', setObjBySong[setArr[k]])

      }
    }
      for (var key in setObjBySong){
        var songsAtPosition = {};
        for (var x = 0; x < setObjBySong[key].length; x++){
          var song = setObjBySong[key][x];
      if (song === '' || !song){
        continue;
      }
      //if the song is not already a key
      if (songsAtPosition[song] === undefined){
        // make a space for it and set to 1
        songsAtPosition[song] = 1;
        console.log('songsAtPosition[song] should be a num', songsAtPosition[song]);
        console.log('songsAtPosition obj', songsAtPosition);
      }
              // else add one to the song
              songsAtPosition[song]++;
              console.log('songsAtPosition after adding ++', songsAtPosition)

        }
        var max = Object.values(songsAtPosition)[0];
        console.log('Object.values(songsAtPosition)', Object.values(songsAtPosition));
        var topSong = Object.keys(songsAtPosition)[0];
        console.log('Object.keys(songsAtPosition)', Object.keys(songsAtPosition))
        // iterate over object values in objBySong which are numbers
        for (var m = 0; m < Object.values(songsAtPosition).length; m++){
          // if song was chosen more than max
          if (Object.values(songsAtPosition)[m] > max){
            // it is now the max
            max = Object.values(songsAtPosition)[m];
            topSong = Object.keys(songsAtPosition)[m];
          }



    }
    this.setState({
      topSetlist: this.state.topSetlist.push(topSong)
    })


  }

}