import { useMutation, useQuery } from "@apollo/client/react"
import { ALL_AUTHORS, EDIT_AUTHOR_BIRTHYEAR } from "../queries"
import { useState } from "react"

const Authors = (props) => {
  const [birthyear, setBirthyear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  // console.log(result)
  const [editAuthor, editResult] = useMutation(EDIT_AUTHOR_BIRTHYEAR)

  if (!props.show) {
    return null
  }

  const updateBirthYear = (e) => {
    e.preventDefault()
    console.log(selectedAuthor, parseInt(birthyear));
    if(selectedAuthor && parseInt(birthyear)){
      console.log('heree')
      editAuthor({variables: {name: selectedAuthor, year: parseInt(birthyear)}, refetchQueries: [ALL_AUTHORS]})
      setSelectedAuthor(null)
      setBirthyear('')
    }else{
      alert('Author field is missing or birth year not an integer')
    }
  }
  // const authors = []
  if (result.loading) {
    return (
      <div>
        loading authors data....
      </div>
    )
  }
  const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>set birthyear</h2>
      <form onSubmit={updateBirthYear}>
        <select name="selectedAuthor" onChange={({target}) => setSelectedAuthor(target.value)} >
          {authors.map(a => <option value={a.name} key={a.id}>{a.name}</option>)}
        </select>
        <div>
          <label name='authorBirthYear'>born:</label>
          <input type="text" name="authorBirthYear" onChange={({target}) => setBirthyear(target.value)} value={birthyear}/>
        </div>
        <button>Update author</button>
      </form>

    </div>
  )
}

export default Authors
