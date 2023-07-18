import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichTextEditor({}) {
  const [postText, setPostText] = useState("");

  return (
    <ReactQuill
      theme="snow"
      postText={postText}
      onChange={setPostText}
      className="reactquill_container"
    />
  );
}
