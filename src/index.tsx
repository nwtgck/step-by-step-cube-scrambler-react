import * as React      from 'react';
import * as ReactDOM   from 'react-dom';

// Typed Props
interface Props {
    content: string;
}

// Typed State
interface State {
    algorithm: string;
}

class App extends React.Component<Props, State> {
  constructor(props){
    super(props);
    this.state = {
      algorithm: '',
    }
  }

  render () {
    return (
      <div>
        <h1>Step-by-Step Rubik's Cube scrambler</h1>
        <p>
            <input
                defaultValue={this.state.algorithm}
                onChange={(e) => this.setState({algorithm: e.target.value})}
                style={{width: '600px'}}
                placeholder="Input algorithm"
            />
        </p>

          <img src={`http://cube.crider.co.uk/visualcube.php?fmt=svg&size=300&pzl=3&alg=${this.state.algorithm}`} />
      </div>
    );
  }
}

ReactDOM.render(<App content="this is a content"/>, document.getElementById('root'));
