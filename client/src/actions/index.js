import types from './types';

export default function frontPagePlayers() {
    //front page carousel player cards
    axios.post('/front_page', {number: 10}).then((response)=>{
      this.setState({
          cards: response.data
      });
    }).catch( e => {
        console.log('Error', e);
      }
    );
}
