const 
    GAME_W = window.innerWidth,
    GAME_H = window.innerHeight,
    GAME_RATIO = GAME_W / GAME_H,
    GAME_ORIENTATION = 'landscape'

const renderer = new PIXI.WebGLRenderer(GAME_W, GAME_H, {transparent: true,autoResize: true});
document.getElementById('live2d').appendChild(renderer.view);
const stage = new PIXI.Container();

//renderer.view.style.position = "fixed";
//renderer.view.style.bottom = "0px";
//renderer.view.style.right = "0px";

const modelHaru = {
	"type": "Live2D Model Setting",
	"name": "haru",
	"model": "assets/haru/haru.moc",
	"textures": [
		"assets/haru/haru.1024/texture_00.png",
		"assets/haru/haru.1024/texture_01.png",
		"assets/haru/haru.1024/texture_02.png",
		"assets/haru/haru.1024/texture_03.png",
		"assets/haru/haru.1024/texture_04.png"
	],
	"physics": "assets/haru/haru.physics.json",
	"pose": "assets/haru/haru.pose.json",
	"expressions": [{
		"name": "ah ha",
		"file": "assets/haru/expressions/ah ha.exp.json"
	}, {
		"name": "care me",
		"file": "assets/haru/expressions/care me.exp.json"
	}, {
		"name": "look 3 small",
		"file": "assets/haru/expressions/look 3 small.exp.json"
	}, {
		"name": "nothing",
		"file": "assets/haru/expressions/nothing.exp.json"
	}, {
		"name": "What are you talking about",
		"file": "assets/haru/expressions/What are you talking about.exp.json"
	}, {
		"name": "Oh no",
		"file": "assets/haru/expressions/Oh no.exp.json"
	}, {
		"name": "What do you mean",
		"file": "assets/haru/expressions/What do you mean.exp.json"
	}],
	"layout": {
		"center_x": 0,
		"y": 1.8,
		"width": 3.5
	},
	"hit_areas": [{
		"name": "head",
		"id": "D_REF.HEAD"
	}, {
		"name": "body",
		"id": "D_REF.BODY"
	}],
	"motions": {
		"idle": [{
			"file": "assets/haru/motions/idle_00.mtn",
			"fade_in": 2000,
			"fade_out": 2000
		}, {
			"file": "assets/haru/motions/idle_01.mtn",
			"fade_in": 2000,
			"fade_out": 2000
		}],
		"tap_body": [
		    {"file": "assets/haru/motions/nothing.mtn","sound": "assets/haru/sounds/nothing.mp3"},
			{"file": "assets/haru/motions/look 3 small.mtn","sound": "assets/haru/sounds/look 3 small.mp3"},
			{"file": "assets/haru/motions/Oh no.mtn","sound": "assets/haru/sounds/Oh no.mp3"},
			{"file": "assets/haru/motions/Cannot describe.mtn","sound": "assets/haru/sounds/Cannot describe.mp3"},
			{"file": "assets/haru/motions/hate.mtn","sound": "assets/haru/sounds/hate.mp3"},
			{"file": "assets/haru/motions/garbage.mtn","sound": "assets/haru/sounds/garbage.mp3"},
			{"file": "assets/haru/motions/Bad breath.mtn","sound": "assets/haru/sounds/Bad breath.mp3"},
			{"file": "assets/haru/motions/Cannot describe.mtn","sound": "assets/haru/sounds/Cannot describe.mp3"},
			{"file": "assets/haru/motions/ah ha.mtn","sound": "assets/haru/sounds/ah ha.mp3"}
			],
		"pinch_in": [{
			"file": "assets/haru/motions/are you uncomfortable.mtn",
			"sound": "assets/haru/sounds/are you uncomfortable.mp3"
		}],
		"pinch_out": [{
			"file": "assets/haru/motions/are you uncomfortable.mtn",
			"sound": "assets/haru/sounds/are you uncomfortable.mp3"
		}],
		"shake": [{
			"file": "assets/haru/motions/what are you doing.mtn",
			"sound": "assets/haru/sounds/what are you doing.mp3",
			"fade_in": 2000
		}],
		"flick_head": [{
			"file": "assets/haru/motions/care me.mtn",
			"sound": "assets/haru/sounds/care me.mp3"
			},{
			"file": "assets/haru/motions/no problem.mtn",
			"sound": "assets/haru/sounds/no problem.mp3"
			},{
			"file": "assets/haru/motions/love.mtn",
			"sound": "assets/haru/sounds/love.mp3"
		}]
	}
};



const sprite = new PIXI.Sprite.fromImage('./bg.jpg');
stage.addChild(sprite);

// setTimeout(() => {
//   const sprite2 = new PIXI.Sprite.fromImage('./pixiv4.jpg');
//   sprite2.y = 350;
//   stage.addChildAt(sprite2, 1);
// }, 1000)

const live2dSprite = new PIXI.Live2DSprite(modelHaru, {
	debugLog: false,
	randomMotion: false,
	eyeBlink: false,
	// audioPlayer: (...args) => console.log(...args)
});
stage.addChild(live2dSprite);

live2dSprite.x = -105;
// live2dSprite.y = -150;
live2dSprite.adjustScale(0, 0.40, 0.42);
//live2dSprite.adjustTranslate(0.4, 0);
live2dSprite.startRandomMotion('idle');

live2dSprite.on('click', (evt) => {
	const point = evt.data.global;
	if (live2dSprite.hitTest('body', point.x, point.y)) {
		live2dSprite.startRandomMotionOnce('tap_body');
	}
	if (live2dSprite.hitTest('head', point.x, point.y)) {
		live2dSprite.startRandomMotionOnce('flick_head');
	}
});
live2dSprite.on('mousemove', (evt) => {
	const point = evt.data.global;
	live2dSprite.setViewPoint(point.x, point.y);
});

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}
animate();
