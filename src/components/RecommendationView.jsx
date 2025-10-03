import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS_BY_GENRE } from "../queries"
import { useEffect, useState } from "react"

export const RecommendationView = ({ show, user }) => {
    const [books, setbooks] = useState([])
    console.log(user)
    let result = {}

    const genre = user? user.favoriteGenre : ['default']
    result = useQuery(ALL_BOOKS_BY_GENRE, {
        variables: { genre: genre }
    })
    console.log(result)


    useEffect(() => {
        if (result.data) setbooks(result.data.allBooks)
    }, [result.data])
    if (!show) return null

    if (result.loading) {
        return (
            <div>loading....</div>
        )
    }
    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{user.favoriteGenre}</b></p>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((b) => (
                        <tr key={b.title}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}