var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;
        setInterval(setTime, 1000);

        function setTime()
        {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds%60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        }

        function pad(val)
        {
            var valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }

//create blocks
let colorsArray = ["green","red","blue","yellow","pink","salmon","brown","purple","gray","lavender",
                    "olive","lawngreen","navy","cyan","lime","green","red","blue","yellow","pink",
                    "salmon","brown","purple","gray","lavender","olive","lawngreen","navy","cyan","lime"];
let randomNumbers = [];
numberColors = colorsArray.length;

for(let j=0; j<numberColors;j++){
    let random =(Math.random()*29).toFixed();
    if(!randomNumbers.includes(random)){
        randomNumbers.push(random);
    }else if(randomNumbers.length<numberColors){
        for(let j=0; j<numberColors;j++){
            let random =(Math.random()*29).toFixed();
            if(!randomNumbers.includes(random)){
            randomNumbers.push(random);
            }
        }
    }
}

let droppableArea = document.getElementById('container');

for (let i=0; i<numberColors; i++){
    let divs = document.createElement('div');
    divs.setAttribute('draggable', 'false');
    divs.setAttribute('class', 'colors');
    divs.setAttribute('data-color', colorsArray[Number(randomNumbers[i])]);
    droppableArea.appendChild(divs);
}

let colors = document.getElementsByClassName('colors');
let click = [];

for(let c of colors){
    c.style.backgroundColor = 'black';
    c.addEventListener('click', ()=>{
        let color = c.dataset.color;
        c.style.backgroundColor = color;
        c.setAttribute('draggable', 'true');
        click.push(c);
        if(click.length > 1){
            c.style.backgroundColor = 'black';
        }
    });

    c.addEventListener ('dragstart', (e)=>{
        e.dataTransfer.setData('color', e.target.dataset.color);
    });

    
    c.addEventListener('drop', function dropp (e){
        e.preventDefault();
        const data = e.dataTransfer.getData('color');
        if (e.target.dataset.color === data && click[0].getAttribute('draggable') === 'true'){
            let color = c.dataset.color;
            c.style.backgroundColor = color;
            c.setAttribute('draggable', 'false');
            c.removeEventListener('drop', dropp);
            click[0].setAttribute('draggable', 'false');
            click[0].removeEventListener('drop', dropp);
            click.splice(0, click.length);
            console.log(c.style.backgroundColor);
            let divsColors = document.getElementsByTagName('div');
            numberOfDivs = divsColors.length;
            counter=1;
            for (let d of divsColors){
                if(d.style.backgroundColor != 'black'){
                    counter = counter+1;
                    if(counter == numberOfDivs){
                        let youWon = document.createElement('p');
                        youWon.textContent = `You WON, Your time was ${minutesLabel.innerHTML}:${secondsLabel.innerHTML}`;
                        youWon.style.fontSize = '50px';
                        youWon.style.color = 'red';
                        youWon.style.backgroundColor = 'yellow';
                        youWon.style.textAlign = 'center';
                        let firstMain = document.getElementById('firstMain');
                        firstMain.insertBefore(youWon,firstMain.firstElementChild);
                        minutesLabel.innerHTML = '00';
                        secondsLabel.innerHTML = '00';
                    }
                }

            }
            console.log(divsColors);
            
        }else if (c.style.backgroundColor != 'black'){
            c.style.backgroundColor = c.dataset.color;
        }else{
            click[0].style.backgroundColor = 'black';
            click.splice(0, click.length);
        }
    });


    droppableArea.addEventListener('dragover', (e)=>{
        e.preventDefault();
    }); 
}
