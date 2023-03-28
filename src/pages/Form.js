import React from "react";
import { useState } from "react";
import axios from "axios";
export default function Form() {
  const [data, setData] = useState([
    {
      username: "",
      description: "",
      content: "",
      dates: "",
      selection: "",
      author: "",
    },
  ]);

  const { username, description, content, dates, selection, author } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (author === username) {
      axios
        .post("https://jsonplaceholder.typicode.com/users", { data })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    } else {
      console.log("user and author name not match");
    }
  };
  return (
    <div>
      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column", width: "50%" }}
      >
        <lable>enter name</lable>
        <input
          onChange={changeHandler}
          type="text"
          placeholder="enter name"
          required
          name="username"
          value={username}
        ></input>
        <lable>description</lable>
        <textarea
          onChange={changeHandler}
          name="description"
          value={description}
          type="text"
          placeholder="write shrt note"
          required
        ></textarea>
        <lable>content</lable>
        <textarea
          onChange={changeHandler}
          name="content"
          value={content}
          type="text"
          placeholder="describe"
          required
        ></textarea>
        <input
          onChange={changeHandler}
          type="date"
          required
          name="dates"
          value={dates}
        />
        <select onChange={changeHandler} name="selection" value={selection}>
          <option>tehnology</option>
          <option>food</option>
          <option>travel</option>
        </select>
        <lable>author</lable>
        <input
          onChange={changeHandler}
          name="author"
          value={author}
          type="text"
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
