const AppController = {
    start: function(){
        //click on submit name
        const enterName = document.querySelector(".submitName")
        enterName.addEventListener("click",UIController.enterName)
        enterName.addEventListener("click",this.createNewGame)
        //open leaderboard
        const openBoard = document.querySelector(".open-leaderboard")
        openBoard.addEventListener("click",UIController.openLeaderboard)
        //close leaderboard
        const closeBoard = document.querySelector(".closeButton")
        closeBoard.addEventListener("click",this.closeLeaderboard)
    },
    
    clickPosition: function(){
        //click on card
        const cardClick = document.querySelector(".play-area")
        cardClick.addEventListener("click",this.onClick)
        //click on newgame
        const newGame = document.querySelector(".new-game")
        newGame.addEventListener("click",this.createNewGame)
        //give up button
        const giveUp = document.querySelector(".give-up")
        giveUp.addEventListener("click",this.giveUp)
    },
    
    onClick: function(event){
        const parentElement = event.target.parentNode.parentNode.id
        var cardClick = document.getElementById(parentElement)
        if(LogicController.dataCollected.cardClicked.indexOf(cardClick) == -1){
            LogicController.collectData(parentElement) 
            UIController.flipUp(cardClick)
            if(LogicController.dataCollected.cardClicked.length % 2 == 0){
                setTimeout(function(){
                    LogicController.checkMatch()  
                },800)
            }
        }
    },
    
    createNewGame: function(){
        UIController.displayChange()
        LogicController.resetCardAdded()
        LogicController.resetData()
        LogicController.resetCard()
        setTimeout(function(){
            LogicController.changeCardPosition()   
        },600)
        UIController.timeCountdown(300)
        document.querySelector(".level").textContent=1
    },
    
    closeLeaderboard: function(){
        var leaderboard=document.querySelector(".leaderboard").classList
        var overlay=document.querySelector(".overlay").classList
        leaderboard.remove("active")
        overlay.remove("active")
    },
    
    giveUp: function(){
        LogicController.addLeaderboardData()
        LogicController.addCurrentData()
        UIController.openLeaderboard()
        document.querySelector(".play-area").classList.add("hidden")
        document.querySelector(".give-up").classList.add("hidden")
    }
}

const UIController = {
    enterName: function(){
        AppController.clickPosition()
        var playerName=document.querySelector("#username").value
        document.querySelector(".name").textContent=playerName
    },
    
    flipUp: function(id){
        id.style.transform = "rotateY(0deg)"
    },
    
    flipDown: function(id){
        id.style.transform = "rotateY(180deg)"
    },
    
    timeCountdown: function(timeLeft){
        var timeRemain = setInterval(function(){
            document.querySelector(".time").textContent = timeLeft
            if(timeLeft === 0){
                clearInterval(timeRemain)
                AppController.giveUp()
            }
            timeLeft--
        },1000)
        document.querySelector(".new-game").addEventListener("click",stop)
        document.querySelector(".give-up").addEventListener("click",stop)
        document.querySelector(".submitName").addEventListener("click",stop)
        function stop(){
            clearInterval(timeRemain)
        }
    },
    
    displayChange: function(){
        document.querySelector(".play-area").classList.remove("hidden")
        document.querySelector(".give-up").classList.remove("hidden")
        document.querySelector(".game-button").classList.remove("hidden")
        document.querySelector(".instruction").classList.add("hidden")
    },
    
    nextLevel: function(level){
        switch (level){
            case 2:
                for(i=17;i<=20;i++){
                    let innerHTML='<div class="card-container"><div class="card" id="card16"><div class="card-back"><img class="back" src="cardBack.jpg"></div><div class="card-front"><img class="flip" src="img8.jpg"></div></div>'
                    innerHTML=innerHTML.replace("card16","card"+i)
                    document.querySelector(".play-area").insertAdjacentHTML("beforeend",innerHTML)
                }
                LogicController.dataCollected.imgArr.push("img9.jpg","img9.jpg","img10.jpg","img10.jpg")
                document.querySelector(".play-area").style.gridTemplateColumns = "repeat(5, auto)"
                document.querySelector(".level").textContent=level
                break;
            case 3:
                for(i=21;i<=24;i++){
                    let innerHTML='<div class="card-container"><div class="card" id="card16"><div class="card-back"><img class="back" src="cardBack.jpg"></div><div class="card-front"><img class="flip" src="img8.jpg"></div></div>'
                    innerHTML=innerHTML.replace("card16","card"+i)
                    document.querySelector(".play-area").insertAdjacentHTML("beforeend",innerHTML)
                }
                LogicController.dataCollected.imgArr.push("img11.jpg","img11.jpg","img12.jpg","img12.jpg")
                document.querySelector(".play-area").style.gridTemplateColumns = "repeat(6, auto)"
                document.querySelector(".level").textContent=level
                break;
        }
    },
    
    openLeaderboard: function(){
        var leaderboard=document.querySelector(".leaderboard").classList
        var overlay=document.querySelector(".overlay").classList
        leaderboard.add("active")
        overlay.add("active")
    },
}

