import React from 'react';
import Relay from 'react-relay';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import './app.css';
import debounce from 'lodash.debounce';

class App extends React.Component {
 constructor(props){
  super(props)
  this.searchInput = null;
  this.searchData = debounce(this.searchData.bind(this),500);
 }
  trimDate(fullDate) {
    const dateLength = fullDate.length;
    let dateStamp = fullDate.slice(3, 10) + " " + fullDate.slice(dateLength - 4, dateLength)
    return dateStamp;
  }
  searchData(){
    let value =  this.searchInput.value;
    this.props.relay.setVariables({
      query:value
    })
  }
  selectLimit(e){
    let value = parseInt(e.target.value);
    this.props.relay.setVariables({
      limit:value
    })
  }
  render() {
    return (
      <div>

        <h1>Twitteratis</h1>

        <div className="search-container">
          <input type="search" ref={(el) => {this.searchInput = el;}} placeholder="Type here to search further" onChange={this.searchData.bind(this)}/>
          <select onChange={this.selectLimit.bind(this)}>
            <option value="5" default>5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        {this.props.tweet.searchConnection.edges.map(tweet =>
          //  <span key={tweet.id}><small>id: {tweet.id}</small> <br></br> {tweet.text}  <br></br>-- @<i>{tweet.user.screen_name}</i></span>

          <Card key={tweet.node.id}
                style={{
                  margin: '15px auto',
                  width: '60%'
                }}
          >
            <CardText
              style={{
                fontSize: '20px'
              }}>
              {tweet.node.text}+ {tweet.node.user.profile_image_url}
            </CardText>
            <CardHeader
              title={tweet.node.user.screen_name}
              avatar={tweet.node.user.profile_image_url}
              subtitle={this.trimDate(tweet.node.created_at)}
              style={{
                textAlign: 'right'
              }}

            />
          </Card>
        )}

      </div>
    );
  }
}

App = Relay.createContainer(App, {
  initialVariables : {
       query : "graphQl",
       limit : 5
    },
  fragments: {
    tweet: () => Relay.QL`
    fragment on Store{
      searchConnection(q:$query,count:$limit,first:5){
        edges{
          node{
            id,
            text,
            created_at,
            user{
                screen_name,
                profile_image_url
            }
          }
        }
      }
    }
    `
  }
});

export default App;