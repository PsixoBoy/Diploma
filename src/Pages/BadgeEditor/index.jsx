import React, { useState, useRef } from "react";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Image as KonvaImage,
  Circle,
} from "react-konva";
import axios from "axios";
import "./index.css";
import defaultAvatar from "../../Assets/Images/profile.jpg";
import { useParams } from "react-router-dom";
import { saveBadgeTemplate } from "../../api";

const URLImage = ({ image, onChange, shape }) => {
  const [img, setImg] = useState(null);

  React.useEffect(() => {
    const loadImage = () => {
      const img = new window.Image();
      img.crossOrigin = "anonymous"; // Ensure the image can be used in the canvas
      img.src = image.src;
      img.onload = () => {
        setImg(img);
      };
    };
    loadImage();
  }, [image.src]);

  return img ? (
    shape === "circle" ? (
      <Circle
        x={image.x + image.width / 2}
        y={image.y + image.height / 2}
        radius={Math.min(image.width, image.height) / 2}
        fillPatternImage={img}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...image,
            x: e.target.x() - image.width / 2,
            y: e.target.y() - image.height / 2,
          });
        }}
        onTransformEnd={(e) => {
          const node = e.target;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...image,
            x: node.x() - image.width / 2,
            y: node.y() - image.height / 2,
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
        width={image.width}
        height={image.height}
      />
    ) : (
      <KonvaImage
        image={img}
        x={image.x}
        y={image.y}
        width={image.width}
        height={image.height}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...image,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = e.target;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...image,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
      />
    )
  ) : null;
};

