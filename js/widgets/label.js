import BaseWidget from 'basewidget.js'

export default class Label extends BaseWidget{
    clickDrawable = null
    status  // 0 normal 1 clicked
    text = ''
    normalColor
    clickedColor
    textSize = 20

    draw(context) {
        let rect = this.rect
        if (this.status == 0) {
            if (this.drawable != null){
                context.drawImage(this.drawable, rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top)
            }
            context.textAlign = 'center'
            context.strokeColor
            context.strokeText(text, rect.left, rect.top, rect.right - rect.left)
        } else if (this.status == 1){

        }
    }
}