import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(props) {
	super(props);

	this.state = {
	    pixelSize: 6,
	    height: 500,
	    width: 150
	};
	
	this.drawing = false;
	this.fireState = [];

	this.ctx = null;

	this.pallet = ['#070707', '#1f0707', '#2f0f07', '#470f07', '#571707', '#671f07', '#771f07', '#8f2707', '#9f2f07', '#af3f07', '#bf4707', '#c74707', '#DF4F07', '#DF5707', '#DF5707', '#D75F07', '#D7670F', '#cf6f0f', '#cf770f', '#cf7f0f', '#CF8717', '#C78717', '#C78F17', '#C7971F', '#BF9F1F', '#BF9F1F', '#BFA727', '#BFA727', '#BFAF2F', '#B7AF2F', '#B7B72F', '#B7B737', '#CFCF6F', '#DFDF9F', '#EFEFC7', '#FFFFFF'];
	this.max = (this.pallet.length - 1);

	this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    emptyFireState() {
	const width = this.getWidth();
	const height = this.getHeight();

	const state = Array(height).fill().map(() => Array(width).fill(0));
	state[0] = Array(width).fill(this.max);

	return state;
    }

    
    componentDidMount() {
	const canvas = this.refs.canvas;
	this.ctx = canvas.getContext("2d");

	this.fireState = this.emptyFireState();
	
	this.rAF = requestAnimationFrame(() => this.updateAnimationState());
	this.updateWindowDimensions();
	window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
	this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    
    componentWillUnmount() {
	cancelAnimationFrame(this.rAF);
	window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateAnimationState() {
	this.updateFire();
	
	this.rAF = requestAnimationFrame(() => this.updateAnimationState());
    }

    resetFire() {
	this.fireState = this.emptyFireState();
    }

    getWidth() {
	const { width } = this.state;
	const pixelSize = this.getPixelSize();
	return Math.floor(width / pixelSize);
    }
    
    getHeight() {
	const { height } = this.state;
	const pixelSize = this.getPixelSize();
	return Math.floor(height / pixelSize);
    }

    getPixelSize() {
	const { pixelSize } = this.state;
	return Math.max(1, pixelSize);
    }

    updateFire() {
	const width = this.getWidth();
	const height = this.getHeight();

	const newState = this.emptyFireState();
	
	for (let x = 0; x < width; x++) {
	    for (let y = 0; y < height - 1; y++) {	
		const ay = y;
		const ax = x;
		
		const ny = Math.max(ay + 1, 0);
		const nx = Math.min(Math.max(ax, 0), width);
		
		try {
		    const pixel = this.fireState[ay][ax];
		    const mod = Math.round(Math.random() * 3.0) & 3;
		    
		    newState[ny][nx] = Math.max(0, pixel - (mod & 1));
		} catch(error) {
		    //console.error(error, ax, ay, nx, ny);
		}
	    }
	}

	this.fireState = newState;
	
	this.drawFire();
    }

    drawFire() {	
	const width = this.getWidth();
	const height = this.getHeight();
	const pixelSize = this.getPixelSize();
	const { ctx } = this;
	
	ctx.fillStyle = this.pallet[0];
	ctx.fillRect(0, 0, width * pixelSize, height * pixelSize);

	const drawState = this.fireState;
	
	for (let x = 0; x < width; x++) {
	    for (let y = 0; y < height; y++) {
		const ay = (height - y) - 1;
		const ax = x;

		if (this.fireState[ay][ax] !== 0) {
		    ctx.fillStyle = this.pallet[this.fireState[ay][ax]];
		    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
		}
	    }
	}
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
	      <div>
		<canvas ref="canvas" width={ width } height={ height } />
	      </div>
	    </div>
	);
    }
}

export default App;
