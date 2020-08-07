document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 28 //28 x 28 = 784 squares
    const leftwarp = 392
    const rightwarp = 419
    let score = 0

    
    // layout of grid and what is in the squares
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,4,4,4,4,4,
        4,4,4,4,4,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,4,4,4,4,4,
        4,4,4,4,4,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,1,1,1,1,1,
        0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,4,4,4,4,4,
        4,4,4,4,4,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,4,4,4,4,4,
        4,4,4,4,4,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    const squares = []
    // Legend
    // 0 - pac dot
    // 1 - wall
    // 2 - ghost lair
    // 3 - power pellet
    // 4 - empty


    function createBoard() {
        for(let i=0; i < layout.length; i++) {
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)

            //add layout to the board

            if(layout[i] === 0) {
                squares[i].classList.add('pac-dot')
            }
            else if(layout[i] === 1){
                squares[i].classList.add('wall')
                if(!(i+width === leftwarp || i-width === leftwarp || i+width === rightwarp || i-width === rightwarp))
                {
                    if(layout[i-1] !== 1 && layout[i-width] !== 1) squares[i].classList.add('wall-topleft')
                    if(layout[i+1] !== 1 && layout[i-width] !== 1) squares[i].classList.add('wall-topright')
                    if(layout[i-1] !== 1 && layout[i+width] !== 1) squares[i].classList.add('wall-bottomleft')
                    if(layout[i+1] !== 1 && layout[i+width] !== 1) squares[i].classList.add('wall-bottomright')
                }
            }
            else if(layout[i] === 2){
                squares[i].classList.add('ghost-lair')
            }
            else if(layout[i] === 3){
                squares[i].classList.add('power-pellet')
            }
        }
    }

    createBoard()

    let pacmanCurrentIndex = 490

    squares[pacmanCurrentIndex].classList.add('pac-man')

    function movePacman(e) {

        squares[pacmanCurrentIndex].classList.remove('pac-man')

        switch(e.keyCode) {
            case 37:
            if(pacmanCurrentIndex % width !== 0 
                && !squares[pacmanCurrentIndex -1].classList.contains('wall')
                && !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair'))
                pacmanCurrentIndex -=1

            else if((pacmanCurrentIndex) === leftwarp) pacmanCurrentIndex = rightwarp
                break
            case 38:
                if(pacmanCurrentIndex - width >= 0 
                && !squares[pacmanCurrentIndex - width].classList.contains('wall')
                && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair'))
                pacmanCurrentIndex -= width
                break
            case 39:
            if(pacmanCurrentIndex % width < width-1  
                && !squares[pacmanCurrentIndex +1].classList.contains('wall') 
                && !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair'))
                pacmanCurrentIndex +=1
            
            else if((pacmanCurrentIndex) === rightwarp) pacmanCurrentIndex = leftwarp
                break
            case 40:
            if(pacmanCurrentIndex + width <= layout.length  
                && !squares[pacmanCurrentIndex + width].classList.contains('wall')
                && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair'))
                pacmanCurrentIndex += width
                break
        }
    console.log(pacmanCurrentIndex)    

        squares[pacmanCurrentIndex].classList.add('pac-man')


        pacDotEaten()
        //powerPeletEaten
        //checkGameOver
        //checkforwin
    }

    document.addEventListener('keyup', movePacman)

    function pacDotEaten() {
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            score++
            scoreDisplay.innerHTML = score
        }
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }

    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.currentDirection = null
            this.timerId = NaN
            this.leftLair = false
        }
    }

    ghosts = [
        new Ghost('blinky', 29, 250),
        new Ghost('pinky', 379, 250),
        new Ghost('inky', 404, 250),
        new Ghost('clyde', 407, 250),
    ]

    // draw my ghosts
    ghosts.forEach(ghost => {
        console.log("Hello")
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
    });

    // move ghosts randomly
    ghosts.forEach(ghost => {
        const ghostDirection = [-1, +width, +1, -width]
        let direction = ghostDirection[Math.floor(Math.random() * ghostDirection.length)]

        if (ghost.className === 'blinky'){
            ghostX = ghost.currentIndex % width
            ghostY = Math.floor(ghost.currentIndex / width)

            pacX = pacmanCurrentIndex % width
            pacY = Math.floor(pacmanCurrentIndex / width)
        }

        ghost.timerId = setInterval(() => {
            if(!squares[ghost.currentIndex + direction].classList.contains('wall')){
                squares[ghost.currentIndex].classList.remove(ghost.className)
                squares[ghost.currentIndex].classList.remove('ghost')
                ghost.currentIndex += direction
                squares[ghost.currentIndex].classList.add(ghost.className)
                squares[ghost.currentIndex].classList.add('ghost')
            }else{
                direction = ghostDirection[Math.floor(Math.random() * ghostDirection.length)]
            }
            }, 100);
    });

    function getGhostDirection(ghost){

    }

})


