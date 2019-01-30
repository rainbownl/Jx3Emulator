export default class Enemy{
    x = 0
    y = 0
    speedX = 0          //pixels per frame
    speedY = 0
    accelerate = 0
    image = null
    width = 0
    height = 0

    explosion = null
    explosionFrame = 0

    constructor(src){
        this.image = wx.createImage()
        this.image.src = src
    }


    move(){
        if (this.explosion == null) {
            this.x += this.speedX
            this.y += this.speedY
            this.speedY += this.accelerate
        }
    }

    draw(context){
        if (this.explosion != null && this.explosionFrame < this.explosion.length) {
            context.drawImage(this.explosion[this.explosionFrame], this.x, this.y, this.width, this.height)
            this.explosionFrame++
        } else {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }

    isOutOfRange(rect){
        if ((this.x + this.width) < rect.left || this.x > rect.right || (this.y + this.height) < rect.top || 
            this.y > rect.bottom){
            return true
        }
        return false
    }

    isClick(x, y) {
        if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height){
            return true
        }
        return false
    }

    startExplosion(){
        this.explosion = new Array()
        for(let i = 1; i <= 19; i++){
            let img = wx.createImage()
            img.src = 'images/explosion' + i + '.png'
            this.explosion.push(img)
        }
    }

    //return 0 没炸  1 正在炸 2 结束了
    explosionProgress(){
        if (this.explosion == null) {
            return 0
        } else if (this.explosionFrame < this.explosion.length) {
            return 1
        } else {
            return 2
        }
    }
}