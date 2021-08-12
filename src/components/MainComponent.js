import React,{ Component } from 'react';
import{ Button} from 'reactstrap';
import front from './frontimg.jpg';
import Dashboard from './DashboardComponent';
import HomeCarousel from './CarouselComponent';

class Main extends Component{
    constructor(props){
        super(props);

        this.state={
            isDashOpen: false
        };
        this.newCompo=this.newCompo.bind(this);
    }

    newCompo(){
        this.setState({
            isDashOpen: !this.state.isDashOpen
        });
    }

    render(){
        return(
            this.state.isDashOpen?
            <Dashboard className="dash-jumbo"/>
            :
            <>
                <div className="hi">
                <center><strong>Task-it-Up</strong></center>
                </div>
       <center><HomeCarousel/></center>
       <div className="container">
           <div className="row">
               <div className="col-md-4 mt-md-5">
                <h3><strong>Task-it-Up helps teams work more collaboratively and get more done</strong></h3><br/>
                <p>Task-it-Up's boards, lists, and cards enable teams to organize and prioritize projects in a fun, flexible, and rewarding way.</p><br/>
                <Button className="share" onClick={this.newCompo} >Start Doing <i class="fa fa-long-arrow-right fa-lg" aria-hidden="true"></i></Button>
               </div>
               <div className="col-md-8 image d-md-flex justify-content-center mt-2">
                    <img src={front} className="photo" />
               </div>
           </div>
       </div>
       </>
        );
    }

}

export default Main;