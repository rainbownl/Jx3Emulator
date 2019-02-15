import Background from 'runtime/background.js'
import BasePage from 'framework/basepage.js'
import BaseWidget from 'widgets/basewidget.js'
import Button from 'widgets/button.js'
import Label from 'widgets/label.js'

let ctx = canvas.getContext('2d')

const ID_DLGBG = 0
const ID_BTNSTART = 1
const ID_BTNHELP = 2
export default class StartPage extends BasePage{
    
    widgets = new Array()
    anid = 0
    message = null

    init(param){
        this.name = 'StartPage'
        super.init()
        this.message = param
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
        dlgBg.rect = {left:0, top:0, right:canvas.width - 1, bottom:canvas.height-1}
        dlgBg.drawable = wx.createImage()
        dlgBg.drawable.src = 'images/dlgbg.png'
        dlgBg.id = ID_DLGBG
        dlgBg.enable = true
        dlgBg.onClickListener = this.onClickListener.bind(this)
        widgets.push(dlgBg)

        let lblMsg = new Label()
        lblMsg.rect = {left:0, top: canvas.height/4, right: canvas.width - 1, bottom: canvas.height/4}
        lblMsg.text = this.message
        lblMsg.textSize = 24
        lblMsg.normalColor = '#555555'
        widgets.push(lblMsg)

        let lblStart = new Label()
        lblStart.rect = {left: 0, top: canvas.height*3/4, right: canvas.width-1, bottom: canvas.height*3/4+20}
        lblStart.text = "点击屏幕任意位置开始游戏"
        lblStart.id = -1
        lblStart.normalColor = '#555555'
        lblStart.textSize = 24
        widgets.push(lblStart)
    }

    onClickListener(widget){
        let id = widget.id
        switch(id){
            case ID_DLGBG:
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