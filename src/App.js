import React, {useRef, useEffect, useState} from 'react';
import WebViewerV6 from 'pdftronV6';
import WebViewerV8 from 'pdftronV8';
import './App.css';

const App = () => {
  const [v6LoadTime, setV6LoadTime] = useState();
  const [v8LoadTime, setV8LoadTime] = useState();

  const viewerV6 = useRef(null);
  const viewerV8 = useRef(null);

  const pdfUrl = 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf';

  let v6LoadStart;
  let v6LoadEnd;

  let v8LoadStart;
  let v8LoadEnd;

  const x = 6;

  useEffect(() => {
    WebViewerV6(
      {
        path: '/webviewer/lib/v6',
      },
      viewerV6.current,
    ).then((instance) => {
      const { docViewer } = instance;

      docViewer.on('documentLoaded', () => {
        // We stop the timer when the document viewer tells us that the document has been loaded
        v6LoadEnd = performance.now();
        const loadTime = v6LoadEnd - v6LoadStart;
        console.log(`v6.2.1 document loaded: ${loadTime}ms`)
        setV6LoadTime(loadTime)

        // We've loaded the document using v6.2.1, now do the same using v8.12.0
        loadV8();
      });

      // We start the timer when we tell the document viewer to load the PDF from the URL
      v6LoadStart = performance.now();
      docViewer.loadDocument(pdfUrl);
    });
  }, []);

  const loadV8 = () => {
    WebViewerV8(
      {
        path: '/webviewer/lib/v8',
      },
      viewerV8.current,
    ).then((instance) => {
      const { documentViewer } = instance.Core;

      documentViewer.addEventListener('documentLoaded', () => {
        v8LoadEnd = performance.now();
        const loadTime = v8LoadEnd - v8LoadStart;
        console.log(`v8.12.0 document loaded: ${loadTime}ms`)
        setV8LoadTime(loadTime);
      });

      v8LoadStart = performance.now();
      documentViewer.loadDocument(pdfUrl);
    });
  }

  return (
    <div className="App">
      <div className="version v6">
        <div className="header">
          <div className="title">v6.2.1</div>
          <div className="time">{v6LoadTime ? v6LoadTime + 'ms' : ''}</div>
        </div>
        <div className="webviewer" ref={viewerV6}></div>
      </div>
      <div className="version v8">
        <div className="header">
          <div className="title">v8.12.0</div>
          <div className="time">{v8LoadTime ? v8LoadTime + 'ms' : ''}</div>
        </div>
        <div className="webviewer" ref={viewerV8}></div>
      </div>
    </div>
  );
};

export default App;
