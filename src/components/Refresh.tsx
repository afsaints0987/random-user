import http from '../api/http'

const Refresh: React.FC = () => {

    const getUser = async () => {
        try {
            const response = await http.get('/')
            const data = await response.data.results
            console.log(data)

            const user = JSON.stringify(data)
            localStorage.setItem('user', user)
            
        } catch(err) {
            console.log(err)
        }
    }


  return (
        <button className="btn btn-primary w-25" onClick={getUser}>Refresh</button>
  )
}

export default Refresh