//Random colors code
//create color pairs array
let colorsArray = ["green","red","blue","yellow","pink","salmon","brown","purple","gray","lavender",
                    "olive","lawngreen","navy","cyan","lime","green","red","blue","yellow","pink",
                    "salmon","brown","purple","gray","lavender","olive","lawngreen","navy","cyan","lime"];
//Create empty array
let randomNumbers = [];
numberColors = colorsArray.length;

//Assign random number between 0 and 29 (number of colors)
for(let j=0; j<numberColors;j++){
    let random =(Math.random()*29).toFixed();
    //if random number is not include, it is added to the new array
    if(!randomNumbers.includes(random)){
        randomNumbers.push(random);
        //if the array size is minor than 30, it assigns a new random number and repeat the loop
    }else if(randomNumbers.length<numberColors){
        for(let j=0; j<numberColors;j++){
            let random =(Math.random()*29).toFixed();
            if(!randomNumbers.includes(random)){
            randomNumbers.push(random);
            }
        }
    }
}

//Select droppable area, in this case a section tag with id=container
let droppableArea = document.getElementById('container');

//Create div tags and add attributes
for (let i=0; i<numberColors; i++){
    let divs = document.createElement('div');
    //Attribute allows drag items if it is true
    divs.setAttribute('draggable', 'false');
    //Attribute class colors
    divs.setAttribute('class', 'colors');
    //Attribute data-color assigning a random color for each div
    divs.setAttribute('data-color', colorsArray[Number(randomNumbers[i])]);
    //Insert div tags to the section tag, index.html file
    droppableArea.appendChild(divs);
}

//Select all colors class items
let colors = document.getElementsByClassName('colors');
let click = [];

//Walk through the colors class elements
for(let c of colors){
    //Set the box background color style
    c.style.backgroundColor = 'black';
    //Add event when click over a box
    c.addEventListener('click', ()=>{
        //when click, get real color from the attribute data-color 
        let color = c.dataset.color;
        //Reveal the real color 
        c.style.backgroundColor = color;
        //Activate drag function changing the attribute state
        c.setAttribute('draggable', 'true');
        //add color to the empty array
        click.push(c);
        //if there is 2 boxes that not match, they turn back to black
        if(click.length > 1){
            c.style.backgroundColor = 'black';
            
        }
    });

    //Drag and drop code
    //Drag event
    c.addEventListener ('dragstart', (e)=>{
        //get a reference to the element that the user dragged, get real color from drag area(box)
        e.dataTransfer.setData('color', e.target.dataset.color);
    });

    //Drop event
    c.addEventListener('drop', function dropp (e){
        e.preventDefault();
        //Get real color from drop area(box)
        const data = e.dataTransfer.getData('color');
        //if drag area color equal to drop area color and the click had changed the attribute value to true
        if (e.target.dataset.color === data && click[0].getAttribute('draggable') === 'true'){
            //Get the real color
            let color = c.dataset.color;
            //Keep the real color over the box
            c.style.backgroundColor = color;
            //Change the drop area attribute to false and remove the drop event, in order to keep it in that way
            c.setAttribute('draggable', 'false');
            c.removeEventListener('drop', dropp);
            //Change the drag area attibute to false and remove the drop event, in order to keep it in that way
            click[0].setAttribute('draggable', 'false');
            click[0].removeEventListener('drop', dropp);
            //Empty array click to start again
            click.splice(0, click.length);
            //Code to check if the color match had been completed
            //Select all div elements
            let divsColors = document.getElementsByTagName('div');
            //Number of div tags
            numberOfDivs = divsColors.length;
            counter=1;
            //Walk through the colors backgrounds
            for (let d of divsColors){
                //If the color is different to black the counter add 1
                if(d.style.backgroundColor != 'black'){
                    counter = counter+1;
                    //if counter is equal to number of div tags, the game is over
                    if(counter == numberOfDivs){
                        //Create a new p tag
                        let youWon = document.createElement('p');
                        //Add text and style
                        youWon.textContent = `You WON, Your time was ${minutesLabel.innerHTML}:${secondsLabel.innerHTML}`;
                        youWon.style.fontSize = '50px';
                        youWon.style.color = 'red';
                        youWon.style.backgroundColor = 'yellow';
                        youWon.style.textAlign = 'center';
                        //Insert to the index.html the text "you won" and the time 
                        let firstMain = document.getElementById('firstMain');
                        firstMain.insertBefore(youWon,firstMain.firstElementChild);
                        minutesLabel.innerHTML = '00';
                        secondsLabel.innerHTML = '00';
                    }
                }

            }
        //if drag area color different to drop area color, then, it changes the attribute value to false and color to black
        }else{
            click[0].style.backgroundColor = 'black';
            click[0].setAttribute('draggable', 'false');
            //Set the array to empty to start again
            click.splice(0, click.length);
        }
    });
    //Dragover event
    droppableArea.addEventListener('dragover', (e)=>{
        //enables it to receive drop events
        e.preventDefault();
    }); 
}

//Timer
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
