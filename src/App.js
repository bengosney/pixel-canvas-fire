import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(props) {
	super(props);

	this.state = {
	    pixelSize: 4,
	    fontSize: 6,
	    decay: 12,
	    height: 50,
	    width: 280,
	    text: "Hello, World!"
	};
	
	this.pixelSize = 4;
	this.fontSize = 6;
	this.decay = 12;
	this.height = 50;
	this.width = 280;

	this.drawing = false;
	this.fireState = [];

	this.ctx = null;

	this.pallet = ['#070707', '#1f0707', '#2f0f07', '#470f07', '#571707', '#671f07', '#771f07', '#8f2707', '#9f2f07', '#af3f07', '#bf4707', '#c74707', '#DF4F07', '#DF5707', '#DF5707', '#D75F07', '#D7670F', '#cf6f0f', '#cf770f', '#cf7f0f', '#CF8717', '#C78717', '#C78F17', '#C7971F', '#BF9F1F', '#BF9F1F', '#BFA727', '#BFA727', '#BFAF2F', '#B7AF2F', '#B7B72F', '#B7B737', '#CFCF6F', '#DFDF9F', '#EFEFC7', '#FFFFFF'];
	this.max = (this.pallet.length - 1);
    }

    emptyFireState() {
	const { height, width } = this.state;

	const state = Array(height).fill().map(() => Array(width).fill(0));
	state[0] = Array(width).fill(this.max);

	return state;
    }

    
    componentDidMount() {
	const { height, width, pixelSize, decay } = this.state;
	
	const canvas = this.refs.canvas;
	this.ctx = canvas.getContext("2d");

	this.fireState = this.emptyFireState();

	setInterval(() => this.updateFire(), 10);
	//setTimeout(() => this.updateFire(), 100);
    }

    resetFire() {
	this.fireState = this.emptyFireState();
    }

    updateFire() {
	const { height, width, decay } = this.state;

	const newState = this.emptyFireState();
	
	for (let x = 0; x < width; x++) {
	    for (let y = 0; y < height - 1; y++) {
		const min = 5;
		const max = 9;
		
		const mod = Math.random();
		const wave = 0;
		
		const ay = y;
		const ax = x;

		const ny = ay + 1;
		const nx = Math.min(Math.max(0, ax + Math.round(wave)), width);

		try {
		    newState[ny][nx] = Math.floor(this.fireState[ay][ax] * (1 - (mod.toPrecision(1) / Math.max(1, decay))));
		} catch(error) {
		    console.error(error, ax, ay);
		    return;
		}
	    }
	}

	this.fireState = newState;
	
	this.drawFire();
    }

    drawFire() {
	const { height, width, pixelSize, fontSize, text } = this.state;
	const { ctx } = this;
	
	ctx.fillStyle = this.pallet[0];
	ctx.fillRect(0, 0, width * pixelSize, height * pixelSize);

	const drawState = this.fireState;
	
	for (let x = 0; x < width; x++) {
	    for (let y = 0; y < height; y++) {
		const ay = (height - y) - 1;
		const ax = x;

		try {
		    if (this.fireState[ay][ax] !== 0) {
			ctx.fillStyle = this.pallet[this.fireState[ay][ax]];
			ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
		    }
		} catch(error) {
		    console.error(error, ax, ay);
		    return;
		}
	    }
	}

	ctx.font = `${fontSize * pixelSize}px Arial`;
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.textAlign = "center";
	ctx.fillText(text, (width * pixelSize) / 2, (height * pixelSize) / 2);
    }

    handleChange(name, event) {
	const newState = {};

	newState[name] = event.target.value;
	
	this.setState(newState);
    }
    
    render() {
	const { pixelSize, fontSize, decay, height, width, text} = this.state;

	const renderInput = (name, value) => {
	    return (
		<div className="inputchanger">
		  <label htmlFor={name}>{name}</label>
		  <input name={name} value={ value } onChange={ (e) => this.handleChange(name, e)} />
		</div>
	    );
	};
	
	return (
	    <div>
	      { renderInput('pixelSize', pixelSize) }
	      { renderInput('fontSize', fontSize) }
	      { renderInput('decay', decay) }
	      { renderInput('text', text) }
	      <div>
		<canvas ref="canvas" width={ width * pixelSize } height={ height * pixelSize } />
	      </div>
	    </div>
	);
    }
}

export default App;
