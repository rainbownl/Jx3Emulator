import StartPage from '../startpage.js'
import Main from '../main.js'

export default class PageManager{
    pageStack = new Array()

    createPage(name){
        let page = null
        if (name == 'StartPage'){
            page = new StartPage()
        } else if (name == 'Main'){
            page = new Main()
        }
        if (page != null){
            page.pageManager = this
            this.pageStack.push(page)
            page.init()
        }
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
}