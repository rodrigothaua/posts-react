import { Component } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

export class Home extends Component {
  state = {
    posts : [],
    allPosts: [],
    page: 0,
    postsPerPage: 53
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state

    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts,
    } = this.state;
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

    posts.push(...nextPosts)

    this.setState({posts, page: nextPage})

  }

  render() {

    const { posts, page, postsPerPage, allPosts } = this.state
    const noMorePosts =  page + postsPerPage >= allPosts.length

    return (
      <section className="container">
        <input
          onChange={(e) => console.log(e.target.value)}
          type="search" 
          
          /><br /><br /><br />

        <Posts posts={posts} />

        <div className="button-container">
          <Button
            text="Load More Posts"
            onClick={this.loadMorePosts}
            disable={noMorePosts}
          />
        </div>
      </section>
    );
  }
}

export default Home;

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
  );
}

export default App;*/
