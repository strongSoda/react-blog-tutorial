import { Button, Heading, Image, Pane, Paragraph } from "evergreen-ui"

const BlogPost = ({blog, setSelectedBlog}) => {
  return (
    <Pane style={{textAlign: 'center'}}>
      
      <Button appearance="primary" onClick={() => setSelectedBlog({})}>Go Back</Button>
      
      <Pane style={{margin: '20px auto'}} padding={10} background="#efefef" width="60%">
        <Heading size={900} style={{textTransform: 'capitalize', marginBottom: 10}}>{blog?.title}</Heading>
        <Heading style={{textTransform: 'capitalize', marginBottom: 10}}>{blog?.description}</Heading>

        <Image src={blog?.imageUrl} marginBottom={40} width={600} height={400} alt={blog?.title} />
        <Pane style={{textAlign: 'start', padding: 10}} dangerouslySetInnerHTML={{__html: blog?.body}} ></Pane>
      </Pane>
    </Pane>
  )
}

export default BlogPost