const BadgeEditor = () => {
  const [format, setFormat] = useState("vertical");
  const [name, setName] = useState("Name");
  const [lastName, setLastName] = useState("Surname");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [logo, setLogo] = useState({
    type: "text",
    value: "Logo",
    x: 20,
    y: 20,
    fontSize: 24,
    fontFamily: "Montserrat",
    fill: "#000000",
    src: null,
    width: 100,
    height: 100,
  });
  const [avatar, setAvatar] = useState({
    src: defaultAvatar,
    x: 20,
    y: 150,
    width: 100,
    height: 100,
  });
  const [avatarShape, setAvatarShape] = useState("circle");
  const [logoShape, setLogoShape] = useState("square");
  const [namePosition, setNamePosition] = useState({
    x: 20,
    y: 300,
    fontSize: 24,
    fontFamily: "Montserrat",
    fill: "#000000",
    bold: false,
    italic: false,
  });
  const [lastNamePosition, setLastNamePosition] = useState({
    x: 20,
    y: 340,
    fontSize: 24,
    fontFamily: "Montserrat",
    fill: "#000000",
    bold: false,
    italic: false,
  });
  const [font, setFont] = useState("Montserrat");
  const stageRef = useRef();
  const { id: eventId } = useParams();

  const handleSave = async () => {
    const template = {
      format,
      backgroundImage,
      backgroundColor,
      logo,
      avatar,
      avatarShape,
      logoShape,
      namePosition,
      lastNamePosition,
      font,
    };

    try {
      const response = await saveBadgeTemplate({ eventId, template });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fonts = [
    "Montserrat",
    "Arial",
    "Verdana",
    "Times New Roman",
    "Courier New",
  ];
  const textStyle = (position) => {
    let style = "";
    if (position.bold) style += "bold ";
    if (position.italic) style += "italic ";
    return style.trim();
  };

  return (
    <div className="container">
      <div className="controls">
        <div className="row">
          <button onClick={() => setFormat("vertical")}>Vertical</button>
          <button onClick={() => setFormat("horizontal")}>Horizontal</button>
        </div>
        <div className="row">
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
          <label className="file-input-label">
            <input
              type="file"
              onChange={(e) =>
                setBackgroundImage(URL.createObjectURL(e.target.files[0]))
              }
            />
            Upload Background
          </label>
        </div>
        <div className="row">
          <select
            value={avatarShape}
            onChange={(e) => setAvatarShape(e.target.value)}
          >
            <option value="square">Square Avatar</option>
            <option value="circle">Round Avatar</option>
          </select>
          <select
            value={logoShape}
            onChange={(e) => setLogoShape(e.target.value)}
          >
            <option value="square">Square Logo</option>
            <option value="circle">Round Logo</option>
          </select>
        </div>
        <div className="row">
          <select
            value={logo.type}
            onChange={(e) => setLogo({ ...logo, type: e.target.value })}
          >
            <option value="text">Text Logo</option>
            <option value="image">Image Logo</option>
          </select>
          {logo.type === "text" ? (
            <input
              type="text"
              value={logo.value}
              onChange={(e) => setLogo({ ...logo, value: e.target.value })}
            />
          ) : (
            <label className="file-input-label">
              <input
                type="file"
                onChange={(e) =>
                  setLogo({
                    ...logo,
                    src: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
              Upload Logo
            </label>
          )}
        </div>
        <div className="row">
          <select value={font} onChange={(e) => setFont(e.target.value)}>
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <label>Avatar Size:</label>
          <input
            type="range"
            min="50"
            max="200"
            value={avatar.width}
            onChange={(e) =>
              setAvatar({
                ...avatar,
                width: e.target.value,
                height: e.target.value,
              })
            }
          />
        </div>
        <div className="row">
          <label>Logo Size:</label>
          <input
            type="range"
            min="50"
            max="200"
            value={logo.width}
            onChange={(e) =>
              setLogo({
                ...logo,
                width: e.target.value,
                height: e.target.value,
              })
            }
          />
        </div>
        <div className="row">
          <label>Name Font Size:</label>
          <input
            type="range"
            min="10"
            max="50"
            value={namePosition.fontSize}
            onChange={(e) =>
              setNamePosition({ ...namePosition, fontSize: e.target.value })
            }
          />
          <input
            type="color"
            value={namePosition.fill}
            onChange={(e) =>
              setNamePosition({ ...namePosition, fill: e.target.value })
            }
          />
          <button
            onClick={() =>
              setNamePosition({ ...namePosition, bold: !namePosition.bold })
            }
          >
            {namePosition.bold ? "Unbold" : "Bold"}
          </button>
          <button
            onClick={() =>
              setNamePosition({ ...namePosition, italic: !namePosition.italic })
            }
          >
            {namePosition.italic ? "Unitalic" : "Italic"}
          </button>
        </div>
        <div className="row">
          <label>Surname Font Size:</label>
          <input
            type="range"
            min="10"
            max="50"
            value={lastNamePosition.fontSize}
            onChange={(e) =>
              setLastNamePosition({
                ...lastNamePosition,
                fontSize: e.target.value,
              })
            }
          />
          <input
            type="color"
            value={lastNamePosition.fill}
            onChange={(e) =>
              setLastNamePosition({ ...lastNamePosition, fill: e.target.value })
            }
          />
          <button
            onClick={() =>
              setLastNamePosition({
                ...lastNamePosition,
                bold: !lastNamePosition.bold,
              })
            }
          >
            {lastNamePosition.bold ? "Unbold" : "Bold"}
          </button>
          <button
            onClick={() =>
              setLastNamePosition({
                ...lastNamePosition,
                italic: !lastNamePosition.italic,
              })
            }
          >
            {lastNamePosition.italic ? "Unitalic" : "Italic"}
          </button>
        </div>
        <button onClick={handleSave}>Save Badge</button>
      </div>

      <div className="stage-container">
        <Stage
          width={format === "vertical" ? 300 : 450}
          height={format === "vertical" ? 450 : 300}
          ref={stageRef}
          className={`badge ${format}`}
        >
          <Layer>
            {backgroundImage ? (
              <URLImage
                image={{
                  src: backgroundImage,
                  x: 0,
                  y: 0,
                  width: format === "vertical" ? 300 : 450,
                  height: format === "vertical" ? 450 : 300,
                }}
                onChange={setBackgroundImage}
                shape="rect"
              />
            ) : (
              <Rect
                width={format === "vertical" ? 300 : 450}
                height={format === "vertical" ? 450 : 300}
                fill={backgroundColor}
              />
            )}
            <Text
              text={name}
              x={namePosition.x}
              y={namePosition.y}
              fontSize={namePosition.fontSize}
              fontFamily={namePosition.fontFamily}
              fill={namePosition.fill}
              fontStyle={textStyle(namePosition)}
              draggable
              onDragEnd={(e) =>
                setNamePosition({
                  ...namePosition,
                  x: e.target.x(),
                  y: e.target.y(),
                })
              }
            />
            <Text
              text={lastName}
              x={lastNamePosition.x}
              y={lastNamePosition.y}
              fontSize={lastNamePosition.fontSize}
              fontFamily={lastNamePosition.fontFamily}
              fill={lastNamePosition.fill}
              fontStyle={textStyle(lastNamePosition)}
              draggable
              onDragEnd={(e) =>
                setLastNamePosition({
                  ...lastNamePosition,
                  x: e.target.x(),
                  y: e.target.y(),
                })
              }
            />
            {logo.type === "text" ? (
              <Text
                text={logo.value}
                x={logo.x}
                y={logo.y}
                fontSize={logo.fontSize}
                fontFamily={logo.fontFamily}
                fill={logo.fill}
                draggable
                onDragEnd={(e) =>
                  setLogo({ ...logo, x: e.target.x(), y: e.target.y() })
                }
              />
            ) : (
              logo.src && (
                <URLImage image={logo} onChange={setLogo} shape={logoShape} />
              )
            )}
            {avatar.src && (
              <URLImage
                image={avatar}
                onChange={setAvatar}
                shape={avatarShape}
              />
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default BadgeEditor;
