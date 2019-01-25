export default class Background{
    skyHeight
    groundHeight
    width
    skyColor
    groundColor

    constructor(src){
        if(src != null){
            this.image = wx.createImage()
            this.image.src = src
        }
    }

    draw(context){
        if (this.image != null){
            context.draw(this.image, 0, 0, this.width, this.skyHeight + this.groundHeight)
        } else {
            context.fillStyle = this.skyColor
            context.fillRect(0, 0, this.width - 1, this.skyHeight - 1)
            context.fillStyle = this.groundColor
            context.fillRect(0, this.skyHeight, this.width - 1, this.skyHeight + this.groundHeight - 1)
        }
    }
    
}