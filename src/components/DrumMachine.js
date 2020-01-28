import React, { Component } from "react";
import DrumPad from "./DrumPad";
import { bankOne, bankTwo } from "../assets/sounds/SoundData";
import Switch from "./Switch";

class DrumMachine extends Component {
  state = {
    bankOne: false,
    currentBank: bankOne,
    isThisThingOn: true,
    volume: 50,
    currentTitle: ""
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    this.drumClickHandler(e.keyCode);
  }

  appSwitchHandler = () => {
    this.setState(prevState => {
      return {
        isThisThingOn: !prevState.isThisThingOn,
        currentTitle: ""
      };
    });
  };

  bankSwitchHandler = () => {
    if (this.state.isThisThingOn) {
      this.setState(prevState => {
        return {
          bankOne: !prevState.bankOne,
          currentBank: !prevState.bankOne ? bankTwo : bankOne,
          currentTitle: prevState.bankOne ? "Heater Kit" : "Smooth Piano Kit"
        };
      });
    }
  };

  volumeHandler = e => {
    if (this.state.isThisThingOn) {
      const vol = e.target.value;
      this.setState({
        volume: vol,
        currentTitle: `Volume: ${vol}`
      });
      document.querySelectorAll(".clip").forEach(audio => {
        audio.volume = vol / 100;
      });
    }
  };

  drumClickHandler = key => {
    if (this.state.isThisThingOn) {
      const audio = document.querySelector(`audio[data-key="${key}"]`);
      if (!audio) {
        return;
      }
      audio.currentTime = 0;
      audio.play();
      this.setState({
        currentTitle: audio.getAttribute("data-title").replace(/-/g, " ")
      });
    }
  };

  something = e => {
    alert();
    if (e.propertyName !== "transform") return;
    console.log(e);
    this.classList.remove("playing");
  };

  render() {
    return (
      <main id="drum-machine">
        <div id="display">
          <Switch
            title="Power"
            status={this.state.isThisThingOn}
            switchButton={this.appSwitchHandler}
          />
          <section className="drumpads">
            {this.state.currentBank.map(drum => (
              <DrumPad
                drum={drum}
                key={drum.keyCode}
                click={() => this.drumClickHandler(drum.keyCode)}
                onTransitionEnd={this.something}
              />
            ))}
          </section>
          <div className="currentPlay">{this.state.currentTitle}</div>
          <div className="volume">
            <input
              type="range"
              className="slider"
              min={0}
              max={100}
              value={this.state.volume}
              onChange={this.volumeHandler}
            />
          </div>
          <Switch
            title="Bank"
            status={this.state.bankOne}
            switchButton={this.bankSwitchHandler}
          />
        </div>
      </main>
    );
  }
}

export default DrumMachine;
