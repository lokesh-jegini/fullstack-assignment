import { useSelector, useDispatch } from 'react-redux'
import { todoActions } from './todoSlicer'

const ReactReduxTodo = () => {
  const todoList = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const handleDelete = (index) => {
    dispatch(todoActions.remove(index))
  }

  const handleAdd = () => {
    dispatch(todoActions.add({
      id: Date.now(),
      text: 'New TODO item' + (Math.random() * 100),
    }))
  }

  return (
    <div>
      <button onClick={handleAdd}>ADD Random TODO item</button>
      <ul>
        {
          todoList.map((todo, index) => {
            return <li>{todo.text} <button onClick={() => handleDelete(index)}>delete</button></li>
          })
        }
      </ul>
    </div>
  )
}

export default ReactReduxTodo;