const AppController = {
    start: function(){
        const cardClick = document.querySelector(".play-area")
        const newGame = document.querySelector(".new-game")
        cardClick.addEventListener("click",this.onClick)
        newGame.addEventListener("click",this.createNewGame)
        UIController.timeCountdown(120)
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
        LogicController.resetCardAdded()
        LogicController.resetData()
        LogicController.resetCard()
        setTimeout(function(){
            LogicController.changeCardPosition()   
        },600)
        UIController.timeCountdown(120)
    }
}

const UIController = {
    flipUp: function(id){
        id.style.transform = "rotateY(0deg)"
    },
    
    flipDown: function(id){
        id.style.transform = "rotateY(180deg)"
    },
    
    timeCountdown: function(timeLeft){
        var timeRemain = setInterval(function(){
            timeLeft--
            document.querySelector(".time").textContent = timeLeft
            if(timeLeft === 0){
                clearInterval(timeRemain)
                alert("Hết Giờ")
            }
        },1000)
        document.querySelector(".new-game").addEventListener("click",stop)
        function stop(){
            clearInterval(timeRemain)
        }
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
    }
}
AppController.start()

