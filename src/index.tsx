import * as React         from 'react';
import * as ReactDOM      from 'react-dom';
import {List}             from 'immutable'
import * as cubeScrambler from 'cube-scrambler';

// Typed Props
interface Props {
    content: string;
}

// Typed State
interface State {
    algorithm         : string;
    currRotateCodesIdx: number;
    algorithmLength   : number;
}

class App extends React.Component<Props, State> {
  constructor(props){
    super(props);
    this.state = {
        algorithm         : "U L' F U R L' U R D F D' B D L B F L B' D L' B L D L' U",
        currRotateCodesIdx: 0,
        algorithmLength   : 25
    };

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                this.incCurrRotateCodesIdx(-1);
                break;
            case 'ArrowRight':
                this.incCurrRotateCodesIdx(+1);
                break;
        }
    });


  }

  onChangeAlgorithm(e: any){ // TODO Not to use any
      // Get input
      const algorithm = e.target.value;

      const currRotateCodesIdx = (this.state.currRotateCodesIdx < algorithm.length)?
          this.state.currRotateCodesIdx: algorithm.length - 1;

      // Change state
      this.setState({
          algorithm         : algorithm,
          currRotateCodesIdx: currRotateCodesIdx
      });
  }

    onChangeAlgorithmLength(e: any){ // TODO Not to use any
      const algorithmLength = e.target.value;

      this.setState({
          algorithmLength: algorithmLength
      });
    }

    /**
     * Generate rotate-codes
     * @returns {List<string>}
     */
  getRotateCodes(): List<string>{
      // Generate rotate codes
      const rotateCodes =  List(this.state.algorithm.split(' '));
      return rotateCodes;
  }

    /**
     * Increment/Decrement current rotate-codes index
     * @param {number} inc
     */
  incCurrRotateCodesIdx(inc: number){ // NOTE: inc can be negative value
      const inced = this.state.currRotateCodesIdx + inc;

      if(0 <= inced && inced <= this.getRotateCodes().size){
          this.setState({
              currRotateCodesIdx: inced
          });
      }
  }

    /**
     * Set Rotate codes index to start position
     */
  setStartRotateCodesIdx(){
      this.setState({
          currRotateCodesIdx: 0
      });
  }

    /**
     * Set Rotate codes index to end position
     */
    setEndRotateCodesIdx(){
        this.setState({
            currRotateCodesIdx: this.getRotateCodes().size
        });
    }

    /**
     * Set random algorithm
     */
  setScrambledAlgorithm(){
      this.setState({
          algorithm : cubeScrambler().scramble(this.state.algorithmLength).join(' ')
      });
  }

  render () {
    return (
      <div>
        <h1>Step-by-Step Rubik's Cube scrambler</h1>
        <p>
            <input
                defaultValue={this.state.algorithm}
                onChange={this.onChangeAlgorithm.bind(this)}
                style={{width: '600px'}}
                placeholder="Input algorithm"
            />
        </p>

          <img src={`http://cube.crider.co.uk/visualcube.php?fmt=svg&size=300&pzl=3&sch=wrgyob&alg=${this.getRotateCodes.bind(this)().take(this.state.currRotateCodesIdx).join("")}`} />
          <p>
              <button onClick={() => this.incCurrRotateCodesIdx.bind(this)(-1)}>{"<"}</button>
              <button onClick={() => this.incCurrRotateCodesIdx.bind(this)(+1)}>{">"}</button>
          </p>
          <p>
              <button onClick={() => this.setStartRotateCodesIdx.bind(this)()}>{"<<"}</button>
              <button onClick={() => this.setEndRotateCodesIdx.bind(this)()}>{">>"}</button>
          </p>
          <p>
              Length: <input type="number" defaultValue={this.state.algorithmLength.toString()} onChange={this.onChangeAlgorithmLength.bind(this)} />
              <button onClick={() => this.setScrambledAlgorithm.bind(this)()}>{"Scramble!"}</button>
          </p>


          <p>
              {
                  this.getRotateCodes.bind(this)().take(this.state.currRotateCodesIdx).map((e, idx) => {
                      return <span key={idx} style={{color: 'black', fontWeight: 'bold', fontSize: '30px', marginRight: '5px'}}>{e}</span>
                  })
              }
              {
                  this.getRotateCodes.bind(this)().skip(this.state.currRotateCodesIdx).map((e, idx) => {
                      return <span key={idx} style={{color: 'gray', fontSize: '20px', marginRight: '10px'}}>{e}</span>
                  })
              }
          </p>
          Click <a href="https://ruwix.com/puzzle-scramble-generator/?type=rubiks-cube">Twisty Puzzle Scramble Generator</a> to get algorithms
          <div>Graphics are generated using <a href="http://cube.crider.co.uk/visualcube.php">VisualCube</a></div>

      </div>
    );
  }
}

ReactDOM.render(<App content="this is a content"/>, document.getElementById('root'));
