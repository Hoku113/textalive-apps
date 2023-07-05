const Recoder = () => {

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
        console.log('on drop', e);
        if (e.currentTarget.id === 'drop-zone') {
        }
      };

    return (
        <>            
            <div 
            id="drop-zone"
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragOer={(e) => {
                e.preventDefault();
            }}
            onDrop={Drop}
            >

                drop zone {/*この部分はレコードを設置する部分*/}

            </div>
        </>
    )
}

export default Recoder