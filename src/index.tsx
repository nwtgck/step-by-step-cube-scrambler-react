import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import {List}          from 'immutable'

// Typed Props
interface Props {
    content: string;
}

// Typed State
interface State {
    algorithm: string;
    currRotateCodesIdx: number;
}

class App extends React.Component<Props, State> {
  constructor(props){
    super(props);
    this.state = {
        algorithm         : "U L' F U R L' U R D F D' B D L B F L B' D L' B L D L' U",
        currRotateCodesIdx: 0
    }
  }

  onChangeAlgorithm(e: any){
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

      if(0 <= inced && inced < this.state.algorithm.length){
          this.setState({
              currRotateCodesIdx: inced
          });
      }
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

          <img src={`http://cube.crider.co.uk/visualcube.php?fmt=svg&size=300&pzl=3&alg=${this.getRotateCodes.bind(this)().take(this.state.currRotateCodesIdx).join("")}`} />
          <button onClick={() => this.incCurrRotateCodesIdx.bind(this)(-1)}>{"<"}</button>
          <button onClick={() => this.incCurrRotateCodesIdx.bind(this)(+1)}>{">"}</button>

          <p>
              {
                  this.getRotateCodes.bind(this)().take(this.state.currRotateCodesIdx).map((e, idx) => {
                      return <span key={idx} style={{color: 'black', fontWeight: 'bold', fontSize: '20px'}}>{e}</span>
                  })
              }
              {
                  this.getRotateCodes.bind(this)().skip(this.state.currRotateCodesIdx).map((e, idx) => {
                      return <span key={idx} style={{color: 'gray'}}>{e}</span>
                  })
              }
          </p>

      </div>
    );
  }
}

ReactDOM.render(<App content="this is a content"/>, document.getElementById('root'));
