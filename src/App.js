import React from 'react';
import Post from './post';
import PostForm from './postform';
import { LoremIpsum } from "lorem-ipsum";
import Container from 'react-bootstrap/Container';

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 10,
    min: 5
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.numPosts = 3;
    this.currentIndx = 0;
    this.state = {
      posts: [],
    };
  };

  componentDidMount() {
    // add 3 posts
    var posts = [];
    for (let i=0; i<3; i++) {
      posts.push({
        key: i,
        user: `Name ${i+1}`,
        text: lorem.generateSentences(),
        timeShow: 3000*i,
        timeHide: 3000*i + 10000
      });
    }

    this.setState({ posts: posts });
  };

  handlePostSubmission(event) {
    event.preventDefault();
    var contents = event.target[0].value;

    // add new post
    var posts = this.state.posts;
    posts.unshift({
      key: this.numPosts,
      user: 'You',
      text: contents,
      timeshow: 0,
      timeHide: 10000
    });

    this.numPosts++ 
    this.setState({ posts: posts });

    // post message for parent of frame to recieve
    window.parent.postMessage(
      { event_id: 'submitted post', contents: contents },  '*'
    ); 

  };

  render() {
    return (
      <Container className="App w-50 pt-3">
        <h1 id="olympusTitle" className="text-center">🏛 Olympus</h1>
        <PostForm onSubmit={this.handlePostSubmission.bind(this)}/>
        { this.state.posts.map((data) => {
          return (
            <Post {...data} />
          );
        }) }
      </Container>
    );
  };
};

export default App;
