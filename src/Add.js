import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function Add(props) {

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
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                     <Form.Control name="description"
                      type="text" 
                      value={state.description} 
                      onChange={(e) => handleChange(e)}/>
                </Form.Group>
                <Form.Group controlId="like">
                    <Form.Label>Complete</Form.Label>
                     <Form.Control name="like"
                      type="number"                       
                      checked={state.like}
                      onChange={(e) => handleChange(e)}/>
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Add;