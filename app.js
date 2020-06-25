const AppController={
    start: function(){
        const cardClick=document.querySelector(".play-area")
        const newGame=document.querySelector(".new-game")
        cardClick.addEventListener("click",this.flipCard)
        newGame.addEventListener("click",this.createNewGame)
    },
    flipCard: function(event){
        if(LogicController.cardData.imgSrc.length<2){
            const parentElement = event.target.parentNode.parentNode.id
            var cardClick=document.getElementById(parentElement)
            LogicController.cardClicked(parentElement)
            cardClick.style.transform="rotateY(0deg)"
            if(LogicController.cardData.imgSrc.length==2){
                setTimeout(function(){
                    LogicController.checkMatch(parentElement)  
                },1500)
            }
        }
    },
    
    createNewGame: function(){
        LogicController.flipBackAll()
        LogicController.changeCardPosition()
        LogicController.clearData()
        LogicController.timeCountdown(120)
    }
}

const LogicController={
    cardData: {
        cardId: [],
        imgSrc: [],
        firstTag: [],
        imgArr:["img1.jpg","img1.jpg","img2.jpg","img2.jpg","img3.jpg","img3.jpg","img4.jpg","img4.jpg","img5.jpg","img5.jpg","img6.jpg","img6.jpg","img7.jpg","img7.jpg","img8.jpg","img8.jpg"],
        imgDiv: []
    },
    
    cardClicked: function(id){
        if(id != this.cardData.cardId[0]){
            var img=document.querySelector("#"+id+" .flip").src
            var tag=document.getElementById(id)
            var imgDiv=document.getElementById(id).children
            this.cardData.cardId.push(id)
            this.cardData.imgSrc.push(img)
            this.cardData.firstTag.push(tag)
            this.cardData.imgDiv.push(imgDiv)
        }
    },
    
    checkMatch: function(id){
        LogicController.cardData.cardId=[]
        LogicController.cardData.firstTag[0].style.transform="rotateY(180deg)"
        LogicController.cardData.firstTag[1].style.transform="rotateY(180deg)"
        if(this.cardData.imgSrc[0]==this.cardData.imgSrc[1]){
            LogicController.cardData.imgDiv[0][0].style.display="none"
            LogicController.cardData.imgDiv[0][1].style.display="none"
            LogicController.cardData.imgDiv[1][0].style.display="none"
            LogicController.cardData.imgDiv[1][1].style.display="none"
            LogicController.cardData.imgSrc=[]
            LogicController.cardData.firstTag=[]
            LogicController.cardData.imgDiv=[]
        }else{
            LogicController.cardData.imgSrc=[]
            LogicController.cardData.firstTag=[]
            LogicController.cardData.imgDiv=[]
        }
    },
    
    randomArr: function(){
        for(i=LogicController.cardData.imgArr.length-1;i>0;i--){
            const j=Math.floor(Math.random()*(i+1))
            var change=LogicController.cardData.imgArr[j]
            LogicController.cardData.imgArr[j]=LogicController.cardData.imgArr[i]
            LogicController.cardData.imgArr[i]=change
        }
    },
    
    changeCardPosition: function(){
        LogicController.randomArr()
        setTimeout(function(){
            for(i=1;i<=16;i++){
                document.querySelector("#"+"card"+i+" .flip").src = LogicController.cardData.imgArr[i-1]
            }    
        },1000)
    },
    
    timeCountdown: function(timeLeft){
        var timeRemain=setInterval(function(){
            timeLeft--
            document.querySelector(".time").textContent=timeLeft
            if(timeLeft==0){
                clearInterval(timeRemain)
                alert("Hết Giờ")
            }
        },1000)
        document.querySelector(".new-game").addEventListener("click",stop)
        function stop(){
            clearInterval(timeRemain)
        }
    },
    
    flipBackAll: function(){
        for(i=1;i<=16;i++){
            document.querySelector("#"+"card"+i).style.transform=""
            document.querySelector("#"+"card"+i).children[1].style.display=""
            document.querySelector("#"+"card"+i).children[0].style.display=""
        }
    },
    
    clearData: function(){
        LogicController.cardData.imgSrc=[]
        LogicController.cardData.firstTag=[]
        LogicController.cardData.imgDiv=[]
        LogicController.cardData.cardId=[]
    }
}
AppController.start()
LogicController.timeCountdown(120)