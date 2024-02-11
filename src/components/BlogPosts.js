import { Heading, Image, Pane, Paragraph, Spinner } from "evergreen-ui"
import { useEffect, useState } from "react"

const BlogPosts = ({setSelectedBlog}) => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)

  const getBlogs = async () => {
    setLoading(true)
    try {
      const res = await fetch("https://sheetdb.io/api/v1/op6lxoygtwejo")
      const data  = await res?.json()

      console.log(data)

      setBlogs(data?.reverse())
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <Pane style={{width: '60%', margin: '10px auto'}}>
      <Heading size={800} textAlign="center">Blog Posts</Heading>
      {loading ? 
      <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
        <Spinner />
      </Pane>
      : ''}
      
      <Pane style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', margin: '20px auto'}}>
      {blogs?.map((blog, idx) => (
        <Pane key={idx} marginBottom={20} onClick={() => setSelectedBlog(blog)} style={{cursor: "pointer", width: 300}}>
          <Image src={blog?.imageUrl} width={300} height={200} alt={blog?.title} />
          <Heading style={{textTransform: 'capitalize'}}>{blog?.title}</Heading>
          <Paragraph>{blog?.description?.slice(0,200) + '...'}</Paragraph>
        </Pane>
      ))}
      </Pane>
    </Pane>
  )
}

export default BlogPosts
