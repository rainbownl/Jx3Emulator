export default class BaseWidget{
    rect = { left: 0, right: 0, top: 0, bottom: 0 }
    drawable = null
    id = 0
    pageManager
    
    draw(context){
        let rect = this.rect
        if (this.drawable != null){
            context.drawImage(this.drawable, rect.left, rect.top, rect.right - rect.left, 
                rect.bottom - rect.top)
        }
    }
}