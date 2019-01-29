import './js/libs/weapp-adapter'
import './js/libs/symbol'
import PageManager from './js/framework/pagemanager.js'
import Main from './js/main'
import StartPage from './js/startpage.js'

//new Main()
let pageManager = new PageManager()
pageManager.createPage('StartPage')
