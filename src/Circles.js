import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const getRandomColor = (colors, opacities) => {
  const randColor = colors[Math.floor(Math.random() * colors.length)];
  const randOpacity = opacities[Math.floor(Math.random() * opacities.length)];
  return `${randColor}${randOpacity}`;
};

function Circle(
  ctx,
  width,
  height,
  mousePos,
  velocity,
  minRadius,
  maxRadius,
  opacities,
  colors,
) {
  this.x = Math.random() * (width - 2 * maxRadius) + maxRadius;
  this.y = Math.random() * (height - 2 * maxRadius) + maxRadius;
  this.dx = (Math.random() - 0.5) * velocity;
  this.dy = (Math.random() - 0.5) * velocity;
  this.radius = Math.random() * (maxRadius - minRadius) + minRadius;
  this.naturalRadius = this.radius;
  this.mousePos = mousePos;
  this.color = getRandomColor(colors, opacities);

  this.draw = () => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  };
  this.update = () => {
    //interactivity
    if (
      Math.abs(this.x - mousePos.x) < 50 &&
      Math.abs(this.y - mousePos.y) < 50 &&
      this.radius < 40
    ) {
      this.radius += 2;
    } else if (
      Math.abs(this.x - mousePos.x) >= 50 &&
      Math.abs(this.y - mousePos.y) >= 50 &&
      this.radius > this.naturalRadius
    ) {
      this.radius -= 2;
    }
    this.x += this.dx;

    if (this.x > width - this.radius || this.x < this.radius) {
      this.dx = -this.dx;
    }
    this.y += this.dy;
    if (this.y > height - this.radius || this.y < this.radius) {
      this.dy = -this.dy;
    }
    this.draw();
  };
}

function Circles({
  width,
  height,
  num,
  velocity,
  minRadius,
  maxRadius,
  colors,
  opacities,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const mousePos = {
      x: undefined,
      y: undefined,
    };

    //get circles
    const circlesArr = Array.from({ length: num }).map(
      el =>
        new Circle(
          ctx,
          width,
          height,
          mousePos,
          velocity,
          minRadius,
          maxRadius,
          opacities,
          colors,
        ),
    );

    //add mouse listener
    const handleMouseMove = e => {
      mousePos.x = e.offsetX;
      mousePos.y = e.offsetY;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    ctx.fillStyle = "#005";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    circlesArr.forEach(o => {
      o.draw();
    });

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#005";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      circlesArr.forEach(o => {
        o.update();
      });
    }
    const id = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(id);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [width, height, velocity, num, minRadius, maxRadius, opacities, colors]);

  return <canvas ref={canvasRef}></canvas>;
}

Circles.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  num: PropTypes.number.isRequired,
  velocity: PropTypes.number.isRequired,
  minRadius: PropTypes.number.isRequired,
  maxRadius: PropTypes.number.isRequired,
  colors: PropTypes.array,
  opacities: PropTypes.array,
};

Circles.defaultProps = {
  num: 50,
  velocity: 2,
  minRadius: 5,
  maxRadius: 10,
  colors: ["#000000"],
  opacities: ["ff"],
};
export default Circles;
