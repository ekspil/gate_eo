function bigdata(){
//console.log("Биг дата начало");
  var cards = [
  '0006098017',
  '0006094679',
  '0006113112',
  '0006109784',
  '0006114933',
  '0006117523',
  '0006118107',
  '0006098085',
  '0006097052',
  '0006088887',
  '0006087988',
  '0006084949',
  '0006087811',
  '0006085103',
  '0006081244',
  '0006081412',
  '0006082255',
  '0006106100',
  '0006107747',
  '0006115554',
  '0006116575',
  '0006118323',
  '0006117127',
  '0006110914'];
  var bi = 0;
  for (var i = 0; i < 10000000; i++){
    bi = bi + 1;
    if (bi == 24){
      bi =0;
    }
    var text = i;
    cards[bi] = cards[bi].toString() + text.toString();
    //console.log(cards[bi]);

  }
  //console.log("Биг дата Конец");
  return cards[5].length;

};

async function testFunc() {
  const datainfo = await bigdata();
  console.log(datainfo);
}

setTimeout( testFunc, 0);
console.log('Эту надпись должна быть в начале!');
console.log('Эту надпись должна быть в начале!');
console.log('Эту надпись должна быть в начале!');
console.log('Эту надпись должна быть в начале!');
console.log('Эту надпись должна быть в начале!');
console.log('Эту надпись должна быть в начале!');
console.log('Эту надпись должна быть в начале!');
console.log('Эту надпись должна быть в начале!');
console.log('Эту надпись должна быть в начале!');
console.log('Эту надпись должна быть в начале!');
console.log('Эту надпись должна быть в начале!');
console.log('Эту надпись должна быть в начале!');
