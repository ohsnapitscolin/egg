import React from "react";

import White from "../images/white.png";
import Yolk from "../images/yolk.png";

const EGG = {
  WHITE: "white",
  YOLK: "yolk"
};

export default class Egg extends React.Component {
  constructor() {
    super();

    this.state = {
      eggs: [],
      input: "",
      invalid: false
    }
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.input)
    if (!this.validateEgg(this.state.input)) {
      this.clearEgg();
    } else {
      this.generateEgg(this.state.input);
    }
  }

  generateEgg(egg) {
    let i = 0;
    let previous = null;
    let offset = {
      bottom: 0,
      left: 0,
    }

    const eggs = [];

    while (i < egg.length) {
      if (egg.charAt(i) === 'e') {
        if (previous === EGG.WHITE) {
          offset.bottom += 8;
          offset.left += 5;
        }

        if (previous === EGG.YOLK) {
          offset.bottom += 40;
          offset.left += 20;
        }

        eggs.push(
          <img
            key={i}
            className="egg-image"
            style={{
              zIndex: i,
              bottom: offset.bottom,
              left: offset.left
            }}
            src={White}
          />
        );

        previous = EGG.WHITE;
        i++;
      } else {
        if (previous === EGG.YOLK) {
          offset.bottom += 8;
          offset.left += 5;
        }

        eggs.push(
          <img
            key={i}
            className="egg-image"
            style={{
              zIndex: i,
              bottom: offset.bottom,
              left: offset.left
            }}
            src={Yolk}
          />
        );

        previous = EGG.YOLK;
        i+=2;
      }
    }
    this.setState({
      eggs: eggs,
      invalid: false
    });
  }

  clearEgg() {
    this.setState({
      eggs: [],
      invalid: true
    });
  }


  validateEgg(egg) {
    let prevChar = '';
    for (let i = 0; i < egg.length; i++) {
      if (egg.charAt(i) !== 'e' && egg.charAt(i) !== 'g') {
        return false;
      }
      if (egg.charAt(i) === 'e') {
        continue;
      }
      if (egg.charAt(i) === 'g') {
        if (egg.charAt(i + 1) !== 'g') {
          return false;
        } else {
          i++;
          continue;
        }
      }
    }
    return true;
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <div className="title">
          <h1>Egg</h1>
          <div className="egg-input">
            <form
              className="egg-form"
              onSubmit={this.onSubmit.bind(this)}
            >
              <input type="text" value={this.state.input} onChange={this.handleChange.bind(this)}/>
              <input type="submit" value="egg"/>
            </form>
            {this.state.invalid && <p>no</p>}
          </div>
        </div>
        <div className="stove">
          <div className="pan">
            {this.state.eggs}
          </div>
        </div>
      </div>
    )
  }
}
