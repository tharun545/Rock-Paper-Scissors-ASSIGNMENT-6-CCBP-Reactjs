import {Component} from 'react'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    score: 0,
    newArray: [choicesList[0], choicesList[1]],
    isClicked: false,
    text: '',
  }

  getResult = (choice1, choice2) => {
    if (choice1.id === 'ROCK') {
      switch (choice2.id) {
        case 'PAPER':
          return 'YOU LOSE'
        case 'SCISSORS':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else if (choice1.id === 'PAPER') {
      switch (choice2.id) {
        case 'SCISSORS':
          return 'YOU LOSE'
        case 'ROCK':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else {
      switch (choice2.id) {
        case 'PAPER':
          return 'YOU WON'
        case 'ROCK':
          return 'YOU LOSE'
        default:
          return 'IT IS DRAW'
      }
    }
  }

  checkResult = id => {
    const {score} = this.state
    const choice2 = choicesList[Math.floor(Math.random() * choicesList.length)]
    const choice1 = choicesList.filter(each => each.id === id)
    const result = this.getResult(choice1[0], choice2)
    if (result === 'YOU WON') {
      this.setState(prevState => ({score: prevState.score + 1}))
    } else if (result === 'IT IS DRAW') {
      this.setState({score})
    } else {
      this.setState(prevState => ({score: prevState.score - 1}))
    }
    this.setState({newArray: [choice1[0], choice2]})
    this.setState({text: result})
  }

  renderPlayAgainView = () =>
    this.setState({
      isClicked: false,
      newArray: [choicesList[0], choicesList[1]],
      text: '',
    })

  renderGameResultView = () => {
    const {newArray, text} = this.state
    console.log(newArray)
    console.log(text)
    return (
      <div className="main-result-view-card">
        <div className="result-view-card">
          <div className="choice-card">
            <h1 className="names">YOU</h1>
            <img
              src={newArray[0].imageUrl}
              alt="your choice"
              className="game-icon"
            />
          </div>
          <div className="choice-card">
            <h1 className="names">OPPONENT</h1>
            <img
              src={newArray[1].imageUrl}
              alt="opponent choice"
              className="game-icon"
            />
          </div>
        </div>
        <div className="result-card">
          <p className="names">{text}</p>
          <button
            type="button"
            className="play-again"
            onClick={this.renderPlayAgainView}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  onClickRock = id => {
    const {isClicked} = this.state
    this.checkResult(id)
    if (isClicked === true) {
      this.setState({isClicked: false})
    } else {
      this.setState({isClicked: true})
    }
  }

  onClickPaper = id => {
    const {isClicked} = this.state
    this.checkResult(id)
    if (isClicked === true) {
      this.setState({isClicked: false})
    } else {
      this.setState({isClicked: true})
    }
  }

  onClickScissors = id => {
    const {isClicked} = this.state
    this.checkResult(id)
    if (isClicked === true) {
      this.setState({isClicked: false})
    } else {
      this.setState({isClicked: true})
    }
  }

  renderHomeView = () => (
    <div className="app-container">
      <div className="game-images-card">
        <div>
          <button
            type="button"
            data-testid="rockButton"
            onClick={() => this.onClickRock(choicesList[0].id)}
          >
            <img
              src={choicesList[0].imageUrl}
              alt={choicesList[0].id}
              key={choicesList[0].id}
              className="game-icon"
            />
          </button>
          <button
            type="button"
            data-testid="scissorsButton"
            onClick={() => this.onClickScissors(choicesList[1].id)}
          >
            <img
              src={choicesList[1].imageUrl}
              alt={choicesList[1].id}
              key={choicesList[1].id}
              className="game-icon"
            />
          </button>
        </div>
        <div>
          <button
            type="button"
            data-testid="paperButton"
            onClick={() => this.onClickPaper(choicesList[2].id)}
          >
            <img
              src={choicesList[2].imageUrl}
              alt={choicesList[2].id}
              key={choicesList[2].id}
              className="game-icon"
            />
          </button>
        </div>
      </div>
      <div className="btn-card">
        <Popup
          trigger={
            <button type="button" className="rules-btn">
              RULES
            </button>
          }
          modal
          nested
        >
          {close => (
            <div className="modal">
              <button type="button" className="close" onClick={close}>
                &times;
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="rules-icon"
              />
            </div>
          )}
        </Popup>
      </div>
    </div>
  )

  render() {
    const {score, isClicked} = this.state
    return (
      <div className="app-container">
        <div className="head-container">
          <div className="game-head-card">
            <div className="game-names-card">
              <h1 className="names">
                ROCK
                <br /> PAPER <br /> SCISSORS
              </h1>
            </div>
            <div className="score-card">
              <p className="score-name">Score</p>
              <p className="score-count">{score}</p>
            </div>
          </div>
        </div>
        {isClicked ? this.renderGameResultView() : this.renderHomeView()}
      </div>
    )
  }
}

export default App
