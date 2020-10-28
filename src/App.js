import { useEffect, useState } from 'react';
import './styles/App.scss';
import marked from 'marked';

marked.setOptions({
  breaks: true,
});

function App() {
  const [markdown, setMarkdown] = useState(initialEditorState());
  const [htmlPreview, seHtmlPreview] = useState(initialHtmlState());
  
  useEffect(() => {}, []);

  function parseText(e) {
    const editorInput = e.target.value;
    setMarkdown(editorInput);

    const html = marked(e.target.value);
    seHtmlPreview(html);
  }

  return (
    <div className="App vh-100">
      <main className="container-fluid">
        <div className="row h-100">
          <div className="editor-panel col-12 col-md-6 py-2 vh-100 overflow-hidden">
            <textarea
              id="editor"
              className="w-100 h-100 pr-3 border-top-0 border-right border-bottom-0 border-left-0"
              type="text"
              name="editor"
              autoFocus
              onChange={parseText}
              placeholder="# Add here your Markdown..."
              value={markdown}
            ></textarea>
          </div>
          <div className="preview-panel col-12 col-md-6 py-2 vh-100 overflow-auto text-break">
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
