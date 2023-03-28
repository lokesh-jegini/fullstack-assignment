import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Contact() {
  return (
    <div>
      <h1>contact.js</h1>
      <Outlet />
      <button>
        <Link to="contact1">content1</Link>
      </button>
      <button>
        <Link to="contact2">content2</Link>
      </button>
      <button>
        <Link to="contact3">content3</Link>
      </button>
    </div>
  );
}

export const Content1 = () => {
  return (
    <div>
      <h1>content1</h1>
    </div>
  );
};
export const Content2 = () => {
  return (
    <div>
      <h1>content2</h1>
    </div>
  );
};
export const Content3 = () => {
  return (
    <div>
      <h1>content3</h1>
    </div>
  );
};
