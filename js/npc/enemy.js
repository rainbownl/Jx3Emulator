export default class Enemy{
    x
    y
    speedX          //pixels per frame
    speedY
    accelerate
    image
    width
    height

    constructor(src){
        this.image = wx.createImage()
        this.image.src = src
    }


    nextFrame(){
        this.x += this.speedX
        this.y += this.speedY
        this.speedY += this.accelerate
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    isOutOfRange(rect){
        if ((this.x + this.width) < rect.left || this.x > rect.right || (this.y + this.height) < rect.top || this.y > rect.bottom){
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
}