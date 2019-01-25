export default class ScoreAnimation{
    x
    y
    width
    height
    startx
    starty
    endx
    endy
    frameCount
    currentFrame
    score

    draw(context){
        let text = '+' + score
        context.textAlign = 'center'
        context.strokeText(text, this.x, this.y, this.width)
    }

    move(){
        let step = (this.endy - this.starty)/this.frameCount
        y += step
        if (y < this.endy){
            return -1
        }
        return 0
    }
}