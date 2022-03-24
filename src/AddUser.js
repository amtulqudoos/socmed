import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import saveAs from 'file-saver';

function AddUser(props) {

    const [selectedImage, setSelectedImage] = useState(null);    

    const[state, changeState] = useState({
        username: "",
        description: "",
        like: 0
    });

    const submitHandler = (e) => {
        // console.log("form submitted.");
        e.preventDefault();              
        props.updateList(state.username, state.description, state.like);
        toastr.success("Your post was added!", "Success");
        changeState({
            username: "",
            description: "",
            like: 0
        });
        //let url = URL.createObjectURL(selectedImage);        
        //let file = fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], "./images/" + state.username + ".jpg", { type: "image/jpg" }));
        //saveAs(file);
        let imageObj = document.getElementById("imageToSave");
        let canvasObj = document.getElementById("canvasToSave");
        let ctx = canvasObj.getContext('2d');
        canvasObj.height = imageObj.height;
        canvasObj.width = imageObj.width;
        ctx.drawImage(imageObj, 0, 0);
        canvasObj.toBlob((e) => {
            saveAs(e, "./images/" + state.username + ".jpg");
        });
    }    

    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "2000",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }

    const handleChange = (event) => {

        const newState = {...state};        
     
        switch (event.target.type)
        {
            case "checkbox":
                newState[event.target.name] = Boolean(event.target.checked);        
                break;
            case "number":
                newState[event.target.name] = Number(event.target.value);
                break;
            default:
                newState[event.target.name] = event.target.value;    
                break;
        }
        
        changeState(newState);        
    }
    return(
    <>
        <div className="container">
            <Form onSubmit={(e) => submitHandler(e) }>
                <Form.Group controlId="username">
                    <Form.Label>UserName</Form.Label>
                     <Form.Control name="username"
                      type="text" 
                      value={state.username} 
                      onChange={(e) => handleChange(e)}
                      onFocus={(e) => e.target.select()}/>
                </Form.Group>
                <Form.Group controlId="fullname">
                    <Form.Label>Full Name</Form.Label>
                     <Form.Control name="fullname"
                      type="text" 
                      value={state.fullname} 
                      onChange={(e) => handleChange(e)}/>
                </Form.Group>            
                <br/>
                <div>                
                {selectedImage && (
                    <div>
                    <img id="imageToSave" alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                    <canvas id="canvasToSave" height="64" width="64"></canvas>
                    <br />
                    <button onClick={()=>setSelectedImage(null)}>Remove</button>                    
                    </div>
                )}
                <br/>
                <br/> 
                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                    }}
                />
            </div>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    </>
    )
}

export default AddUser;