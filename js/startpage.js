import Background from 'runtime/background.js'
import BasePage from 'framework/basepage.js'
import BaseWidget from 'widgets/basewidget.js'
import Button from 'widgets/button.js'

let ctx = canvas.getContext('2d')

const ID_DLGBG = 0
const ID_BTNSTART = 1
const ID_BTNHELP = 2
export default class StartPage extends BasePage{
    
    widgets = new Array()
    anid = 0

    init(){
        super.init()
        this.produceBackground()
        this.initWidgets()
        this.loop()
    }

    produceBackground() {
        this.background = new Background(null)
        this.background.skyHeight = canvas.height * 3 / 4
        this.background.groundHeight = canvas.height - this.background.skyHeight
        this.background.skyColor = '#1a8afb'
        this.background.groundColor = '#358e3e'
        this.background.width = canvas.width
    }

    initWidgets(){
        let widgets = this.widgets
        let dlgBg = new BaseWidget()
        dlgBg.rect = {left:(canvas.width-200)/2, top:(canvas.height-100)/2, right:(canvas.width+200)/2,
            bottom:(canvas.height+100)/2}
        dlgBg.drawable = wx.createImage()
        dlgBg.drawable.src = 'images/dlgbg.png'
        dlgBg.id = ID_DLGBG
        widgets.push(dlgBg)

        let btnStart = new Button()
        btnStart.rect = {left:dlgBg.rect.left+30, top:dlgBg.rect.top+35, right:dlgBg.rect.left+90,
            bottom:dlgBg.rect.bottom-35}
        btnStart.drawable = wx.createImage()
        btnStart.drawable.src = 'images/btnbg.png'
        btnStart.clickDrawable = btnStart.drawable
        btnStart.id = ID_BTNSTART
        btnStart.onClickListener = this.onClickListener.bind(this)
        btnStart.text="开始"
        btnStart.normalColor = 'black'
        btnStart.clickedColor = 'black'
        widgets.push(btnStart)

        let btnQuit = new Button()
        btnQuit.rect = {left:dlgBg.rect.left+110, top:dlgBg.rect.top+35, right:dlgBg.rect.right - 30,
            bottom:btnStart.rect.bottom}
        btnQuit.drawable = wx.createImage()
        btnQuit.drawable.src = 'images/btnbg.png'
        btnQuit.clickDrawable = btnQuit.drawable
        btnQuit.id = ID_BTNHELP
        btnQuit.onClickListener = this.onClickListener.bind(this)
        btnQuit.text = "退出"
        btnQuit.normalColor = 'black'
        btnQuit.clickedColor = 'black'
        widgets.push(btnQuit)
    }

    onClickListener(widget){
        let id = widget.id
        switch(id){
            case ID_BTNSTART:
                if (this.pageManager != null){
                    this.pageManager.createPage('Main')
                }
                break
            case ID_BTNHELP:
            break
        }
    }

    render(){
        this.background.draw(ctx)
        this.widgets.forEach(it =>{
           it.draw(ctx)
        })
    }

    loop(){
        this.render()
        this.anid = window.requestAnimationFrame(this.loop.bind(this))
    }

    finish(){
        super.finish()
        window.cancelAnimationFrame(this.anid)
    }
}