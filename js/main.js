import Background from './runtime/background'
import Enemy from 'npc/enemy.js'
import Hero from 'player/hero.js'
import DataBus from 'runtime/databus.js'
import ScoreAnimation from 'npc/scoreanimation.js'

let ctx = canvas.getContext('2d')
/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0
        this.databus = new DataBus()
        this.restart()
    }

    produceEnemy() {
        let t = 1.5
        let fps = 60
        let enemy = new Enemy('images/enemy.png')
        enemy.width = 32
        enemy.height = 32
        enemy.x = 0
        enemy.y = this.background.skyHeight - enemy.height

        let s = canvas.width / 2 * (1 + Math.random())

        enemy.speedX = s / (t * fps * 2)
        enemy.speedY = -2*enemy.y/(t*fps)
        enemy.accelerate = -enemy.speedY / (t * fps)
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

    produceScoreAnimation(score){
        this.scoreAnimation = new ScoreAnimation()
        this.scoreAnimation.score = score
        this.scoreAnimation.width = this.databus.enemy.width
        this.scoreAnimation.height = 30
        this.scoreAnimation.startx = this.databus.enemy.x
        this.scoreAnimation.starty = this.databus.enemy.y - this.scoreAnimation.height
        this.scoreAnimation.endx = this.databus.enemy.x
    }
    restart() {
        this.produceBackground()
        this.databus.hero = this.produceHero()
        this.databus.enemy = this.produceEnemy()

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

    heroTouchHandler(x, y){
        if (y >= this.databus.hero.y) {
            if (x < this.databus.hero.x) {
                this.databus.hero.direction = -1
            } else if (x > this.databus.hero.x + this.databus.hero.width) {
                this.databus.hero.direction = 1
            } else {
                this.databus.hero.direction = 0
            }
        }
    }

    touchStartHandler(e) {
        e.preventDefault()

        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        this.heroTouchHandler(x, y)
    }

    touchMoveHandler(e){
        let x = e.changedTouches[0].clientX
        let y = e.changedTouches[0].clientY
        this.heroTouchHandler(x, y)
    }

    touchEndHandler(e){
        let x = e.changedTouches[0].clientX
        let y = e.changedTouches[0].clientY
        if (y >= this.databus.hero.y){
            this.databus.hero.direction = 0
        }
    }
    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
        this.background.draw(ctx)
        this.databus.hero.draw(ctx)
        this.databus.enemy.draw(ctx)
    }

    // 游戏逻辑更新主函数
    update() {
        let hero = this.databus.hero
        let enemy = this.databus.enemy

        let progress = enemy.explosionProgress();
        if (progress == 2) {
            this.databus.enemy = this.produceEnemy()
        }else if (progress == 1){
            hero.move()
        } else if (progress == 0) {
            let above = enemy.y + enemy.height > hero.y
            hero.move()
            enemy.move()
            let rect = {
                left: 0,
                top: 0,
                right: this.background.width - 1,
                bottom: this.background.skyHeight - 1
            }
            
            if (enemy.isOutOfRange(rect)) {
               this.databus.enemy = this.produceEnemy()
            }
            //前一帧在hero上方，下一帧撞上了，认为是从上方撞下来的
            if (above && hero.kill(enemy)){
                enemy.y = hero.y - enemy.height
                enemy.startExplosion()
                this.databus.score++
            }
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