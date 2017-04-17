import React from 'react';
import Relay from 'react-relay';
import {debounce} from "lodash";
import { Card, CardHeader, CardText } from 'material-ui/Card';
import './app.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.setVariables = debounce(this.props.relay.setVariables, 1000);
  }

  _search = (e) => {
    this.setVariables({ query: e.target.value , after:null , before:null,currentPage:1});
  }

  _previousPage() {
    this.setVariables({before:this.props.tweet.tweetConnection.pageInfo.startCursor,after:null,
                      last:5,first:null,currentPage:this.props.relay.variables.currentPage-1})
  }

  _nextPage() {
    this.setVariables({before:null,after:this.props.tweet.tweetConnection.pageInfo.endCursor,
                      last:null,first:5,currentPage:this.props.relay.variables.currentPage+1})
  }

  trimDate(fullDate) {
    const dateLength = fullDate.length;
    let dateStamp = fullDate.slice(3, 10) + " " + fullDate.slice(dateLength - 4, dateLength)
    return dateStamp;
  }

  render() {
    var maxPage = this.props.relay.variables.count / this.props.relay.variables.first;
    return (
      <div>

        <h1>Twitteratis</h1>

        <div className="search-container">
          <input type="search" placeholder="Type here to search further" onChange={::this._search} defaultValue = {this.props.relay.variables.query} />
        </div>
        <button onClick={::this._previousPage} 
                disabled={this.props.relay.variables.currentPage === 1? true : false }>
                Previous Page
        </button>
        <button onClick={::this._nextPage}
                disabled={this.props.relay.variables.currentPage === maxPage? true : false }>
                Next Page
        </button>
        {this.props.tweet.tweetConnection.edges.map(({node:tweet}) =>
          //  <span key={tweet.id}><small>id: {tweet.id}</small> <br></br> {tweet.text}  <br></br>-- @<i>{tweet.user.screen_name}</i></span>

          <Card key={tweet.id}
                style={{
                  margin: '15px auto',
                  width: '60%'
                }}
          >
            <CardText
              style={{
                fontSize: '20px'
              }}>
              {tweet.text}+ {tweet.user.profile_image_url}
            </CardText>
            <CardHeader
              title={tweet.user.screen_name}
              avatar={tweet.user.profile_image_url}
              subtitle={this.trimDate(tweet.created_at)}
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

export default Relay.createContainer(App, {
  initialVariables: {
    currentPage:1,
    count:20,
    first:5,
    last:null,
    query:"sapientnitro",
    after:null,
    before:null
  },
  fragments: {
    tweet: () => Relay.QL`
        fragment on Viewer {
            id,
            tweetConnection(first:$first,last:$last,q:$query,count:$count,after:$after,before:$before){
              pageInfo{
                hasNextPage,
                hasPreviousPage,
                startCursor,
                endCursor
              },
              edges {
                cursor,
                node {
                  id,
                text,
                created_at
                user{
                    screen_name,
                    profile_image_url
                }
                }
              }
                
            }
        }
    `,
  },
});
