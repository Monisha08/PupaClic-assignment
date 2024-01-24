import React, { useRef, useState, useEffect, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import quillEmoji from "react-quill-emoji";
import "react-quill-emoji/dist/quill-emoji.css";
import "quill-focus/src/focus.css";
import Focus from "quill-focus";
import "quill-paste-smart";
import QuillCursors from "quill-cursors";
import QuillBetterTable from "quill-better-table";
import "quill-better-table/dist/quill-better-table.css";
import htmlEditButton from "quill-html-edit-button";


function TextEditor() {
  const [text, setText] = useState("");
  const [findtext, setFindtext] = useState("");
  const [replacetext, setReplacetext] = useState("");
  const refforText = useRef(null);

  Quill.register(
    {
      "formats/emoji": quillEmoji.EmojiBlot,
      "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
      "modules/emoji-shortname": quillEmoji.ShortNameEmoji,
      "modules/focus": Focus,
      "modules/cursors": QuillCursors,
      "modules/better-table": QuillBetterTable,
      "modules/htmlEditButton": htmlEditButton,

    },
    true
  );

  function handleFindtext(e) {
    setFindtext(e.target.value);
  };

  function handleReplacetext(e) {
    setReplacetext(e.target.value);
  };

  function handleReplace() {
    if (findtext.trim() === "") {
      alert("enter a text to find the content");
    }

  const replacedContent = text.replaceAll(findtext, replacetext);
  setText(replacedContent);

  }

  const modules = useMemo(
    () => ({

      clipboard: {
        keepSelection: true,
        magicPasteLinks: true,
      },

      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image", "emoji", "bold", "italic", "underline", "strike", "link"],


        ],
      },

      htmlEditButton: {
        debug: true,
        syntax: false,
        msg: "Write your HTML and turn it out to as your content",
        okText: "Submit",

      },
      "emoji-toolbar": true,
      "emoji-shortname": true,

      focus: {
        focusClass: "focused-blot",
      },

      cursors: true,


    }),
    []
  );


  const textEditorStyle = {
    height: "50vh",
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="find text"
          value={findtext}
          onChange={handleFindtext}
        />

        <input
          type="text"
          placeholder="replace text"
          value={replacetext}
          onChange={handleReplacetext}
        />
        <button onClick={handleReplace}>Replace</button>
      </div>

      <br />

      <div>
        <ReactQuill
          id="quillEditor"
          theme="snow"
          value={text}
          modules={modules}
          onChange={setText}
          ref={refforText}
          style={textEditorStyle}
        />

      </div>

    </>
  );
}

export default TextEditor;