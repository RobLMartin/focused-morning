import { useCallback, useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import config from "./config";
import { Form, useSubmit } from "@remix-run/react";

export default function Editor({ record, action }) {
  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState(record.content);
  const submit = useSubmit();
  const formRef = useRef();

  useEffect(() => {
    if (window) {
      if (!document.getElementById("ssr-holder").firstChild) {
        setEditor(
          new EditorJS({
            holder: "ssr-holder",
            tools: config,
            data: record.content,
          })
        );
      }
    }
  }, [record, window]);

  if (typeof window === "undefined") {
    return (
      <div>
        <div id="ssr-holder"></div>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    editor.save().then((data) => {
      submit(
        { body: JSON.stringify(data) },
        {
          method: "post",
          action,
        }
      );
    });
  };

  return (
    <div className="p-5">
      {/* <Form ref={formRef} onSubmit={handleSave}>
        <input type="hidden" name="content" value={JSON.stringify(content)} />
        <button type="submit">Save</button>
      </Form> */}
      <div
        id="ssr-holder"
        className="p-10 bg-white w-full min-h-screen shadow-md 
        rounded-xl"
      ></div>
    </div>
  );
}
