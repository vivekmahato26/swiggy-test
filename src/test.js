

m = arr.map(e => {
    const details = e.childNodes[0].childNodes[0].childNodes[1];
    const name = details.childNodes[1].childNodes[0].innerText;
    const price = details.childNodes[2].childNodes[0].childNodes[0].innerText;
    const desc = details.childNodes[3].innerText;
    const imgCont =  e.childNodes[0].childNodes[0].childNodes[2];
    const img = imgCont.childNodes[0].childNodes[0].childNodes[0].getAttribute("src");
    return {name,price,desc,img}
})