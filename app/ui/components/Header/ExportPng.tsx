import React from 'react';
import html2canvas from 'html2canvas';

const ExportPng = ({ projectName, dimensions }: { projectName: string, dimensions : {width: number, height: number}}) => {
  const capturePng = async () => {
    const octalysisDom = document.querySelector('#canvas') as HTMLElement;

    const printCanvas = await html2canvas(octalysisDom, {
      scrollX: 0,
      scrollY: -window.scrollY,
      backgroundColor: 'null',
      x: 0,
      y: 0,
      width: dimensions.width,
      height: dimensions.height,
    });

    const link = document.createElement('a');
    link.setAttribute('download', `${projectName}.png`);
    link.setAttribute('href', printCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
    link.click();
  };

  return (
    <div style={{display: 'flex', alignItems: 'center'}}  onClick={capturePng}>
      <span className="material-symbols-outlined">image</span>
      <button>
        Export ALL
      </button>
    </div>
  );
};

export default ExportPng;
