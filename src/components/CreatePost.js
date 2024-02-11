// title
// description
// image url
// body
// tags, category
// date
// author

import { Alert, Button, Heading, Label, Pane, TextInput, TextInputField, Textarea } from "evergreen-ui"
import { useState } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  
  const create = async () => {
    setError('')
    setSuccess('')
    if(title &&  description && imageUrl && body ) {
      console.log('here')
      setLoading(true)
      try {
        const res = await fetch('https://sheetdb.io/api/v1/op6lxoygtwejo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    { 
                      'id': "INCREMENT",
                        title,
                        description,
                        imageUrl,
                        body
                    }
                ]
            })
        })
  
        const data = await res?.json()
  
        console.log(data)
        if(data?.created === 1) {
          setSuccess('Post created!')
          setBody('')
          setDescription('')
          setTitle('')
          setImageUrl('')
        }
      } catch(e) {
        console.error(e)
        setError('Something went wrong!')
      } finally {
        setLoading(false)
      }
    } else {
      setError('Empty Fields!')
    }
  }

  return (
    <>
      <Pane width={500} style={{margin: '0 auto', boxShadow: '0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12)', padding: 20}}>
        <Heading size={20}>Create new Post</Heading>
        <div style={{margin: 20}}>
          {
            error?.length ? <Alert intent="danger" title={error} /> : ''
          }

          {
            success?.length ? <Alert intent="success" title={success} /> : ''
          }
        </div>

        <TextInputField onChange={e => setTitle(e.target.value)} value={title}   
        label="Blog Title"
    description="My cool title"
    placeholder="My first blog" />

      <TextInputField onChange={e => setDescription(e.target.value)} value=
            {description}   label="Blog Description"
    description="My cool description"
    placeholder="more details" />

      <TextInputField onChange={e => setImageUrl(e.target.value)} value={imageUrl}   label="Image URl"
    description="Blog image"
    placeholder="" />

      <Label htmlFor="textarea-2" marginBottom={4} display="block">
        Blog Body
      </Label>
      
      <ReactQuill theme="snow" value={body} onChange={setBody} />

      <Button appearance="primary" marginTop={20} onClick={create} isLoading={loading}>Create Post</Button>
    </Pane>

    </>
  )
}

export default CreatePost
