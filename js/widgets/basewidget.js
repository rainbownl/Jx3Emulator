export default class BaseWidget{
    rect = { left: 0, right: 0, top: 0, bottom: 0 }
    drawable = null

    draw(context){
        let rect = this.rect
        if (drawable != null){
            context.drawImage(drawable, rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top)
        }
    }
}