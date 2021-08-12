import React,{ Component } from 'react';
import axios from 'axios';
import{Jumbotron,Col, Row ,Navbar, NavbarBrand, Card, CardBody, CardHeader, Button, CardFooter,Modal,ModalHeader,ModalBody, FormGroup, Form,Label, Input } from 'reactstrap';
import { Control, LocalForm} from 'react-redux-form';
import { Loading } from './LoadingComponent';

const baseUrl='http://localhost:3001/';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state={
            todo: [],
            inProgress:[],
            completed: [],
            taskName:'',
            taskSection:0,
            isLoading: true
        };
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.addTodo=this.addTodo.bind(this);
        this.addinprogress=this.addinprogress.bind(this);
        this.addcompleted=this.addcompleted.bind(this);
        this.reMoveTodo=this.reMoveTodo.bind(this);
        this.reMoveInProgress=this.reMoveInProgress.bind(this);
        //this.newDoc=this.newDoc.bind(this);
    }

    componentDidMount(){
        axios.get(baseUrl+'todo')
        .then(res=>{
            this.setState({todo: res.data});
            axios.get(baseUrl+'inProgress')
            .then(res=>{
                this.setState({inProgress: res.data});
                axios.get(baseUrl+'completed')
                .then(res=>{
                    this.setState({completed: res.data, isLoading: !this.state.isLoading});
                });
            });
        });
    }

    toggleModal(){ 
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }

    addTodo(){
        this.setState({ taskSection: 1},()=>{
            this.toggleModal();
        });
    }

    reMoveTodo(key){
        this.setState({ taskSection: 1},()=>{
            this.reMove(key);
        });  
    }

    addinprogress(){
        this.setState({ taskSection: 2},()=>{
            this.toggleModal();
        });
    }

    reMoveInProgress(key){
        this.setState({ taskSection: 2},()=>{
            this.reMove(key);
        });  
    }

    addcompleted(){
        this.setState({ taskSection: 3},()=>{
            this.toggleModal();
        });
    }

    handleChange(event){
        this.setState({
            taskName: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
       var section;
        if(this.state.taskSection===1)
            section='todo';
        else if(this.state.taskSection===2)
            section='inProgress';
        else if(this.state.taskSection===3)
            section='completed';
        if(this.state.taskName!==""){
            this.toggleModal();
            this.setState({isLoading: !this.state.isLoading},()=>{
                axios.post(baseUrl+section,{name: this.state.taskName})
                .then(res=>{
                    this.componentDidMount();
                });
            });
        }
    }

    reMove(key){
        var fromSection,toSection,tname;
        if(this.state.taskSection===1){
            fromSection='todo/';
            toSection='inProgress';
            this.state.todo.map(todo=>{
                if(todo.id===key){
                    tname=todo.name;
                }
            })
        }
        else if(this.state.taskSection===2){
            fromSection='inProgress/';
            toSection='completed';
            this.state.inProgress.map(inProgress=>{
                if(inProgress.id===key){
                    tname=inProgress.name;
                }
            })
        }
        this.setState({isLoading:!this.state.isLoading},()=>{
            axios.delete(baseUrl+fromSection+key)
            .then(res=>{
                axios.post(baseUrl+toSection,{ name: tname })
                .then(res=>{
                    this.componentDidMount();
                });
            });
        });
    }

    render(){
       
        return(
            <Jumbotron className="dash-jumbo">
                <Navbar dark>
                    <NavbarBrand className="hash" href="/">
                        <h4><strong><i class="fa fa-angle-double-left" aria-hidden="true"></i>Task-it-Up</strong></h4>
                    </NavbarBrand>
                </Navbar>
                {this.state.isLoading&&
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                }
                {this.state.isLoading===false&&
                <>
                    <div className="container hash">
                        <div className="row">
                            <LocalForm>
                                <Row className="form-group">
                                    <Label htmlFor="title"><h5><strong>Task :</strong></h5></Label>
                                    <Col>
                                        <Control.text model=".title" id="title" placeholder="Task Name" className="form-control"></Control.text>
                                    </Col>
                                    <Col>
                                    <Button>Done</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </div>
                    </div>
                    <div className="hash">
                            *Click on the task to move it to next section!
                    </div>
                    <div className="container dash">
                        <div className="row">
                            <div className="col-md-4 mt-4">
                                <Card>
                                    <CardHeader className="text-center" ><h4><strong>To Do</strong></h4></CardHeader>
                                    <CardBody className="card-header" >
                                        {this.state.todo.map(todo=>
                                            <Button key={todo.id} className="tasks d-flex content-align-left mt-2" onClick={()=>this.reMoveTodo(todo.id)}> 
                                            { todo.name } 
                                            <i class="fa fa-clock-o fa-lg ml-auto" aria-hidden="true"></i>
                                            </Button>
                                        )}
                                    </CardBody>
                                    <CardFooter className="add" onClick={this.addTodo}><center><i class="fa fa-plus" aria-hidden="true"></i> Add a Task...</center></CardFooter>
                                </Card>
                            </div>
                            <div className="col-md-4 mt-4">
                                <Card>
                                    <CardHeader className="text-center"><h4><strong>In Progress</strong></h4></CardHeader>
                                    <CardBody className="card-header">
                                    {this.state.inProgress.map(inProgress=>
                                        <Button key={inProgress.id} className="tasks d-flex content-align-left mt-2" onClick={()=>this.reMoveInProgress(inProgress.id)}>
                                            {inProgress.name} 
                                        <i className="fa fa-spinner ml-auto fa-md protask" aria-hidden="true"></i>
                                        </Button>
                                    )}
                                    </CardBody>
                                    <CardFooter className="add" onClick={this.addinprogress}><center><i class="fa fa-plus" aria-hidden="true"></i> Add a Task...</center></CardFooter>
                                </Card>
                            </div>
                            <div className="col-md-4 mt-4">
                                <Card>
                                    <CardHeader className="text-center"><h4><strong>Completed</strong></h4></CardHeader>
                                    <CardBody className="card-header">
                                    {this.state.completed.map(completed=>
                                        <Button key={completed.id} className="tasks d-flex content-align-left mt-2">{completed.name} 
                                        <i class="fa fa-check-circle-o tick fa-lg ml-auto tick" aria-hidden="true"></i>
                                        </Button>
                                    )}
                                    </CardBody>
                                    <CardFooter className="add" onClick={this.addcompleted}><center><i class="fa fa-plus" aria-hidden="true"></i> Add a Task...</center></CardFooter>
                                </Card>
                            </div>
                        </div> 
                    </div>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader className="modalbck" toggle={this.toggleModal}>Add a Task...</ModalHeader>
                        <ModalBody className="modalbck">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="addtask">Task: </Label>
                                    <Input type="text" id="addtask" name="addtask" onChange={this.handleChange}/>
                                </FormGroup>
                                <center><Button type="submit" value="submit" className="share">Add</Button></center>
                            </Form>
                        </ModalBody>
                    </Modal>
                </>}
            </Jumbotron>
        );
    }
}

export default Dashboard;