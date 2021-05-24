import './App.css';
import {useState, useEffect} from 'react'
import Axios from 'axios'

function App() {
  const [book_name, setbook_name] = useState('')
  const [book_author_name, setbook_author_name] = useState('')
  const [pages, setpages] = useState(0)
  const addToList = ()=>{
    Axios.post("https://mern-book-library.herokuapp.com/insert",{
      book_name:book_name,
      book_author_name:book_author_name,
      pages:pages,
    }).then(()=>{
      setList_books([...List_books,{book_name:book_name,book_author_name:book_author_name,pages:pages}])
    })
  };

  const[List_books,setList_books] = useState([])

  useEffect(() => {
    Axios.get("https://mern-book-library.herokuapp.com/read").then((response =>{
      setList_books(response.data);
    }))
    // return () => {
    //   console.log("reading")
    // }
  }, []);

  const[newbook_name,setnewbook_name] = useState('')
  const[newbook_author_name,setnewbook_author_name] = useState('')
  const[newpages,setnewpages] = useState(0)

  const updatebook = (id) => {
    Axios.put("https://mern-book-library.herokuapp.com/update",{
      id:id , 
      newbook_name:newbook_name , 
      newbook_author_name:newbook_author_name, 
      newpages:newpages
    }).then(
      ()=>{
        setList_books(
          List_books.map((val) => {
            return val._id ===id
            ? {_id:id,book_name:newbook_name,book_author_name:newbook_author_name,pages:newpages}
            : val;
          })
        );
      })
    // .then(()=>{
    //   setList_books(
    //     List_books.map((val)=>{
    //                 return val._id === id 
    //                 ? {_id:id, newbook_name:val.newbook_name , newbook_author_name:val.newbook_author_name, newpages:val.newpages}
    //                 : val; 
    //               }
    //             )
    //           );
    // });
  };

  const deletebook = (id)=>{
    Axios.delete(`https://mern-book-library.herokuapp.com/delete/${id}`).then(()=>{
      setList_books(
        List_books.filter((val)=>{
          return val._id !== id;
        })
      )
    });
  };
  return (
    <div className="App">
      <header>
        <h1 className="Title">BOOK LIBRARY MERN APP</h1>
      </header>      
      <div className="input">
        <label>
          <h2>BOOK NAME </h2>
          <input type="text" id="book_name" name="book_name" onChange={(event)=>{setbook_name(event.target.value);}}></input> 
        </label>
        <br></br>
        <br></br>
        <label>
          <h2>BOOK AUTHOR NAME </h2>
          <input type="text" id="book_author_name" name="book_author_name" onChange={(event)=>{setbook_author_name(event.target.value);}}></input> 
        </label>
        <br></br>
        <br></br>
        <label>
          <h2>NUMBER OF PAGES </h2>
          <input type="number" id="pages" name="pages" onChange={(event)=>{setpages(event.target.value);}}></input> 
        </label>
        <br></br>
        <br></br>
        <button type="button" onClick={addToList} ><h3>ADD TO LIST</h3></button>
      </div>
      <div >
      <h1 className="List_books">List of books</h1>
      {List_books.map((val,key) =>{
        return <div className="books" key={key}>
          <h1 className="bookname">{val.book_name}</h1><br></br>
          <h1>BOOK NAME        : {val.book_name}</h1> <aside><label><h2>EDIT BOOK NAME</h2></label><input type="text" placeholder="New Book Name" onChange={(event)=>{setnewbook_name(event.target.value);}}></input></aside><br></br>
          <h1>BOOK AUTHOR NAME : {val.book_author_name}</h1> <aside><label><h2>EDIT BOOK AUTHOR NAME</h2></label><input type="text" placeholder="New Book Author Name" onChange={(event)=>{setnewbook_author_name(event.target.value);}}></input></aside><br></br>
          <h1>NUMBER OF PAGES  : {val.number_of_pages}</h1> <aside><label><h2>EDIT NUMBER OF PAGES</h2></label><input type="number" placeholder="New Number of pages" onChange={(event)=>{setnewpages(event.target.value);}}></input></aside><br></br>
          <button className="update"  onClick={()=>updatebook(val._id)}><h2>UPDATE</h2></button>
          <button className="delete" onClick={()=>deletebook(val._id)}><h2>DELETE</h2></button>
          </div>

      })}
      
      </div>


    </div>
  );
}

export default App;
