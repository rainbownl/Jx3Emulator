export default class Hero{
    x
    y
    speed
    width
    height
    direction   // -1: 左  1 右  0 停止

    constructor(src){
        let img = wx.createImage()
        img.src = src
        this.image = img
    }

    move(leftRange, rightRange){
        this.x += this.speed * this.direction
        if(this.x < leftRange) this.x = leftRange
        if(this.x + this.width > rightRange) this.x = rightRange - this.width
    }

    kill(object){
        if(object.x + object.width >= this.x && object.x <= this.x + this.width &&
            object.y + object.height >= this.y){
                object.speedX = 0
                object.speedY = -object.speedY
                object.accelerate = 0
                return true
        }
        return false
    }

    draw(context){
        if (this.image != null){
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }
}