import React from 'react'
import "./Docs.css"

export default function Docs() {
  return (
    <div className="Docs">
        <h1>Documentation</h1>
        
        <h2>Understanding Splodo Services</h2>
        
        <p>When Splodos are initially created, they do not provide very much value. However, they all contain some information that 
            in some form may be useful. Services on the Splodo platform are a set of ways for utilizing the content of your Splodos in different environments and
            situations. Splodo Services is the pipeline where your Splodos, together or alone, goes from being a simple text component, to something 
            that creates value. 
            </p>
           
<p>
            Splodo Directories play a major role in creating this value, because of their capability to relate Splodos to eachother. At first glance, Splodo Directories are a just simple way to
            categorize your Splodos.  However when it comes to Splodo Services, they can also be used to apply logic to a set of Splodos. An example of this 
            could be a visual presentation Service on the Splodo platform, where you choose a specific Splodo Directory to visually present all created Splodos
            in the chosen directory.
            </p>
            <p>
            There are currently two main types of Services implemented in the Splodo platform. <i>Global Services</i> and <i>Regular Services</i>. Both of
            them will be introduced in the section below.
            </p>

        <h2>Global Services</h2>
        <p>Global Services are services that can be applied directly when creating Splodos, most often through using the fundemantal parts of 
            Splodos (titles, descriptions, and tags). If the user follows the syntax provided in the documentation, further value can be added to the Splodo created.
        </p>

        <h3>The URL Service</h3>
        <p>The URL Service helps you create Links to other websites on your Splodo profile. It works simply by adding the following syntax when creating a Splodo:</p>
        <p>SplodoTitle: <code>YouTube Link</code></p>
        <p>SplodoDesc: <code>This is my YouTube link</code></p>
        <p>SplodoCategory: <code>No Category</code></p>
        <p><span style={{color: "red"}}>Adding the URL Service: </span>SplodoTag:<code style={{color: "red"}}>url</code> SplodoTagValue: <code style={{color: "red"}}>https://youtube.com</code></p>

        <p> The example above will create a Splodo on your profile page with URL functionality. When people visiting your Splodo page and pressing 
            the Splodo created, they will be redirected to the webpage specified in the url tag. 
        </p>


        <h3>The Styling Service</h3>
        <p>The Styling Service is a service made for customizing your profile page.</p>
        
        
        <h2>Regular Services</h2>
        <p>....</p>



    </div>
  )
}
