export default class BasePage{
    name
    widgets = new Array()

    init(){
        canvas.addEventListener(
            'touchstart',
            this.touchStartHandler.bind(this)
        )
        canvas.addEventListener(
            'touchend',
            this.touchEndHandler.bind(this)
        )
    }

    touchStartHandler(res){
        let x = res.touches[0].clientX
        let y = res.touches[0].clientY
        for(let i = this.widgets.length - 1; i >= 0; i--){
            let it = this.widgets[i]
            if (x >= it.rect.left && x <= it.rect.right && y >= it.rect.top && y <= it.rect.bottom){
                this.touchStartWidget = it
                break
            }
        }
    }

    touchEndHandler(res){
        let x = res.changedTouches[0].clientX
        let y = res.changedTouches[0].clientY
        let widget = null
        for (let i = this.widgets.length - 1; i >= 0; i--) {
            let it = this.widgets[i]
            if (x >= it.rect.left && x <= it.rect.right && y >= it.rect.top && y <= it.rect.bottom){
                widget = it
                break
            }
        }
        if(widget != null && widget === this.touchStartWidget && widget.onClickListener != null){
            widget.onClickListener(widget)
        }
        this.touchStartWidget = null
    }

    finish(){
        canvas.removeEventListener(
            'touchstart',
            this.touchStartHandler.bind(this)
        )

        canvas.removeEventListener(
            'touchend',
            this.touchEndHandler.bind(this)
        )
    }

    onReenter(){

    }
    
}