
import {useSelector } from 'react-redux/es/exports';



export default function BookDetils() {
  const select = useSelector( state => state.Books)
  return (<>
  
     {
        
        <div >
      <h4>Book Details</h4>
      {select.BookSelected ? <ul key={select.BookSelected.id}>
                    <li>name : {select.BookSelected.name}</li>
                    <li>price : {select.BookSelected.prise}</li>
                    <li>Desc :{select.BookSelected.Desc} </li>
                         <button className='btn btn-success mt-2'>Download</button>
                    </ul>   :  <div className='alert alert-danger'>there is no book info </div>
            }
            <ul>
            
            </ul>
     </div>
    }
    </>
    )
}
