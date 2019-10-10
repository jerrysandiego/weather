import React from 'react';
import logo from './logo.svg';
import './App.css';

class SnapShot extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    //this.state = Object.assign(props.values);
    //console.log(this.state);
    /*{
      date: new Date(data.dt * 1000).toLocaleDateString(),
      high: data.main.temp_max,
      low: data.main.temp_min,
      desc: data.weather[0].description
    }*/
  }

  render() {
    let list = "";
    if (this.props.data) {
      list = this.props.data.map((item, index) =>
        <li key={index}>
          <div className="item">
            <div>Date : {new Date(item.dt * 1000).toUTCString()}</div>
            <div>High temp: {item.main.temp_max}</div>
            <div>Low : {item.main.temp_min}</div>
            <div>Description : {item.weather[0].description}</div>
          </div>
        </li>);
    }

    return (
      <ul className="list">{list}</ul>
    );
  }

}
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { city: 'san diego', period: "current" };
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCityChange(event) {
    this.setState({ city: event.target.value });
  }

  handlePeriodChange(event) {
    this.setState({ period: event.target.value });
  }

  handleSubmit(event) {
    this.update();
    event.preventDefault();
  }

  update() {
    fetch(`http://api.openweathermap.org/data/2.5/${this.state.period === 'current' ? 'weather' : 'forecast'}?q=${this.state.city}&` +
      `APPID=c6b0b2b0c00ef5d8be8850e1fa6f375c`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (this.state.period === 'current') {
          this.setState({ data: [data] });
        }
        else {
          this.setState({ data: data.list });
        }
      });

  }

  componentDidMount() {
    this.update();
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.city}
          onChange={this.handleCityChange} />
        <select value={this.state.period} onChange={this.handlePeriodChange}>
          <option value="current">Current</option>
          <option value="5_day">5 day</option>
        </select>
        <button onClick={this.handleSubmit}>Go</button>
        <SnapShot {...this.state} />
      </div>
    );
  }
}

function App() {
  return (
    <Weather />
  );
  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload1.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
}

export default App;
