import BaseWidget from 'basewidget.js'

export default class Label extends BaseWidget{
    clickDrawable = null
    status = 0  // 0 normal 1 clicked
    text = ''
    normalColor
    clickedColor
    textSize = 10

    draw(context) {
        let rect = this.rect
        let drawable = null
        let textColor = null
        if (this.status == 0) {
            drawable = this.drawable
            textColor = this.normalColor
        } else if (this.status == 1){
            drawable = this.clickDrawable
            textColor = this.clickedColor
        }
        if (this.drawable != null) {
            context.drawImage(drawable, rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top)
        }
        if (textColor != null && this.text != null){
            context.textAlign = 'center'
            context.font= "" + this.textSize + "px"
            context.strokeColor = textColor
            context.strokeText(this.text, (rect.left + rect.right)/2, 
                (rect.top + rect.bottom)/2 + this.textSize/2,
                rect.right - rect.left)
        }
    }
}