const LogicController = {
    dataCollected: {
        level: 1,
        cardMatched: 0,
        cardClicked: [],
        imgSrc: [],
        imgArr: ["img1.jpg","img1.jpg","img2.jpg","img2.jpg","img3.jpg","img3.jpg","img4.jpg","img4.jpg","img5.jpg","img5.jpg","img6.jpg","img6.jpg","img7.jpg","img7.jpg","img8.jpg","img8.jpg"],
    },
    
    collectData: function(event){
        var cardClicked = document.getElementById(event)
        var cardImg = document.querySelector("#"+event+" .flip").src
        this.dataCollected.cardClicked.push(cardClicked)
        this.dataCollected.imgSrc.push(cardImg)
    },
    
    checkMatch: function(event){
        if(this.dataCollected.imgSrc[0] === this.dataCollected.imgSrc[1]){
            this.dataCollected.cardClicked[0].style.display = "none"
            this.dataCollected.cardClicked[1].style.display = "none"
            this.dataCollected.cardClicked.splice(0,2)
            this.dataCollected.imgSrc.splice(0,2)
            this.dataCollected.cardMatched += 1
            this.checkComplete(this.dataCollected.level)
        }else{
            UIController.flipDown(this.dataCollected.cardClicked[0])
            UIController.flipDown(this.dataCollected.cardClicked[1])
            this.dataCollected.cardClicked.splice(0,2)
            this.dataCollected.imgSrc.splice(0,2)
        }
    },
    
    checkComplete: function(level){
        switch (level){
            case 1:
                if(LogicController.dataCollected.cardMatched===8){
                    LogicController.dataCollected.level+=1
                    UIController.nextLevel(LogicController.dataCollected.level)
                    LogicController.resetCard()
                    LogicController.dataCollected.cardMatched = 0
                    setTimeout(function(){
                        LogicController.changeCardPosition()   
                    },600)
                };
                break;
                
            case 2:
                if(LogicController.dataCollected.cardMatched===10){
                    LogicController.dataCollected.level+=1
                    UIController.nextLevel(LogicController.dataCollected.level)
                    LogicController.resetCard()
                    LogicController.dataCollected.cardMatched = 0
                    setTimeout(function(){
                        LogicController.changeCardPosition()   
                    },600)
                };
                break;
                
            case 3:
                if(LogicController.dataCollected.cardMatched===12){
                    LogicController.dataCollected.level+=1
                    AppController.giveUp()
                    alert("You won the game")
                };
        }
    },
    
    randomArr: function(){
        for(i = LogicController.dataCollected.imgArr.length-1 ; i>0 ; i--){
            const j = Math.floor(Math.random()*(i+1))
            var change = LogicController.dataCollected.imgArr[j]
            LogicController.dataCollected.imgArr[j] = LogicController.dataCollected.imgArr[i]
            LogicController.dataCollected.imgArr[i] = change
        }
    },
    
    changeCardPosition: function(){
        LogicController.randomArr()
        for(i = 1 ; i <= LogicController.dataCollected.imgArr.length ; i++){
            document.querySelector("#"+"card"+i+" .flip").src = LogicController.dataCollected.imgArr[i-1]
        }
    },
    
    resetCard: function(){
        for(i = 1 ; i <= LogicController.dataCollected.imgArr.length ; i++){
            document.querySelector("#"+"card"+i).style.transform = ""
            document.querySelector("#"+"card"+i).style.display = ""
            document.querySelector("#"+"card"+i).style.display = ""
        }
    },
    
    resetData: function(){
        LogicController.dataCollected.level = 1
        LogicController.dataCollected.cardMatched = 0
        LogicController.dataCollected.cardClicked = []
        LogicController.dataCollected.imgSrc = []
        LogicController.dataCollected.imgArr = ["img1.jpg","img1.jpg","img2.jpg","img2.jpg","img3.jpg","img3.jpg","img4.jpg","img4.jpg","img5.jpg","img5.jpg","img6.jpg","img6.jpg","img7.jpg","img7.jpg","img8.jpg","img8.jpg"]
        document.querySelector(".play-area").style.gridTemplateColumns = "repeat(4, auto)"
    },
    
    resetCardAdded: function(){
        for(i=17;i<=LogicController.dataCollected.imgArr.length;i++){
            var removeCardAdded=document.querySelector("#"+"card"+i).parentNode
            removeCardAdded.parentNode.removeChild(removeCardAdded)
        }
    },
    
    playerDataCollect: function(){
        if(localStorage.numberPlayer){
            localStorage.numberPlayer++
            console.log(localStorage.numberPlayer)
        }else{
            localStorage.numberPlayer=1
            localStorage.setItem("playerData","[]")
            console.log(localStorage.numberPlayer)
        }
        var playerID=localStorage.numberPlayer
        var playerName=document.querySelector(".name").textContent
        var timeCost=300-Number(document.querySelector(".time").textContent)
        var level=document.querySelector(".level").textContent
        return {
            playerID: playerID,
            name: playerName,
            time: timeCost,
            level: Number(level)-1
        }
    },
    
    addLocal: function(player){
        playerArr=JSON.parse(localStorage.playerData)
        playerArr.push(player)
        localStorage.playerData=JSON.stringify(playerArr)
    },
    
    sortPlayer: function(){
        this.addLocal(this.playerDataCollect())
        playerArr=JSON.parse(localStorage.playerData)
        playerArr.sort(function(a, b){return (b.level-a.level)})
        playerArr.sort(function(a, b){if(a.level==b.level){return (a.time-b.time)}})
        return(playerArr)
    },
    
    addLeaderboardData: function(){
        playerArr=this.sortPlayer()
        console.log(playerArr)
        for(i=1;i<=playerArr.length&&i<=5;i++){
            document.querySelector("#no"+i+"-name").innerHTML = playerArr[i-1].name
            document.querySelector("#no"+i+"-time").innerHTML = playerArr[i-1].time
            document.querySelector("#no"+i+"-level").innerHTML = playerArr[i-1].level
        }
    },
    
    addCurrentData: function(){
        var currentPosition = playerArr.findIndex(function(a){if(a.playerID==localStorage.numberPlayer){return(a)}})
        document.querySelector("#current-no").innerHTML = currentPosition+1
        document.querySelector("#curren-name").innerHTML = playerArr[currentPosition].name
        document.querySelector("#curren-time").innerHTML = playerArr[currentPosition].time
        document.querySelector("#curren-level").innerHTML = playerArr[currentPosition].level
    }
}
AppController.start()
LogicController.addLeaderboardData()

