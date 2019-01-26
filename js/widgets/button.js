export default class Button{
    onClickListener = null

    draw(ctx){
        let rect = this.rect
        if (this.drawable != null){
            ctx.drawImage(this.drawable, rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top)
        }
    }
}