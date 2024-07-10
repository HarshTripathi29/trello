import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import './Home.css'
import Header from '../components/Header';

const Home = ({ workspaces, tasks }) => {


  const navigate = useNavigate();


  return (
    <div className="landing-page">
     
     <Header/>
      <section className="intro">
        <p>Streamline your project management with WorkJam.</p>
      </section>
      <div>
        <img className='home-image'src='https://html.creativegigstf.com/deski/deski/images/assets/ils_20.svg'/>
      </div>
      <Link to='/login'><button  className='landingBtn'>Get Started</button></Link>

      <div className='description'>
        <p>Effortlessly track tasks and maintain organization with our product. Capture your ideas and easily find them later, ensuring nothing slips through the cracks.</p>
      </div>
      <section className="steps">
      <h2>Getting started</h2>
      <div>Follow these steps to get started with the app</div>
        <ol>
          <li>Create a workspace.</li>
          <li>Add boards within each workspace for different projects.</li>
          <li>Create tasks within each board with details such as name, description, and due date.</li>
          <li>Drag and drop tasks to organize your workflow.</li>
        </ol>
      </section>
      <div className='intro2'>
      Keep track of your meetings all in one place. 
      <div className="calendar-container">
        

      </div>

      </div>
       
  
    </div>
  );
};

export default Home;