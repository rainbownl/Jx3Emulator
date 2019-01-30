import StartPage from '../startpage.js'
import Main from '../main.js'

export default class PageManager{
    pageStack = new Array()
    bindTouchStartHandler = this.touchStartHandler.bind(this)
    bindTouchMoveHandler = this.touchMoveHandler.bind(this)
    bindTouchEndHandler = this.touchEndHandler.bind(this)

    //找堆栈中是否有指定的页面，有就返回，没有就返回null
    getPage(name){
        for (let i = 0; i < this.pageStack.length; i++){
            if(this.pageStack[i].name == name){
                return this.pageStack[i]
            }
        }
        return null
    }

    createPage(name, param){
        let page = null
        page = this.getPage(name)
        if(page != null){
            while (true){
                let popPage = this.pageStack.pop()
                if(popPage != null && popPage != page){
                    popPage.finish()
                } else {
                    break
                }
            }
        }

        page = null
        if (name == 'StartPage'){
            page = new StartPage()
        } else if (name == 'Main'){
            page = new Main()
        }
        if (page != null){
            page.pageManager = this
            this.pageStack.push(page)
            page.init(param)
       }
       return page
    }

    returnPage(){
        if (this.pageStack.length > 1){
            let curPage = this.pageStack.pop()
            curPage.finish()

            curPage = this.pageStack[this.pageStack.length - 1]
            curPage.onReenter()
        }
    }

    currentPage(){
        if (this.pageStack.length > 0){
            return this.pageStack[this.pageStack.length - 1] 
        }
        return null
    }

    touchStartHandler(res){
        this.currentPage().bindTouchStartHandler(res)
    }

    touchMoveHandler(res){
        this.currentPage().bindTouchMoveHandler(res)
    }

    touchEndHandler(res){
        this.currentPage().bindTouchEndHandler(res)
    }
}