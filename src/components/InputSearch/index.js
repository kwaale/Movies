import { useDispatch } from "react-redux";
import { getMovies } from '../../actions';
import { useState } from 'react';

const InputSearch = (props) => {
  const [localState, setLocalState] = useState({
    title: ""
  })
  const dispatch = useDispatch();

  function handleChange(event) {
    setLocalState({ title: event.target.value });
    dispatch(getMovies(event.target.value))
  }

  return (
    <div>
      <form className="form-container">
        <div>
          <input
            type="text"
            id="title"
            autoComplete="off"
            placeholder='Search Movies...'
            value={localState.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </form>
    </div>
  )
}
export default InputSearch;

