import logo from './logo.svg';
import './App.css';
import CreatePost from './components/CreatePost';
import { Tab, TabNavigation } from 'evergreen-ui';
import { useMemo, useState } from 'react';
import BlogPosts from './components/BlogPosts';
import BlogPost from './components/BlogPost';
import About from './components/About';

function App() {
  const tabs = useMemo(() => ['Blog Posts', 'Create Post', 'About'], [])
  // State is only used here for demo purposes, your routing abstraction might support hash links
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [selectedBlog, setSelectedBlog] = useState({})

  return (
    <div className="App">
      <h1>My Blog</h1>
    

      {selectedBlog?.title 
        ?
        <BlogPost blog={selectedBlog} setSelectedBlog={setSelectedBlog} />
        :
        <>
          <TabNavigation style={{width: 'fit-content', margin: '0 auto'}}>
          {tabs.map((tab, index) => {
            const id = tab.toLowerCase().replace(' ', '-')
            const hash = `#${id}`
            return (
              <Tab
                href={hash}
                is="a"
                isSelected={selectedIndex === index}
                key={tab}
                onClick={() => setSelectedIndex(index)}
              >
                {tab}
              </Tab>
            )
          })}
          </TabNavigation>

          {selectedIndex === 0 ?
            <BlogPosts setSelectedBlog={setSelectedBlog} />
          : ''}

          {selectedIndex === 1 ?
            <CreatePost />
          : ''}

          {selectedIndex === 2 ?
            <About />
          : ''}
        </>
      }

    </div>
  );
}

export default App;
