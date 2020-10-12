<template>
  <div class="home">
    <canvas id="canvas"></canvas>
    <div class="home-wrap">
      <div class="box">
        <div :class="['star-item lg', 'p' + index]" v-for="(item, index) in urlList" :key="item.uid">
          <a href="/pages/list.html">美食</a>
          </div>
      </div>
    </div>
  </div>
</template>


<script>
import { test, test2 } from '@api/home.js'
export default {
  data() {
    return {
      urlList: [
        {
          url: '/list',
          title: '美食',
        },
      ],
    }
  },
  methods: {
    setSky() {
      //宇宙特效
      var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight),
        hue = 217,
        stars = [],
        count = 0,
        maxStars = 1100 //星星数量,默认1300
      var canvas2 = document.createElement('canvas'),
        ctx2 = canvas2.getContext('2d')
      canvas2.width = 100
      canvas2.height = 100
      var half = canvas2.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
      gradient2.addColorStop(0.025, '#CCC')
      gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
      gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
      gradient2.addColorStop(1, 'transparent')

      ctx2.fillStyle = gradient2
      ctx2.beginPath()
      ctx2.arc(half, half, half, 0, Math.PI * 2)
      ctx2.fill()

      // End cache
      function random(min, max) {
        if (arguments.length < 2) {
          max = min
          min = 0
        }

        if (min > max) {
          var hold = max
          max = min
          min = hold
        }

        return Math.floor(Math.random() * (max - min + 1)) + min
      }

      function maxOrbit(x, y) {
        var max = Math.max(x, y),
          diameter = Math.round(Math.sqrt(max * max + max * max))
        return diameter / 2
        //星星移动范围，值越大范围越小，
      }

      var Star = function () {
        this.orbitRadius = random(maxOrbit(w, h))
        this.radius = random(60, this.orbitRadius) / 10 //星星大小,值越大星星越小,默认8

        this.orbitX = w / 2
        this.orbitY = h / 2
        this.timePassed = random(0, maxStars)
        this.speed = random(this.orbitRadius) / 90000 //星星移动速度,值越大越慢,默认5W

        this.alpha = random(2, 10) / 10

        count++
        stars[count] = this
      }

      Star.prototype.draw = function () {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
          y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
          twinkle = random(10)

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05
        }

        ctx.globalAlpha = this.alpha
        ctx.drawImage(
          canvas2,
          x - this.radius / 2,
          y - this.radius / 2,
          this.radius,
          this.radius
        )
        this.timePassed += this.speed
      }

      for (var i = 0; i < maxStars; i++) {
        new Star()
      }

      function animation() {
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 0.5 //尾巴
        ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'
        ctx.fillRect(0, 0, w, h)

        ctx.globalCompositeOperation = 'lighter'
        for (var i = 1, l = stars.length; i < l; i++) {
          stars[i].draw()
        }

        window.requestAnimationFrame(animation)
      }

      animation()
    },
  },
  mounted() {
    // 渲染星空
    this.setSky()
    test().then((res) => {
      console.log(res)
    })

    test2().then((res) => {
      console.log(res)
    })
  },
}
</script>

<style lang="scss">
.home {
  // background: pink;
  height: 100%;
  #canvas {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: block;
    opacity: 1;
    z-index: 1;
  }
  .home-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
    z-index: 2;
    .box {
      // height  : calc(100% + 30px);
      position: relative;

      .star-item {
        color: #fff;
        position: absolute;
        top: 10px;
        left: 10px;
        width: 30px;
        height: 30px;
        background: url('/static/images/big_star.png') center center no-repeat;
        background-size: 100% 100%;
        transform: translate(0, 0) rotateZ(0deg);

        a {
          position: relative;
          display: inline-block;
          line-height: 1;
          top: calc(50% - 2px);
          left: 50%;
          transform: translate(-50%, -50%);

          text-align: center;
        }

        &.lg {
          width: 70px;
          height: 70px;
        }

        &.p1 {
          top: 20px;
          left: 20%;
          animation: moveStarP1 20000ms infinite linear;
        }

        &.p2 {
          top: 50px;
          left: 45%;
          animation: moveStarP2 23000ms infinite linear;
        }

        &.p3 {
          top: 140px;
          left: 65%;
          animation: moveStarP3 27000ms infinite linear;
        }

        &.p4 {
          top: 240px;
          left: 50%;
        }

        &.p5 {
          top: 340px;
          left: 35%;
        }

        &.p6 {
          top: 440px;
          left: 30%;
        }

        &.p7 {
          top: 540px;
          left: 33%;
        }
      }
    }
  }

  @keyframes moveStarP1 {
    0% {
      transform: translate(0, 0) rotateZ(0deg);
    }

    35% {
      transform: translate(100px, 200px) rotateZ(30deg);
    }

    50% {
      transform: translate(150px, 100px) rotateZ(-20deg);
    }

    70% {
      transform: translate(120px, 160px) rotateZ(20deg);
    }

    90% {
      transform: translate(-10px, 80px) rotateZ(-10deg);
    }

    100% {
      transform: translate(0, 0) rotateZ(0deg);
    }
  }

  @keyframes moveStarP2 {
    0% {
      transform: translate(0, 0) rotateZ(0deg);
    }

    15% {
      transform: translate(-40px, 30px) rotateZ(-40deg);
    }

    30% {
      transform: translate(-80px, 100px) rotateZ(10deg);
    }

    60% {
      transform: translate(-140px, 120px) rotateZ(-20deg);
    }

    85% {
      transform: translate(10px, 80px) rotateZ(25deg);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes moveStarP3 {
    0% {
      transform: translate(0, 0) rotateZ(-45deg);
    }

    20% {
      transform: translate(-110px, 110px) rotateZ(35deg);
    }

    30% {
      transform: translate(-140px, 180px) rotateZ(-10deg);
    }

    66% {
      transform: translate(-70px, 120px) rotateZ(20deg);
    }

    85% {
      transform: translate(-10px, 80px) rotateZ(-30deg);
    }

    100% {
      transform: translate(0, 0);
    }
  }
}
</style>