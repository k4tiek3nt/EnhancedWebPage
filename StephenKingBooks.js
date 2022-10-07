let btn = document.getElementById("btn");
btn.addEventListener("click", ajaxFunc);

function ajaxFunc(){

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function (){
        console.log("the readystate is " + this.readyState);
        if(this.readyState===4 && this.status===200){
            let bookInfo = JSON.parse(xhr.responseText);
            // console.log(bookInfo);
            // console.log(bookInfo.items[0].searchInfo.textSnippet);

            showInfo(bookInfo);            
        }

    }
    
    xhr.open("GET", "https://www.googleapis.com/books/v1/volumes?q=intitle:bag+of+bones+inauthor:stephen+king", true);
    xhr.send();
}

var i = 1;

function showInfo(bookInfo){
    let moreInfo = document.getElementById("moreInfo");
    let textSnip = document.createElement("p");

    textSnip.innerText = bookInfo.items[i].searchInfo.textSnippet;
    
    if(i<3){
        moreInfo.appendChild(textSnip);
        i++    
    }
}

//Fetch API

let btn2 = document.getElementById("btn2");
btn2.addEventListener("click", fetchFunc);

async function fetchFunc() {
	let response = await fetch(
		'https://www.googleapis.com/books/v1/volumes?q=inauthor:stephen+king', { method: "GET" }
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	let data = await response.json();
    console.log(data);
    moreBooks(data);
}

var j = 0;

async function moreBooks(data){
    let results = data.items;
    for (let book of results){
        let response = await fetch(
            'https://www.googleapis.com/books/v1/volumes?q=inauthor:stephen+king', { method: "GET" }
        ); 
        if(response.status===200){
            let nextBook = await response.json();
            console.log(nextBook);
            let img = document.createElement("img");
            img.src = nextBook.items[j].volumeInfo.imageLinks.smallThumbnail;
            document.getElementById("moreBooks").appendChild(img);
            j++
        }
    }
}