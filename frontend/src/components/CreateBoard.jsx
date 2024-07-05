import React, {useState}from 'react'

const CreateBoard = () => {

    const[title, setTitle] = useState('');

    const handleChange=(e)=>{
        setTitle(e.target.value);
    }

    const handleSubmit=()=>{
        e.preventDefault();
        const newBoard = {title};
        const res = axios.post('http://localhost:5000/api/boards', newBoard);
        setTitle('');
    }

  return (
    <div>
      <form>
        <input type='text' placeholder='title' value={title} onChange={handleChange}/>
        <button onClick={handleSubmit}>Create</button>
      </form>
    </div>
  )
}

export default CreateBoard
