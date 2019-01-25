import Background from './runtime/background'
import Enemy from 'npc/enemy.js'
import Hero from 'player/hero.js'

let ctx = canvas.getContext('2d')
/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0
        this.score = 0
        this.restart()
    }

    produceEnemy() {
        let t = 1.5
        let fps = 60
        let enemy = new Enemy('images/enemy.png')
        enemy.x = 0
        enemy.y = canvas.height - 50

        let s = canvas.width / 2 * (1 + Math.random())

        enemy.speedX = s / (t * fps * 2)
        enemy.speedY = -2*enemy.y/(t*fps)
        enemy.accelerate = -enemy.speedY / (t * fps)
        enemy.width = 32
        enemy.height = 32
        return enemy
    }

    produceHero(){
        let t = 3
        let fps = 60
        let hero = new Hero('images/hero.png')
        hero.speed = this.background.width / t / fps
        hero.direction = 0
        hero.width = 46
        hero.height = 32
        hero.x = this.background.width / 2
        hero.y = this.background.skyHeight - hero.height
        return hero
    }

    produceBackground(){
        this.background = new Background(null)
        this.background.skyHeight = canvas.height * 3/4
        this.background.groundHeight = canvas.height - this.background.skyHeight
        this.background.skyColor = '#1a8afb'
        this.background.groundColor = '#358e3e'
        this.background.width = canvas.width
    }

    restart() {
        this.produceBackground()
        this.hero = this.produceHero()
        this.enemy = this.produceEnemy()

        canvas.addEventListener(
            'touchstart',
            this.touchStartHandler.bind(this)
        )
        canvas.addEventListener(
            'touchmove',
            this.touchMoveHandler.bind(this)
        )
        canvas.addEventListener(
            'touchend',
            this.touchEndHandler.bind(this)
        )

        this.bindLoop = this.loop.bind(this)
        this.hasEventBind = false

        // 清除上一局的动画
        window.cancelAnimationFrame(this.aniId);

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }

    touchStartHandler(e) {
        e.preventDefault()

        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if (y >= this.hero.y) {
            if (x < this.hero.x){
                this.hero.direction = -1
            } else if (x > this.hero.x + this.hero.width){
                this.hero.direction = 1
            }
        }
    }

    touchMoveHandler(e){
        let x = e.changedTouches[0].clientX
        let y = e.changedTouches[0].clientY
        if (y >= this.hero.y) {
            if (x < this.hero.x) {
                this.hero.direction = -1
            } else if (x > this.hero.x + this.hero.width) {
                this.hero.direction = 1
            }
        }
    }

    touchEndHandler(e){
        let x = e.changedTouches[0].clientX
        let y = e.changedTouches[0].clientY
        if (y >= this.hero.y){
            this.hero.direction = 0
        }
    }
    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
        this.background.draw(ctx)
        this.hero.draw(ctx)
        this.enemy.draw(ctx)
    }

    // 游戏逻辑更新主函数
    update() {
        this.enemy.nextFrame()
        let rect = {
            left: 0,
            top: 0,
            right: canvas.width - 1,
            bottom: canvas.height - 50
        }
        if (this.enemy.isOutOfRange(rect)) {
            this.enemy = this.produceEnemy()
        }
        this.hero.move()
        if (this.hero.kill(this.enemy)){
            this.score++
        }
    }

    // 实现游戏帧循环
    loop() {
        this.update()
        this.render()

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }
}