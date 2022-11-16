import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";







async function testGet()
{
  const response = await fetch('/getPdf');
  const data = await response;
  document.querySelector('.imgTest').src = data.url;
  console.log(data);
}

async function testGetHtml()
{
  const response = await fetch('/testPdfjs');
  const data = await response.json();
  document.querySelector('.htmlTest').innerHTML = data.items;
  console.log(data);
}
async function getTextContent()
{
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const response = await fetch('/testPdfjs');
  const data = await response.url;
  const pdf = await pdfjsLib.getDocument(data).promise;
  const page = await pdf.getPage(1).then(function(page) {
    let scale = 1.5;
  let viewport = page.getViewport({ scale: scale, });
  // Support HiDPI-screens.
  let outputScale = window.devicePixelRatio || 1;

  let canvas = document.getElementById('the-canvas');
  let context = canvas.getContext('2d');

  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);
  canvas.style.width = Math.floor(viewport.width) + "px";
  canvas.style.height =  Math.floor(viewport.height) + "px";

  let transform = outputScale !== 1
    ? [outputScale, 0, 0, outputScale, 0, 0]
    : null;

  let renderContext = {
    canvasContext: context,
    transform: transform,
    viewport: viewport
  };
  page.render(renderContext);
  });
  const content = await page.getTextContent();
  console.log(content);

}
function App() {
  return (
    <div className="App">
      <h1>Test</h1>
      <canvas id="the-canvas"></canvas>
      <button onClick={testGet}>Test Get</button>
      <img className="imgTest"/>
      <button onClick={getTextContent}>Test Get Html</button>
      <div className="htmlTest"></div>
    </div>
  );
}

export default App;
