import './styles/App.css';
import { Card } from 'react-bootstrap';
import VotingStatus from './Components/VotingStatus';
import VotingForm from './Components/VotingForm';

import Charizard from './images/charizard.png';
import Alakazam from './images/alakazam.png';
import Pokeball from './images/pokeball.png';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Pokeball} alt="pokeball" />
        <h1>Pokemon Presidential Election 2020</h1>
        <img src={Pokeball} alt="pokeball" />
      </header>
      <div className="cards__container">
        <Card className="card">
            <Card.Img src={Charizard} alt="Donald the Charizard" />
            <Card.Body>
            <Card.Title>Donald the Charizard</Card.Title>
            <Card.Text>
                So orange and fiery that the media hates him!
            </Card.Text>
            </Card.Body>
        </Card>
        <Card className="card">
            <Card.Img src={Alakazam} alt="Joe the Alakazam" />
            <Card.Body>
            <Card.Title>Joe the Alakazam</Card.Title>
            <Card.Text>
                Can mysteriously make thousands of votes appear out of thin air at 4AM! 
            </Card.Text>
            </Card.Body>
        </Card>
      </div>
      <div>
        <h1>Vote Manipulation Center</h1>
        <VotingStatus />
        <br></br>
        <div className="votingForms">
          <VotingForm header="Voting form for FIRST TIME voters" voteType="first-vote" />
          <VotingForm header="Voting form to CHANGE your vote" voteType="change-vote" />
        </div>
      </div>
    </div>
  );
}

export default App;
