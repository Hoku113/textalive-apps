import { useRef, useState } from "react";
import { Stage, Layer} from "react-konva";
import GetImage from "./draggedImage";


const Recoder = () => {

  const dragImage = useRef();
  const stageRef = useRef();
  const [images, setImages] = useState([])

  console.log(dragImage)
  console.log(stageRef)


    const dragEnter = (e) => {
        console.log('on drag enter', e);
        if (e.currentTarget.id === 'drop-zone') {
        }
      };
    
      const dragLeave = (e) => {
        console.log('on drag leave', e);
        if (e.currentTarget.id === 'drop-zone') {
        }
      };
    
      const Drop = (e) => {
        console.log('on drop');
        if (e.currentTarget.id === 'drop-zone') {

          console.log("start")
          e.preventDefault();

          stageRef.current.setPointersPositions(e);

          setImages(
            images.concat([{
              ...stageRef.current.getPointerPosition(),
              src: dragImage.current
            }])
          )
        }
      };

    return (
        <>            
            <div 
            id="drop-zone"
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDrop={Drop}
            >
              <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                style={{border: "1px solid grey"}}
                ref={stageRef}
              >
                <Layer>
                  {images.map((image) => {
                    return <GetImage image={image}></GetImage>
                  })}
                </Layer>
              </Stage>
            </div>


        </>
    )
}

export default Recoder