import { useEffect, useState, useRef } from 'react';
import './styles/App.scss';
import LogoMD from './assets/octicon-markdown.svg';

import marked from 'marked';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

marked.setOptions({
  breaks: true,
});

function App() {
  const [markdown, setMarkdown] = useState(initialEditorState());
  const [htmlPreview, seHtmlPreview] = useState(initialHtmlState());

  useEffect(() => {}, []);
  const previewPanel = useRef(null);

  function parseText(instance, change) {
    const editorInput = instance.getValue();
    setMarkdown(editorInput);

    const html = marked(editorInput);
    seHtmlPreview(html);
  }

  function onScrollCM(instance) {
    const editorPanelScrollInfo = instance.getScrollInfo();
    previewPanel.current.scroll({
      top: editorPanelScrollInfo.top,
      left: editorPanelScrollInfo.left,
      behavior: 'smooth',
    });
  }

  function parseTextFcc(e) {
    const editorInput = e.target.value;
    setMarkdown(editorInput);

    const html = marked(editorInput);
    seHtmlPreview(html);
  }

  return (
    <div className="App vh-100">
      <main>
        <nav className="navbar navbar-light shadow-sm">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img
                src={LogoMD}
                alt=""
                height="31"
                className="d-inline-block align-top pr-3"
              />
              <h1 className="title d-inline-block h4">
                Markdown Previewer Online
              </h1>
            </a>
          </div>
        </nav>
        <div className="row h-100">
          <div className="editor-panel col-12 col-md-6 position-relative overflow-hidden">
            <textarea
              id="editor"
              onChange={parseTextFcc}
              value={markdown}
              style={{ display: 'none' }}
            ></textarea>
            <CodeMirror
              id="editor"
              className="w-100 h-100"
              value={markdown}
              onScroll={onScrollCM}
              options={{
                theme: 'monokai',
                keyMap: 'sublime',
                mode: 'markdown',
              }}
              onChange={parseText}
            />
            <div className="separator d-none d-md-block h-100 position-absolute top-0 bg-white"></div>
          </div>
          <div
            ref={previewPanel}
            className="preview-panel col-12 col-md-6 py-2 vh-100 overflow-auto text-break"
          >
            <div
              id="preview"
              dangerouslySetInnerHTML={{ __html: htmlPreview }}
            ></div>
          </div>
        </div>
      </main>
    </div>
  );
}

function initialEditorState() {
  return `
# H1 Header

## H2 Header

[Link](https://google.it)

\`inline code\`

\`\`\`
Code block
\`\`\`

- item 1
- item 2 
- item 3

> blockquote

![image](/logo192.png)

**Bolded text**
`;
}

function initialHtmlState() {
  return marked(initialEditorState());
}

export default App;
