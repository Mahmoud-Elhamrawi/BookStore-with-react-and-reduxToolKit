import React from "react";
import { useEffect  } from "react";
import { getBooks, DeleteBook ,selectBook } from "./../../redux/BookSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";

export default function BookList() {
  const dispatch = useDispatch();
  const { isload, Books } = useSelector((state) => state.Books);
  const { isLogIn } = useSelector((state) => state.auth);



  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);





  const myData =
    Books.length > 0
      ? Books.map((ele) => {
          return (
            <>
              <div
                className="d-flex justify-content-between text-center align-items-center border p-2"
                key={ele.id}
              >
                <div>
                  <h5>{ele.name}</h5>{" "}
                </div>
                <div>
                
                  <button onClick={() => {dispatch(selectBook(ele))  }}  className=" btn btn-info ">
                    read
                  </button>
                  <button
                 
                    onClick={() => {
                      dispatch(DeleteBook(ele.id));
                    }}
                    className="btn btn-danger ms-2 "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          );
        })
      : "there is no data";

  return (
    <>
      <div className="content">
        <h4>Book List</h4>

        {isload ? (
          "loading.........."
        ) : (
          <div className="p-2">{myData ? myData : <h2>no data</h2>}</div>
        )}
      </div>
    </> 
  );
}
