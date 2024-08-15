//code generaiting
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
var colors = ["red", "yellow", "green", "orange", "pink", "purple", "blue", "white"]
var code = [colors[getRandomInt(8)], colors[getRandomInt(8)], colors[getRandomInt(8)], colors[getRandomInt(8)]]
var userHasWin = false

//general debuging
console.log(code)



// varibels
var row_index = 0 // the index of the row we are editing
var rowColord = [false, false, false, false]
var userWereCongratulated = false






//enter buttom: submiting the code guessing attempt
function enterClicked() {
    const answer = document.getElementById(`answer${row_index+1}-${1}`)
    //wining case
    userHasWin = true
    for (let i = 0; i < code.length; i++){
        if ((document.getElementById(`button${row_index+1}-${i+1}`).className).substring(8) != code[i]){
            userHasWin = false
        }
    }
    //wining
    if (userHasWin) {
        //making the enter not do anything after winning
        if (!userWereCongratulated){
            //congrating the user after winning
            alert("Good job, you have successfully decoded the code")
            userWereCongratulated = true
        }
    }

    else if (!userHasWin) {
        //loosing
        if (row_index >= 10)
            alert("Game Over :(")
        else {
            //making sure the row is filled
            if (rowColord[0] == true && rowColord[1] == true && rowColord[2] == true && rowColord[3] == true){
                row_index++
                rowColord = [false, false, false, false]
                


                //cheking much of right placings
                var rightPlaces = 0
                for (let i = 0; i < code.length; i++){
                    if (document.getElementById(`button${row_index}-${i+1}`).className.substring(8) == code[i])
                        rightPlaces++
                }

                //cheking much of right colors
                var rightColors = 0
                var colorIsRight = false
                for (let i = 0; i < code.length; i++){
                    colorIsRight = false
                    for (let j = 0; j < code.length; j++){
                        if ((document.getElementById(`button${row_index}-${i+1}`).className).substring(8) == code[j]){
                            colorIsRight = true}
                    }
                    if (colorIsRight)
                        rightColors++
                }

                //hints debuging
                console.log("rightPlaces = " + rightPlaces)
                console.log("rightColors = " + rightColors)



                //getting hints
                for (let i = 0; i < rightColors; i++){
                    const answer = document.getElementById(`answer${row_index}-${i+1}`);
                    answer.classList = `answer yellow`
                }
                for (let i = 0; i < rightPlaces ; i++){
                    const answer = document.getElementById(`answer${row_index}-${i+1}`);
                    answer.classList = `answer red`
                }
            }
            else
                alert("Fill the row before getting the next hint, you're in row number " + (row_index+1))
        }
    }

    //making the code shown at the buttom when winning or loosing
    if (userHasWin || row_index >= 10){
        for (let i = 0; i < code.length; i++){
            //fixing background color
            const result = document.getElementById(`codeColor${i+1}`)
            result.classList = `button1 ${code[i]}`

            //vanishing the text
            const circle = document.getElementById("TEXT" + String(i+1))
            circle.innerHTML = ''
        }
    }


    
    /*
    //Enter debuging
    console.log("userHasWin = " + userHasWin)
    console.log("row_index = " + row_index)
    */
}
    


//reset buttom: reseting game
function resetGame() {
    window.location.reload()
    alert("Start decoding the code (press ok), Good luck!")
}

function reply_click(clicked_id) {
    var x = clicked_id
    alert(x)
    return x
}



var dragColor = null
function setColor(id){
    dragColor = id.substring(4)
}




//propagating through all buttons and add event listeners to each one of them
for (let i = 0; i < 10; i++){
    var rowColord = [false, false, false, false]

    
    for (let j = 0; j < 4; j++) {
        const button = document.getElementById(`button${i+1}-${j+1}`);

        button.addEventListener('dragover', function(event) {
            if (!userHasWin || row_index >= 10)
                event.preventDefault()
        })

        button.addEventListener('drop', function(event) {
            //making sure the user is keep putting the colors at the right place
            if (i != row_index) {
                //making sure that after winning you cant change the code
                if (!userHasWin){
                    if (i < row_index) 
                        alert("edit an enterd code is not illegal")
                    else if (i > row_index)
                        alert("Enter the previus code before moving on for the next attempt")
                }
            return
            }

            button.classList = `button1 ${dragColor}`
            rowColord[j] = true
        })
    }
}