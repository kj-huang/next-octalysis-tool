import React, { useEffect, useRef } from 'react';
import { useOctalysis } from '@/app/contexts/OctalysisContext';
import ProjectNameEditor from './ProjectNameEditor';

const OctalysisRadar = ({width, height}: {width: number, height: number}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const degToPi = Math.PI / 180;
  const { data } = useOctalysis();

  const controls = {
    angle: 67.5,
    count: 8,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      ctxRef.current = canvas.getContext('2d');
      draw(getPoints());
    }
  }, [width, height, data]);

  const getPoints = () => {
    const p = [
      { index: 0, r: data['CD5'].score },
      { index: 1, r: data['CD7'].score },
      { index: 2, r: data['CD8'].score },
      { index: 3, r: data['CD6'].score },
      { index: 4, r: data['CD4'].score },
      { index: 5, r: data['CD2'].score },
      { index: 6, r: data['CD1'].score },
      { index: 7, r: data['CD3'].score },
    ];

    return p;
  };

  const draw = (points: any) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    // START: Establishing Example Data
    const angleSpan = (Math.PI * 2) / controls.count; // Each Angle
    points.forEach((p: any, index: number) => {
      const angle = 0 * degToPi + index * angleSpan;
      p.angle = angle;
    });

    ctx.clearRect(0, 0, width, height);

    // START: Connecting Points
    ctx.save();
    ctx.translate(width / 2, height / 2); // Center
    ctx.beginPath();
    ctx.strokeStyle = '#a6c1ee';
    ctx.lineWidth = 1;
    const grd = ctx.createLinearGradient(0, 200, 200, 0); // Gradient
    grd.addColorStop(0, '#194681');
    grd.addColorStop(0.8, '#019BF4');
    grd.addColorStop(1, '#009EF8');

    points.forEach((p: any) => {
      if(width < 800){
        //mobile view
        const pxy = {
          x: (p.r * 10 + p.r * 4 + 120) * Math.cos(p.angle),
          y: (p.r * 10 + p.r * 4 + 120) * Math.sin(p.angle),
        };
        ctx.lineTo(pxy.x, pxy.y);
      } else {
        const pxy = {
          x: (p.r * 10 + p.r * 4 + 170) * Math.cos(p.angle),
          y: (p.r * 10 + p.r * 4 + 170) * Math.sin(p.angle),
        };
        ctx.lineTo(pxy.x, pxy.y);
      }
    });

    ctx.fillStyle = grd;
    ctx.globalAlpha = 1; // Opacity
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    showBackground(ctx);
  };

  const showBackground = (ctx: CanvasRenderingContext2D) => {
    const bg = new Image();
    bg.src = '/assets/octalysis-background.png';
    bg.onload = function () {
      const wrh = bg.width / bg.height;
      let nw = 0;

      if(width < 800){
        //mobile view
        nw =350;
      } else {
        nw =500;
      }

      let nh = nw / wrh;
      if (nh > height) {
        nh = height;
        nw = nh * wrh;
      }
      const x = nw < width ? (width - nw) / 2 : 0;
      const y = nh < height ? (height - nh) / 2 : 0;
      ctx.drawImage(bg, x, y, nw, nh);
    };
  };

  return (
    <div id='octalysis-radar' className='home'>
      <canvas id='octalysis' ref={canvasRef}></canvas>
      <ProjectNameEditor />
      <div style={{ display: 'none' }}>{JSON.stringify(getPoints())}</div>
    </div>
  );
};

export default OctalysisRadar;
